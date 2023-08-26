import {
  AssignDokterDto,
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
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { InquiryPasienDto } from 'src/entities/dtos/pasien/pasien.dto';
import { IDokterSchema } from 'src/interfaces/schemas/dokter.schema.interface';

@Injectable()
export class PoliPasienDelivery implements IPoliPasienDelivery {
  constructor(
    private readonly pasien_service: IPasienService,
    private readonly poli_pasien_service: IPoliPasienService,
  ) {}

  async getCurrentDokter(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[Box<IDokterSchema>, ErrorBase]> {
    const [poli_pasien, error] =
      await this.poli_pasien_service.getCurrentDokter(inquiry);
    if (poli_pasien == null) {
      return [null, error];
    }
    return [
      {
        message: 'Dokter berhasil didapatkan',
        data: poli_pasien.dokter,
      },
      null,
    ];
  }
  async assignDokter(
    assign: AssignDokterDto,
  ): Promise<[Box<IPoliPasienSchema>, ErrorBase]> {
    const [result, error] = await this.poli_pasien_service.assignDokter(assign);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'Dokter berhasil di assign',
        data: result,
      },
      null,
    ];
  }

  async createNewPasien(
    data: CreatePoliPasienDto,
  ): Promise<[Box<IPoliPasienSchema>, ErrorBase]> {
    const [pasien] = await this.pasien_service.createPasien({
      nama_lengkap: data.nama_lengkap,
      alamat: data.alamat,
    });
    const [, error_pasien] = await this.pasien_service.savePasien(pasien);
    if (error_pasien != null) {
      throw error_pasien;
    }
    const [poli_pasien, error_poli_pasien] =
      await this.poli_pasien_service.createPoliPasien({
        pasien_id: pasien.id,
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
      await this.poli_pasien_service.inquiry({
        poli_id: inquiry.poli_id,
        status: inquiry.status,
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
