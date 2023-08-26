import {
  AddObatPasienByDokterDto,
  GetObatPasienDto,
  RemoveObatPasienDto,
} from 'src/entities/dtos/poli-pasien-obat/poli-pasien-obat.dto';
import { IPoliPasienObatDelivery } from 'src/interfaces/deliveries/poli-pasien-obat.delivery.interface';
import { IPoliPasienObatSchema } from 'src/interfaces/schemas/poli-pasien-obat.schema.interface';
import { ErrorBase } from '../pkg/error.base';
import { IPoliPasienObatService } from 'src/interfaces/services/poli-pasien-obat.service.interface';
import { Box } from '../pkg/box.base';
import { IObatSchema } from 'src/interfaces/schemas/obat.schema.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PoliPasienObatDelivery implements IPoliPasienObatDelivery {
  constructor(
    private readonly poli_pasien_obat_service: IPoliPasienObatService,
  ) {}
  async addObat(
    obat: AddObatPasienByDokterDto,
  ): Promise<[Box<IPoliPasienObatSchema>, ErrorBase]> {
    const [result, error] = await this.poli_pasien_obat_service.addObat(obat);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Obat berhasil ditambahkan pada pasien tersebut',
        data: result,
      },
      null,
    ];
  }
  async removeObat(
    remove: RemoveObatPasienDto,
  ): Promise<[Box<IPoliPasienObatSchema>, ErrorBase]> {
    const [result, error] =
      await this.poli_pasien_obat_service.removeObat(remove);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Obat berhasil dihapuskan pada pasien tersebut',
        data: result,
      },
      null,
    ];
  }
  async getAllObat(
    inquiry: GetObatPasienDto,
  ): Promise<[Box<IObatSchema[]>, ErrorBase]> {
    const [result, error] =
      await this.poli_pasien_obat_service.getAllObat(inquiry);
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
}
