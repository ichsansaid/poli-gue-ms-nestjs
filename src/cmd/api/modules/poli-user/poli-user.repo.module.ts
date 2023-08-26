import { Module } from '@nestjs/common';
import { PoliUserSchema } from 'src/entities/schemas/poli-user.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { IPoliUserRepository } from 'src/interfaces/repositories/type-orm/poli-user.repository.interface';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IPoliUserRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(PoliUserSchema);
      },
    },
  ],
  exports: [IPoliUserRepository],
})
export class PoliUserRepoModule {}
