import { ErrorBase } from '../pkg/error.base';

export class InvalidAuthTypeError extends ErrorBase {
  constructor(
    public message: string = 'Auth Type tidak ditemukan',
    public data: string = null,
  ) {
    super();
  }
}

export class InvalidAuthFormatError extends ErrorBase {
  constructor(
    public message: string = 'Format auth tidak sesuai',
    public data: string = null,
  ) {
    super();
  }
}

export class UnavaliableAuthTypeError extends ErrorBase {
  constructor(
    public message: string = 'Auth Type tidak tersedia',
    public data: string = null,
  ) {
    super();
  }
}

export class InvalidAuthTokenError extends ErrorBase {
  constructor(
    public message: string = 'Token tidak tersedia',
    public data: string = null,
  ) {
    super();
  }
}

export class InvalidAuthDataError extends ErrorBase {
  constructor(
    public message: string = 'Auth data tidak valid',
    public data: string = null,
  ) {
    super();
  }
}

export class ExpiredAuthError extends ErrorBase {
  constructor(
    public message: string = 'Auth telah expired',
    public data: string = null,
  ) {
    super();
  }
}

export class UnauthorizedError extends ErrorBase {
  constructor(
    public message: string = 'Unauthorized Error',
    public data: string = null,
  ) {
    super();
  }
}

export class ForbiddenError extends ErrorBase {
  constructor(
    public message: string = "You don't have permissions",
    public data: string = null,
  ) {
    super();
  }
}
