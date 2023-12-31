import { Injectable } from '@nestjs/common';
import { InquiryPasienDto } from 'src/entities/dtos/pasien/pasien.dto';
import {
  AssignDokterDto,
  InquiryPoliPasienDto,
  PoliPasienStatus,
} from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliPasienRepository } from 'src/interfaces/repositories/type-orm/poli-pasien.repository.interface';
import { IPoliUserRepository } from 'src/interfaces/repositories/type-orm/poli-user.repository.interface';
import { IPoliPasienSchema } from 'src/interfaces/schemas/poli-pasien.schema.interface';
import { IPoliPasienService } from 'src/interfaces/services/poli-pasien.service.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { NotFoundError } from 'src/internal/errors/notfound.error';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { DokterRepository } from 'src/internal/repositories/typeorm/dokter.repository';
import { PasienRepository } from 'src/internal/repositories/typeorm/pasien.repository';
import { PoliRepository } from 'src/internal/repositories/typeorm/poli.repository';
import { UserRepository } from 'src/internal/repositories/typeorm/user.repository';
import { In } from 'typeorm';

@Injectable()
export class PoliPasienService implements IPoliPasienService {
  constructor(
    private readonly poli_repo: PoliRepository,
    private readonly pasien_repo: PasienRepository,
    private readonly dokter_repo: DokterRepository,
    private readonly user_repo: UserRepository,
    private readonly poli_pasien_repo: IPoliPasienRepository,
    private readonly poli_user_repo: IPoliUserRepository,
    private readonly user_service: IUserService,
    private readonly string_util: IStringUtil,
  ) {}
  async getLatestPasienData(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, [
      'poli_id',
      'pasien_id',
    ]);
    if (error_cek) {
      return [null, error_cek];
    }
    const data = await this.poli_pasien_repo.findLatestPasienBy(inquiry);
    return [data, null];
  }
  async getCurrentDokter(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const task_dokter = this.dokter_repo.findBy({
      id: inquiry.dokter_id,
    });
    const [[result], error] = await this.getCurrentActivePasien(inquiry);
    if (result == null) {
      throw new ValueError('Pasien tidak ditemukan');
    }
    if (result.dokter_id == undefined) {
      throw new ValueError('Pasien tersebut belum memiliki dokter');
    }
    [result.dokter] = await task_dokter;
    result.dokter.user = await this.user_repo.findOneBy({
      id: result.dokter.user_id,
    });
    result.dokter.user.password = '***';
    return [result, error];
  }
  async getCurrentActivePasien(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema[], ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['poli_id']);
    if (error_cek) {
      return [null, error_cek];
    }
    const poli_pasien = await this.poli_pasien_repo.findActivePasienBy(inquiry);
    return [poli_pasien, null];
  }
  async assignDokter(
    assign: AssignDokterDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const [poli_pasien] = await this.poli_pasien_repo.findActivePasienBy({
      pasien_id: assign.pasien_id,
      poli_id: assign.poli_id,
    });
    if (poli_pasien == null) {
      return [null, new NotFoundError('Data tidak ditemukan')];
    }
    if (poli_pasien.dokter_id != null) {
      return [null, new ValueError('Pasien tersebut sudah memiliki Dokter')];
    }
    const dokter = await this.dokter_repo.findOneBy({ id: assign.dokter_id });
    if (dokter == null) {
      throw new NotFoundError('Dokter tidak ditemukan');
    }
    const poli_user = await this.poli_user_repo.findOneBy({
      poli_id: assign.poli_id,
      user_id: dokter.user_id,
    });
    if (poli_user == null) {
      throw new NotFoundError('Dokter tidak berada di poli tersebut');
    }
    const user = await this.user_repo.findOneBy({
      id: dokter.user_id,
    });
    dokter.user = user;
    poli_pasien.dokter = dokter;
    poli_pasien.status = PoliPasienStatus.PROGRESS;
    const updated = await this.poli_pasien_repo.update(
      {
        id: poli_pasien.id,
      },
      {
        dokter_id: dokter.id,
        status: PoliPasienStatus.PROGRESS,
      },
    );
    if (updated.affected == 0) {
      throw new NotFoundError('Data sudah tidak ditemukan');
    }
    return [poli_pasien, null];
  }
  async deletePoliPasienBy(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    if (inquiry == null || Object.keys(inquiry).length == 0) {
      return [null, null];
    }
    await this.poli_pasien_repo.delete(inquiry);
    return [null, null];
  }
  async checkInquiryExist<T extends InquiryPoliPasienDto>(
    inquiry: T,
    columns: (keyof T)[],
  ): Promise<[T, ErrorBase]> {
    const column_hash = {};
    for (const col of columns) {
      column_hash[col.toString()] = true;
    }
    if (inquiry.id == null && 'id' in column_hash)
      return [
        null,
        new ValueError('Id harus di assign pada inquiry poli pasien dto'),
      ];
    else if (inquiry.pasien_id == null && 'pasien_id' in column_hash)
      return [
        null,
        new ValueError(
          'Pasien id harus di assign pada inquiry poli pasien dto',
        ),
      ];
    else if (inquiry.poli_id == null && 'poli_id' in column_hash)
      return [
        null,
        new ValueError('Poli id harus di assign pada inquiry poli pasien dto'),
      ];
    else return [inquiry, null];
  }
  async findPasienBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_pasien?: InquiryPasienDto,
  ): Promise<[IPoliPasienSchema[], ErrorBase]> {
    const all_pasien = await this.pasien_repo.findBy(inquiry_pasien);
    const all_poli = await this.poli_repo.findBy(inquiry_poli);
    const pasien_ids = all_pasien.map((value) => value.id);
    const poli_ids = all_poli.map((value) => value.id);
    const poli = await this.poli_pasien_repo.find({
      where: {
        pasien_id: In(pasien_ids),
        poli_id: In(poli_ids),
      },
    });
    return [poli, null];
  }

  async findPasienByNamaPasien(
    inquiry_poli: InquiryPoliDto,
    inquiry_pasien: InquiryPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const pasien = await this.pasien_repo.findOneBy({
      nama_lengkap: inquiry_pasien.nama_lengkap,
    });
    if (pasien == null) {
      return [, new NotFoundError('Pasien tidak ditemukan')];
    }
    const [poli] = await this.poli_pasien_repo.findBy({
      pasien_id: pasien.id,
      poli_id: inquiry_poli.id,
    });
    if (poli != null) {
      poli.pasien = pasien;
    }
    return [poli, null];
  }

  async createPoliPasien(
    create: IPoliPasienSchema,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const poli = await this.poli_repo.findOneBy({
      id: create.poli_id,
    });
    if (poli == null) {
      throw new ValueError('Poli tidak ditemukan');
    }
    create.id = this.string_util.makeId('poli-pasien');
    create.arrived_at = new Date(Date.now());
    create.status = PoliPasienStatus.WAITING;
    const poli_pasien = await this.poli_pasien_repo.save(create);
    return [poli_pasien, null];
  }

  async updatePoliPasienById(
    inquiry: InquiryPoliPasienDto,
    poli_pasien: IPoliPasienSchema,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    const [exist] = await this.inquiry({
      poli_id: poli_pasien.poli_id,
      pasien_id: poli_pasien.pasien_id,
    });
    if (exist.length > 0) {
      return [, new ValueError('Pasien tersebut sudah ada di Poli')];
    }
    await this.poli_pasien_repo.update(
      {
        id: inquiry.id,
      },
      poli_pasien,
    );
    poli_pasien.id = inquiry.id;
    return [poli_pasien, null];
  }
  async deletePoliPasienById(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    await this.poli_pasien_repo.delete({
      id: inquiry.id,
    });
    return [null, null];
  }
  async findById(
    inquiry: InquiryPoliPasienDto,
  ): Promise<[IPoliPasienSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    const poli_pasien = await this.poli_pasien_repo.findOneBy({
      id: inquiry.id,
    });
    if (poli_pasien == null) {
      return [null, new NotFoundError('Data tidak ditemukan')];
    }
    return [poli_pasien, null];
  }
  async findByPoliId(
    inquiry: InquiryPoliPasienDto | InquiryPoliPasienDto[],
  ): Promise<[IPoliPasienSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const poli_ids = [];
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['poli_id']);
      if (error_cek) {
        return [null, error_cek];
      }
      poli_ids.push(inq.poli_id);
    }
    const poli_pasien = await this.poli_pasien_repo.find({
      where: {
        poli_id: In(poli_ids),
      },
    });
    return [poli_pasien, null];
  }
  async findByPasienId(
    inquiry: InquiryPoliPasienDto | InquiryPoliPasienDto[],
  ): Promise<[IPoliPasienSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const pasien_ids = [];
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['pasien_id']);
      if (error_cek) {
        return [null, error_cek];
      }
      pasien_ids.push(inq.pasien_id);
    }
    const poli_pasien = await this.poli_pasien_repo.find({
      where: {
        pasien_id: In(pasien_ids),
      },
    });
    return [poli_pasien, null];
  }
  async inquiry(
    inquiry: InquiryPoliPasienDto | InquiryPoliPasienDto[],
  ): Promise<[IPoliPasienSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const poli_pasien = await this.poli_pasien_repo.find({
      where: inquiry,
    });
    return [poli_pasien, null];
  }
}
