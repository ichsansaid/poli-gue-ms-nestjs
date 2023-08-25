import { InquiryUserDto } from 'src/entities/dtos/user/user.dto';
import { IAdminSchema } from 'src/interfaces/schemas/admin.schema.interface';
import { IApotekerSchema } from 'src/interfaces/schemas/apoteker.schema.interface';
import { IDokterSchema } from 'src/interfaces/schemas/dokter.schema.interface';
import { IKasirSchema } from 'src/interfaces/schemas/kasir.schema.interface';
import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { ErrorBase } from '../pkg/error.base';
import { ValueError } from '../errors/value.error';
import { NotFoundError } from '../errors/notfound.error';
import { Injectable } from '@nestjs/common';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { UserRepository } from '../repositories/typeorm/user.repository';
import { DokterRepository } from '../repositories/typeorm/dokter.repository';
import { KasirRepository } from '../repositories/typeorm/kasir.repository';
import { ApotekerRepository } from '../repositories/typeorm/apoteker.repository';
import { AdminRepository } from '../repositories/typeorm/admin.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly string_util?: IStringUtil,
    private readonly user_repo?: UserRepository,
    private readonly dokter_repo?: DokterRepository,
    private readonly apoteker_repo?: ApotekerRepository,
    private readonly kasir_repo?: KasirRepository,
    private readonly admin_repo?: AdminRepository,
  ) {}
  async isSamePassword(
    user: IUserSchema,
    password: string,
  ): Promise<[boolean, ErrorBase]> {
    return [user.password == (await this.string_util.hashMd5(password)), null];
  }
  async findByUsername(
    inquiry: InquiryUserDto,
  ): Promise<[IUserSchema, ErrorBase]> {
    if (inquiry.username == null) {
      return [, new ValueError('Username harus di assign')];
    }
    const user = await this.user_repo.findOneBy({
      username: inquiry.username,
    });
    return [user, null];
  }
  async getUserRole(
    user: IUserSchema,
  ): Promise<
    [[IDokterSchema, IApotekerSchema, IKasirSchema, IAdminSchema], ErrorBase]
  > {
    const user_role = await Promise.all([
      this.dokter_repo.findOneBy({ user_id: user.id }),
      this.apoteker_repo.findOneBy({ user_id: user.id }),
      this.kasir_repo.findOneBy({ user_id: user.id }),
      this.admin_repo.findOneBy({ user_id: user.id }),
    ]);
    return [user_role, null];
  }
  async updateUserById(
    id: string,
    user: IUserSchema,
  ): Promise<[IUserSchema, ErrorBase]> {
    delete user.id;
    if (Object.keys(user).length == 0) {
      return [user, null];
    }
    if (user.username != undefined) {
      const inquiry = await this.user_repo.findOneBy({
        username: user.username,
      });
      if (inquiry != null && inquiry.id != id) {
        return [null, new ValueError('Username telah tersedia')];
      }
    }
    await this.user_repo.update({ id: id }, user);
    return [user, null];
  }

  async hasById(
    inquiry: InquiryUserDto,
  ): Promise<[[boolean, IUserSchema], ErrorBase]> {
    const [result, error] = await this.findById(inquiry);
    if (error != null) {
      return [, error];
    }
    return [[result != null, result], null];
  }

  async createUser(user: IUserSchema): Promise<[IUserSchema, ErrorBase]> {
    const inquiry = await this.user_repo.findOneBy({
      username: user.username,
    });
    if (inquiry != null) {
      return [null, new ValueError('Username telah tersedia')];
    }
    user.password = await this.string_util.hashMd5(user.password);
    const result = await this.user_repo.save(user);
    return [result, null];
  }
  async deleteUser(user: IUserSchema): Promise<[IUserSchema, ErrorBase]> {
    const [[has_user, result], error] = await this.hasById({
      id: user.id,
    });
    if (error != null) {
      return [, error];
    }
    if (!has_user) {
      return [, new NotFoundError('Data tidak ditemukan')];
    }
    await this.user_repo.delete({ id: result.id });
    this.admin_repo.delete({ user_id: result.id });
    this.dokter_repo.delete({ user_id: result.id });
    this.kasir_repo.delete({ user_id: result.id });
    this.apoteker_repo.delete({ user_id: result.id });
    return [user, null];
  }
  async saveUser(user: IUserSchema): Promise<[IUserSchema, ErrorBase]> {
    if (user.id == null) {
      return [, new ValueError('Id harus ada pada parameter user')];
    }
    if (user.username != undefined) {
      const inquiry = await this.user_repo.findOneBy({
        username: user.username,
      });
      if (inquiry != null && inquiry.id != user.id) {
        return [null, new ValueError('Username telah tersedia')];
      }
    }
    await this.user_repo.update({ id: user.id }, user);
    return [user, null];
  }
  async findById(inquiry: InquiryUserDto): Promise<[IUserSchema, ErrorBase]> {
    if (inquiry.id == null) {
      return [, new ValueError('Id harus di assign pada inquiry user')];
    }
    const result = await this.user_repo.findOneBy(inquiry);
    return [result, null];
  }
  async inquiry(inquiry: InquiryUserDto): Promise<[IUserSchema[], ErrorBase]> {
    return [await this.user_repo.findBy(inquiry), null];
  }
  async saveToDokter(user: IUserSchema): Promise<[IDokterSchema, ErrorBase]> {
    if (user.id == null) {
      return [, new ValueError('Id harus di assign terlebih dahulu')];
    }
    let dokter: IDokterSchema = await this.dokter_repo.findOneBy({
      user_id: user.id,
    });
    if (dokter == null) {
      dokter = new IDokterSchema({ user_id: user.id });
      dokter = await this.dokter_repo.save(dokter);
    }
    return [dokter, null];
  }
  async saveToApoteker(
    user: IUserSchema,
  ): Promise<[IApotekerSchema, ErrorBase]> {
    if (user.id == null) {
      return [, new ValueError('Id harus di assign terlebih dahulu')];
    }
    let apoteker: IApotekerSchema = await this.apoteker_repo.findOneBy({
      user_id: user.id,
    });
    if (apoteker == null) {
      apoteker = new IApotekerSchema({ user_id: user.id });
      apoteker = await this.apoteker_repo.save(apoteker);
    }
    return [apoteker, null];
  }
  async saveToKasir(user: IUserSchema): Promise<[IKasirSchema, ErrorBase]> {
    if (user.id == null) {
      return [, new ValueError('Id harus di assign terlebih dahulu')];
    }
    let kasir: IKasirSchema = await this.kasir_repo.findOneBy({
      user_id: user.id,
    });
    if (kasir == null) {
      kasir = new IKasirSchema({ user_id: user.id });
      kasir = await this.kasir_repo.save(kasir);
    }
    return [kasir, null];
  }
  async saveToAdmin(user: IUserSchema): Promise<[IAdminSchema, ErrorBase]> {
    if (user.id == null) {
      return [, new ValueError('Id harus di assign terlebih dahulu')];
    }
    let admin: IAdminSchema = await this.admin_repo.findOneBy({
      user_id: user.id,
    });
    if (admin == null) {
      admin = new IAdminSchema({ user_id: user.id });
      admin = await this.admin_repo.save(admin);
    }
    return [admin, null];
  }
}
