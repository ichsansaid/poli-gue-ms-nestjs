import { Module } from '@nestjs/common';
import { TransactionSchema } from 'src/entities/schemas/transaction.schema';
import { ITransactionRepository } from 'src/interfaces/repositories/type-orm/transaction.repository.interface';
import { MainDataSource } from '../../datasources/main.datasource';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ITransactionRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(TransactionSchema);
      },
    },
  ],
  exports: [ITransactionRepository],
})
export class TransactionRepoModule {}
