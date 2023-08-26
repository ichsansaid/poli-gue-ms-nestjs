import {
  AddTindakanPasienByDokterDto,
  GetTindakanPasienDto,
  RemoveTindakanPasienDto,
} from 'src/entities/dtos/poli-pasien-tindakan/poli-pasien-tindakan.dto';
import { IPoliPasienTindakanDelivery } from 'src/interfaces/deliveries/poli-pasien-tindakan.delivery.interface';
import { IPoliPasienTindakanSchema } from 'src/interfaces/schemas/poli-pasien-tindakan.schema.interface';
import { ErrorBase } from '../pkg/error.base';
import { IPoliPasienTindakanService } from 'src/interfaces/services/poli-pasien-tindakan.service.interface';
import { Box } from '../pkg/box.base';
import { ITindakanSchema } from 'src/interfaces/schemas/tindakan.schema.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PoliPasienTindakanDelivery implements IPoliPasienTindakanDelivery {
  constructor(
    private readonly poli_pasien_tindakan_service: IPoliPasienTindakanService,
  ) {}
  async addTindakan(
    tindakan: AddTindakanPasienByDokterDto,
  ): Promise<[Box<IPoliPasienTindakanSchema>, ErrorBase]> {
    const [result, error] =
      await this.poli_pasien_tindakan_service.addTindakan(tindakan);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Tindakan berhasil ditambahkan pada pasien tersebut',
        data: result,
      },
      null,
    ];
  }
  async removeTindakan(
    remove: RemoveTindakanPasienDto,
  ): Promise<[Box<IPoliPasienTindakanSchema>, ErrorBase]> {
    const [result, error] =
      await this.poli_pasien_tindakan_service.removeTindakan(remove);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Tindakan berhasil dihapuskan pada pasien tersebut',
        data: result,
      },
      null,
    ];
  }
  async getAllTindakan(
    inquiry: GetTindakanPasienDto,
  ): Promise<[Box<ITindakanSchema[]>, ErrorBase]> {
    const [result, error] =
      await this.poli_pasien_tindakan_service.getAllTindakan(inquiry);
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
}
