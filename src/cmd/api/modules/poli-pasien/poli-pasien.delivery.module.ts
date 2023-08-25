import { Module } from '@nestjs/common';
import { IPoliPasienDelivery } from 'src/interfaces/deliveries/poli-pasien.delivery.interface';
import { PoliPasienDelivery } from 'src/internal/deliveries/poli-pasien.delivery';
import { PasienServiceModule } from '../pasien/pasien.service.module';
import { PoliPasienServiceModule } from './poli-pasien.service.module';

@Module({
  imports: [PasienServiceModule, PoliPasienServiceModule],
  providers: [
    {
      provide: IPoliPasienDelivery,
      useClass: PoliPasienDelivery,
    },
  ],
  exports: [IPoliPasienDelivery],
})
export class PoliPasienDeliveryModule {}
