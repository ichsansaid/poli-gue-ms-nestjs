import { Module } from '@nestjs/common';
import { IObatService } from 'src/interfaces/services/obat.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { ObatRepoModule } from './obat.repo.module';
import { ObatService } from 'src/internal/services/obat/obat.service';

@Module({
  imports: [StringUtilsModule, ObatRepoModule],
  controllers: [],
  providers: [
    {
      provide: IObatService,
      useClass: ObatService,
    },
  ],
  exports: [IObatService],
})
export class ObatServiceModule {}
