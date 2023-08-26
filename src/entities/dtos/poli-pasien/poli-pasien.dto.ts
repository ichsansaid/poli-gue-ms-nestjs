import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export enum PoliPasienStatus {
  WAITING = 'waiting',
  PROGRESS = 'progress',
  DONE = 'done',
  CANCEL = 'cancel',
}

export class InquiryPoliPasienDto {
  id?: any;
  pasien_id?: any;
  poli_id?: any;
  dokter_id?: any;
  status?: PoliPasienStatus;
}

export class AssignDokterDto {
  pasien_id?: any;
  poli_id?: any;
  dokter_id?: any;
}

export class FilterPoliPasienBy {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEnum(PoliPasienStatus)
  status?: PoliPasienStatus;
}

export class GetPoliPasienDokterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  pasien_id?: any;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  poli_id?: any;
}

export class AssignDokterIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  dokter_id?: string;
}

export class CreatePoliPasienDto {
  poli_id: any;

  @ApiProperty()
  @IsNotEmpty()
  nama_lengkap: string;

  @ApiProperty()
  @IsNotEmpty()
  alamat: string;
}
