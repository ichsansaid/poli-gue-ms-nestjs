export enum EnumStokStatus {
  HOLD = 'hold',
  FREE = 'free',
}

export interface AddStokIn {
  quantity: number;
  keterangan: string;
}

export interface AddStokOut {
  quantity: number;
  keterangan: string;
}

export interface InquiryStokDto {
  id?: any;
}
