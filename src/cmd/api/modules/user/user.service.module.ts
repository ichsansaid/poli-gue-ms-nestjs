import { Module } from '@nestjs/common';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { UserService } from 'src/internal/services/user.service';
import { StringUtilsModule } from '../utils/string.utils.module';
import { DokterRepoModule } from '../dokter/dokter.repo.module';
import { UserRepoModule } from './user.repo.module';
import { ApotekerRepoModule } from '../apoteker/apoteker.repo.module';
import { KasirRepoModule } from '../kasir/kasir.repo.module';
import { AdminRepoModule } from '../admin/admin.repo.module';

@Module({
  imports: [
    StringUtilsModule,
    DokterRepoModule,
    UserRepoModule,
    ApotekerRepoModule,
    KasirRepoModule,
    AdminRepoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  exports: [IUserService],
})
export class UserServiceModule {}
