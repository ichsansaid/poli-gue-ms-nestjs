import {
  AuthDataDto,
  AuthTypeEnum,
  BearerMetadataTokenDto,
  LoginDto,
  TokenDto,
} from 'src/entities/dtos/auth/auth.dto';
import { IAuthDelivery } from 'src/interfaces/deliveries/auth.delivery.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { IAuthService } from 'src/interfaces/services/auth.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UnavaliableAuthTypeError } from '../errors/auth.error';

@Injectable()
export class AuthDelivery implements IAuthDelivery {
  constructor(
    @Inject(AuthTypeEnum.BEARER)
    private readonly bearer_service: IAuthService<BearerMetadataTokenDto>,
  ) {}
  async verifyToken(
    token: TokenDto,
  ): Promise<[Box<AuthDataDto<BearerMetadataTokenDto>>, ErrorBase]> {
    switch (token.token_type) {
      case AuthTypeEnum.BEARER:
        const [auth_data, error_verify] = await this.bearer_service.verifyAuth(
          token.token,
        );
        if (error_verify) {
          throw error_verify;
        }
        const [, error_verify_data] =
          await this.bearer_service.verifyAuthData(auth_data);
        if (error_verify_data != null) {
          throw error_verify_data;
        }
        return [
          {
            message: 'Token verified',
            data: auth_data,
          },
          null,
        ];
      default:
        throw new UnavaliableAuthTypeError();
    }
  }
  async login(login: LoginDto): Promise<[Box<TokenDto>, ErrorBase]> {
    const [user_login, error] = await this.bearer_service.login(login);
    if (error) {
      throw error;
    }
    const [token, error_token] =
      await this.bearer_service.generateToken(user_login);
    if (error_token) {
      throw error_token;
    }
    const token_dto: TokenDto = {
      token: token,
      token_type: AuthTypeEnum.BEARER,
    };
    return [
      {
        message: 'Login berhasil dilakukan',
        data: token_dto,
      },
      null,
    ];
  }
}
