import {
  CreateUserDto,
  EnumUserType,
  InquiryUserDto,
  UpdateUserDto,
} from 'src/entities/dtos/user/user.dto';
import { IUserDelivery } from 'src/interfaces/deliveries/user.delivery.interface';
import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';
import { Box } from '../pkg/box.base';
import { ErrorBase } from '../pkg/error.base';
import { ValueError } from '../errors/value.error';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { Injectable } from '@nestjs/common';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { IUserSchemaAdapter } from 'src/entities/adapters/user.schema.adapter';
import { UserSchema } from 'src/entities/schemas/user.schema';
import { IObjectUtils } from 'src/interfaces/utils/object.util.interface';
import { NotFoundError } from '../errors/notfound.error';

@Injectable()
export class UserDelivery implements IUserDelivery {
  constructor(
    private readonly string_utils: IStringUtil,
    private readonly user_service: IUserService,
    private readonly object_utils: IObjectUtils,
  ) {}

  async createUser(
    data: CreateUserDto,
  ): Promise<[Box<IUserSchema>, ErrorBase]> {
    const id = await this.string_utils.makeId('user');
    const user_schema: IUserSchema = new UserSchema();
    user_schema.id = id;
    IUserSchemaAdapter(user_schema, data);
    const [, error_create] = await this.user_service.createUser(user_schema);
    if (error_create != null) {
      return [, error_create];
    }
    const action = {
      [EnumUserType.APOTEKER]: this.user_service.saveToApoteker,
      [EnumUserType.DOKTER]: this.user_service.saveToDokter,
      [EnumUserType.KASIR]: this.user_service.saveToKasir,
      [EnumUserType.ADMIN]: this.user_service.saveToAdmin,
    };
    if (data.user_type in action) {
      const [, error_user_type] = await action[data.user_type].bind(
        this.user_service,
      )(user_schema);
      if (error_user_type != null) {
        return [null, error_user_type];
      }
    } else {
      return [null, new ValueError('USER TYPE TIDAK DITEMUKAN')];
    }
    return [
      {
        message: 'User berhasil ditambahkan',
        data: user_schema,
      },
      null,
    ];
  }
  async deleteUser(
    inquiry: InquiryUserDto,
  ): Promise<[Box<IUserSchema>, ErrorBase]> {
    const [data_user, error_inquiry] = await this.user_service.findById({
      id: inquiry.id,
    });
    if (error_inquiry != null) {
      return [null, error_inquiry];
    }
    if (!data_user) {
      throw new NotFoundError('User tidak ditemukan');
    }
    await this.user_service.deleteUser(data_user);
    return [
      {
        message: 'User berhasil dihapuskan',
        data: data_user,
      },
      null,
    ];
  }
  async inquiry(
    inquiry: InquiryUserDto,
  ): Promise<[Box<IUserSchema[]>, ErrorBase]> {
    const [results, error] = await this.user_service.inquiry(inquiry);
    if (error != null) {
      return [, error];
    }
    return [
      {
        message: 'Inquiry berhasil dilakukan',
        data: results,
      },
      null,
    ];
  }
  async updateUser(
    inquiry: InquiryUserDto,
    data: UpdateUserDto,
  ): Promise<[Box<IUserSchema>, ErrorBase]> {
    const [user, error] = await this.user_service.findById(inquiry);
    if (error != null) {
      return [, error];
    }
    const diff = await this.object_utils.getDifferentValue(user, data);
    const [savedUser, errorSave] = await this.user_service.updateUserById(
      user.id,
      diff,
    );
    if (errorSave != null) {
      return [, errorSave];
    }
    return [
      {
        message: 'User berhasil diperbaharui',
        data: savedUser,
      },
      null,
    ];
  }
}
