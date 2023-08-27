import { AddTransactionObatDto } from 'src/entities/dtos/transaction-obat/transaction-obat.dto';
import { ITransactionObatDelivery } from 'src/interfaces/deliveries/transaction-obat.delivery.interface';
import { ITransactionItemSchema } from 'src/interfaces/schemas/transaction-item.schema.interface';
import { ErrorBase } from '../pkg/error.base';
import { ITransactionObatService } from 'src/interfaces/services/transaction-obat.service.interface';
import { Box } from '../pkg/box.base';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionObatDelivery implements ITransactionObatDelivery {
  constructor(
    private readonly transaction_obat_service: ITransactionObatService,
  ) {}
  async createTransactionObat(
    add: AddTransactionObatDto,
  ): Promise<[Box<ITransactionItemSchema>, ErrorBase]> {
    const [result, error] =
      await this.transaction_obat_service.createTransactionObat(add);
    if (error != null) {
      throw error;
    }
    return [{ message: 'Obat berhasil ditambahkan', data: result }, null];
  }
}
