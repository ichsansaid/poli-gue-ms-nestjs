export enum ENUM_USER_TYPE {
  ADMIN = 'admin',
  DOKTER = 'dokter',
  APOTEKER = 'apoteker',
  KASIR = 'kasir',
}

export interface InquiryUserDto {
  id: any;
  nama_lengkap: any;
  user_type: ENUM_USER_TYPE;
}
