import { Module } from '@nestjs/common';
import { PoliPasienSchema } from 'src/entities/schemas/poli-pasien.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { PoliPasienRepository } from 'src/internal/repositories/typeorm/poli-pasien.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PoliPasienRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PoliPasienSchema);
      },
    },
  ],
  exports: [PoliPasienRepository],
})
export class PoliPasienRepoModule {}
