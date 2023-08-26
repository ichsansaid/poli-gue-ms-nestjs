import { IPoliUserSchema } from 'src/interfaces/schemas/poli-user.schema.interface';
import { Repository } from 'typeorm';

export class PoliUserRepository extends Repository<IPoliUserSchema> {}
