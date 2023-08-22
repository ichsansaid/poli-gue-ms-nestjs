import { ErrorBase } from '../pkg/error.base';

export class ValueError implements ErrorBase {
  constructor(
    public message: string = 'Value error',
    public data: string = null,
  ) {}
}
