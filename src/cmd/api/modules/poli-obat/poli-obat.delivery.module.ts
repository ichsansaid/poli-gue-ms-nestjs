import { Module } from '@nestjs/common';
import { IPoliObatDelivery } from 'src/interfaces/deliveries/poli-obat.delivery.interface';
import { PoliObatDelivery } from 'src/internal/deliveries/poli-obat.delivery';
import { ObatServiceModule } from '../obat/obat.service.module';
import { PoliObatServiceModule } from './poli-obat.service.module';

@Module({
  imports: [ObatServiceModule, PoliObatServiceModule],
  providers: [
    {
      provide: IPoliObatDelivery,
      useClass: PoliObatDelivery,
    },
  ],
  exports: [IPoliObatDelivery],
})
export class PoliObatDeliveryModule {}
