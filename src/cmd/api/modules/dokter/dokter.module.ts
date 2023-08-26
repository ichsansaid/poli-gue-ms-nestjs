import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user.controller';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { UserService } from 'src/internal/services/user.service';
import { Repository } from 'typeorm';
import { UserSchema } from 'src/entities/schemas/user.schema';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    { provide: IUserService, useClass: UserService },
    {
      provide: Repository<UserSchema>,
      useFactory: () => {
        return null;
      },
    },
  ],
})
export class UserModule {}
