import { Injectable } from '@nestjs/common';
import { AddTransactionObatDto } from 'src/entities/dtos/transaction-obat/transaction-obat.dto';
import { ITransactionItemSchema } from 'src/interfaces/schemas/transaction-item.schema.interface';
import { IObatService } from 'src/interfaces/services/obat.service.interface';
import { ITransactionItemService } from 'src/interfaces/services/transaction-item.service.interface';
import { ITransactionObatService } from 'src/interfaces/services/transaction-obat.service.interface';
import { NotFoundError } from 'src/internal/errors/notfound.error';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';

@Injectable()
export class TransactionObatService implements ITransactionObatService {
  constructor(
    private readonly transaction_item_service: ITransactionItemService,
    private readonly obat_service: IObatService,
  ) {}
  async createTransactionObat(
    add: AddTransactionObatDto,
  ): Promise<[ITransactionItemSchema, ErrorBase]> {
    const [obat, error] = await this.obat_service.findById({
      id: add.obat_id,
    });
    if (error != null) {
      return [, error];
    }
    if (obat == null) {
      return [, new NotFoundError('Obat tidak ditemukan')];
    }
    if (obat.stok < add.quantity) {
      return [, new ValueError('Stok obat tidak mencukupi')];
    }
    obat.stok -= add.quantity;
    const [transaction_item, error_trans] =
      await this.transaction_item_service.addTransactionItem({
        keterangan: 'Transaction Obat : ' + obat.nama_obat,
        price: obat.harga,
        quantity: add.quantity,
        transaction_id: add.transaction_id,
      });

    if (error_trans != null) {
      return [, error_trans];
    }
    const [, error_obat] = await this.obat_service.updateObatById(
      {
        id: obat.id,
      },
      {
        harga: obat.harga,
      },
    );
    if (error_obat != null) {
      return [, new ValueError('Obat gagal diperbaharui')];
    }
    return [transaction_item, null];
  }
}
