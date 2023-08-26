import { InquiryPoliUserDto } from 'src/entities/dtos/poli-user/poli-user.dto';
import { IPoliUserDelivery } from 'src/interfaces/deliveries/poli-user.delivery.interface';
import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { IPoliUserSchema } from 'src/interfaces/schemas/poli-user.schema.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { Injectable } from '@nestjs/common';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { IPoliUserService } from 'src/interfaces/services/poli-user.service.interface';
import { EnumUserType, InquiryUserDto } from 'src/entities/dtos/user/user.dto';
import { NotFoundError } from '../errors/notfound.error';

@Injectable()
export class PoliUserDelivery implements IPoliUserDelivery {
  constructor(
    private readonly user_service: IUserService,
    private readonly poli_user_service: IPoliUserService,
  ) {}
  async addPoliUser(
    data: IPoliUserSchema,
  ): Promise<[Box<IPoliUserSchema>, ErrorBase]> {
    const [poli_user, error_poli_user] =
      await this.poli_user_service.createPoliUser({
        user_id: data.user_id,
        poli_id: data.poli_id,
      });
    if (error_poli_user != null) {
      throw error_poli_user;
    }
    return [
      {
        message: 'User berhasil ditambahkan pada Poli tersebut',
        data: poli_user,
      },
      null,
    ];
  }
  async removePoliUser(
    inquiry: InquiryPoliUserDto,
  ): Promise<[Box<IPoliUserSchema>, ErrorBase]> {
    const [[poli_user], error_poli_user] = await this.poli_user_service.inquiry(
      {
        user_id: inquiry.user_id,
        poli_id: inquiry.poli_id,
      },
    );
    if (error_poli_user != null) {
      throw error_poli_user;
    }
    if (poli_user == null) {
      throw new NotFoundError('Poli / user tidak ditemukan');
    }
    const [, error] = await this.poli_user_service.deletePoliUserBy(inquiry);
    if (error != null) {
      throw error;
    }
    return [
      {
        message: 'User berhasil dihapuskan dari poli tersebut',
        data: poli_user,
      },
      null,
    ];
  }
  async getUser(
    inquiry: InquiryPoliUserDto,
    user_type?: EnumUserType,
  ): Promise<[Box<IUserSchema[]>, ErrorBase]> {
    const [poli_user, error_poli_user] =
      await this.poli_user_service.findByPoliId({
        poli_id: inquiry.poli_id,
      });
    if (error_poli_user != null) {
      throw error_poli_user;
    }
    const user_ids: InquiryUserDto[] = poli_user.map((value) => ({
      id: value.user_id,
    }));
    if (user_ids.length == 0) {
      return [
        {
          message: 'User berhasil didapatkan',
          data: [],
        },
        null,
      ];
    }
    const [user_ids_final, error_final] =
      await this.user_service.findUserTypeByIds(user_type, user_ids);
    if (error_final != null) {
      throw error_final;
    }
    let users = [];
    if (user_ids_final.length > 0) {
      [users] = await this.user_service.inquiry(
        user_ids_final.map((value) => ({
          id: value.user_id,
        })),
      );
    }
    return [
      {
        message: 'User berhasil didapatkan',
        data: users.map((value) => ({
          ...value,
          password: '***',
        })),
      },
      null,
    ];
  }
}
