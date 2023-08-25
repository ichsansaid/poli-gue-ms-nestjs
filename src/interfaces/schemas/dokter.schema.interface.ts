import { EntityBase } from 'src/internal/pkg/schema.base';
import { IUserSchema } from './user.schema.interface';

export class IDokterSchema extends EntityBase<IDokterSchema> {
  id: any;
  user_id?: any;
  user?: IUserSchema;

  constructor(data: Partial<IDokterSchema>) {
    super(data);
  }
}
