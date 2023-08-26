import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { EnumUserType } from '../user/user.dto';

export class InquiryPoliUserDto {
  id?: any;
  user_id?: any;
  poli_id?: any;
}

export class CreatePoliUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}

export class FilterPoliUser {
  @ApiProperty()
  @IsOptional()
  @IsEnum(EnumUserType)
  status?: EnumUserType;
}
