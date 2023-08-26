import { Module } from '@nestjs/common';
import { AuthRoleServiceModule } from '../auth/auth-role.service.module';
import { TindakanDeliveryModule } from './tindakan.delivery.module';
import { AuthVerifyServiceModule } from '../auth/verify/auth-verify.service.module';
import { TindakanController } from '../../controllers/tindakan.controller';

@Module({
  imports: [
    TindakanDeliveryModule,
    AuthVerifyServiceModule,
    AuthRoleServiceModule,
  ],
  controllers: [TindakanController],
  providers: [],
  exports: [],
})
export class TindakanModule {}
