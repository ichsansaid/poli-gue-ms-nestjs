import { Module } from '@nestjs/common';
import { UserSchema } from 'src/entities/schemas/user.schema';
import { MainDataSource } from '../../datasources/main.datasource';
import { UserRepository } from 'src/internal/repositories/typeorm/user.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useFactory: async () => {
        return (await MainDataSource()).getRepository(UserSchema);
      },
    },
  ],
  exports: [UserRepository],
})
export class UserRepoModule {}
