import {
  AddTransactionItemDto,
  InquiryTransactionItemDto,
} from 'src/entities/dtos/transaction-item/transaction-item.dto';
import { ITransactionItemSchema } from '../schemas/transaction-item.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';

export abstract class ITransactionItemService {
  abstract addTransactionItem(
    add: AddTransactionItemDto,
  ): Promise<[ITransactionItemSchema, ErrorBase]>;
  abstract getTransactionItems(
    inquiry: InquiryTransactionItemDto,
  ): Promise<[ITransactionItemSchema[], ErrorBase]>;
}
