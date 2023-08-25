import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user.controller';
import { UserDeliveryModule } from './user.delivery.module';
import { AuthTypeEnum } from 'src/entities/dtos/auth/auth.dto';
import { BearerAuthServiceModule } from '../auth/bearer-auth-verify.service.module';
import { AuthRoleServiceModule } from '../auth/auth-role.service.module';

@Module({
  imports: [UserDeliveryModule, BearerAuthServiceModule, AuthRoleServiceModule],
  controllers: [UserController],
  providers: [
    {
      provide: AuthTypeEnum.BASIC,
      useFactory() {
        return null;
      },
    },
  ],
  exports: [],
})
export class UserModule {}
