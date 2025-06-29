import { TypeormStore } from "connect-typeorm";
import { dataSource } from "./data-source";
import { SessionModel } from "@model/session.model";

export function createSessionStore() {
  return new TypeormStore().connect(dataSource.getRepository(SessionModel));
}