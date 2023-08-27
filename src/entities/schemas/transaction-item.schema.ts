import { ITransactionItemSchema } from 'src/interfaces/schemas/transaction-item.schema.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction_item')
export class TransactionItemSchema extends ITransactionItemSchema {
  @PrimaryGeneratedColumn('uuid')
  id?: any;

  @Column('uuid')
  transaction_id: any;

  @Column('int')
  price: number;

  @Column('int')
  quantity: number;

  @Column('varchar')
  keterangan: string;
}
