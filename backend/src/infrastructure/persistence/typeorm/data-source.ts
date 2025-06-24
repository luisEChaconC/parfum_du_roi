import { DataSource, DataSourceOptions } from "typeorm";
import { databaseConfig } from "@infrastructure/config/database.config";
import { PerfumeModel } from "./models/perfume.model";
import { ProductModel } from "./models/product.model";
import { ImageModel } from "./models/image.model";
import { NoteModel } from "./models/note.model";

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [PerfumeModel, ProductModel, ImageModel, NoteModel],
  synchronize: true,
  logging: false,
};

export const dataSource = new DataSource(dataSourceOptions);