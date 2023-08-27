import { Global, Module } from '@nestjs/common';
import { UserModule } from './cmd/api/modules/user/user.module';
import { AuthModule } from './cmd/api/modules/auth/auth.module';
import { PoliModule } from './cmd/api/modules/poli/poli.module';
import { ObatModule } from './cmd/api/modules/obat/obat.module';
import { PasienModule } from './cmd/api/modules/pasien/pasien.module';
import { TindakanModule } from './cmd/api/modules/tindakan/tindakan.module';
import { TransactionModule } from './cmd/api/modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    UserModule,
    AuthModule,
    PoliModule,
    ObatModule,
    PasienModule,
    TindakanModule,
    TransactionModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
