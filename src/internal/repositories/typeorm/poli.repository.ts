import { IPoliSchema } from 'src/interfaces/schemas/poli.schema.interface';
import { Repository } from 'typeorm';

export class PoliRepository extends Repository<IPoliSchema> {}
