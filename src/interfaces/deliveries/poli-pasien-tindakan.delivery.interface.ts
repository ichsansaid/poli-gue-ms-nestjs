import {
  AddTindakanPasienByDokterDto,
  GetTindakanPasienDto,
  RemoveTindakanPasienDto,
} from 'src/entities/dtos/poli-pasien-tindakan/poli-pasien-tindakan.dto';
import { IPoliPasienTindakanSchema } from '../schemas/poli-pasien-tindakan.schema.interface';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { ITindakanSchema } from '../schemas/tindakan.schema.interface';
import { Box } from 'src/internal/pkg/box.base';

export abstract class IPoliPasienTindakanDelivery {
  abstract addTindakan(
    tindakan: AddTindakanPasienByDokterDto,
  ): Promise<[Box<IPoliPasienTindakanSchema>, ErrorBase]>;
  abstract removeTindakan(
    inquiry: RemoveTindakanPasienDto,
  ): Promise<[Box<IPoliPasienTindakanSchema>, ErrorBase]>;
  abstract getAllTindakan(
    inquiry: GetTindakanPasienDto,
  ): Promise<[Box<ITindakanSchema[]>, ErrorBase]>;
}
