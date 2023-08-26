import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTindakanDto {
  @ApiProperty()
  @IsNotEmpty()
  nama_tindakan: string;
}

export class UpdateTindakanDto {
  @ApiProperty()
  @IsNotEmpty()
  nama_tindakan: string;
}

export class InquiryTindakanDto {
  id?: any;
  nama_tindakan?: string;
}
