import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { Repository } from 'typeorm';

export class TindakanRepository extends Repository<ITindakanSchema> {}
