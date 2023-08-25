import { Injectable } from '@nestjs/common';
import { InquiryPasienDto } from 'src/entities/dtos/pasien/pasien.dto';
import { IPasienSchema } from 'src/interfaces/schemas/pasien.schema.interface';
import { IPasienService } from 'src/interfaces/services/pasien.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { PasienRepository } from 'src/internal/repositories/typeorm/pasien.repository';
import { In } from 'typeorm';

@Injectable()
export class PasienService implements IPasienService {
  constructor(
    private readonly pasien_repo: PasienRepository,
    private readonly string_utils: IStringUtil,
  ) {}
  async createPasien(
    create: IPasienSchema,
  ): Promise<[IPasienSchema, ErrorBase]> {
    create.id = this.string_utils.hashMd5('pasien');
    const pasien = await this.pasien_repo.save(create);
    return [pasien, null];
  }
  async updatePasienById(
    inquiry: InquiryPasienDto,
    poli: IPasienSchema,
  ): Promise<[IPasienSchema, ErrorBase]> {
    if (inquiry.id == null) {
      return [, new ValueError('Id harus di assign pada inquiry pasien dto')];
    }
    const pasien_get = await this.pasien_repo.findOneBy({
      id: inquiry.id,
    });
    if (pasien_get == null) {
      return [, new ValueError('Pasien tidak ditemukan')];
    }
    await this.pasien_repo.update(
      {
        id: inquiry.id,
      },
      poli,
    );
    return [pasien_get, null];
  }
  async deletePasienById(
    inquiry: InquiryPasienDto | InquiryPasienDto[],
  ): Promise<[IPasienSchema | IPasienSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const ids = [];
    for (const inq of inquiry) {
      if (inq.id == null) {
        return [, new ValueError('Id harus di assign pada inquiry pasien dto')];
      }
      ids.push(inq.id);
    }
    const inquiry_pasien: IPasienSchema[] = await this.pasien_repo.find({
      where: {
        id: In(ids),
      },
    });
    if (inquiry_pasien.length != ids.length) {
      return [, new ValueError('Ada beberapa data yang tidak ditemukan')];
    }
    const result = await this.pasien_repo.delete(ids);
    if (result.affected == 0) {
      return [null, null];
    }
    return [inquiry_pasien, null];
  }
  async findById(
    inquiry: InquiryPasienDto,
  ): Promise<[IPasienSchema, ErrorBase]> {
    if (inquiry.id == null) {
      return [, new ValueError('Id harus di assign pada inquiry pasien dto')];
    }
    const pasien = await this.pasien_repo.findOneBy({
      id: inquiry.id,
    });
    return [pasien, null];
  }
  async findByNamaPasien(
    inquiry: InquiryPasienDto,
  ): Promise<[IPasienSchema[], ErrorBase]> {
    if (inquiry.nama_lengkap == null) {
      return [
        ,
        new ValueError('Nama pasien harus di assign pada inquiry pasien dto'),
      ];
    }
    const pasien = await this.pasien_repo.findBy({
      nama_lengkap: inquiry.nama_lengkap,
    });
    return [pasien, null];
  }
  async inquiry(
    inquiry: InquiryPasienDto | InquiryPasienDto[],
  ): Promise<[IPasienSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      const pasien = await this.pasien_repo.findBy(inquiry);
      return [pasien, null];
    } else {
      const pasien = await this.pasien_repo.find({
        where: inquiry,
      });
      return [pasien, null];
    }
  }
}
