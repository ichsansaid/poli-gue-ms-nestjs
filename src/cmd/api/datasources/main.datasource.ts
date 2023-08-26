import { join } from 'path';
import { DataSource } from 'typeorm';

export async function MainDataSource() {
  const ds = new DataSource({
    type: 'postgres',
    username: 'postgres',
    password: 'admin',
    database: 'poli_gue',
    host: 'localhost',
    port: 5432,
    logging: true,
    synchronize: true,
    entities: [
      join(__dirname, '..', '..', '..', 'entities', '**', '*.schema.{js,ts}'),
    ],
  });
  await ds.initialize();
  return ds;
}
