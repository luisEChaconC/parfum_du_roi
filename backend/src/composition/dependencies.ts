import { Container } from 'inversify';
import { TYPES } from './types';

// Infrastructure layer imports
// Repositories
import { TypeOrmPerfumeRepository } from '@repository/perfume.repository';
import { TypeOrmImageRepository } from '@infrastructure/persistence/typeorm/repositories/image.repository';
import { TypeOrmNoteRepository } from '@infrastructure/persistence/typeorm/repositories/note.repository';
import { dataSource } from "@infrastructure/persistence/typeorm/data-source";

// Application layer imports
// Use cases
import { GetPerfumesByCategoryUseCase } from '@use-case/perfume/get-perfumes-by-category.use-case';
import { CreatePerfumeUseCase } from '@application/use-cases/perfume/create-perfume.use-case';

// Presentation layer imports
// Controllers
import { PerfumeController } from '@controller/perfume.controller';
import { TypeOrmProductRepository } from '@typeorm/repositories/product.repository';
import { PerfumeRepositoryAdapter } from '@infrastructure/adapters/perfume.repository.adapter';

export const registerDependencies = (container: Container): void => {
  // Application layer dependencies
  // Use cases
  container.bind<GetPerfumesByCategoryUseCase>(TYPES.GetPerfumesByCategoryUseCase).to(GetPerfumesByCategoryUseCase).inTransientScope();
  container.bind<CreatePerfumeUseCase>(TYPES.CreatePerfumeUseCase).to(CreatePerfumeUseCase).inTransientScope();

  // Infrastructure layer dependencies
  // Adapters
  container.bind<PerfumeRepositoryAdapter>(TYPES.PerfumeRepository).to(PerfumeRepositoryAdapter).inRequestScope();

  // Repositories
  container.bind<TypeOrmProductRepository>(TYPES.TypeOrmProductRepository).to(TypeOrmProductRepository).inRequestScope();
  container.bind<TypeOrmImageRepository>(TYPES.TypeOrmImageRepository).to(TypeOrmImageRepository).inRequestScope();
  container.bind<TypeOrmPerfumeRepository>(TYPES.TypeOrmPerfumeRepository).to(TypeOrmPerfumeRepository).inRequestScope();
  container.bind<TypeOrmNoteRepository>(TYPES.TypeOrmNoteRepository).to(TypeOrmNoteRepository).inRequestScope();

  // Data Sources
  container.bind<typeof dataSource>(TYPES.DataSource).toConstantValue(dataSource);

  // Presentation layer dependencies
  // Controllers
  container.bind<PerfumeController>(TYPES.PerfumeController).to(PerfumeController).inRequestScope();
};








