import { Module } from '@nestjs/common';
import { ITindakanService } from 'src/interfaces/services/tindakan.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { TindakanRepoModule } from './tindakan.repo.module';
import { TindakanService } from 'src/internal/services/tindakan/tindakan.service';

@Module({
  imports: [StringUtilsModule, TindakanRepoModule],
  controllers: [],
  providers: [
    {
      provide: ITindakanService,
      useClass: TindakanService,
    },
  ],
  exports: [ITindakanService],
})
export class TindakanServiceModule {}
