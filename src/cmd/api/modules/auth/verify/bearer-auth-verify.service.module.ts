import { Module } from '@nestjs/common';
import { AuthSecret, AuthTypeEnum } from 'src/entities/dtos/auth/auth.dto';
import { BearerAuthService } from 'src/internal/services/auth/bearer-auth-verify.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from 'src/entities/config/auth.config';
import { StringUtilsModule } from '../../utils/string.utils.module';
import { UserServiceModule } from '../../user/user.service.module';

@Module({
  imports: [
    UserServiceModule,
    StringUtilsModule,
    JwtModule.register({
      secret: AuthSecret,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: AuthTypeEnum.BEARER,
      useClass: BearerAuthService,
    },
    {
      provide: AuthConfig,
      useValue: {
        auth_duration: 24 * 60 * 60 * 1000,
        auth_secret: AuthSecret,
      },
    },
  ],
  exports: [AuthTypeEnum.BEARER],
})
export class BearerAuthServiceModule {}
