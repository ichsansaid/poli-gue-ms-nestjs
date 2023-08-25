import { Module } from '@nestjs/common';
import { IPoliObatService } from 'src/interfaces/services/poli-obat.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliObatService } from 'src/internal/services/poli-obat/poli-obat.service';
import { PoliObatRepoModule } from './pol-obat.repo.module';
import { ObatRepoModule } from '../obat/obat.repo.module';
import { PoliRepoModule } from '../poli/poli.repo.module';

@Module({
  imports: [
    StringUtilsModule,
    PoliObatRepoModule,
    ObatRepoModule,
    PoliRepoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IPoliObatService,
      useClass: PoliObatService,
    },
  ],
  exports: [IPoliObatService],
})
export class PoliObatServiceModule {}
