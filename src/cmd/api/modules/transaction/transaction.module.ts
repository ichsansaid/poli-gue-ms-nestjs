import { Module } from '@nestjs/common';
import { TransactionController } from '../../controllers/transaction.controller';
import { AuthRoleServiceModule } from '../auth/auth-role.service.module';
import { BearerAuthServiceModule } from '../auth/verify/bearer-auth-verify.service.module';
import { BasicAuthServiceModule } from '../auth/verify/basic-auth-verify.service.module';
import { TransactionDeliveryModule } from './transaction.delivery.module';
import { TransactionItemDeliveryModule } from '../transaction-item/transaction-item.delivery.module';
import { TransactionObatDeliveryModule } from '../transaction-obat/transaction-obat.delivery.module';

@Module({
  imports: [
    TransactionDeliveryModule,
    TransactionItemDeliveryModule,
    TransactionObatDeliveryModule,
    BearerAuthServiceModule,
    AuthRoleServiceModule,
    BasicAuthServiceModule,
  ],
  controllers: [TransactionController],
  providers: [],
  exports: [],
})
export class TransactionModule {}
