import { Container } from 'inversify';
import { registerDependencies } from './dependencies';

export class DependencyContainer {
  private readonly _container: Container;

  constructor() {
    this._container = new Container({
      defaultScope: 'Transient',
    });

    this.registerAllDependencies();
  }

  private registerAllDependencies(): void {
    registerDependencies(this._container);
  }

  public get<T>(identifier: symbol): T {
    return this._container.get<T>(identifier);
  }

  public get container(): Container {
    return this._container;
  }
}
