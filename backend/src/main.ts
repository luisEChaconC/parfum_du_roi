import express, { Request, Response, RequestHandler } from 'express';
import { dataSource } from '@infrastructure/persistence/typeorm/data-source';
import { routes } from "@routes";

const app = express();

dataSource.initialize();

app.use(express.json());

app.use("/api", routes);

// app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
