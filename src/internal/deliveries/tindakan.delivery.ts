import {
  CreateTindakanDto,
  InquiryTindakanDto,
  UpdateTindakanDto,
} from 'src/entities/dtos/tindakan/tindakan.dto';
import { ITindakanDelivery } from 'src/interfaces/deliveries/tindakan.delivery.interface';
import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { ErrorBase } from '../pkg/error.base';
import { ITindakanService } from 'src/interfaces/services/tindakan.service.interface';
import { Box } from '../pkg/box.base';
import { IPoliTindakanService } from 'src/interfaces/services/poli-tindakan.service.interface';
import { NotFoundError } from '../errors/notfound.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TindakanDelivery implements ITindakanDelivery {
  constructor(
    private readonly tindakan_service: ITindakanService,
    private readonly poli_tindakan_service: IPoliTindakanService,
  ) {}

  async createTindakan(
    create: CreateTindakanDto,
  ): Promise<[Box<ITindakanSchema>, ErrorBase]> {
    const [result, error] = await this.tindakan_service.createTindakan({
      nama_tindakan: create.nama_tindakan,
    });
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Tindakan berhasil dibuat',
        data: result,
      },
      null,
    ];
  }
  async updateTindakan(
    inquiry: InquiryTindakanDto,
    update: UpdateTindakanDto,
  ): Promise<[Box<ITindakanSchema>, ErrorBase]> {
    const [updated, error] = await this.tindakan_service.updateTindakanById(
      inquiry,
      update,
    );
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Tindakan berhasil diperbaharui',
        data: updated,
      },
      null,
    ];
  }
  async getAllTindakan(): Promise<[Box<ITindakanSchema[]>, ErrorBase]> {
    const [result, error] = await this.tindakan_service.inquiry({});
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Tindakan berhasil diambil',
        data: result,
      },
      null,
    ];
  }
  async deleteTindakan(
    inquiry: InquiryTindakanDto,
  ): Promise<[Box<ITindakanSchema>, ErrorBase]> {
    const [inq, error] = await this.tindakan_service.findById({
      id: inquiry.id,
    });
    if (error != null) {
      throw error;
    }
    if (inq == null) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    const [result, error_del] = await this.tindakan_service.deleteTindakanById({
      id: inquiry.id,
    });
    if (error_del != null) {
      throw error_del;
    }
    if (result == null) {
      return [
        {
          message: 'Tidak ada tindakan yang terperbaharui',
          data: null,
        },
        null,
      ];
    }
    this.poli_tindakan_service.deletePoliTindakanBy({
      tindakan_id: inquiry.id,
    });
    return [
      {
        message: 'Tindakan berhasil dihapuskan',
        data: inq,
      },
      null,
    ];
  }
}
