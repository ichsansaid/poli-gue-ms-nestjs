import { Module } from '@nestjs/common';
import { ITransactionItemDelivery } from 'src/interfaces/deliveries/transaction-item.delivery.interface';
import { TransactionItemDelivery } from 'src/internal/deliveries/transaction-item.delivery';
import { TransactionItemServiceModule } from './transaction-item.service.module';
@Module({
  imports: [TransactionItemServiceModule],
  providers: [
    {
      provide: ITransactionItemDelivery,
      useClass: TransactionItemDelivery,
    },
  ],
  exports: [ITransactionItemDelivery],
})
export class TransactionItemDeliveryModule {}
