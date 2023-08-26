import { Module } from '@nestjs/common';
import { AuthTypeEnum } from 'src/entities/dtos/auth/auth.dto';
import { AuthDeliveryModule } from './auth.delivery.module';
import { AuthController } from '../../controllers/auth.controller';

@Module({
  imports: [AuthDeliveryModule],
  controllers: [AuthController],
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
export class AuthModule {}
