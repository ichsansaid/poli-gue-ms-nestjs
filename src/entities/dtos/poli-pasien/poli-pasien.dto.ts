import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
