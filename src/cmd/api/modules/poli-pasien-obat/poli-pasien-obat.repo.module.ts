import { Module } from '@nestjs/common';
import { PoliPasienObatSchema } from 'src/entities/schemas/poli-pasien-obat.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { IPoliPasienObatRepository } from 'src/interfaces/repositories/type-orm/poli-pasien-obat.repository.interface';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IPoliPasienObatRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PoliPasienObatSchema);
      },
    },
  ],
  exports: [IPoliPasienObatRepository],
})
export class PoliPasienObatRepoModule {}
