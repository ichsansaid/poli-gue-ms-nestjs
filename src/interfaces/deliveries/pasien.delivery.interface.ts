import {
  CreatePasienDto,
  InquiryPasienDto,
  UpdatePasienDto,
} from 'src/entities/dtos/pasien/pasien.dto';
import { IPasienSchema } from '../schemas/pasien.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { Box } from 'src/internal/pkg/box.base';

export abstract class IPasienDelivery {
  abstract createPasien(
    create: CreatePasienDto,
  ): Promise<[Box<IPasienSchema>, ErrorBase]>;
  abstract updatePasien(
    inquiry: InquiryPasienDto,
    update: UpdatePasienDto,
  ): Promise<[Box<IPasienSchema>, ErrorBase]>;
  abstract getAllPasien(): Promise<[Box<IPasienSchema[]>, ErrorBase]>;
  abstract deletePasien(
    inquiry: InquiryPasienDto,
  ): Promise<[Box<IPasienSchema>, ErrorBase]>;
}
