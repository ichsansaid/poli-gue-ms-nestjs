import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InquiryPoliTindakanDto {
  id?: any;
  tindakan_id?: any;
  poli_id?: any;
}

export class CreatePoliTindakanDto {
  poli_id: any;

  @ApiProperty()
  @IsNotEmpty()
  nama_tindakan: string;
}
