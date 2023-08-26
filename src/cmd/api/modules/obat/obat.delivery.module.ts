import { Module } from '@nestjs/common';
import { IObatDelivery } from 'src/interfaces/deliveries/obat.delivery.interface';
import { ObatDelivery } from 'src/internal/deliveries/obat.delivery';
import { GeneralUtilsModule } from '../utils/general.utils.module';
import { ObatServiceModule } from './obat.service.module';
import { PoliObatServiceModule } from '../poli-obat/poli-obat.service.module';

@Module({
  imports: [ObatServiceModule, GeneralUtilsModule, PoliObatServiceModule],
  providers: [
    {
      provide: IObatDelivery,
      useClass: ObatDelivery,
    },
  ],
  exports: [IObatDelivery],
})
export class ObatDeliveryModule {}
