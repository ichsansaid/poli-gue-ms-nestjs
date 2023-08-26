import { EntityBase } from 'src/internal/pkg/schema.base';
import { IUserSchema } from './user.schema.interface';

export class IKasirSchema extends EntityBase<IKasirSchema> {
  id: any;
  user_id: any;
  user: IUserSchema;

  constructor(data: Partial<IKasirSchema>) {
    super(data);
  }
}
