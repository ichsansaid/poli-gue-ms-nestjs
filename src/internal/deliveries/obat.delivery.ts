import {
  CreateObatDto,
  InquiryObatDto,
  UpdateObatDto,
} from 'src/entities/dtos/obat/obat.dto';
import { IObatDelivery } from 'src/interfaces/deliveries/obat.delivery.interface';
import { IObatSchema } from 'src/interfaces/schemas/obat.schema.interface';
import { ErrorBase } from '../pkg/error.base';
import { IObatService } from 'src/interfaces/services/obat.service.interface';
import { Box } from '../pkg/box.base';
import { IPoliObatService } from 'src/interfaces/services/poli-obat.service.interface';
import { NotFoundError } from '../errors/notfound.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ObatDelivery implements IObatDelivery {
  constructor(
    private readonly obat_service: IObatService,
    private readonly poli_obat_service: IPoliObatService,
  ) {}

  async createObat(
    create: CreateObatDto,
  ): Promise<[Box<IObatSchema>, ErrorBase]> {
    const [result, error] = await this.obat_service.createObat(create);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Obat berhasil dibuat',
        data: result,
      },
      null,
    ];
  }
  async updateObat(
    inquiry: InquiryObatDto,
    update: UpdateObatDto,
  ): Promise<[Box<IObatSchema>, ErrorBase]> {
    const [updated, error] = await this.obat_service.updateObatById(
      inquiry,
      update,
    );
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Obat berhasil diperbaharui',
        data: updated,
      },
      null,
    ];
  }
  async getAllObat(): Promise<[Box<IObatSchema[]>, ErrorBase]> {
    const [result, error] = await this.obat_service.inquiry({});
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Obat berhasil diambil',
        data: result,
      },
      null,
    ];
  }
  async deleteObat(
    inquiry: InquiryObatDto,
  ): Promise<[Box<IObatSchema>, ErrorBase]> {
    const [inq, error] = await this.obat_service.findById({
      id: inquiry.id,
    });
    if (error != null) {
      throw error;
    }
    if (inq == null) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    const [result, error_del] = await this.obat_service.deleteObatById({
      id: inquiry.id,
    });
    if (error_del != null) {
      throw error_del;
    }
    if (result == null) {
      return [
        {
          message: 'Tidak ada obat yang terperbaharui',
          data: null,
        },
        null,
      ];
    }
    this.poli_obat_service.deletePoliObatBy({
      obat_id: inquiry.id,
    });
    return [
      {
        message: 'Obat berhasil dihapuskan',
        data: inq,
      },
      null,
    ];
  }
}
