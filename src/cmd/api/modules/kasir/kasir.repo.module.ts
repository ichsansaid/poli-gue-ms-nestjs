import { Module } from '@nestjs/common';
import { KasirSchema } from 'src/entities/schemas/kasir.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { KasirRepository } from 'src/internal/repositories/typeorm/kasir.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: KasirRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(KasirSchema);
      },
    },
  ],
  exports: [KasirRepository],
})
export class KasirRepoModule {}
