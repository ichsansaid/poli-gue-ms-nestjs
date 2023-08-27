import { EnumStokStatus } from 'src/entities/dtos/stok/stok.dto';

export abstract class IStokSchema {
  id?: any;
  quantity: number;
  timestamp: Date;
  status: EnumStokStatus;
  keterangan: string;
}
