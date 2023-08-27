import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddTransactionObatDto } from 'src/entities/dtos/transaction-obat/transaction-obat.dto';
import { ITransactionItemDelivery } from 'src/interfaces/deliveries/transaction-item.delivery.interface';
import { ITransactionObatDelivery } from 'src/interfaces/deliveries/transaction-obat.delivery.interface';
import { ITransactionDelivery } from 'src/interfaces/deliveries/transaction.delivery.interface';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transaction_delivery: ITransactionDelivery,
    private readonly transaction_obat_delivery: ITransactionObatDelivery,
    private readonly transaction_item_delivery: ITransactionItemDelivery,
  ) {}

  @Get('')
  async getAllTransaction(): Promise<any> {
    const [result] = await this.transaction_delivery.getAllTransaction();
    return result;
  }

  @Post('')
  async createTransaction(): Promise<any> {
    const [result] = await this.transaction_delivery.createTransaction({});
    return result;
  }

  @Get(':id/items')
  async getTransactionItems(
    @Param('id')
    id: string,
  ): Promise<any> {
    const [result] = await this.transaction_item_delivery.getTransactionItems({
      transaction_id: id,
    });
    return result;
  }

  @Post(':id/obat')
  async addTransactionObat(
    @Param('id')
    id: string,
    @Body()
    add: AddTransactionObatDto,
  ): Promise<any> {
    const [result] = await this.transaction_obat_delivery.createTransactionObat(
      { ...add, transaction_id: id },
    );
    return result;
  }
}
