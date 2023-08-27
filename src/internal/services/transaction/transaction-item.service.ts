import { Injectable } from '@nestjs/common';
import {
  AddTransactionItemDto,
  InquiryTransactionItemDto,
} from 'src/entities/dtos/transaction-item/transaction-item.dto';
import { ITransactionItemRepository } from 'src/interfaces/repositories/type-orm/transaction-item.repository.interface';
import { ITransactionItemSchema } from 'src/interfaces/schemas/transaction-item.schema.interface';
import { ITransactionItemService } from 'src/interfaces/services/transaction-item.service.interface';
import { ITransactionService } from 'src/interfaces/services/transaction.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { NotFoundError } from 'src/internal/errors/notfound.error';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';

@Injectable()
export class TransactionItemService implements ITransactionItemService {
  constructor(
    private readonly transaction_service: ITransactionService,
    private readonly transaction_item_repo: ITransactionItemRepository,
    private readonly string_utils: IStringUtil,
  ) {}
  async addTransactionItem(
    add: AddTransactionItemDto,
  ): Promise<[ITransactionItemSchema, ErrorBase]> {
    if (add.quantity <= 0) {
      return [, new ValueError('Jumlah tidak bisa kurang dari 1')];
    }
    const [transaction, error_trans] = await this.transaction_service.findById({
      id: add.transaction_id,
    });
    if (error_trans != null) {
      return [, error_trans];
    }
    if (transaction == null) {
      return [, new NotFoundError('Transaction tidak ditemukan')];
    }
    const saved = await this.transaction_item_repo.save({
      id: this.string_utils.hashMd5('transaction_item'),
      ...add,
    });
    return [saved, null];
  }
  async getTransactionItems(
    inquiry: InquiryTransactionItemDto,
  ): Promise<[ITransactionItemSchema[], ErrorBase]> {
    const result = await this.transaction_item_repo.findBy({
      id: inquiry.id,
    });
    return [result, null];
  }
}
