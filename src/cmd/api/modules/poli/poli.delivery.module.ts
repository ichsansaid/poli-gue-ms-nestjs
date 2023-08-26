import { Module } from '@nestjs/common';
import { IPoliDelivery } from 'src/interfaces/deliveries/poli.delivery.interface';
import { PoliDelivery } from 'src/internal/deliveries/poli.delivery';
import { GeneralUtilsModule } from '../utils/general.utils.module';
import { PoliServiceModule } from './poli.service.module';

@Module({
  imports: [PoliServiceModule, GeneralUtilsModule],
  providers: [
    {
      provide: IPoliDelivery,
      useClass: PoliDelivery,
    },
  ],
  exports: [IPoliDelivery],
})
export class PoliDeliveryModule {}
