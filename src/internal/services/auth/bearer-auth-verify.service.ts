import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthDataDto,
  BearerMetadataTokenDto,
  LoginDto,
} from 'src/entities/dtos/auth/auth.dto';
import { EnumUserType } from 'src/entities/dtos/user/user.dto';
import { AuthConfig } from 'src/entities/config/auth.config';
import { IAdminSchema } from 'src/interfaces/schemas/admin.schema.interface';
import { IApotekerSchema } from 'src/interfaces/schemas/apoteker.schema.interface';
import { IDokterSchema } from 'src/interfaces/schemas/dokter.schema.interface';
import { IKasirSchema } from 'src/interfaces/schemas/kasir.schema.interface';
import { IAuthService } from 'src/interfaces/services/auth.service.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { UnauthorizedError } from 'src/internal/errors/auth.error';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';

@Injectable()
export class BearerAuthService implements IAuthService<BearerMetadataTokenDto> {
  constructor(
    private readonly jwt_service: JwtService,
    private readonly user_service: IUserService,
    private readonly string_utils: IStringUtil,
    private readonly auth_config: AuthConfig,
  ) {}
  async generateToken(
    auth: AuthDataDto<BearerMetadataTokenDto>,
  ): Promise<[string, ErrorBase]> {
    const token = await this.jwt_service.signAsync(auth);
    return [token, null];
  }
  async login(
    login: LoginDto,
  ): Promise<[AuthDataDto<BearerMetadataTokenDto>, ErrorBase]> {
    const [user, error] = await this.user_service.findByUsername({
      username: login.username,
    });
    if (error || user == null) {
      return [, new ValueError('Username atau password salah')];
    }
    if (!(await this.user_service.isSamePassword(user, login.password))) {
      return [, new ValueError('Username atau password salah')];
    }
    const [user_roles, error_inquiry] = await this.user_service.getUserRole({
      id: user.id,
    });
    if (error_inquiry != null) {
      return [, error_inquiry];
    }
    const user_types: EnumUserType[] = [];
    for (const role of user_roles) {
      let user_type: EnumUserType = null;
      if (role instanceof IDokterSchema) {
        user_type = EnumUserType.DOKTER;
      } else if (role instanceof IApotekerSchema) {
        user_type = EnumUserType.APOTEKER;
      } else if (role instanceof IKasirSchema) {
        user_type = EnumUserType.KASIR;
      } else if (role instanceof IAdminSchema) {
        user_type = EnumUserType.ADMIN;
      }
      if (user_type != null) {
        user_types.push(user_type);
      }
    }
    const date_now = Date.now();
    const date_expired = new Date(date_now + this.auth_config.auth_duration);
    const auth_data: AuthDataDto<BearerMetadataTokenDto> = {
      username: user.username,
      password: await this.string_utils.hashMd5(user.password),
      expired_at: date_expired,
      user_type: user_types,
      metadata: null,
    };
    return [auth_data, null];
  }
  async verifyAuth(
    token: string,
  ): Promise<[AuthDataDto<BearerMetadataTokenDto>, ErrorBase]> {
    try {
      const payload = await this.jwt_service.verifyAsync(token, {
        secret: this.auth_config.auth_secret,
      });
      if (payload == null || payload == undefined) {
        return [, new UnauthorizedError()];
      }
      if (payload.username == null || payload.password == null) {
        return [, new UnauthorizedError()];
      }
      return [
        {
          username: payload.username,
          password: payload.password,
          expired_at: payload.expired_at,
          user_type: [payload.user_type],
          metadata: {
            client_id: payload.client_id,
            client_secret: payload.client_secret,
          },
        },
        null,
      ];
    } catch (exception) {
      return [null, new UnauthorizedError()];
    }
  }
  async verifyAuthData(
    auth_data: AuthDataDto<BearerMetadataTokenDto>,
  ): Promise<[boolean, ErrorBase]> {
    const [user, error_inquiry] = await this.user_service.findByUsername({
      username: auth_data.username,
    });
    if (error_inquiry != null) {
      throw error_inquiry;
    }
    if (user == null) {
      return [false, new UnauthorizedError()];
    }
    const password_hashed = await this.string_utils.hashMd5(user.password);
    if (auth_data.password != password_hashed) {
      return [false, new UnauthorizedError()];
    }
    if (auth_data.expired_at != null) {
      const diff = new Date(auth_data.expired_at).getTime() - Date.now();
      if (diff <= 0) {
        return [false, new UnauthorizedError()];
      }
    }
    return [true, null];
  }
}
