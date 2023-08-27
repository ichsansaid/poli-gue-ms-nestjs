import { Module } from '@nestjs/common';
import { ITransactionObatService } from 'src/interfaces/services/transaction-obat.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { TransactionObatService } from 'src/internal/services/transaction/transaction-obat.service';
import { TransactionItemServiceModule } from '../transaction-item/transaction-item.service.module';
import { ObatServiceModule } from '../obat/obat.service.module';

@Module({
  imports: [StringUtilsModule, ObatServiceModule, TransactionItemServiceModule],
  controllers: [],
  providers: [
    {
      provide: ITransactionObatService,
      useClass: TransactionObatService,
    },
  ],
  exports: [ITransactionObatService],
})
export class TransactionObatServiceModule {}
