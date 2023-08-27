import { EntityBase } from 'src/internal/pkg/schema.base';

export class ITransactionSchema extends EntityBase<ITransactionSchema> {
  id?: any;
  transaction_date?: Date;
}
