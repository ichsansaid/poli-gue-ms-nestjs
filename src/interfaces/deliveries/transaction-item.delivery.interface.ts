import {
  AddTransactionItemDto,
  InquiryTransactionItemDto,
} from 'src/entities/dtos/transaction-item/transaction-item.dto';
import { ITransactionItemSchema } from '../schemas/transaction-item.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { Box } from 'src/internal/pkg/box.base';

export abstract class ITransactionItemDelivery {
  abstract addTransactionItem(
    add: AddTransactionItemDto,
  ): Promise<[Box<ITransactionItemSchema>, ErrorBase]>;
  abstract getTransactionItems(
    inquiry: InquiryTransactionItemDto,
  ): Promise<[Box<ITransactionItemSchema[]>, ErrorBase]>;
}
