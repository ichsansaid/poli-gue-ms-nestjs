import { Injectable } from '@nestjs/common';
import { InquiryTindakanDto } from 'src/entities/dtos/tindakan/tindakan.dto';
import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { ITindakanService } from 'src/interfaces/services/tindakan.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { TindakanRepository } from 'src/internal/repositories/typeorm/tindakan.repository';
import { In } from 'typeorm';

@Injectable()
export class TindakanService implements ITindakanService {
  constructor(
    private readonly tindakan_repo: TindakanRepository,
    private readonly string_utils: IStringUtil,
  ) {}
  async createTindakan(
    create: ITindakanSchema,
  ): Promise<[ITindakanSchema, ErrorBase]> {
    create.id = this.string_utils.hashMd5('tindakan');
    const tindakan = await this.tindakan_repo.save(create);
    return [tindakan, null];
  }
  async updateTindakanById(
    inquiry: InquiryTindakanDto,
    poli: ITindakanSchema,
  ): Promise<[ITindakanSchema, ErrorBase]> {
    if (inquiry.id == null) {
      return [, new ValueError('Id harus di assign pada inquiry tindakan dto')];
    }
    const tindakan_get = await this.tindakan_repo.findOneBy({
      id: inquiry.id,
    });
    if (tindakan_get == null) {
      return [, new ValueError('Tindakan tidak ditemukan')];
    }
    await this.tindakan_repo.update(
      {
        id: inquiry.id,
      },
      poli,
    );
    return [tindakan_get, null];
  }
  async deleteTindakanById(
    inquiry: InquiryTindakanDto | InquiryTindakanDto[],
  ): Promise<[ITindakanSchema | ITindakanSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const ids = [];
    for (const inq of inquiry) {
      if (inq.id == null) {
        return [
          ,
          new ValueError('Id harus di assign pada inquiry tindakan dto'),
        ];
      }
      ids.push(inq.id);
    }
    const inquiry_tindakan: ITindakanSchema[] = await this.tindakan_repo.find({
      where: {
        id: In(ids),
      },
    });
    if (inquiry_tindakan.length != ids.length) {
      return [, new ValueError('Ada beberapa data yang tidak ditemukan')];
    }
    const result = await this.tindakan_repo.delete(ids);
    if (result.affected == 0) {
      return [null, null];
    }
    return [inquiry_tindakan, null];
  }
  async findById(
    inquiry: InquiryTindakanDto,
  ): Promise<[ITindakanSchema, ErrorBase]> {
    if (inquiry.id == null) {
      return [, new ValueError('Id harus di assign pada inquiry tindakan dto')];
    }
    const tindakan = await this.tindakan_repo.findOneBy({
      id: inquiry.id,
    });
    return [tindakan, null];
  }
  async findByNamaTindakan(
    inquiry: InquiryTindakanDto,
  ): Promise<[ITindakanSchema[], ErrorBase]> {
    if (inquiry.nama_tindakan == null) {
      return [
        ,
        new ValueError(
          'Nama tindakan harus di assign pada inquiry tindakan dto',
        ),
      ];
    }
    const tindakan = await this.tindakan_repo.findBy({
      nama_tindakan: inquiry.nama_tindakan,
    });
    return [tindakan, null];
  }
  async inquiry(
    inquiry: InquiryTindakanDto | InquiryTindakanDto[],
  ): Promise<[ITindakanSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      const tindakan = await this.tindakan_repo.findBy(inquiry);
      return [tindakan, null];
    } else {
      const tindakan = await this.tindakan_repo.find({
        where: inquiry,
      });
      return [tindakan, null];
    }
  }
}
