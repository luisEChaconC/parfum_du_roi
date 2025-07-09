import { Container } from 'inversify';
import { TYPES } from './types';

// Infrastructure layer imports
// Repositories
import { TypeOrmUserRepository } from '@repository/user.repository';
import { TypeOrmProductRepository } from '@repository/product.repository';
import { TypeOrmImageRepository } from '@repository/image.repository';
import { TypeOrmPerfumeRepository } from '@repository/perfume.repository';
import { TypeOrmNoteRepository } from '@repository/note.repository';

// Adapters
import { UserRepositoryAdapter } from '@infrastructure/adapters/user.repository.adapter';
import { PerfumeRepositoryAdapter } from '@infrastructure/adapters/perfume.repository.adapter';

// Data source
import { dataSource } from "@typeorm/data-source";

// Application layer imports
// Use cases
import { CreateUserUseCase } from '@use-case/user/create-user.use-case';
import { LogInUseCase } from '@use-case/user/log-in.use-case';
import { GetPerfumesByCategoryUseCase } from '@use-case/perfume/get-perfumes-by-category.use-case';
import { CreatePerfumeUseCase } from '@use-case/perfume/create-perfume.use-case';

// Presentation layer imports
// Controllers
import { AuthController } from '@controller/auth.controller';
import { UserController } from '@controller/user.controller';
import { PerfumeController } from '@controller/perfume.controller';

export const registerDependencies = (container: Container): void => {
  // Application layer dependencies
  // Use cases
  container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase).inTransientScope();
  container.bind<LogInUseCase>(TYPES.LogInUseCase).to(LogInUseCase).inTransientScope();
  container.bind<GetPerfumesByCategoryUseCase>(TYPES.GetPerfumesByCategoryUseCase).to(GetPerfumesByCategoryUseCase).inTransientScope();
  container.bind<CreatePerfumeUseCase>(TYPES.CreatePerfumeUseCase).to(CreatePerfumeUseCase).inTransientScope();

  // Infrastructure layer dependencies
  // Adapters
  container.bind<UserRepositoryAdapter>(TYPES.UserRepository).to(UserRepositoryAdapter).inRequestScope();
  container.bind<PerfumeRepositoryAdapter>(TYPES.PerfumeRepository).to(PerfumeRepositoryAdapter).inRequestScope();

  // Repositories
  container.bind<TypeOrmUserRepository>(TYPES.TypeOrmUserRepository).to(TypeOrmUserRepository).inRequestScope();
  container.bind<TypeOrmProductRepository>(TYPES.TypeOrmProductRepository).to(TypeOrmProductRepository).inRequestScope();
  container.bind<TypeOrmImageRepository>(TYPES.TypeOrmImageRepository).to(TypeOrmImageRepository).inRequestScope();
  container.bind<TypeOrmPerfumeRepository>(TYPES.TypeOrmPerfumeRepository).to(TypeOrmPerfumeRepository).inRequestScope();
  container.bind<TypeOrmNoteRepository>(TYPES.TypeOrmNoteRepository).to(TypeOrmNoteRepository).inRequestScope();

  // Data Source
  container.bind<typeof dataSource>(TYPES.DataSource).toConstantValue(dataSource);

  // Presentation layer dependencies
  // Controllers
  container.bind<AuthController>(TYPES.AuthController).to(AuthController).inRequestScope();
  container.bind<UserController>(TYPES.UserController).to(UserController).inRequestScope();
  container.bind<PerfumeController>(TYPES.PerfumeController).to(PerfumeController).inRequestScope();
};








