import { IPoliUserSchema } from 'src/interfaces/schemas/poli-user.schema.interface';
import { Repository } from 'typeorm';

export abstract class IPoliUserRepository extends Repository<IPoliUserSchema> {
  this: Repository<IPoliUserSchema>;
}
