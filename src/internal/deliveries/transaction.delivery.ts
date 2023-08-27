import {
  AddTransactionDto,
  InquiryTransactionDto,
} from 'src/entities/dtos/transaction/transaction.dto';
import { ITransactionSchema } from 'src/interfaces/schemas/transaction.schema.interface';
import { ITransactionDelivery } from 'src/interfaces/deliveries/transaction.delivery.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { Box } from '../pkg/box.base';
import { ITransactionService } from 'src/interfaces/services/transaction.service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionDelivery implements ITransactionDelivery {
  constructor(private readonly transaction_service: ITransactionService) {}
  async getAllTransaction(): Promise<[Box<ITransactionSchema[]>, ErrorBase]> {
    const [result, error] = await this.transaction_service.inquiry({});
    if (error != null) throw error;
    return [{ message: 'Transaction berhasil didapatkan', data: result }, null];
  }
  async createTransaction(
    add: AddTransactionDto,
  ): Promise<[Box<ITransactionSchema>, ErrorBase]> {
    const [result, error] =
      await this.transaction_service.createTransaction(add);
    if (error != null) throw error;
    return [
      { message: 'Transaction berhasil ditambahkan', data: result },
      null,
    ];
  }
  async findById(
    inquiry: InquiryTransactionDto,
  ): Promise<[Box<ITransactionSchema>, ErrorBase]> {
    const [result, error] = await this.transaction_service.findById(inquiry);
    if (error != null) throw error;
    return [{ message: 'Transaction berhasil didapatkan', data: result }, null];
  }
}
