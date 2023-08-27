import { ErrorBase } from 'src/internal/pkg/error.base';
import { ITransactionItemSchema } from '../schemas/transaction-item.schema.interface';
import { AddTransactionObatDto } from 'src/entities/dtos/transaction-obat/transaction-obat.dto';

export abstract class ITransactionObatService {
  abstract createTransactionObat(
    add: AddTransactionObatDto,
  ): Promise<[ITransactionItemSchema, ErrorBase]>;
}
