import { Injectable } from '@nestjs/common';
import {
  AddObatPasienByDokterDto,
  GetObatPasienDto,
  RemoveObatPasienDto,
} from 'src/entities/dtos/poli-pasien-obat/poli-pasien-obat.dto';
import { IPoliPasienObatRepository } from 'src/interfaces/repositories/type-orm/poli-pasien-obat.repository.interface';
import { IPoliPasienObatSchema } from 'src/interfaces/schemas/poli-pasien-obat.schema.interface';
import { IObatSchema } from 'src/interfaces/schemas/obat.schema.interface';
import { IPoliPasienObatService } from 'src/interfaces/services/poli-pasien-obat.service.interface';
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { IObatService } from 'src/interfaces/services/obat.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { NotFoundError } from 'src/internal/errors/notfound.error';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';

@Injectable()
export class PoliPasienObatService implements IPoliPasienObatService {
  constructor(
    private readonly obat_service: IObatService,
    private readonly poli_pasien_service: IPoliPasienService,
    private readonly string_utils: IStringUtil,
    private readonly poli_pasien_obat_repo: IPoliPasienObatRepository,
  ) {}
  async addObat(
    add_obat: AddObatPasienByDokterDto,
  ): Promise<[IPoliPasienObatSchema, ErrorBase]> {
    const [obat, error_obat] = await this.obat_service.findById({
      id: add_obat.obat_id,
    });
    if (error_obat != null) {
      return [, error_obat];
    }
    if (obat == null) {
      return [, new NotFoundError('Obat tidak ditemukan')];
    }
    const [[poli_pasien], error_poli_pasien] =
      await this.poli_pasien_service.getCurrentActivePasien({
        poli_id: add_obat.poli_id,
        pasien_id: add_obat.pasien_id,
      });
    if (error_poli_pasien != null) {
      return [, error_poli_pasien];
    }
    if (poli_pasien == null) {
      return [, new ValueError('Pasien tersebut belum aktif')];
    }
    const exist = await this.poli_pasien_obat_repo.findOneBy({
      obat_id: add_obat.obat_id,
      poli_pasien_id: poli_pasien.id,
    });
    if (exist != null) {
      return [, new ValueError('Obat tersebut sudah ada')];
    }
    const data_baru: IPoliPasienObatSchema = {
      id: this.string_utils.hashMd5('poli_pasien_obat'),
      obat_id: add_obat.obat_id,
      poli_pasien_id: poli_pasien.id,
    };
    const created = await this.poli_pasien_obat_repo.save(data_baru);
    created.obat = obat;
    return [created, null];
  }
  async removeObat(
    remove_obat: RemoveObatPasienDto,
  ): Promise<[IPoliPasienObatSchema, ErrorBase]> {
    const [[poli_pasien], error_poli_pasien] =
      await this.poli_pasien_service.getCurrentActivePasien({
        poli_id: remove_obat.poli_id,
        pasien_id: remove_obat.pasien_id,
      });
    if (error_poli_pasien != null) {
      return [, error_poli_pasien];
    }
    if (poli_pasien == null) {
      return [, new ValueError('Pasien tersebut belum aktif')];
    }
    const [obat] = await this.obat_service.findById(remove_obat.obat_id);
    const exist = await this.poli_pasien_obat_repo.findOneBy({
      poli_pasien_id: poli_pasien.id,
      obat_id: remove_obat.obat_id,
    });
    if (exist == null) {
      return [, new ValueError('Data tidak ditemukan')];
    }
    await this.poli_pasien_obat_repo.delete({
      poli_pasien_id: poli_pasien.id,
      obat_id: remove_obat.obat_id,
    });
    const data_baru: IPoliPasienObatSchema = {
      obat_id: remove_obat.obat_id,
      obat: obat,
      poli_pasien_id: poli_pasien.id,
    };
    return [data_baru, null];
  }
  async getAllObat(
    get_obat: GetObatPasienDto,
  ): Promise<[IObatSchema[], ErrorBase]> {
    const [[poli_pasien], error_poli_pasien] =
      await this.poli_pasien_service.getCurrentActivePasien({
        poli_id: get_obat.poli_id,
        pasien_id: get_obat.pasien_id,
      });
    if (error_poli_pasien != null) {
      return [, error_poli_pasien];
    }
    if (poli_pasien == null) {
      return [, new ValueError('Pasien tersebut belum aktif')];
    }
    const poli_pasien_obat = await this.poli_pasien_obat_repo.findBy({
      poli_pasien_id: poli_pasien.id,
    });
    if (poli_pasien_obat.length == 0) {
      return [[], null];
    }
    const obat_ids = poli_pasien_obat.map((value) => ({
      id: value.obat_id,
    }));
    const [obats] = await this.obat_service.inquiry(obat_ids);
    return [obats, null];
  }
}
