import { Module } from '@nestjs/common';
import { PoliPasienTindakanSchema } from 'src/entities/schemas/poli-pasien-tindakan.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { IPoliPasienTindakanRepository } from 'src/interfaces/repositories/type-orm/poli-pasien-tindakan.repository.interface';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IPoliPasienTindakanRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PoliPasienTindakanSchema);
      },
    },
  ],
  exports: [IPoliPasienTindakanRepository],
})
export class PoliPasienTindakanRepoModule {}
