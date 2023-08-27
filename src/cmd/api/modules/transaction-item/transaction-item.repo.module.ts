import { Module } from '@nestjs/common';
import { TransactionItemSchema } from 'src/entities/schemas/transaction-item.schema';
import { ITransactionItemRepository } from 'src/interfaces/repositories/type-orm/transaction-item.repository.interface';
import { MainDataSource } from '../../datasources/main.datasource';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ITransactionItemRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(TransactionItemSchema);
      },
    },
  ],
  exports: [ITransactionItemRepository],
})
export class TransactionItemRepoModule {}
