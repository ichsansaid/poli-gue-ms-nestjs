import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class InquiryPoliObatDto {
  id?: any;
  obat_id?: any;
  poli_id?: any;
}

export class CreatePoliObatDto {
  poli_id: any;

  @ApiProperty()
  @IsNotEmpty()
  nama_obat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  harga: number;
}
