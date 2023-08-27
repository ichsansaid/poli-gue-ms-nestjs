import { IStokSchema } from 'src/interfaces/schemas/stok.schema.interface';
import { Repository } from 'typeorm';

export abstract class IStokRepository extends Repository<IStokSchema> {
  this: Repository<IStokSchema>;
}
