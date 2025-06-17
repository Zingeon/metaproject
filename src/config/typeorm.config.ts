import "dotenv/config";
import { registerAs } from "@nestjs/config";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from 'path';

// of course in real project we should use env variables, 
// but for test task we will use hardcoded values
export const typeormConfigOptionsData: PostgresConnectionOptions = {
  type: process.env.DB_TYPE as any || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'localization_metaproject',
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, '..', '**', '*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{js,ts}')],
  migrationsRun: true,
  ssl: process.env.DB_SSL === 'true'
};

export const connectionSource = new DataSource(typeormConfigOptionsData);

export default registerAs("typeorm", () => ({
  ...typeormConfigOptionsData,
  type: 'postgres' as const
}));
