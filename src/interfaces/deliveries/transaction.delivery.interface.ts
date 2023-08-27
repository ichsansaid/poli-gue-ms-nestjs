import {
  AddTransactionDto,
  InquiryTransactionDto,
} from 'src/entities/dtos/transaction/transaction.dto';
import { ITransactionSchema } from '../schemas/transaction.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { Box } from 'src/internal/pkg/box.base';

export abstract class ITransactionDelivery {
  abstract createTransaction(
    add: AddTransactionDto,
  ): Promise<[Box<ITransactionSchema>, ErrorBase]>;
  abstract findById(
    inquiry: InquiryTransactionDto,
  ): Promise<[Box<ITransactionSchema>, ErrorBase]>;
  abstract getAllTransaction(): Promise<[Box<ITransactionSchema[]>, ErrorBase]>;
}
