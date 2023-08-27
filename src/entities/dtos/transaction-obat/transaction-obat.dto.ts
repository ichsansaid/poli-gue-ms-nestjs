import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class AddTransactionObatDto {
  transaction_id?: any;
  price?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity?: number;

  keterangan?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  obat_id?: string;
}
