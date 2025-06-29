export const TYPES = {
  // Application Layer
  // Use Cases
  GetPerfumesByCategoryUseCase: Symbol.for('GetPerfumesByCategoryUseCase'),
  CreatePerfumeUseCase: Symbol.for('CreatePerfumeUseCase'),

  // Repository Ports
  PerfumeRepository: Symbol.for('PerfumeRepository'),

  // Infrastructure Layer
  // Repository Concrete Implementations
  TypeOrmProductRepository: Symbol.for('TypeOrmProductRepository'),
  TypeOrmPerfumeRepository: Symbol.for('TypeOrmPerfumeRepository'),
  TypeOrmImageRepository: Symbol.for('TypeOrmImageRepository'),
  TypeOrmNoteRepository: Symbol.for('TypeOrmNoteRepository'),

  // Data Source
  DataSource: Symbol.for('DataSource'),

  // Presentation Layer
  // Controllers
  PerfumeController: Symbol.for('PerfumeController'),
};

