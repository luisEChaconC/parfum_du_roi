export const TYPES = {
  // Application Layer
  // Use Cases
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  LogInUseCase: Symbol.for('LogInUseCase'),
  CreateCartUseCase: Symbol.for('CreateCartUseCase'),
  GetCartUseCase: Symbol.for('GetCartUseCase'),
  GetPerfumeByIdUseCase: Symbol.for('GetPerfumeByIdUseCase'),
  GetPerfumesByCategoryUseCase: Symbol.for('GetPerfumesByCategoryUseCase'),
  CreatePerfumeUseCase: Symbol.for('CreatePerfumeUseCase'),

  // Repository Ports
  UserRepository: Symbol.for('UserRepository'),
  CartRepository: Symbol.for('CartRepository'),
  ProductRepository: Symbol.for('ProductRepository'),
  ImageRepository: Symbol.for('ImageRepository'),
  PerfumeRepository: Symbol.for('PerfumeRepository'),
  NoteRepository: Symbol.for('NoteRepository'),

  // Infrastructure Layer
  // Repository Concrete Implementations
  TypeOrmUserRepository: Symbol.for('TypeOrmUserRepository'),
  TypeOrmCartRepository: Symbol.for('TypeOrmCartRepository'),
  TypeOrmProductRepository: Symbol.for('TypeOrmProductRepository'),
  TypeOrmImageRepository: Symbol.for('TypeOrmImageRepository'),
  TypeOrmPerfumeRepository: Symbol.for('TypeOrmPerfumeRepository'),
  TypeOrmNoteRepository: Symbol.for('TypeOrmNoteRepository'),

  // Data Source
  DataSource: Symbol.for('DataSource'),

  // Presentation Layer
  // Controllers
  AuthController: Symbol.for('AuthController'),
  UserController: Symbol.for('UserController'),
  CartController: Symbol.for('CartController'),
  PerfumeController: Symbol.for('PerfumeController'),
};

