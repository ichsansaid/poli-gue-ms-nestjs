import { Module } from '@nestjs/common';
import { AuthRoleServiceModule } from '../auth/auth-role.service.module';
import { PasienDeliveryModule } from './pasien.delivery.module';
import { AuthVerifyServiceModule } from '../auth/verify/auth-verify.service.module';
import { PasienController } from '../../controllers/pasien.controller';

@Module({
  imports: [
    PasienDeliveryModule,
    AuthVerifyServiceModule,
    AuthRoleServiceModule,
  ],
  controllers: [PasienController],
  providers: [],
  exports: [],
})
export class PasienModule {}
