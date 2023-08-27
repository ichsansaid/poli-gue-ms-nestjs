import { ErrorBase } from 'src/internal/pkg/error.base';
import { ITransactionItemSchema } from '../schemas/transaction-item.schema.interface';
import { AddTransactionObatDto } from 'src/entities/dtos/transaction-obat/transaction-obat.dto';
import { Box } from 'src/internal/pkg/box.base';

export abstract class ITransactionObatDelivery {
  abstract createTransactionObat(
    add: AddTransactionObatDto,
  ): Promise<[Box<ITransactionItemSchema>, ErrorBase]>;
}
