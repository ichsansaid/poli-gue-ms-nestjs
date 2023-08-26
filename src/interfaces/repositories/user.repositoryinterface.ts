import { IUserSchema } from '../schemas/user.schema.interface';
import { InquiryUserDto } from 'src/entities/dtos/user/user.dto';

export interface IUserRepository {
  create(user_dto: IUserSchema): Promise<IUserSchema>;
  save(user_dto: IUserSchema): Promise<IUserSchema>;
  delete(user_dto: IUserSchema): Promise<IUserSchema>;
  deletes(user_dto: IUserSchema[]): Promise<IUserSchema[]>;
  deleteByInquiry(inquiry_dto: InquiryUserDto): Promise<IUserSchema[]>;

  inquiry(
    inquiry_dto: InquiryUserDto | InquiryUserDto[],
  ): Promise<IUserSchema[]>;
  getByUserId(inquiry_dto: InquiryUserDto): Promise<IUserSchema | undefined>;
}
