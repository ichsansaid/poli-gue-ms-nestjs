import { Module } from '@nestjs/common';
import { IPoliPasienTindakanDelivery } from 'src/interfaces/deliveries/poli-pasien-tindakan.delivery.interface';
import { PoliPasienTindakanDelivery } from 'src/internal/deliveries/poli-pasien-tindakan.delivery';
import { PoliPasienTindakanServiceModule } from './poli-pasien-tindakan.service.module';

@Module({
  imports: [PoliPasienTindakanServiceModule],
  providers: [
    {
      provide: IPoliPasienTindakanDelivery,
      useClass: PoliPasienTindakanDelivery,
    },
  ],
  exports: [IPoliPasienTindakanDelivery],
})
export class PoliPasienTindakanDeliveryModule {}
