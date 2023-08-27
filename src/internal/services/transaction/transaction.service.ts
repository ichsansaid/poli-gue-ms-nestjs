import { Injectable } from '@nestjs/common';
import {
  AddTransactionDto,
  InquiryTransactionDto,
} from 'src/entities/dtos/transaction/transaction.dto';
import { ITransactionRepository } from 'src/interfaces/repositories/type-orm/transaction.repository.interface';
import { ITransactionSchema } from 'src/interfaces/schemas/transaction.schema.interface';
import { ITransactionService } from 'src/interfaces/services/transaction.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    private readonly transaction_repo: ITransactionRepository,
    private readonly string_utils: IStringUtil,
  ) {}
  async inquiry(
    inquiry: InquiryTransactionDto,
  ): Promise<[ITransactionSchema[], ErrorBase]> {
    const result = await this.transaction_repo.findBy(inquiry);
    return [result, null];
  }
  async createTransaction(
    add: AddTransactionDto,
  ): Promise<[ITransactionSchema, ErrorBase]> {
    add.transaction_date = new Date(Date.now());
    const saved = await this.transaction_repo.save({
      id: this.string_utils.hashMd5('transaction'),
      ...add,
    });
    return [saved, null];
  }
  async findById(
    inquiry: InquiryTransactionDto,
  ): Promise<[ITransactionSchema, ErrorBase]> {
    const result = await this.transaction_repo.findOneBy({
      id: inquiry.id,
    });
    return [result, null];
  }
}
