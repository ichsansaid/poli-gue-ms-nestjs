import { Module } from '@nestjs/common';
import { BearerAuthServiceModule } from './bearer-auth-verify.service.module';
import { IAuthDelivery } from 'src/interfaces/deliveries/auth.delivery.interface';
import { AuthDelivery } from 'src/internal/deliveries/auth.delivery';

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
