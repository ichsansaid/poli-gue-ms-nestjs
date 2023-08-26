import { IObatSchema } from 'src/interfaces/schemas/obat.schema.interface';
import { Repository } from 'typeorm';

export class ObatRepository extends Repository<IObatSchema> {}
