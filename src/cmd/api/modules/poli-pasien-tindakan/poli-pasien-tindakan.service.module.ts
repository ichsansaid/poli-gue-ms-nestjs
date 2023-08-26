import { Module } from '@nestjs/common';
import { IPoliPasienTindakanService } from 'src/interfaces/services/poli-pasien-tindakan.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliPasienTindakanService } from 'src/internal/services/poli-pasien-tindakan/poli-pasien-tindakan.service';
import { PoliPasienTindakanRepoModule } from './poli-pasien-tindakan.repo.module';
import { TindakanServiceModule } from '../tindakan/tindakan.service.module';
import { PoliPasienServiceModule } from '../poli-pasien/poli-pasien.service.module';
import { PoliTindakanServiceModule } from '../poli-tindakan/poli-tindakan.service.module';

@Module({
  imports: [
    StringUtilsModule,
    PoliPasienServiceModule,
    TindakanServiceModule,
    PoliPasienTindakanRepoModule,
    PoliTindakanServiceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IPoliPasienTindakanService,
      useClass: PoliPasienTindakanService,
    },
  ],
  exports: [IPoliPasienTindakanService],
})
export class PoliPasienTindakanServiceModule {}
