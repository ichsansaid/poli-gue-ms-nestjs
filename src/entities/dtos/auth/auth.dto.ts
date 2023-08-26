import { ApiProperty } from '@nestjs/swagger';
import { EnumUserType } from '../user/user.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum AuthTypeEnum {
  BEARER = 'BEARER_AUTH',
  BASIC = 'BASIC_AUTH',
}

export const AuthSecret = 'A SLkjdasjkl dadlkasadjlak sjdlkasjd ksad';

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AuthTypeEnum)
  token_type: AuthTypeEnum;
}

export class AuthDataDto<T> {
  username: string;
  password: string;
  user_type: EnumUserType[];
  expired_at: Date;
  metadata: T | null;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class BearerMetadataTokenDto {
  client_secret: string;
  client_id: string;
}

export class AuthUserDto {}
