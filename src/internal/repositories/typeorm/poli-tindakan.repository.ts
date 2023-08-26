import { IPoliTindakanSchema } from 'src/interfaces/schemas/poli-tindakan.schema.interface';
import { Repository } from 'typeorm';

export class PoliTindakanRepository extends Repository<IPoliTindakanSchema> {}
