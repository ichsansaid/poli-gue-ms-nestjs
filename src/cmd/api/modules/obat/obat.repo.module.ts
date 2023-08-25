import { Module } from '@nestjs/common';
import { ObatSchema } from 'src/entities/schemas/obat.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { ObatRepository } from 'src/internal/repositories/typeorm/obat.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ObatRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(ObatSchema);
      },
    },
  ],
  exports: [ObatRepository],
})
export class ObatRepoModule {}
