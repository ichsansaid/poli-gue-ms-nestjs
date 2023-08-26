import { Module } from '@nestjs/common';
import { IPoliPasienObatDelivery } from 'src/interfaces/deliveries/poli-pasien-obat.delivery.interface';
import { PoliPasienObatDelivery } from 'src/internal/deliveries/poli-pasien-obat.delivery';
import { PoliPasienObatServiceModule } from './poli-pasien-obat.service.module';

@Module({
  imports: [PoliPasienObatServiceModule],
  providers: [
    {
      provide: IPoliPasienObatDelivery,
      useClass: PoliPasienObatDelivery,
    },
  ],
  exports: [IPoliPasienObatDelivery],
})
export class PoliPasienObatDeliveryModule {}
