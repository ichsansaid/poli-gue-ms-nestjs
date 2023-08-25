import {
  AuthDataDto,
  LoginDto,
  TokenDto,
} from 'src/entities/dtos/auth/auth.dto';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';

export abstract class IAuthDelivery {
  abstract login(login: LoginDto): Promise<[Box<TokenDto>, ErrorBase]>;
  abstract verifyToken(
    token: TokenDto,
  ): Promise<[Box<AuthDataDto<any>>, ErrorBase]>;
}
