export const TYPES = {
  // Application Layer
  // Use Cases
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  LogInUseCase: Symbol.for('LogInUseCase'),
  GetPerfumesByCategoryUseCase: Symbol.for('GetPerfumesByCategoryUseCase'),
  CreatePerfumeUseCase: Symbol.for('CreatePerfumeUseCase'),

  // Repository Ports
  UserRepository: Symbol.for('UserRepository'),
  PerfumeRepository: Symbol.for('PerfumeRepository'),

  // Infrastructure Layer
  // Repository Concrete Implementations
  TypeOrmUserRepository: Symbol.for('TypeOrmUserRepository'),
  TypeOrmProductRepository: Symbol.for('TypeOrmProductRepository'),
  TypeOrmPerfumeRepository: Symbol.for('TypeOrmPerfumeRepository'),
  TypeOrmImageRepository: Symbol.for('TypeOrmImageRepository'),
  TypeOrmNoteRepository: Symbol.for('TypeOrmNoteRepository'),

  // Data Source
  DataSource: Symbol.for('DataSource'),

  // Presentation Layer
  // Controllers
  PerfumeController: Symbol.for('PerfumeController'),
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
};

