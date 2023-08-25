import { Module } from '@nestjs/common';
import { IPasienDelivery } from 'src/interfaces/deliveries/pasien.delivery.interface';
import { PasienDelivery } from 'src/internal/deliveries/pasien.delivery';
import { GeneralUtilsModule } from '../utils/general.utils.module';
import { PasienServiceModule } from './pasien.service.module';
import { PoliPasienServiceModule } from '../poli-pasien/poli-pasien.service.module';

@Module({
  imports: [PasienServiceModule, GeneralUtilsModule, PoliPasienServiceModule],
  providers: [
    {
      provide: IPasienDelivery,
      useClass: PasienDelivery,
    },
  ],
  exports: [IPasienDelivery],
})
export class PasienDeliveryModule {}
