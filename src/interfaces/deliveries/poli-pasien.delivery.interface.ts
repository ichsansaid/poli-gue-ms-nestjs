import {
  AssignDokterDto,
  CreatePoliPasienDto,
  InquiryPoliPasienDto,
} from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IPoliPasienSchema } from '../schemas/poli-pasien.schema.interface';
import { IPasienSchema } from '../schemas/pasien.schema.interface';
import { IDokterSchema } from '../schemas/dokter.schema.interface';

export abstract class IPoliPasienDelivery {
  abstract createNewPasien(
    data: CreatePoliPasienDto,
  ): Promise<[Box<IPoliPasienSchema>, ErrorBase]>;

  abstract deletePasien(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[Box<IPoliPasienSchema>, ErrorBase]>;

  abstract getAllPasien(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[Box<IPasienSchema[]>, ErrorBase]>;

  abstract assignDokter(
    dokter: AssignDokterDto,
  ): Promise<[Box<IPoliPasienSchema>, ErrorBase]>;

  abstract getCurrentDokter(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[Box<IDokterSchema>, ErrorBase]>;
}
