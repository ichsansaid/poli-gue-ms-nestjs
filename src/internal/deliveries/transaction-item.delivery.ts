import {
  AddTransactionItemDto,
  InquiryTransactionItemDto,
} from 'src/entities/dtos/transaction-item/transaction-item.dto';
import { ITransactionItemDelivery } from 'src/interfaces/deliveries/transaction-item.delivery.interface';
import { ITransactionItemSchema } from 'src/interfaces/schemas/transaction-item.schema.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { ITransactionItemService } from 'src/interfaces/services/transaction-item.service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionItemDelivery implements ITransactionItemDelivery {
  constructor(
    private readonly transaction_item_service: ITransactionItemService,
  ) {}
  async addTransactionItem(
    add: AddTransactionItemDto,
  ): Promise<[Box<ITransactionItemSchema>, ErrorBase]> {
    const [result, error] =
      await this.transaction_item_service.addTransactionItem(add);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Item transaksi berhasil ditambahkan',
        data: result,
      },
      null,
    ];
  }
  async getTransactionItems(
    inquiry: InquiryTransactionItemDto,
  ): Promise<[Box<ITransactionItemSchema[]>, ErrorBase]> {
    const [result, error] =
      await this.transaction_item_service.getTransactionItems(inquiry);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Item transaksi berhasil didapatkan',
        data: result,
      },
      null,
    ];
  }
}
