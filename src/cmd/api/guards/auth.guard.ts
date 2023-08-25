import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  AuthTypeEnum,
  BearerMetadataTokenDto,
} from 'src/entities/dtos/auth/auth.dto';
import { IAuthService } from 'src/interfaces/services/auth.service.interface';
import {
  InvalidAuthFormatError,
  InvalidAuthTypeError,
  UnavaliableAuthTypeError,
} from 'src/internal/errors/auth.error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthTypeEnum.BEARER)
    private readonly bearer_service: IAuthService<BearerMetadataTokenDto>,
    @Inject(AuthTypeEnum.BASIC)
    private readonly basic_service: IAuthService<any>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      request.headers.authorization === undefined ||
      request.headers.authorization === null
    ) {
      throw new InvalidAuthFormatError();
    }
    const splited = request.headers.authorization.split(' ');
    if (splited.length < 2) {
      throw new InvalidAuthFormatError();
    }
    const auth_type = splited.shift().toUpperCase();
    const auth_token = splited.join(' ');
    const auth_service_type: Record<string, IAuthService<any>> = {
      [AuthTypeEnum.BEARER]: this.bearer_service,
      [AuthTypeEnum.BASIC]: this.basic_service,
    };
    if (!(AuthTypeEnum[auth_type] in auth_service_type)) {
      throw new InvalidAuthTypeError();
    }
    if (auth_service_type[AuthTypeEnum[auth_type]] == undefined) {
      throw new UnavaliableAuthTypeError();
    }
    const auth_service: IAuthService<any> =
      auth_service_type[AuthTypeEnum[auth_type]];
    const [auth_data, error_verify_auth] =
      await auth_service.verifyAuth(auth_token);
    if (error_verify_auth != null) {
      throw error_verify_auth;
    }
    const [, error_verify] = await auth_service.verifyAuthData(auth_data);
    if (error_verify != null) {
      throw error_verify;
    }
    request.user = auth_data;
    return true;
  }
}
