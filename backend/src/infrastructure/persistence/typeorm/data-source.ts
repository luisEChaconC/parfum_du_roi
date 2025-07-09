import { DataSource, DataSourceOptions } from "typeorm";
import { databaseConfig } from "@infrastructure/config/database.config";
import { UserModel } from "@model/user.models";
import { SessionModel } from "@model/session.model";
import { ProductModel } from "@model/product.model";
import { ImageModel } from "@model/image.model";
import { PerfumeModel } from "@model/perfume.model";
import { NoteModel } from "@model/note.model";

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [UserModel, SessionModel, ProductModel, ImageModel, PerfumeModel, NoteModel],
  synchronize: true,
  logging: false,
  extra: {
    autocommit: false,
    acquireTimeout: 60000,
    timeout: 60000,
  },
};

export const dataSource = new DataSource(dataSourceOptions);