import { Injectable } from '@nestjs/common';
import { InquiryObatDto } from 'src/entities/dtos/obat/obat.dto';
import { InquiryPoliObatDto } from 'src/entities/dtos/poli-obat/poli-obat.dto';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliObatSchema } from 'src/interfaces/schemas/poli-obat.schema.interface';
import { IPoliObatService } from 'src/interfaces/services/poli-obat.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { ObatRepository } from 'src/internal/repositories/typeorm/obat.repository';
import { PoliObatRepository } from 'src/internal/repositories/typeorm/poli-obat.repository';
import { PoliRepository } from 'src/internal/repositories/typeorm/poli.repository';
import { In } from 'typeorm';

@Injectable()
export class PoliObatService implements IPoliObatService {
  constructor(
    private readonly poli_repo: PoliRepository,
    private readonly obat_repo: ObatRepository,
    private readonly poli_obat_repo: PoliObatRepository,
    private readonly string_util: IStringUtil,
  ) {}
  async deletePoliObatBy(
    inquiry: InquiryPoliObatDto,
  ): Promise<[IPoliObatSchema, ErrorBase]> {
    if (inquiry == null || Object.keys(inquiry).length == 0) {
      return [null, null];
    }
    await this.poli_obat_repo.delete(inquiry);
    return [null, null];
  }
  async checkInquiryExist<T extends InquiryPoliObatDto>(
    inquiry: T,
    columns: (keyof T)[],
  ): Promise<[T, ErrorBase]> {
    const column_hash = {};
    for (const col of columns) {
      column_hash[col.toString()] = true;
    }
    if (inquiry.id == null && 'id' in column_hash)
      return [
        null,
        new ValueError('Id harus di assign pada inquiry poli obat dto'),
      ];
    else if (inquiry.obat_id == null && 'obat_id' in column_hash)
      return [
        null,
        new ValueError('Obat id harus di assign pada inquiry poli obat dto'),
      ];
    else if (inquiry.poli_id == null && 'poli_id' in column_hash)
      return [
        null,
        new ValueError('Poli id harus di assign pada inquiry poli obat dto'),
      ];
    else return [inquiry, null];
  }
  async findObatBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_obat?: InquiryObatDto,
  ): Promise<[IPoliObatSchema[], ErrorBase]> {
    const all_obat = await this.obat_repo.findBy(inquiry_obat);
    const all_poli = await this.poli_repo.findBy(inquiry_poli);
    const obat_ids = all_obat.map((value) => value.id);
    const poli_ids = all_poli.map((value) => value.id);
    const poli = await this.poli_obat_repo.find({
      where: {
        obat_id: In(obat_ids),
        poli_id: In(poli_ids),
      },
    });
    return [poli, null];
  }

  async findObatByNamaObat(
    inquiry_poli: InquiryPoliDto,
    inquiry_obat: InquiryObatDto,
  ): Promise<[IPoliObatSchema, ErrorBase]> {
    const all_obat = await this.obat_repo.findBy({
      nama_obat: inquiry_obat.nama_obat,
    });
    const hash_obat = {};
    const obat_ids = [];
    for (const obat of all_obat) {
      obat_ids.push(obat.id);
      hash_obat[obat.id] = obat;
    }
    const poli = await this.poli_obat_repo.findOne({
      where: {
        obat_id: In(obat_ids),
        poli_id: inquiry_poli.id,
      },
    });
    if (poli != null) poli.obat = hash_obat[poli.obat_id];
    return [poli, null];
  }

  async createPoliObat(
    create: IPoliObatSchema,
  ): Promise<[IPoliObatSchema, ErrorBase]> {
    const poli = await this.poli_repo.findOneBy({
      id: create.poli_id,
    });
    if (poli == null) {
      throw new ValueError('Poli tidak ditemukan');
    }
    create.id = this.string_util.makeId('poli-obat');
    const poli_obat = await this.poli_obat_repo.save(create);
    return [poli_obat, null];
  }

  async updatePoliObatById(
    inquiry: InquiryPoliObatDto,
    poli_obat: IPoliObatSchema,
  ): Promise<[IPoliObatSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    const [exist] = await this.inquiry({
      poli_id: poli_obat.poli_id,
      obat_id: poli_obat.obat_id,
    });
    if (exist.length > 0) {
      return [, new ValueError('Obat tersebut sudah ada di Poli')];
    }
    await this.poli_obat_repo.update(
      {
        id: inquiry.id,
      },
      poli_obat,
    );
    poli_obat.id = inquiry.id;
    return [poli_obat, null];
  }
  async deletePoliObatById(
    inquiry: InquiryPoliObatDto,
  ): Promise<[IPoliObatSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    await this.poli_obat_repo.delete({
      id: inquiry.id,
    });
    return [null, null];
  }
  async findById(
    inquiry: InquiryPoliObatDto,
  ): Promise<[IPoliObatSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    await this.poli_obat_repo.findOneBy({
      id: inquiry.id,
    });
  }
  async findByPoliId(
    inquiry: InquiryPoliObatDto | InquiryPoliObatDto[],
  ): Promise<[IPoliObatSchema[], ErrorBase]> {
    console.log(!(inquiry instanceof Array));
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const poli_ids = [];
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['poli_id']);
      if (error_cek) {
        return [null, error_cek];
      }
      poli_ids.push(inq.poli_id);
    }
    const poli_obat = await this.poli_obat_repo.find({
      where: {
        poli_id: In(poli_ids),
      },
    });
    return [poli_obat, null];
  }
  async findByObatId(
    inquiry: InquiryPoliObatDto | InquiryPoliObatDto[],
  ): Promise<[IPoliObatSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const obat_ids = [];
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['obat_id']);
      if (error_cek) {
        return [null, error_cek];
      }
      obat_ids.push(inq.obat_id);
    }
    const poli_obat = await this.poli_obat_repo.find({
      where: {
        obat_id: In(obat_ids),
      },
    });
    return [poli_obat, null];
  }
  async inquiry(
    inquiry: InquiryPoliObatDto | InquiryPoliObatDto[],
  ): Promise<[IPoliObatSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['obat_id']);
      if (error_cek) {
        return [null, error_cek];
      }
    }
    const poli_obat = await this.poli_obat_repo.find({
      where: inquiry,
    });
    return [poli_obat, null];
  }
}
