import { AuthDataDto, LoginDto } from 'src/entities/dtos/auth/auth.dto';
import { ErrorBase } from 'src/internal/pkg/error.base';

export abstract class IAuthService<T> {
  abstract verifyAuth(auth: any): Promise<[AuthDataDto<T>, ErrorBase]>;
  abstract verifyAuthData(login: AuthDataDto<T>): Promise<[boolean, ErrorBase]>;
  abstract generateToken(auth: AuthDataDto<T>): Promise<[string, ErrorBase]>;
  abstract login(login: LoginDto): Promise<[AuthDataDto<T>, ErrorBase]>;
}

export abstract class IAuthRoleService {
  abstract verifyRole(
    auth: AuthDataDto<any>,
    roles: string[],
  ): Promise<[boolean, ErrorBase]>;
}
