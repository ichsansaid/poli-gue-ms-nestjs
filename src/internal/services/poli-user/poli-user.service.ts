import { Injectable } from '@nestjs/common';
import { InquiryUserDto } from 'src/entities/dtos/user/user.dto';
import { InquiryPoliUserDto } from 'src/entities/dtos/poli-user/poli-user.dto';
import { InquiryPoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliUserSchema } from 'src/interfaces/schemas/poli-user.schema.interface';
import { IPoliUserService } from 'src/interfaces/services/poli-user.service.interface';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { ValueError } from 'src/internal/errors/value.error';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { UserRepository } from 'src/internal/repositories/typeorm/user.repository';
import { PoliRepository } from 'src/internal/repositories/typeorm/poli.repository';
import { In } from 'typeorm';
import { IPoliUserRepository } from 'src/interfaces/repositories/type-orm/poli-user.repository.interface';

@Injectable()
export class PoliUserService implements IPoliUserService {
  constructor(
    private readonly poli_repo: PoliRepository,
    private readonly user_repo: UserRepository,
    private readonly poli_user_repo: IPoliUserRepository,
    private readonly string_util: IStringUtil,
  ) {}

  async deletePoliUserBy(
    inquiry: InquiryPoliUserDto,
  ): Promise<[IPoliUserSchema, ErrorBase]> {
    if (inquiry == null || Object.keys(inquiry).length == 0) {
      return [null, null];
    }
    await this.poli_user_repo.delete(inquiry);
    return [null, null];
  }
  async checkInquiryExist<T extends InquiryPoliUserDto>(
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
        new ValueError('Id harus di assign pada inquiry poli user dto'),
      ];
    else if (inquiry.user_id == null && 'user_id' in column_hash)
      return [
        null,
        new ValueError('User id harus di assign pada inquiry poli user dto'),
      ];
    else if (inquiry.poli_id == null && 'poli_id' in column_hash)
      return [
        null,
        new ValueError('Poli id harus di assign pada inquiry poli user dto'),
      ];
    else return [inquiry, null];
  }
  async findUserBy(
    inquiry_poli?: InquiryPoliDto,
    inquiry_user?: InquiryUserDto,
  ): Promise<[IPoliUserSchema[], ErrorBase]> {
    const all_user = await this.user_repo.findBy(inquiry_user);
    const all_poli = await this.poli_repo.findBy(inquiry_poli);
    const user_ids = all_user.map((value) => value.id);
    const poli_ids = all_poli.map((value) => value.id);
    const poli = await this.poli_user_repo.find({
      where: {
        user_id: In(user_ids),
        poli_id: In(poli_ids),
      },
    });
    return [poli, null];
  }

  async createPoliUser(
    create: IPoliUserSchema,
  ): Promise<[IPoliUserSchema, ErrorBase]> {
    const poli = await this.poli_repo.findOneBy({
      id: create.poli_id,
    });
    if (poli == null) {
      throw new ValueError('Poli tidak ditemukan');
    }
    const [[user], error] = await this.inquiry({
      user_id: create.user_id,
      poli_id: create.poli_id,
    });
    if (error != null) {
      throw error;
    }
    if (user != null) {
      throw new ValueError('User tersebut sudah berada di poli itu');
    }
    if (user != null) {
      throw new ValueError('User tersebut sudah berada di Poli');
    }
    create.id = this.string_util.makeId('poli-user');
    const poli_user = await this.poli_user_repo.save(create);
    return [poli_user, null];
  }

  async updatePoliUserById(
    inquiry: InquiryPoliUserDto,
    poli_user: IPoliUserSchema,
  ): Promise<[IPoliUserSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    const [exist] = await this.inquiry({
      poli_id: poli_user.poli_id,
      user_id: poli_user.user_id,
    });
    if (exist.length > 0) {
      return [, new ValueError('User tersebut sudah ada di Poli')];
    }
    await this.poli_user_repo.update(
      {
        id: inquiry.id,
      },
      poli_user,
    );
    poli_user.id = inquiry.id;
    return [poli_user, null];
  }
  async deletePoliUserById(
    inquiry: InquiryPoliUserDto,
  ): Promise<[IPoliUserSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    await this.poli_user_repo.delete({
      id: inquiry.id,
    });
    return [null, null];
  }
  async findById(
    inquiry: InquiryPoliUserDto,
  ): Promise<[IPoliUserSchema, ErrorBase]> {
    const [, error_cek] = await this.checkInquiryExist(inquiry, ['id']);
    if (error_cek) {
      return [null, error_cek];
    }
    await this.poli_user_repo.findOneBy({
      id: inquiry.id,
    });
  }
  async findByPoliId(
    inquiry: InquiryPoliUserDto | InquiryPoliUserDto[],
  ): Promise<[IPoliUserSchema[], ErrorBase]> {
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
    const poli_user = await this.poli_user_repo.find({
      where: {
        poli_id: In(poli_ids),
      },
    });
    return [poli_user, null];
  }
  async findByUserId(
    inquiry: InquiryPoliUserDto | InquiryPoliUserDto[],
  ): Promise<[IPoliUserSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    const user_ids = [];
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['user_id']);
      if (error_cek) {
        return [null, error_cek];
      }
      user_ids.push(inq.user_id);
    }
    const poli_user = await this.poli_user_repo.find({
      where: {
        user_id: In(user_ids),
      },
    });
    return [poli_user, null];
  }
  async inquiry(
    inquiry: InquiryPoliUserDto | InquiryPoliUserDto[],
  ): Promise<[IPoliUserSchema[], ErrorBase]> {
    if (!(inquiry instanceof Array)) {
      inquiry = [inquiry];
    }
    for (const inq of inquiry) {
      const [, error_cek] = await this.checkInquiryExist(inq, ['user_id']);
      if (error_cek) {
        return [null, error_cek];
      }
    }
    const poli_user = await this.poli_user_repo.find({
      where: inquiry,
    });
    return [poli_user, null];
  }
}
