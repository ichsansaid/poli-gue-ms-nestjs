import { IPoliObatSchema } from 'src/interfaces/schemas/poli-obat.schema.interface';
import { Repository } from 'typeorm';

export class PoliObatRepository extends Repository<IPoliObatSchema> {}
