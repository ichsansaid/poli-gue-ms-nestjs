import { Module } from '@nestjs/common';
import { IPoliTindakanService } from 'src/interfaces/services/poli-tindakan.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliTindakanService } from 'src/internal/services/poli-tindakan/poli-tindakan.service';
import { PoliTindakanRepoModule } from './poli-tindakan.repo.module';
import { TindakanRepoModule } from '../tindakan/tindakan.repo.module';
import { PoliRepoModule } from '../poli/poli.repo.module';

@Module({
  imports: [
    StringUtilsModule,
    PoliTindakanRepoModule,
    TindakanRepoModule,
    PoliRepoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IPoliTindakanService,
      useClass: PoliTindakanService,
    },
  ],
  exports: [IPoliTindakanService],
})
export class PoliTindakanServiceModule {}
