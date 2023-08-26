import { Module } from '@nestjs/common';
import { BearerAuthServiceModule } from './bearer-auth-verify.service.module';
import { BasicAuthServiceModule } from './basic-auth-verify.service.module';

@Module({
  imports: [BearerAuthServiceModule, BasicAuthServiceModule],
  controllers: [],
  exports: [BearerAuthServiceModule, BasicAuthServiceModule],
})
export class AuthVerifyServiceModule {}
