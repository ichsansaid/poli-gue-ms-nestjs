import {
  CreatePoliDto,
  InquiryPoliDto,
  UpdatePoliDto,
} from 'src/entities/dtos/poli/poli.dto';
import { IPoliDelivery } from 'src/interfaces/deliveries/poli.delivery.interface';
import { IPoliSchema } from 'src/interfaces/schemas/poli.schema.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { IPoliService } from 'src/interfaces/services/poli.service.interface';
import { Injectable } from '@nestjs/common';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { PoliSchema } from 'src/entities/schemas/poli.schema';
import { IObjectUtils } from 'src/interfaces/utils/object.util.interface';
import { NotFoundError } from '../errors/notfound.error';

@Injectable()
export class PoliDelivery implements IPoliDelivery {
  constructor(
    private readonly string_utils: IStringUtil,
    private readonly poli_service: IPoliService,
    private readonly object_utils: IObjectUtils,
  ) {}

  async createPoli(
    data: CreatePoliDto,
  ): Promise<[Box<IPoliSchema>, ErrorBase]> {
    const id = await this.string_utils.makeId('poli');
    const poli_schema: IPoliSchema = new PoliSchema({
      id: id,
      nama_poli: data.nama_poli,
    });
    const [, error_create] = await this.poli_service.createPoli(poli_schema);
    if (error_create != null) {
      throw error_create;
    }
    return [
      {
        message: 'Poli berhasil ditambahkan',
        data: poli_schema,
      },
      null,
    ];
  }
  async deletePoli(
    inquiry: InquiryPoliDto,
  ): Promise<[Box<IPoliSchema>, ErrorBase]> {
    const [data_poli, error_inquiry] = await this.poli_service.findById({
      id: inquiry.id,
    });
    if (error_inquiry != null) {
      throw error_inquiry;
    }
    if (!data_poli) {
      throw new NotFoundError('Poli tidak ditemukan');
    }
    await this.poli_service.deletePoliById(inquiry);
    return [
      {
        message: 'Poli berhasil dihapuskan',
        data: data_poli,
      },
      null,
    ];
  }
  async inquiry(
    inquiry: InquiryPoliDto,
  ): Promise<[Box<IPoliSchema[]>, ErrorBase]> {
    const [results, error] = await this.poli_service.inquiry(inquiry);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Inquiry berhasil dilakukan',
        data: results,
      },
      null,
    ];
  }
  async updatePoli(
    inquiry: InquiryPoliDto,
    data: UpdatePoliDto,
  ): Promise<[Box<IPoliSchema>, ErrorBase]> {
    const [poli, error] = await this.poli_service.findById(inquiry);
    if (error != null) {
      throw error;
    }
    const diff = await this.object_utils.getDifferentValue(poli, data);
    const [saved_poli, error_save] = await this.poli_service.updatePoliById(
      poli.id,
      diff,
    );
    if (error_save != null) {
      throw error_save;
    }
    return [
      {
        message: 'Poli berhasil diperbaharui',
        data: saved_poli,
      },
      null,
    ];
  }
}
