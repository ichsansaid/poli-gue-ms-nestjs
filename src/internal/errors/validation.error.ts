import { ErrorBase } from '../pkg/error.base';

export class ValidationError implements ErrorBase {
  constructor(
    public message: string = 'Value error',
    public data: any[] = null,
  ) {}
}
