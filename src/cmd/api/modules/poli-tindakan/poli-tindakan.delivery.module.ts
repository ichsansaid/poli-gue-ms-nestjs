import { Module } from '@nestjs/common';
import { IPoliTindakanDelivery } from 'src/interfaces/deliveries/poli-tindakan.delivery.interface';
import { PoliTindakanDelivery } from 'src/internal/deliveries/poli-tindakan.delivery';
import { TindakanServiceModule } from '../tindakan/tindakan.service.module';
import { PoliTindakanServiceModule } from './poli-tindakan.service.module';

@Module({
  imports: [TindakanServiceModule, PoliTindakanServiceModule],
  providers: [
    {
      provide: IPoliTindakanDelivery,
      useClass: PoliTindakanDelivery,
    },
  ],
  exports: [IPoliTindakanDelivery],
})
export class PoliTindakanDeliveryModule {}
