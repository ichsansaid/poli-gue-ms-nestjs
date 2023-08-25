export class CreateObatDto {
  nama_obat: string;
  harga: number;
}

export class InquiryObatDto {
  id?: any;
  nama_obat?: string;
  poli_id?: string;
}
