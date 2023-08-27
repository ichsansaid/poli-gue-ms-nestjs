import { ITransactionSchema } from 'src/interfaces/schemas/transaction.schema.interface';
import { Repository } from 'typeorm';

export abstract class ITransactionRepository extends Repository<ITransactionSchema> {
  this: Repository<ITransactionSchema>;
}
