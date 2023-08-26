import { Module } from '@nestjs/common';
import { PoliPasienSchema } from 'src/entities/schemas/poli-pasien.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { PoliPasienRepository } from 'src/internal/repositories/typeorm/poli-pasien.repository';
import { IPoliPasienRepository } from 'src/interfaces/repositories/type-orm/poli-pasien.repository.interface';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IPoliPasienRepository,
      useFactory: async () => {
        return (await MainDataSource())
          .getRepository(PoliPasienSchema)
          .extend(PoliPasienRepository);
      },
    },
  ],
  exports: [IPoliPasienRepository],
})
export class PoliPasienRepoModule {}
