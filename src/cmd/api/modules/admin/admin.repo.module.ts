import { Module } from '@nestjs/common';
import { AdminSchema } from 'src/entities/schemas/admin.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { AdminRepository } from 'src/internal/repositories/typeorm/admin.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: AdminRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(AdminSchema);
      },
    },
  ],
  exports: [AdminRepository],
})
export class AdminRepoModule {}
