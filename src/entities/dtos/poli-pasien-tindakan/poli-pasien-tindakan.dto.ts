import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export interface InquiryPoliPasienTindakanDto {
  id?: any;
  tindakan_id?: any;
  poli_pasien_id?: any;
}

export interface RemoveTindakanPasienDto {
  tindakan_id?: any;
  poli_id?: any;
  pasien_id?: any;
}

export interface GetTindakanPasienDto {
  dokter_id?: any;
  tindakan_id?: any;
  poli_id?: any;
  pasien_id?: any;
}

export interface AddTindakanPasienByDokterDto {
  dokter_id?: any;
  tindakan_id?: any;
  poli_id?: any;
  pasien_id?: any;
}

export class TindakanPasienDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  tindakan_id?: string;
}
