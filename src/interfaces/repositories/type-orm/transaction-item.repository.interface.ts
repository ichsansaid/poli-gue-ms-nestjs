import { ITransactionItemSchema } from 'src/interfaces/schemas/transaction-item.schema.interface';
import { Repository } from 'typeorm';

export abstract class ITransactionItemRepository extends Repository<ITransactionItemSchema> {
  this: Repository<ITransactionItemSchema>;
}
