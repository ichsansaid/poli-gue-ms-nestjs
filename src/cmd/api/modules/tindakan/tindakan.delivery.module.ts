import { Module } from '@nestjs/common';
import { ITindakanDelivery } from 'src/interfaces/deliveries/tindakan.delivery.interface';
import { TindakanDelivery } from 'src/internal/deliveries/tindakan.delivery';
import { GeneralUtilsModule } from '../utils/general.utils.module';
import { TindakanServiceModule } from './tindakan.service.module';
import { PoliTindakanServiceModule } from '../poli-tindakan/poli-tindakan.service.module';

@Module({
  imports: [
    TindakanServiceModule,
    GeneralUtilsModule,
    PoliTindakanServiceModule,
  ],
  providers: [
    {
      provide: ITindakanDelivery,
      useClass: TindakanDelivery,
    },
  ],
  exports: [ITindakanDelivery],
})
export class TindakanDeliveryModule {}
