import { Module } from '@nestjs/common';
import { IPoliUserDelivery } from 'src/interfaces/deliveries/poli-user.delivery.interface';
import { PoliUserDelivery } from 'src/internal/deliveries/poli-user.delivery';
import { UserServiceModule } from '../user/user.service.module';
import { PoliUserServiceModule } from './poli-user.service.module';

@Module({
  imports: [UserServiceModule, PoliUserServiceModule],
  providers: [
    {
      provide: IPoliUserDelivery,
      useClass: PoliUserDelivery,
    },
  ],
  exports: [IPoliUserDelivery],
})
export class PoliUserDeliveryModule {}
