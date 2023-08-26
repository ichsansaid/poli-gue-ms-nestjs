import { Module } from '@nestjs/common';
import { IPasienService } from 'src/interfaces/services/pasien.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PasienRepoModule } from './pasien.repo.module';
import { PasienService } from 'src/internal/services/pasien/pasien.service';

@Module({
  imports: [StringUtilsModule, PasienRepoModule],
  controllers: [],
  providers: [
    {
      provide: IPasienService,
      useClass: PasienService,
    },
  ],
  exports: [IPasienService],
})
export class PasienServiceModule {}
