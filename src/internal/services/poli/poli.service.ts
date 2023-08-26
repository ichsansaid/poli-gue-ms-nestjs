import { Injectable } from '@nestjs/common';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliSchema } from 'src/interfaces/schemas/poli.schema.interface';
import { IPoliService } from 'src/interfaces/services/poli.service.interface';
import { NotFoundError } from 'src/internal/errors/notfound.error';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { PoliRepository } from 'src/internal/repositories/typeorm/poli.repository';

@Injectable()
export class PoliService implements IPoliService {
  constructor(private readonly poli_repo: PoliRepository) {}

  async createPoli(create: IPoliSchema): Promise<[IPoliSchema, ErrorBase]> {
    const [result, error_nama] = await this.findByNamaPoli({
      nama_poli: create.nama_poli,
    });
    if (error_nama) {
      return [, error_nama];
    }
    if (result != null) {
      return [, new ValueError('Nama poli sudah tersedia')];
    }
    const created = await this.poli_repo.save(create);
    return [created, null];
  }
  async updatePoliById(
    id: string,
    poli: IPoliSchema,
  ): Promise<[IPoliSchema, ErrorBase]> {
    delete poli.id;
    if (Object.keys(poli).length == 0) {
      return [poli, null];
    }
    if (poli.nama_poli != undefined) {
      const inquiry = await this.poli_repo.findOneBy({
        nama_poli: poli.nama_poli,
      });
      if (inquiry != null && inquiry.id != id) {
        return [null, new ValueError('Nama poli telah tersedia')];
      }
    }
    await this.poli_repo.update({ id: id }, poli);
    return [poli, null];
  }
  async deletePoliById(
    inquiry: InquiryPoliDto,
  ): Promise<[IPoliSchema, ErrorBase]> {
    const [result_inquiry, error_result] = await this.findById(inquiry);
    if (error_result) {
      return [, error_result];
    }
    if (!result_inquiry) {
      return [, new NotFoundError('Poli tidak ditemukan')];
    }
    if (inquiry.id == null || inquiry.id == undefined) {
      return [, new ValueError('Id harus di assign')];
    }
    await this.poli_repo.delete({ id: inquiry.id });
    return [result_inquiry, null];
  }
  async findById(inquiry: InquiryPoliDto): Promise<[IPoliSchema, ErrorBase]> {
    if (inquiry.id == null || inquiry.id == undefined) {
      return [, new ValueError('Id harus di assign')];
    }
    const result = await this.poli_repo.findOneBy({ id: inquiry.id });
    return [result, null];
  }
  async findByNamaPoli(
    inquiry: InquiryPoliDto,
  ): Promise<[IPoliSchema, ErrorBase]> {
    if (inquiry.nama_poli == null || inquiry.nama_poli == undefined) {
      return [, new ValueError('Nama poli harus di assign')];
    }
    const result = await this.poli_repo.findOneBy({
      nama_poli: inquiry.nama_poli,
    });
    return [result, null];
  }
  async inquiry(inquiry: InquiryPoliDto): Promise<[IPoliSchema[], ErrorBase]> {
    const result = await this.poli_repo.findBy(inquiry);
    return [result, null];
  }
}
