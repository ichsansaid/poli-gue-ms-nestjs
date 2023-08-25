export class CreatePasienDto {
  nama_lengkap: string;
  alamat: string;
}

export class UpdatePasienDto {
  nama_lengkap: string;
  alamat: string;
}

export class InquiryPasienDto {
  id?: any;
  nama_lengkap?: string;
  alamat?: string;
}
