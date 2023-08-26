import { Global, Module } from '@nestjs/common';
import { UserModule } from './cmd/api/modules/user/user.module';
import { AuthModule } from './cmd/api/modules/auth/auth.module';
import { PoliModule } from './cmd/api/modules/poli/poli.module';
import { ObatModule } from './cmd/api/modules/obat/obat.module';
import { PasienModule } from './cmd/api/modules/pasien/pasien.module';
import { TindakanModule } from './cmd/api/modules/tindakan/tindakan.module';

@Global()
@Module({
  imports: [
    UserModule,
    AuthModule,
    PoliModule,
    ObatModule,
    PasienModule,
    TindakanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
