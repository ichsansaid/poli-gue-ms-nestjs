import { InquiryPoliUserDto } from 'src/entities/dtos/poli-user/poli-user.dto';
import { Box } from 'src/internal/pkg/box.base';
import { ErrorBase } from 'src/internal/pkg/error.base';
import { IPoliUserSchema } from '../schemas/poli-user.schema.interface';
import { IUserSchema } from '../schemas/user.schema.interface';
import { EnumUserType } from 'src/entities/dtos/user/user.dto';

export abstract class IPoliUserDelivery {
  abstract addPoliUser(
    data: IPoliUserSchema,
  ): Promise<[Box<IPoliUserSchema>, ErrorBase]>;

  abstract removePoliUser(
    inquiry: InquiryPoliUserDto,
  ): Promise<[Box<IPoliUserSchema>, ErrorBase]>;

  abstract getUser(
    inquiry: InquiryPoliUserDto,
    user_type?: EnumUserType,
  ): Promise<[Box<IUserSchema[]>, ErrorBase]>;
}
