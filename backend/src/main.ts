import express, { Request, Response, RequestHandler } from 'express';
import { errorHandler } from './presentation/middleware/error.middleware';
import { dataSource } from '@infrastructure/persistence/typeorm/data-source';
import { routes } from "@routes";

import { PerfumeModel } from '@model/perfume.model';
import { NoteModel } from '@model/note.model';
import { ImageModel } from '@model/image.model';
import { PerfumeConcentration } from '@domain/enums/perfume-concentration.enum';
import { PerfumeCategory } from '@domain/enums/perfume-category.enum';
import { Gender } from '@domain/enums/gender.enum';

const app = express();

dataSource.initialize();

app.use(express.json());

app.use("/api", routes);

const createPerfumeHandler: RequestHandler = async (req: Request, res: Response) => {
  console.log('Received payload:', req.body);
  
  try {
    // Validate enum values before proceeding
    if (req.body.concentration && !Object.values(PerfumeConcentration).includes(req.body.concentration)) {
      res.status(400).json({
        error: 'Invalid concentration value',
        message: `Concentration must be one of: ${Object.values(PerfumeConcentration).join(', ')}`,
        received: req.body.concentration
      });
      return;
    }

    if (req.body.category && !Object.values(PerfumeCategory).includes(req.body.category)) {
      res.status(400).json({
        error: 'Invalid category value',
        message: `Category must be one of: ${Object.values(PerfumeCategory).join(', ')}`,
        received: req.body.category
      });
      return;
    }

    if (req.body.targetGender && !Object.values(Gender).includes(req.body.targetGender)) {
      res.status(400).json({
        error: 'Invalid targetGender value',
        message: `Target gender must be one of: ${Object.values(Gender).join(', ')}`,
        received: req.body.targetGender
      });
      return;
    }

    const perfumeRepository = dataSource.getRepository(PerfumeModel);
    const noteRepository = dataSource.getRepository(NoteModel);
    const imageRepository = dataSource.getRepository(ImageModel);
    
    // Create the main perfume entity
    const perfume = perfumeRepository.create({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      price: req.body.price,
      stock: req.body.stock,
      targetGender: req.body.targetGender,
      arrivalDate: req.body.arrivalDate,
      concentration: req.body.concentration,
      category: req.body.category,
    });

    // Helper function to handle notes (find existing or create new)
    const handleNotes = async (notesData: any[]) => {
      const notes = [];
      for (const noteData of notesData) {
        if (noteData.id) {
          // If note has ID, try to find it first
          let existingNote = await noteRepository.findOne({ where: { id: noteData.id } });
          if (!existingNote) {
            existingNote = await noteRepository.findOne({ where: { name: noteData.name } });
          }
          notes.push(existingNote || noteRepository.create({ id: noteData.id, name: noteData.name }));
        } else if (noteData.name) {
          // Check if note with this name already exists
          let existingNote = await noteRepository.findOne({ where: { name: noteData.name } });
          notes.push(existingNote || noteRepository.create({ name: noteData.name }));
        }
      }
      return notes;
    };

    // Handle topNotes relationship
    if (req.body.topNotes && Array.isArray(req.body.topNotes)) {
      perfume.topNotes = await handleNotes(req.body.topNotes);
    }

    // Handle middleNotes relationship
    if (req.body.middleNotes && Array.isArray(req.body.middleNotes)) {
      perfume.middleNotes = await handleNotes(req.body.middleNotes);
    }

    // Handle baseNotes relationship
    if (req.body.baseNotes && Array.isArray(req.body.baseNotes)) {
      perfume.baseNotes = await handleNotes(req.body.baseNotes);
    }

    // Save the perfume with all relationships using proper inheritance handling
    const savedPerfume = await dataSource.transaction(async manager => {
      console.log('🔄 Starting transaction...');
      
      // Create and save the perfume entity (this will save to both products and perfumes tables)
      const perfumeToSave = manager.create(PerfumeModel, {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        stock: req.body.stock,
        targetGender: req.body.targetGender,
        arrivalDate: req.body.arrivalDate,
        concentration: req.body.concentration,
        category: req.body.category,
        topNotes: perfume.topNotes,
        middleNotes: perfume.middleNotes,
        baseNotes: perfume.baseNotes,
      });

      console.log('💾 Saving perfume entity...');
      // Save the perfume first - this should create entries in both products and perfumes tables
      const savedPerfumeEntity = await manager.save(PerfumeModel, perfumeToSave);
      console.log('✅ Perfume saved with ID:', savedPerfumeEntity.id);

      // Now handle images - they should reference the product ID (which is the same as perfume ID due to inheritance)
      if (req.body.images && Array.isArray(req.body.images)) {
        console.log('🖼️ Processing', req.body.images.length, 'images...');
        const imageEntities = [];
        for (const imageData of req.body.images) {
          const imageEntity = manager.create(ImageModel, {
            path: imageData.path,
            product: savedPerfumeEntity  // This should now work since savedPerfumeEntity has an ID
          });
          console.log('📸 Created image entity for path:', imageData.path, 'with product ID:', savedPerfumeEntity.id);
          imageEntities.push(imageEntity);
        }
        
        console.log('💾 Saving', imageEntities.length, 'images...');
        const savedImages = await manager.save(ImageModel, imageEntities);
        console.log('✅ Images saved successfully');
        savedPerfumeEntity.images = savedImages;
      }

      console.log('✅ Transaction completed successfully');
      return savedPerfumeEntity;
    });

    res.status(201).json(savedPerfume);
  } catch (error) {
    console.error('Error creating perfume:', error);
    res.status(500).json({ 
      error: 'Failed to create perfume', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

app.post('/perfume', createPerfumeHandler);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});