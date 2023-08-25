import {
  CreatePoliPasienDto,
  InquiryPoliPasienDto,
} from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { IPoliPasienDelivery } from 'src/interfaces/deliveries/poli-pasien.delivery.interface';
import { IPasienSchema } from 'src/interfaces/schemas/pasien.schema.interface';
import { IPoliPasienSchema } from 'src/interfaces/schemas/poli-pasien.schema.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { Injectable } from '@nestjs/common';
import { IPasienService } from 'src/interfaces/services/pasien.service.interface';
import { PasienSchema } from 'src/entities/schemas/pasien.schema';
import { ValueError } from '../errors/value.error';
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { InquiryPasienDto } from 'src/entities/dtos/pasien/pasien.dto';

@Injectable()
export class PoliPasienDelivery implements IPoliPasienDelivery {
  constructor(
    private readonly pasien_service: IPasienService,
    private readonly poli_pasien_service: IPoliPasienService,
  ) {}
  async createNewPasien(
    data: CreatePoliPasienDto,
  ): Promise<[Box<IPoliPasienSchema>, ErrorBase]> {
    const [exist] = await this.poli_pasien_service.findPasienByNamaPasien(
      {
        id: data.poli_id,
      },
      {
        nama_lengkap: data.nama_lengkap,
      },
    );
    if (exist != null) {
      throw new ValueError('Pasien dengan nama tersebut udah tersedia di Poli');
    }
    const pasien = new PasienSchema({
      nama_lengkap: data.nama_lengkap,
      alamat: data.alamat,
    });
    const [task_pasien, error_pasien] =
      await this.pasien_service.createPasien(pasien);
    if (error_pasien != null) {
      throw error_pasien;
    }
    const [poli_pasien, error_poli_pasien] =
      await this.poli_pasien_service.createPoliPasien({
        pasien_id: task_pasien.id,
        poli_id: data.poli_id,
      });
    if (error_poli_pasien != null) {
      throw error_poli_pasien;
    }
    return [
      {
        message: 'Pasien berhasil ditambahkan pada Poli tersebut',
        data: poli_pasien,
      },
      null,
    ];
  }
  async deletePasien(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[Box<IPoliPasienSchema>, ErrorBase]> {
    const [poli_pasien, error_poli_pasien] =
      await this.poli_pasien_service.findById({
        id: inquiry.id,
      });
    if (error_poli_pasien != null) {
      throw error_poli_pasien;
    }
    const [, error] =
      await this.poli_pasien_service.deletePoliPasienById(inquiry);
    this.pasien_service.deletePasienById(poli_pasien.pasien_id);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Pasien berhasil dihapuskan',
        data: null,
      },
      null,
    ];
  }
  async getAllPasien(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[Box<IPasienSchema[]>, ErrorBase]> {
    const [poli_pasien, error_poli_pasien] =
      await this.poli_pasien_service.findByPoliId({
        poli_id: inquiry.poli_id,
      });
    if (error_poli_pasien != null) {
      throw error_poli_pasien;
    }
    const pasien_ids: InquiryPasienDto[] = poli_pasien.map((value) => ({
      id: value.pasien_id,
    }));
    if (pasien_ids.length == 0) {
      return [
        {
          message: 'Pasien berhasil didapatkan',
          data: [],
        },
        null,
      ];
    }
    const [pasien, error_pasien] =
      await this.pasien_service.inquiry(pasien_ids);
    if (error_pasien != null) {
      throw error_pasien;
    }
    return [
      {
        message: 'Pasien berhasil didapatkan',
        data: pasien,
      },
      null,
    ];
  }
}
