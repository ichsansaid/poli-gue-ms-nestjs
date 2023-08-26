import { EntityBase } from 'src/internal/pkg/schema.base';
import { IUserSchema } from './user.schema.interface';

export class IApotekerSchema extends EntityBase<IApotekerSchema> {
  id: any;
  user_id: any;
  user: IUserSchema;

  constructor(data: Partial<IApotekerSchema>) {
    super(data);
  }
}
