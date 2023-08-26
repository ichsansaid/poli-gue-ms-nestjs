import { Injectable } from '@nestjs/common';
import { AuthDataDto } from 'src/entities/dtos/auth/auth.dto';
import { EnumUserType } from 'src/entities/dtos/user/user.dto';
import { IAuthRoleService } from 'src/interfaces/services/auth.service.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';

@Injectable()
export class AuthRoleService implements IAuthRoleService {
  async verifyRole(
    auth: AuthDataDto<any>,
    roles: EnumUserType[],
  ): Promise<[boolean, ErrorBase]> {
    const test = {};
    for (const role of auth.user_type) {
      test[role] = true;
    }
    for (const user_role of roles) {
      if (!(user_role in test)) {
        return [false, null];
      }
    }
    return [true, null];
  }
}
