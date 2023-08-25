import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum EnumUserType {
  ADMIN = 'admin',
  DOKTER = 'dokter',
  APOTEKER = 'apoteker',
  KASIR = 'kasir',
  BASIC = 'basic',
}

export class InquiryUserDto {
  id?: any;
  nama_lengkap?: string;
  username?: string;
  user_type?: EnumUserType;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EnumUserType)
  user_type: EnumUserType;

  @ApiProperty()
  @IsNotEmpty()
  nama_lengkap: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  nama_lengkap: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
