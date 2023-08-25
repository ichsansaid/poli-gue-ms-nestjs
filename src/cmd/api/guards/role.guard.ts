import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthDataDto } from 'src/entities/dtos/auth/auth.dto';
import { EnumUserType } from 'src/entities/dtos/user/user.dto';
import { IAuthRoleService } from 'src/interfaces/services/auth.service.interface';
import {
  ForbiddenError,
  UnauthorizedError,
} from 'src/internal/errors/auth.error';

export const Roles = (...roles: EnumUserType[]) => SetMetadata('roles', roles);

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly auth_role_service: IAuthRoleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<EnumUserType[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user: AuthDataDto<any> = request.user;
    if (user == undefined) {
      throw new UnauthorizedError();
    }
    const [verify, error_verifiy] = await this.auth_role_service.verifyRole(
      user,
      role,
    );
    if (error_verifiy) throw error_verifiy;

    if (!verify) {
      throw new ForbiddenError();
    }
    return true;
  }
}
