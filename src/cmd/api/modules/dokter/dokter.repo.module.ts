import { Module } from '@nestjs/common';
import { DokterSchema } from 'src/entities/schemas/dokter.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { DokterRepository } from 'src/internal/repositories/typeorm/dokter.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: DokterRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(DokterSchema);
      },
    },
  ],
  exports: [DokterRepository],
})
export class DokterRepoModule {}
