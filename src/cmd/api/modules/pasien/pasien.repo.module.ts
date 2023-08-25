import { Module } from '@nestjs/common';
import { PasienSchema } from 'src/entities/schemas/pasien.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { PasienRepository } from 'src/internal/repositories/typeorm/pasien.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PasienRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PasienSchema);
      },
    },
  ],
  exports: [PasienRepository],
})
export class PasienRepoModule {}
