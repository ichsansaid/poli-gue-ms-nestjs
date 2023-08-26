import { Injectable } from '@nestjs/common';
import {
  AddTindakanPasienByDokterDto,
  GetTindakanPasienDto,
  RemoveTindakanPasienDto,
} from 'src/entities/dtos/poli-pasien-tindakan/poli-pasien-tindakan.dto';
import { IPoliPasienTindakanRepository } from 'src/interfaces/repositories/type-orm/poli-pasien-tindakan.repository.interface';
import { IPoliPasienTindakanSchema } from 'src/interfaces/schemas/poli-pasien-tindakan.schema.interface';
import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { IPoliPasienTindakanService } from 'src/interfaces/services/poli-pasien-tindakan.service.interface';
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { IPoliTindakanService } from 'src/interfaces/services/poli-tindakan.service.interface';
import { ITindakanService } from 'src/interfaces/services/tindakan.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { NotFoundError } from 'src/internal/errors/notfound.error';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';

@Injectable()
export class PoliPasienTindakanService implements IPoliPasienTindakanService {
  constructor(
    private readonly tindakan_service: ITindakanService,
    private readonly poli_pasien_service: IPoliPasienService,
    private readonly string_utils: IStringUtil,
    private readonly poli_tindakan_service: IPoliTindakanService,
    private readonly poli_pasien_tindakan_repo: IPoliPasienTindakanRepository,
  ) {}
  async addTindakan(
    add_tindakan: AddTindakanPasienByDokterDto,
  ): Promise<[IPoliPasienTindakanSchema, ErrorBase]> {
    const [tindakan, error_tindakan] = await this.tindakan_service.findById({
      id: add_tindakan.tindakan_id,
    });
    if (error_tindakan != null) {
      return [, error_tindakan];
    }
    if (tindakan == null) {
      return [, new NotFoundError('Tindakan tidak ditemukan')];
    }
    const [[poli_pasien], error_poli_pasien] =
      await this.poli_pasien_service.getCurrentActivePasien({
        poli_id: add_tindakan.poli_id,
        pasien_id: add_tindakan.pasien_id,
      });
    if (error_poli_pasien != null) {
      return [, error_poli_pasien];
    }
    if (poli_pasien == null) {
      return [, new ValueError('Pasien tersebut belum aktif')];
    }
    const exist = await this.poli_pasien_tindakan_repo.findOneBy({
      tindakan_id: add_tindakan.tindakan_id,
      poli_pasien_id: poli_pasien.id,
    });
    if (exist != null) {
      return [, new ValueError('Tindakan tersebut sudah ada')];
    }
    const [[poli_tindakan]] = await this.poli_tindakan_service.inquiry({
      tindakan_id: add_tindakan.tindakan_id,
      poli_id: add_tindakan.poli_id,
    });
    if (poli_tindakan == null) {
      return [, new ValueError('Tindakan tersebut belum ada di Poli')];
    }
    const data_baru: IPoliPasienTindakanSchema = {
      id: this.string_utils.hashMd5('poli_pasien_tindakan'),
      tindakan_id: add_tindakan.tindakan_id,
      poli_pasien_id: poli_pasien.id,
    };
    const created = await this.poli_pasien_tindakan_repo.save(data_baru);
    created.tindakan = tindakan;
    return [created, null];
  }
  async removeTindakan(
    remove_tindakan: RemoveTindakanPasienDto,
  ): Promise<[IPoliPasienTindakanSchema, ErrorBase]> {
    const [[poli_pasien], error_poli_pasien] =
      await this.poli_pasien_service.getCurrentActivePasien({
        poli_id: remove_tindakan.poli_id,
        pasien_id: remove_tindakan.pasien_id,
      });
    if (error_poli_pasien != null) {
      return [, error_poli_pasien];
    }
    if (poli_pasien == null) {
      return [, new ValueError('Pasien tersebut belum aktif')];
    }
    const [tindakan] = await this.tindakan_service.findById(
      remove_tindakan.tindakan_id,
    );
    const exist = await this.poli_pasien_tindakan_repo.findOneBy({
      poli_pasien_id: poli_pasien.id,
      tindakan_id: remove_tindakan.tindakan_id,
    });
    if (exist == null) {
      return [, new ValueError('Data tidak ditemukan')];
    }
    await this.poli_pasien_tindakan_repo.delete({
      poli_pasien_id: poli_pasien.id,
      tindakan_id: remove_tindakan.tindakan_id,
    });
    const data_baru: IPoliPasienTindakanSchema = {
      tindakan_id: remove_tindakan.tindakan_id,
      tindakan: tindakan,
      poli_pasien_id: poli_pasien.id,
    };
    return [data_baru, null];
  }
  async getAllTindakan(
    get_tindakan: GetTindakanPasienDto,
  ): Promise<[ITindakanSchema[], ErrorBase]> {
    const [[poli_pasien], error_poli_pasien] =
      await this.poli_pasien_service.getCurrentActivePasien({
        poli_id: get_tindakan.poli_id,
        pasien_id: get_tindakan.pasien_id,
      });
    if (error_poli_pasien != null) {
      return [, error_poli_pasien];
    }
    if (poli_pasien == null) {
      return [, new ValueError('Pasien tersebut belum aktif')];
    }
    const poli_pasien_tindakan = await this.poli_pasien_tindakan_repo.findBy({
      poli_pasien_id: poli_pasien.id,
    });
    if (poli_pasien_tindakan.length == 0) {
      return [[], null];
    }
    const tindakan_ids = poli_pasien_tindakan.map((value) => ({
      id: value.tindakan_id,
    }));
    const [tindakans] = await this.tindakan_service.inquiry(tindakan_ids);
    return [tindakans, null];
  }
}
