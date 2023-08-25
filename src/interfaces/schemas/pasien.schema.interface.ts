import { EntityBase } from 'src/internal/pkg/schema.base';

export class IPasienSchema extends EntityBase<IPasienSchema> {
  id?: any;
  nama_lengkap: string;
  alamat: string;
}
