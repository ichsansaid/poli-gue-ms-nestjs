export class AddTransactionItemDto {
  transaction_id?: any;
  price?: number;
  quantity?: number;
  keterangan?: string;
}

export class InquiryTransactionItemDto {
  id?: any;
  transaction_id?: any;
}
