import { Module } from '@nestjs/common';
import { ITransactionService } from 'src/interfaces/services/transaction.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { TransactionRepoModule } from './transaction.repo.module';
import { TransactionService } from 'src/internal/services/transaction/transaction.service';

@Module({
  imports: [StringUtilsModule, TransactionRepoModule],
  controllers: [],
  providers: [
    {
      provide: ITransactionService,
      useClass: TransactionService,
    },
  ],
  exports: [ITransactionService],
})
export class TransactionServiceModule {}
