import {
  CreatePoliTindakanDto,
  InquiryPoliTindakanDto,
} from 'src/entities/dtos/poli-tindakan/poli-tindakan.dto';
import { IPoliTindakanDelivery } from 'src/interfaces/deliveries/poli-tindakan.delivery.interface';
import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { IPoliTindakanSchema } from 'src/interfaces/schemas/poli-tindakan.schema.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { Injectable } from '@nestjs/common';
import { ITindakanService } from 'src/interfaces/services/tindakan.service.interface';
import { TindakanSchema } from 'src/entities/schemas/tindakan.schema';
import { ValueError } from '../errors/value.error';
import { IPoliTindakanService } from 'src/interfaces/services/poli-tindakan.service.interface';
import { InquiryTindakanDto } from 'src/entities/dtos/tindakan/tindakan.dto';

@Injectable()
export class PoliTindakanDelivery implements IPoliTindakanDelivery {
  constructor(
    private readonly tindakan_service: ITindakanService,
    private readonly poli_tindakan_service: IPoliTindakanService,
  ) {}
  async createNewTindakan(
    data: CreatePoliTindakanDto,
  ): Promise<[Box<IPoliTindakanSchema>, ErrorBase]> {
    const [exist] = await this.poli_tindakan_service.findTindakanByNamaTindakan(
      {
        id: data.poli_id,
      },
      {
        nama_tindakan: data.nama_tindakan,
      },
    );
    if (exist != null) {
      throw new ValueError(
        'Tindakan dengan nama tersebut udah tersedia di Poli',
      );
    }
    const tindakan = new TindakanSchema({
      nama_tindakan: data.nama_tindakan,
    });
    const [task_tindakan, error_tindakan] =
      await this.tindakan_service.createTindakan(tindakan);
    if (error_tindakan != null) {
      throw error_tindakan;
    }
    const [poli_tindakan, error_poli_tindakan] =
      await this.poli_tindakan_service.createPoliTindakan({
        tindakan_id: task_tindakan.id,
        poli_id: data.poli_id,
      });
    if (error_poli_tindakan != null) {
      throw error_poli_tindakan;
    }
    return [
      {
        message: 'Tindakan berhasil ditambahkan pada Poli tersebut',
        data: poli_tindakan,
      },
      null,
    ];
  }
  async deleteTindakan(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[Box<IPoliTindakanSchema>, ErrorBase]> {
    const [poli_tindakan, error_poli_tindakan] =
      await this.poli_tindakan_service.findById({
        id: inquiry.id,
      });
    if (error_poli_tindakan != null) {
      throw error_poli_tindakan;
    }
    const [, error] =
      await this.poli_tindakan_service.deletePoliTindakanById(inquiry);
    this.tindakan_service.deleteTindakanById(poli_tindakan.tindakan_id);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Tindakan berhasil dihapuskan',
        data: null,
      },
      null,
    ];
  }
  async getAllTindakan(
    inquiry: InquiryPoliTindakanDto,
  ): Promise<[Box<ITindakanSchema[]>, ErrorBase]> {
    const [poli_tindakan, error_poli_tindakan] =
      await this.poli_tindakan_service.findByPoliId({
        poli_id: inquiry.poli_id,
      });
    if (error_poli_tindakan != null) {
      throw error_poli_tindakan;
    }
    const tindakan_ids: InquiryTindakanDto[] = poli_tindakan.map((value) => ({
      id: value.tindakan_id,
    }));
    if (tindakan_ids.length == 0) {
      return [
        {
          message: 'Tindakan berhasil didapatkan',
          data: [],
        },
        null,
      ];
    }
    const [tindakan, error_tindakan] =
      await this.tindakan_service.inquiry(tindakan_ids);
    if (error_tindakan != null) {
      throw error_tindakan;
    }
    return [
      {
        message: 'Tindakan berhasil didapatkan',
        data: tindakan,
      },
      null,
    ];
  }
}
