import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export interface InquiryPoliPasienObatDto {
  id?: any;
  obat_id?: any;
  poli_pasien_id?: any;
}

export interface RemoveObatPasienDto {
  obat_id?: any;
  poli_id?: any;
  pasien_id?: any;
}

export interface GetObatPasienDto {
  dokter_id?: any;
  obat_id?: any;
  poli_id?: any;
  pasien_id?: any;
}

export interface AddObatPasienByDokterDto {
  dokter_id?: any;
  obat_id?: any;
  poli_id?: any;
  pasien_id?: any;
}

export class ObatPasienDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  obat_id?: string;
}
