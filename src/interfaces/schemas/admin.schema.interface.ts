import { EntityBase } from 'src/internal/pkg/schema.base';
import { IUserSchema } from './user.schema.interface';

export class IAdminSchema extends EntityBase<IAdminSchema> {
  id: any;
  user_id: any;
  user: IUserSchema;
}
