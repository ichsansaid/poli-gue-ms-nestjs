import { ErrorBase } from '../pkg/error.base';

export class ValueError extends ErrorBase {
  constructor(
    public message: string = 'Value error',
    public data: string = null,
  ) {
    super();
  }
}
