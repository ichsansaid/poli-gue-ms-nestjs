import { ErrorBase } from 'src/internal/pkg/error.base';
import { IPoliPasienObatSchema } from '../schemas/poli-pasien-obat.schema.interface';
import {
  AddObatPasienByDokterDto,
  GetObatPasienDto,
  RemoveObatPasienDto,
} from 'src/entities/dtos/poli-pasien-obat/poli-pasien-obat.dto';
import { IObatSchema } from '../schemas/obat.schema.interface';

export abstract class IPoliPasienObatService {
  abstract addObat(
    obat: AddObatPasienByDokterDto,
  ): Promise<[IPoliPasienObatSchema, ErrorBase]>;
  abstract removeObat(
    inquiry: RemoveObatPasienDto,
  ): Promise<[IPoliPasienObatSchema, ErrorBase]>;
  abstract getAllObat(
    inquiry: GetObatPasienDto,
  ): Promise<[IObatSchema[], ErrorBase]>;
}
