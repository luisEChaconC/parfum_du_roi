import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ICreatePerfumeUseCase } from "@port/use-case/perfume/create-perfume.use-case.interface";
import { IPerfumeRepository } from "@application/ports/repositories/perfume.repository.interface";
import { CreatePerfumeRequestDto } from "@application/dtos/perfume/create-perfume-request.dto";
import { Notes, Perfume } from "@entity/perfume.entity";
import { NotesDto } from "@dto/notes.dto";
import { INoteRepository } from "@port/repository/note.repository.interface";
import { IImageRepository } from "@port/repository/image.repository.interface";
import { ImageDto } from "@dto/image.dto";
import { Note } from "@entity/note.entity";
import { DatabaseError } from "@infrastructure/errors/database.error";
import { ImageMapper } from "@infrastructure/mapper/image.mapper";
import { NoteDto } from "@dto/note.dto";

@injectable()
export class CreatePerfumeUseCase implements ICreatePerfumeUseCase {
  constructor(
    @inject(TYPES.ImageRepository) private readonly imageRepository: IImageRepository,
    @inject(TYPES.PerfumeRepository) private readonly perfumeRepository: IPerfumeRepository,
    @inject(TYPES.NoteRepository) private readonly noteRepository: INoteRepository,
  ) {}

  async executeAsync(requestDto: CreatePerfumeRequestDto): Promise<Perfume> {
    await this.validateImages(requestDto.images);

    this.validateNotes(requestDto.notes);
    const notes = await this.buildNotes(requestDto.notes);

    const perfume = CreatePerfumeRequestDto.toDomain(requestDto, notes);
    const savedPerfume = await this.perfumeRepository.save(perfume);
    return savedPerfume;
  }

  private async validateImages(images: ImageDto[]): Promise<void> {
    const haveDuplicatePaths = this.haveDuplicatePaths(images);
    const anyImageExists = await this.anyImageExists(images);
    if (haveDuplicatePaths || anyImageExists) {
      throw new DatabaseError("Images must be unique");
    }
  }

  private haveDuplicatePaths(images: ImageDto[]): boolean {
    const uniquePaths = new Set(images.map(image => image.path));
    return uniquePaths.size !== images.length;
  }

  private async anyImageExists(images: ImageDto[]): Promise<boolean> {
    const existingImages = await this.imageRepository.findByPaths(images.map(image => image.path));
    return existingImages.length > 0;
  }

  
  private validateNotes(notesDto: NotesDto): void {
    const topNotesNames = notesDto.topNotes.map(note => note.name);
    const middleNotesNames = notesDto.middleNotes.map(note => note.name);
    const baseNotesNames = notesDto.baseNotes.map(note => note.name);

    const allNoteNames = [...topNotesNames, ...middleNotesNames, ...baseNotesNames];
    if (this.hasDuplicateNames(allNoteNames)) {
      throw new DatabaseError("Notes must be unique");
    }
  }

  private hasDuplicateNames(noteNames: string[]): boolean {
    const uniqueNoteNames = new Set(noteNames);
    return uniqueNoteNames.size !== noteNames.length;
  }

  private async buildNotes(notesDto: NotesDto): Promise<Notes> {
    const notes = new Notes(
      await this.processNotes(notesDto.topNotes),
      await this.processNotes(notesDto.middleNotes),
      await this.processNotes(notesDto.baseNotes)
    );

    return notes;
  }
  
  private async processNotes(notes: NoteDto[]): Promise<Note[]> {
    const noteNames = notes.map(note => note.name);
    const existingNotes = await this.findExistingNotes(noteNames);
    const existingNotesNames = existingNotes.map(note => note.name);
    const newNotesNames = noteNames.filter(name => !existingNotesNames.includes(name));
    const newNotes = newNotesNames.map(name => new Note(name));
    const allNotes = [...existingNotes, ...newNotes];

    return allNotes;
  }

  private async findExistingNotes(names: string[]): Promise<Note[]> {
    const existingNotes = await this.noteRepository.findByNames(names);
    return existingNotes;
  }
}
