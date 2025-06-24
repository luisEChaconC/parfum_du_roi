import { Container } from 'inversify';
import { TYPES } from './types';

// Infrastructure layer imports
// Repositories
import { PerfumeRepository } from '@repository/perfume.repository';

// Application layer imports
// Use cases
import { GetPerfumesByCategoryUseCase } from '@use-case/perfume/get-perfumes-by-category.use-case';

// Presentation layer imports
// Controllers
import { PerfumeController } from '@controller/perfume.controller';

export const registerDependencies = (container: Container): void => {
  // Infrastructure layer dependencies
  // Repositories
  container.bind<PerfumeRepository>(TYPES.PerfumeRepository).to(PerfumeRepository).inRequestScope();

  // Application layer dependencies
  // Use cases
  container.bind<GetPerfumesByCategoryUseCase>(TYPES.GetPerfumesByCategoryUseCase).to(GetPerfumesByCategoryUseCase).inTransientScope();

  // Presentation layer dependencies
  // Controllers
  container.bind<PerfumeController>(TYPES.PerfumeController).to(PerfumeController).inRequestScope();
};








