import { Global, Module } from '@nestjs/common';
import { UserModule } from './cmd/api/modules/user/user.module';
import { AuthModule } from './cmd/api/modules/auth/auth.module';
import { PoliModule } from './cmd/api/modules/poli/poli.module';
import { ObatModule } from './cmd/api/modules/obat/obat.module';

@Global()
@Module({
  imports: [UserModule, AuthModule, PoliModule, ObatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
