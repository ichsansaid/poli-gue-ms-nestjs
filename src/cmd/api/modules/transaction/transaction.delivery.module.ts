import { Module } from '@nestjs/common';
import { ITransactionDelivery } from 'src/interfaces/deliveries/transaction.delivery.interface';
import { TransactionDelivery } from 'src/internal/deliveries/transaction.delivery';
import { TransactionServiceModule } from './transaction.service.module';
@Module({
  imports: [TransactionServiceModule],
  providers: [
    {
      provide: ITransactionDelivery,
      useClass: TransactionDelivery,
    },
  ],
  exports: [ITransactionDelivery],
})
export class TransactionDeliveryModule {}
