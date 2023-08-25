import { Module } from '@nestjs/common';
import { ApotekerSchema } from 'src/entities/schemas/apoteker.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { ApotekerRepository } from 'src/internal/repositories/typeorm/apoteker.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ApotekerRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(ApotekerSchema);
      },
    },
  ],
  exports: [ApotekerRepository],
})
export class ApotekerRepoModule {}
