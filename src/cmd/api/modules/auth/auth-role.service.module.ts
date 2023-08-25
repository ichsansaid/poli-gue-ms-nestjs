import { Module } from '@nestjs/common';
import { AuthRoleService } from 'src/internal/services/auth/auth-role.service';
import { IAuthRoleService } from 'src/interfaces/services/auth.service.interface';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IAuthRoleService,
      useClass: AuthRoleService,
    },
  ],
  exports: [IAuthRoleService],
})
export class AuthRoleServiceModule {}
