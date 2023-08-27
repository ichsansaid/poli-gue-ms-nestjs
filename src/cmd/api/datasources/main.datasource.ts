import { join } from 'path';
import { DataSource } from 'typeorm';

export async function MainDataSource() {
  const ds = new DataSource({
    type: 'postgres',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'admin',
    database: process.env.DATABASE_DB_NAME || 'poli_gue',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    logging: true,
    synchronize: true,
    entities: [
      join(__dirname, '..', '..', '..', 'entities', '**', '*.schema.{js,ts}'),
    ],
  });
  await ds.initialize();
  return ds;
}
