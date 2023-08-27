import { Module } from '@nestjs/common';
import { ITransactionObatDelivery } from 'src/interfaces/deliveries/transaction-obat.delivery.interface';
import { TransactionObatDelivery } from 'src/internal/deliveries/transaction-obat.delivery';
import { TransactionObatServiceModule } from './transaction-obat.service.module';
@Module({
  imports: [TransactionObatServiceModule],
  providers: [
    {
      provide: ITransactionObatDelivery,
      useClass: TransactionObatDelivery,
    },
  ],
  exports: [ITransactionObatDelivery],
})
export class TransactionObatDeliveryModule {}
