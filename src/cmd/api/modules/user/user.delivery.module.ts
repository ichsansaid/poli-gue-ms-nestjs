import { Module } from '@nestjs/common';
import { IUserDelivery } from 'src/interfaces/deliveries/user.delivery.interface';
import { UserDelivery } from 'src/internal/deliveries/user.delivery';
import { GeneralUtilsModule } from '../utils/general.utils.module';
import { UserServiceModule } from './user.service.module';

@Module({
  imports: [UserServiceModule, GeneralUtilsModule],
  providers: [
    {
      provide: IUserDelivery,
      useClass: UserDelivery,
    },
  ],
  exports: [IUserDelivery],
})
export class UserDeliveryModule {}
