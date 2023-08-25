import { Module } from '@nestjs/common';
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliPasienService } from 'src/internal/services/poli-pasien/poli-pasien.service';
import { PoliPasienRepoModule } from './poli-pasien.repo.module';
import { PasienRepoModule } from '../pasien/pasien.repo.module';
import { PoliRepoModule } from '../poli/poli.repo.module';

@Module({
  imports: [
    StringUtilsModule,
    PoliPasienRepoModule,
    PasienRepoModule,
    PoliRepoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IPoliPasienService,
      useClass: PoliPasienService,
    },
  ],
  exports: [IPoliPasienService],
})
export class PoliPasienServiceModule {}
