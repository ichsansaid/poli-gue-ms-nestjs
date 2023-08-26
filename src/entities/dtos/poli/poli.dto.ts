import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePasienDto } from '../pasien/pasien.dto';
import { CreateObatDto } from '../obat/obat.dto';

export class CreatePoliDto {
  @ApiProperty()
  @IsNotEmpty()
  nama_poli: string;
}

export class InquiryPoliDto {
  id?: any;
  nama_poli?: string;
}

export class UpdatePoliDto {
  @ApiProperty()
  @IsNotEmpty()
  nama_poli: string;
}

export class RegisterPasienPoliDto {
  id: any;
  pasien: CreatePasienDto;
}

export class RegisterObatPoliDto {
  id: any;
  obat: CreateObatDto;
}
