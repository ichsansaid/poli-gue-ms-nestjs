import { Module } from '@nestjs/common';
import { ITransactionItemService } from 'src/interfaces/services/transaction-item.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { TransactionItemRepoModule } from './transaction-item.repo.module';
import { TransactionItemService } from 'src/internal/services/transaction/transaction-item.service';
import { TransactionServiceModule } from '../transaction/transaction.service.module';

@Module({
  imports: [
    StringUtilsModule,
    TransactionItemRepoModule,
    TransactionServiceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: ITransactionItemService,
      useClass: TransactionItemService,
    },
  ],
  exports: [ITransactionItemService],
})
export class TransactionItemServiceModule {}
