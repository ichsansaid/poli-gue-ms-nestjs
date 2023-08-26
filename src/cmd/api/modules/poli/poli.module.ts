import { Module } from '@nestjs/common';
import { PoliController } from '../../controllers/poli.controller';
import { PoliDeliveryModule } from './poli.delivery.module';
import { AuthTypeEnum } from 'src/entities/dtos/auth/auth.dto';
import { AuthRoleServiceModule } from '../auth/auth-role.service.module';
import { PoliObatDeliveryModule } from '../poli-obat/poli-obat.delivery.module';
import { BearerAuthServiceModule } from '../auth/verify/bearer-auth-verify.service.module';
import { PoliPasienDeliveryModule } from '../poli-pasien/poli-pasien.delivery.module';
import { PoliTindakanDeliveryModule } from '../poli-tindakan/poli-tindakan.delivery.module';
import { PoliUserDeliveryModule } from '../poli-user/poli-user.delivery.module';
import { PoliPasienTindakanDeliveryModule } from '../poli-pasien-tindakan/poli-pasien-tindakan.delivery.module';

@Module({
  imports: [
    PoliDeliveryModule,
    PoliObatDeliveryModule,
    PoliPasienDeliveryModule,
    PoliUserDeliveryModule,
    PoliTindakanDeliveryModule,
    PoliPasienTindakanDeliveryModule,
    BearerAuthServiceModule,
    AuthRoleServiceModule,
  ],
  controllers: [PoliController],
  providers: [
    {
      provide: AuthTypeEnum.BASIC,
      useFactory() {
        return null;
      },
    },
  ],
  exports: [],
})
export class PoliModule {}
