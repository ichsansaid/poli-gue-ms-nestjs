import { Module } from '@nestjs/common';
import { StringUtilsModule } from '../../utils/string.utils.module';
import { UserServiceModule } from '../../user/user.service.module';
import { AuthSecret, AuthTypeEnum } from 'src/entities/dtos/auth/auth.dto';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from 'src/entities/config/auth.config';

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
      provide: AuthTypeEnum.BASIC,
      useFactory() {
        return null;
      },
    },
    {
      provide: AuthConfig,
      useValue: {
        auth_duration: 24 * 60 * 60 * 1000,
        auth_secret: AuthSecret,
      },
    },
  ],
  exports: [AuthTypeEnum.BASIC],
})
export class BasicAuthServiceModule {}
