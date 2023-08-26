import { ErrorBase } from 'src/internal/pkg/error.base';
import { IPoliPasienTindakanSchema } from '../schemas/poli-pasien-tindakan.schema.interface';
import {
  AddTindakanPasienByDokterDto,
  GetTindakanPasienDto,
  RemoveTindakanPasienDto,
} from 'src/entities/dtos/poli-pasien-tindakan/poli-pasien-tindakan.dto';
import { ITindakanSchema } from '../schemas/tindakan.schema.interface';

export abstract class IPoliPasienTindakanService {
  abstract addTindakan(
    tindakan: AddTindakanPasienByDokterDto,
  ): Promise<[IPoliPasienTindakanSchema, ErrorBase]>;
  abstract removeTindakan(
    inquiry: RemoveTindakanPasienDto,
  ): Promise<[IPoliPasienTindakanSchema, ErrorBase]>;
  abstract getAllTindakan(
    inquiry: GetTindakanPasienDto,
  ): Promise<[ITindakanSchema[], ErrorBase]>;
}
