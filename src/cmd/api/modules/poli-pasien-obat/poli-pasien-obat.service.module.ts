import { Module } from '@nestjs/common';
import { IPoliPasienObatService } from 'src/interfaces/services/poli-pasien-obat.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliPasienObatService } from 'src/internal/services/poli-pasien-obat/poli-pasien-obat.service';
import { PoliPasienObatRepoModule } from './poli-pasien-obat.repo.module';
import { ObatServiceModule } from '../obat/obat.service.module';
import { PoliPasienServiceModule } from '../poli-pasien/poli-pasien.service.module';

@Module({
  imports: [
    StringUtilsModule,
    PoliPasienServiceModule,
    ObatServiceModule,
    PoliPasienObatRepoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IPoliPasienObatService,
      useClass: PoliPasienObatService,
    },
  ],
  exports: [IPoliPasienObatService],
})
export class PoliPasienObatServiceModule {}
