import { Module } from '@nestjs/common';
import { TindakanSchema } from 'src/entities/schemas/tindakan.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { TindakanRepository } from 'src/internal/repositories/typeorm/tindakan.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: TindakanRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(TindakanSchema);
      },
    },
  ],
  exports: [TindakanRepository],
})
export class TindakanRepoModule {}
