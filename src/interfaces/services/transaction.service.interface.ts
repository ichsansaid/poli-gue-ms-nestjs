import {
  AddTransactionDto,
  InquiryTransactionDto,
} from 'src/entities/dtos/transaction/transaction.dto';
import { ITransactionSchema } from '../schemas/transaction.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';

export abstract class ITransactionService {
  abstract createTransaction(
    add: AddTransactionDto,
  ): Promise<[ITransactionSchema, ErrorBase]>;
  abstract findById(
    inquiry: InquiryTransactionDto,
  ): Promise<[ITransactionSchema, ErrorBase]>;
  abstract inquiry(
    inquiry: InquiryTransactionDto,
  ): Promise<[ITransactionSchema[], ErrorBase]>;
}
