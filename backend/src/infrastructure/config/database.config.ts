import 'dotenv/config';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const getDatabaseConfig = (): DatabaseConfig => {
  const port = parseInt(process.env.DB_PORT as string, 10);
  const host = process.env.DB_HOST;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

  if (isNaN(port)) {
    throw new Error('Environment variable DB_PORT is not a valid number.');
  }

  if (!host) {
    throw new Error('Environment variable DB_HOST is not set.');
  }
  
  if (!username) {
    throw new Error('Environment variable DB_USERNAME is not set.');
  }

  if (!password) {
    throw new Error('Environment variable DB_PASSWORD is not set.');
  }

  if (!database) {
    throw new Error('Environment variable DB_DATABASE is not set.');
  }

  return {
    host,
    port,
    username,
    password,
    database,
  };
};

export const databaseConfig = getDatabaseConfig();