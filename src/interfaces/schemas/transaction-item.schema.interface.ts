import { EntityBase } from 'src/internal/pkg/schema.base';
import { ITransactionSchema } from './transaction.schema.interface';

export class ITransactionItemSchema extends EntityBase<ITransactionItemSchema> {
  id?: any;
  transaction_id: any;
  price: number;
  quantity: number;
  keterangan: string;

  transaction: ITransactionSchema;
}
