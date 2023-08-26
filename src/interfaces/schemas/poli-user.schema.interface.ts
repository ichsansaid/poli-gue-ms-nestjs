import { IPoliSchema } from './poli.schema.interface';
import { IUserSchema } from './user.schema.interface';

export abstract class IPoliUserSchema {
  id?: any;
  user_id: any;
  poli_id: any;

  poli?: IPoliSchema;
  dokter?: IUserSchema;
}
