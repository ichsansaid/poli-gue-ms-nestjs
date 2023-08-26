import { Module } from '@nestjs/common';
import { IPoliUserService } from 'src/interfaces/services/poli-user.service.interface';
import { StringUtilsModule } from '../utils/string.utils.module';
import { PoliUserService } from 'src/internal/services/poli-user/poli-user.service';
import { PoliUserRepoModule } from './poli-user.repo.module';
import { UserRepoModule } from '../user/user.repo.module';
import { PoliRepoModule } from '../poli/poli.repo.module';

@Module({
  imports: [
    StringUtilsModule,
    PoliUserRepoModule,
    UserRepoModule,
    PoliRepoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IPoliUserService,
      useClass: PoliUserService,
    },
  ],
  exports: [IPoliUserService],
})
export class PoliUserServiceModule {}
