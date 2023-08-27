import { ITransactionSchema } from 'src/interfaces/schemas/transaction.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class TransactionSchema extends ITransactionSchema {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column('timestamp')
  transaction_date?: Date;
}
