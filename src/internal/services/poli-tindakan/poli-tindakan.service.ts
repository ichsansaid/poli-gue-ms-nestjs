import { Injectable } from '@nestjs/common';
import { InquiryTindakanDto } from 'src/entities/dtos/tindakan/tindakan.dto';
import { InquiryPoliTindakanDto } from 'src/entities/dtos/poli-tindakan/poli-tindakan.dto';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliTindakanSchema } from 'src/interfaces/schemas/poli-tindakan.schema.interface';
import { IPoliTindakanService } from 'src/interfaces/services/poli-tindakan.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { TindakanRepository } from 'src/internal/repositories/typeorm/tindakan.repository';
import { PoliTindakanRepository } from 'src/internal/repositories/typeorm/poli-tindakan.repository';
import { PoliRepository } from 'src/internal/repositories/typeorm/poli.repository';
import { In } from 'typeorm';

@Injectable()
export class PoliTindakanService implements IPoliTindakanService {
  constructor(
    private readonly poli_repo: PoliRepository,
    private readonly tindakan_repo: TindakanRepository,
    private readonly poli_tindakan_repo: PoliTindakanRepository,
    private readonly string_util: IStringUtil,
  ) {}
  async deletePoliTindakanBy(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]> {
    if (inquiry == null || Object.keys(inquiry).length == 0) {
      return [null, null];
    }
    await this.poli_tindakan_repo.delete(inquiry);
    return [null, null];
  }
  async checkInquiryExist<T extends InquiryPoliTindakanDto>(
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
        new ValueError('Id harus di assign pada inquiry poli tindakan dto'),
      ];
    else if (inquiry.tindakan_id == null && 'tindakan_id' in column_hash)
      return [
        null,
        new ValueError(
          'Tindakan id harus di assign pada inquiry poli tindakan dto',
        ),
      ];
    else if (inquiry.poli_id == null && 'poli_id' in column_hash)
      return [
        null,
        new ValueError(
          'Poli id harus di assign pada inquiry poli tindakan dto',
        ),
      ];
    else return [inquiry, null];
  }
  async findTindakanBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_tindakan?: InquiryTindakanDto,
  ): Promise<[IPoliTindakanSchema[], ErrorBase]> {
    const all_tindakan = await this.tindakan_repo.findBy(inquiry_tindakan);
    const all_poli = await this.poli_repo.findBy(inquiry_poli);
    const tindakan_ids = all_tindakan.map((value) => value.id);
    const poli_ids = all_poli.map((value) => value.id);
    const poli = await this.poli_tindakan_repo.find({
      where: {
        tindakan_id: In(tindakan_ids),
        poli_id: In(poli_ids),
      },
    });
    return [poli, null];
  }

  async findTindakanByNamaTindakan(
    inquiry_poli: InquiryPoliDto,
    inquiry_tindakan: InquiryTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]> {
    const all_tindakan = await this.tindakan_repo.findBy({
      nama_tindakan: inquiry_tindakan.nama_tindakan,
    });
    const hash_tindakan = {};
    const tindakan_ids = [];
    for (const tindakan of all_tindakan) {
      tindakan_ids.push(tindakan.id);
      hash_tindakan[tindakan.id] = tindakan;
    }
    const poli = await this.poli_tindakan_repo.findOne({
      where: {
        tindakan_id: In(tindakan_ids),
        poli_id: inquiry_poli.id,
      },
    });
    if (poli != null) poli.tindakan = hash_tindakan[poli.tindakan_id];
    return [poli, null];
  }

  async createPoliTindakan(
    create: IPoliTindakanSchema,
  ): Promise<[IPoliTindakanSchema, ErrorBase]> {
    const poli = await this.poli_repo.findOneBy({
      id: create.poli_id,
    });
    if (poli == null) {
      throw new ValueError('Poli tidak ditemukan');
    }
    create.id = this.string_util.makeId('poli-tindakan');
    const poli_tindakan = await this.poli_tindakan_repo.save(create);
    return [poli_tindakan, null];
  }

  async updatePoliTindakanById(
    inquiry: InquiryPoliTindakanDto,
    poli_tindakan: IPoliTindakanSchema,
  ): Promise<[IPoliTindakanSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    const [exist] = await this.inquiry({
      poli_id: poli_tindakan.poli_id,
      tindakan_id: poli_tindakan.tindakan_id,
    });
    if (exist.length > 0) {
      return [, new ValueError('Tindakan tersebut sudah ada di Poli')];
    }
    await this.poli_tindakan_repo.update(
      {
        id: inquiry.id,
      },
      poli_tindakan,
    );
    poli_tindakan.id = inquiry.id;
    return [poli_tindakan, null];
  }
  async deletePoliTindakanById(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    await this.poli_tindakan_repo.delete({
      id: inquiry.id,
    });
    return [null, null];
  }
  async findById(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[IPoliTindakanSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    await this.poli_tindakan_repo.findOneBy({
      id: inquiry.id,
    });
  }
  async findByPoliId(
    inquiry: InquiryPoliTindakanDto | InquiryPoliTindakanDto[],
  ): Promise<[IPoliTindakanSchema[], ErrorBase]> {
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
    const poli_tindakan = await this.poli_tindakan_repo.find({
      where: {
        poli_id: In(poli_ids),
      },
    });
    return [poli_tindakan, null];
  }
  async findByTindakanId(
    inquiry: InquiryPoliTindakanDto | InquiryPoliTindakanDto[],
  ): Promise<[IPoliTindakanSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const tindakan_ids = [];
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['tindakan_id']);
      if (error_cek) {
        return [null, error_cek];
      }
      tindakan_ids.push(inq.tindakan_id);
    }
    const poli_tindakan = await this.poli_tindakan_repo.find({
      where: {
        tindakan_id: In(tindakan_ids),
      },
    });
    return [poli_tindakan, null];
  }
  async inquiry(
    inquiry: InquiryPoliTindakanDto | InquiryPoliTindakanDto[],
  ): Promise<[IPoliTindakanSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['tindakan_id']);
      if (error_cek) {
        return [null, error_cek];
      }
    }
    const poli_tindakan = await this.poli_tindakan_repo.find({
      where: inquiry,
    });
    return [poli_tindakan, null];
  }
}
