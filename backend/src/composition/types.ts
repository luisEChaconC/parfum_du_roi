export const TYPES = {
  // Application Layer
  // Use Cases
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  LogInUseCase: Symbol.for('LogInUseCase'),
  GetPerfumeByIdUseCase: Symbol.for('GetPerfumeByIdUseCase'),
  GetPerfumesByCategoryUseCase: Symbol.for('GetPerfumesByCategoryUseCase'),
  CreatePerfumeUseCase: Symbol.for('CreatePerfumeUseCase'),
  ProcessPaymentUseCase: Symbol.for("ProcessPaymentUseCase"),

  // Repository Ports
  UserRepository: Symbol.for('UserRepository'),
  ImageRepository: Symbol.for('ImageRepository'),
  PerfumeRepository: Symbol.for('PerfumeRepository'),
  NoteRepository: Symbol.for('NoteRepository'),

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
  PaymentValidationController: Symbol.for("PaymentValidationController"),
};

