import {
  AddObatPasienByDokterDto,
  GetObatPasienDto,
  RemoveObatPasienDto,
} from 'src/entities/dtos/poli-pasien-obat/poli-pasien-obat.dto';
import { IPoliPasienObatSchema } from '../schemas/poli-pasien-obat.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IObatSchema } from '../schemas/obat.schema.interface';
import { Box } from 'src/internal/pkg/box.base';

export abstract class IPoliPasienObatDelivery {
  abstract addObat(
    obat: AddObatPasienByDokterDto,
  ): Promise<[Box<IPoliPasienObatSchema>, ErrorBase]>;
  abstract removeObat(
    inquiry: RemoveObatPasienDto,
  ): Promise<[Box<IPoliPasienObatSchema>, ErrorBase]>;
  abstract getAllObat(
    inquiry: GetObatPasienDto,
  ): Promise<[Box<IObatSchema[]>, ErrorBase]>;
}
