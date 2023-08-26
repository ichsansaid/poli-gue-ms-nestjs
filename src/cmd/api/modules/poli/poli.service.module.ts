import { Module } from '@nestjs/common';
import { IPoliService } from 'src/interfaces/services/poli.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliRepoModule } from './poli.repo.module';
import { PoliService } from 'src/internal/services/poli/poli.service';

@Module({
  imports: [StringUtilsModule, PoliRepoModule],
  controllers: [],
  providers: [
    {
      provide: IPoliService,
      useClass: PoliService,
    },
  ],
  exports: [IPoliService],
})
export class PoliServiceModule {}
