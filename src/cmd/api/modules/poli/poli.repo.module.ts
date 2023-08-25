import { Module } from '@nestjs/common';
import { PoliSchema } from 'src/entities/schemas/poli.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { PoliRepository } from 'src/internal/repositories/typeorm/poli.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PoliRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PoliSchema);
      },
    },
  ],
  exports: [PoliRepository],
})
export class PoliRepoModule {}
