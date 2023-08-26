import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user.controller';
import { UserDeliveryModule } from './user.delivery.module';
import { AuthRoleServiceModule } from '../auth/auth-role.service.module';
import { AuthVerifyServiceModule } from '../auth/verify/auth-verify.service.module';

@Module({
  imports: [UserDeliveryModule, AuthVerifyServiceModule, AuthRoleServiceModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
