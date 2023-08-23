import { ErrorBase } from '../pkg/error.base';

export class NotFoundError extends ErrorBase {
  constructor(
    public message: string = 'Data tidak ditemukan',
    public data: string = null,
  ) {
    super();
  }
}
