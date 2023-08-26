import { Module } from '@nestjs/common';
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliPasienService } from 'src/internal/services/poli-pasien/poli-pasien.service';
import { PoliPasienRepoModule } from './poli-pasien.repo.module';
import { PasienRepoModule } from '../pasien/pasien.repo.module';
import { PoliRepoModule } from '../poli/poli.repo.module';
import { DokterRepoModule } from '../dokter/dokter.repo.module';
import { UserRepoModule } from '../user/user.repo.module';
import { UserServiceModule } from '../user/user.service.module';
import { PoliUserRepoModule } from '../poli-user/poli-user.repo.module';

@Module({
  imports: [
    UserServiceModule,
    StringUtilsModule,
    PoliPasienRepoModule,
    PoliUserRepoModule,
    PasienRepoModule,
    PoliRepoModule,
    DokterRepoModule,
    UserRepoModule,
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
