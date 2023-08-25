import {
  CreatePasienDto,
  InquiryPasienDto,
  UpdatePasienDto,
} from 'src/entities/dtos/pasien/pasien.dto';
import { IPasienDelivery } from 'src/interfaces/deliveries/pasien.delivery.interface';
import { IPasienSchema } from 'src/interfaces/schemas/pasien.schema.interface';
import { ErrorBase } from '../pkg/error.base';
import { IPasienService } from 'src/interfaces/services/pasien.service.interface';
import { Box } from '../pkg/box.base';
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { NotFoundError } from '../errors/notfound.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasienDelivery implements IPasienDelivery {
  constructor(
    private readonly pasien_service: IPasienService,
    private readonly poli_pasien_service: IPoliPasienService,
  ) {}

  async createPasien(
    create: CreatePasienDto,
  ): Promise<[Box<IPasienSchema>, ErrorBase]> {
    const [result, error] = await this.pasien_service.createPasien({
      nama_lengkap: create.nama_lengkap,
      alamat: create.alamat,
    });
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Pasien berhasil dibuat',
        data: result,
      },
      null,
    ];
  }
  async updatePasien(
    inquiry: InquiryPasienDto,
    update: UpdatePasienDto,
  ): Promise<[Box<IPasienSchema>, ErrorBase]> {
    const [updated, error] = await this.pasien_service.updatePasienById(
      inquiry,
      update,
    );
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Pasien berhasil dibuat',
        data: updated,
      },
      null,
    ];
  }
  async getAllPasien(): Promise<[Box<IPasienSchema[]>, ErrorBase]> {
    const [result, error] = await this.pasien_service.inquiry({});
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Pasien berhasil diambil',
        data: result,
      },
      null,
    ];
  }
  async deletePasien(
    inquiry: InquiryPasienDto,
  ): Promise<[Box<IPasienSchema>, ErrorBase]> {
    const [inq, error] = await this.pasien_service.findById({
      id: inquiry.id,
    });
    if (error != null) {
      throw error;
    }
    if (inq == null) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    const [result, error_del] = await this.pasien_service.deletePasienById({
      id: inquiry.id,
    });
    if (error_del != null) {
      throw error_del;
    }
    if (result == null) {
      return [
        {
          message: 'Tidak ada pasien yang terperbaharui',
          data: null,
        },
        null,
      ];
    }
    this.poli_pasien_service.deletePoliPasienBy({
      pasien_id: inquiry.id,
    });
    return [
      {
        message: 'Pasien berhasil dihapuskan',
        data: inq,
      },
      null,
    ];
  }
}
