import {
  CreatePoliObatDto,
  InquiryPoliObatDto,
} from 'src/entities/dtos/poli-obat/poli-obat.dto';
import { IPoliObatDelivery } from 'src/interfaces/deliveries/poli-obat.delivery.interface';
import { IObatSchema } from 'src/interfaces/schemas/obat.schema.interface';
import { IPoliObatSchema } from 'src/interfaces/schemas/poli-obat.schema.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { Injectable } from '@nestjs/common';
import { IObatService } from 'src/interfaces/services/obat.service.interface';
import { ObatSchema } from 'src/entities/schemas/obat.schema';
import { ValueError } from '../errors/value.error';
import { IPoliObatService } from 'src/interfaces/services/poli-obat.service.interface';
import { InquiryObatDto } from 'src/entities/dtos/obat/obat.dto';

@Injectable()
export class PoliObatDelivery implements IPoliObatDelivery {
  constructor(
    private readonly obat_service: IObatService,
    private readonly poli_obat_service: IPoliObatService,
  ) {}
  async createNewObat(
    data: CreatePoliObatDto,
  ): Promise<[Box<IPoliObatSchema>, ErrorBase]> {
    const [exist] = await this.poli_obat_service.findObatByNamaObat(
      {
        id: data.poli_id,
      },
      {
        nama_obat: data.nama_obat,
      },
    );
    if (exist != null) {
      throw new ValueError('Obat dengan nama tersebut udah tersedia di Poli');
    }
    const obat = new ObatSchema({
      nama_obat: data.nama_obat,
      harga: data.harga,
    });
    const [task_obat, error_obat] = await this.obat_service.createObat(obat);
    if (error_obat != null) {
      throw error_obat;
    }
    const [poli_obat, error_poli_obat] =
      await this.poli_obat_service.createPoliObat({
        obat_id: task_obat.id,
        poli_id: data.poli_id,
      });
    if (error_poli_obat != null) {
      throw error_poli_obat;
    }
    return [
      {
        message: 'Obat berhasil ditambahkan pada Poli tersebut',
        data: poli_obat,
      },
      null,
    ];
  }
  async deleteObat(
    inquiry: InquiryPoliObatDto,
  ): Promise<[Box<IPoliObatSchema>, ErrorBase]> {
    const [poli_obat, error_poli_obat] = await this.poli_obat_service.findById({
      id: inquiry.id,
    });
    if (error_poli_obat != null) {
      throw error_poli_obat;
    }
    const [, error] = await this.poli_obat_service.deletePoliObatById(inquiry);
    this.obat_service.deleteObatById(poli_obat.obat_id);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Obat berhasil dihapuskan',
        data: null,
      },
      null,
    ];
  }
  async getAllObat(
    inquiry: InquiryPoliObatDto,
  ): Promise<[Box<IObatSchema[]>, ErrorBase]> {
    const [poli_obat, error_poli_obat] =
      await this.poli_obat_service.findByPoliId({
        poli_id: inquiry.poli_id,
      });
    if (error_poli_obat != null) {
      throw error_poli_obat;
    }
    const obat_ids: InquiryObatDto[] = poli_obat.map((value) => ({
      id: value.obat_id,
    }));
    if (obat_ids.length == 0) {
      return [
        {
          message: 'Obat berhasil didapatkan',
          data: [],
        },
        null,
      ];
    }
    const [obat, error_obat] = await this.obat_service.inquiry(obat_ids);
    if (error_obat != null) {
      throw error_obat;
    }
    return [
      {
        message: 'Obat berhasil didapatkan',
        data: obat,
      },
      null,
    ];
  }
}
