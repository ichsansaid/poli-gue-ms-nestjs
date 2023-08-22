import { ErrorBase } from '../pkg/error.base';

export class NotFoundError implements ErrorBase {
  constructor(
    public message: string = 'Data tidak ditemukan',
    public data: string = null,
  ) {}
}
