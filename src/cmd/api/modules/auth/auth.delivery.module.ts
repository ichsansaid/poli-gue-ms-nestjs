import { Module } from '@nestjs/common';
import { IAuthDelivery } from 'src/interfaces/deliveries/auth.delivery.interface';
import { AuthDelivery } from 'src/internal/deliveries/auth.delivery';
import { BearerAuthServiceModule } from './verify/bearer-auth-verify.service.module';

@Module({
  imports: [BearerAuthServiceModule],
  controllers: [],
  providers: [
    {
      provide: IAuthDelivery,
      useClass: AuthDelivery,
    },
  ],
  exports: [IAuthDelivery],
})
export class AuthDeliveryModule {}
