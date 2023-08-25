import { Module } from '@nestjs/common';
import { PoliObatSchema } from 'src/entities/schemas/poli-obat.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { PoliObatRepository } from 'src/internal/repositories/typeorm/poli-obat.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PoliObatRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PoliObatSchema);
      },
    },
  ],
  exports: [PoliObatRepository],
})
export class PoliObatRepoModule {}
