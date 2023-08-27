import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateObatDto {
  @ApiProperty()
  @IsNotEmpty()
  nama_obat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  harga: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stok: number;
}

export class UpdateObatDto {
  @ApiProperty()
  @IsNotEmpty()
  nama_obat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  harga: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stok: number;
}

export class InquiryObatDto {
  id?: any;
  nama_obat?: string;
  poli_id?: string;
}
