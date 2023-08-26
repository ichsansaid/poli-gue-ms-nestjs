import { Injectable } from '@nestjs/common';
import { InquiryObatDto } from 'src/entities/dtos/obat/obat.dto';
import { IObatSchema } from 'src/interfaces/schemas/obat.schema.interface';
import { IObatService } from 'src/interfaces/services/obat.service.interface';
import { IObjectUtils } from 'src/interfaces/utils/object.util.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { ObatRepository } from 'src/internal/repositories/typeorm/obat.repository';
import { In } from 'typeorm';

@Injectable()
export class ObatService implements IObatService {
  constructor(
    private readonly obat_repo: ObatRepository,
    private readonly string_utils: IStringUtil,
    private readonly object_utils: IObjectUtils,
  ) {}
  async createObat(create: IObatSchema): Promise<[IObatSchema, ErrorBase]> {
    create.id = this.string_utils.hashMd5('obat');
    const obat = await this.obat_repo.save(create);
    return [obat, null];
  }
  async updateObatById(
    inquiry: InquiryObatDto,
    obat: IObatSchema,
  ): Promise<[IObatSchema, ErrorBase]> {
    if (inquiry.id == null) {
      return [, new ValueError('Id harus di assign pada inquiry obat dto')];
    }
    const obat_get = await this.obat_repo.findOneBy({
      id: inquiry.id,
    });
    if (obat_get == null) {
      return [, new ValueError('Obat tidak ditemukan')];
    }
    const updated = await this.object_utils.getDifferentValue(obat_get, obat);
    if (Object.keys(updated).length > 0) {
      await this.obat_repo.update(
        {
          id: inquiry.id,
        },
        updated,
      );
    }
    return [obat_get, null];
  }
  async deleteObatById(
    inquiry: InquiryObatDto | InquiryObatDto[],
  ): Promise<[IObatSchema | IObatSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const ids = [];
    for (const inq of inquiry) {
      if (inq.id == null) {
        return [, new ValueError('Id harus di assign pada inquiry obat dto')];
      }
      ids.push(inq.id);
    }
    const inquiry_obat: IObatSchema[] = await this.obat_repo.find({
      where: {
        id: In(ids),
      },
    });
    if (inquiry_obat.length != ids.length) {
      return [, new ValueError('Ada beberapa data yang tidak ditemukan')];
    }
    const result = await this.obat_repo.delete(ids);
    if (result.affected == 0) {
      return [null, null];
    }
    return [inquiry_obat, null];
  }
  async findById(inquiry: InquiryObatDto): Promise<[IObatSchema, ErrorBase]> {
    if (inquiry.id == null) {
      return [, new ValueError('Id harus di assign pada inquiry obat dto')];
    }
    const obat = await this.obat_repo.findOneBy({
      id: inquiry.id,
    });
    return [obat, null];
  }
  async findByNamaObat(
    inquiry: InquiryObatDto,
  ): Promise<[IObatSchema[], ErrorBase]> {
    if (inquiry.nama_obat == null) {
      return [
        ,
        new ValueError('Nama obat harus di assign pada inquiry obat dto'),
      ];
    }
    const obat = await this.obat_repo.findBy({
      nama_obat: inquiry.nama_obat,
    });
    return [obat, null];
  }
  async inquiry(
    inquiry: InquiryObatDto | InquiryObatDto[],
  ): Promise<[IObatSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      const obat = await this.obat_repo.findBy(inquiry);
      return [obat, null];
    } else {
      const obat = await this.obat_repo.find({
        where: inquiry,
      });
      return [obat, null];
    }
  }
}
