import { Module } from '@nestjs/common';
import { PoliTindakanSchema } from 'src/entities/schemas/poli-tindakan.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { PoliTindakanRepository } from 'src/internal/repositories/typeorm/poli-tindakan.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PoliTindakanRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PoliTindakanSchema);
      },
    },
  ],
  exports: [PoliTindakanRepository],
})
export class PoliTindakanRepoModule {}
