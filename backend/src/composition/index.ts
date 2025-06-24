import { DependencyContainer } from "./container";
import { TYPES } from "./types";

export const dependencyContainer = new DependencyContainer();

export { TYPES };

export const getService = <T>(identifier: symbol): T => {
  return dependencyContainer.get<T>(identifier);
};

