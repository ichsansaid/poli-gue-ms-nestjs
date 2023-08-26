import { Module } from '@nestjs/common';
import { AuthRoleServiceModule } from '../auth/auth-role.service.module';
import { ObatDeliveryModule } from './obat.delivery.module';
import { AuthVerifyServiceModule } from '../auth/verify/auth-verify.service.module';
import { ObatController } from '../../controllers/obat.controller';

@Module({
  imports: [ObatDeliveryModule, AuthVerifyServiceModule, AuthRoleServiceModule],
  controllers: [ObatController],
  providers: [],
  exports: [],
})
export class ObatModule {}
