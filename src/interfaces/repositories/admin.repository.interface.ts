import { InquiryUserDto } from 'src/entities/dtos/user/user.dto';
import { IAdminSchema } from '../schemas/admin.schema.interface';

export interface IAdminRepository {
  create(admin_dto: IAdminSchema): Promise<IAdminSchema>;
  save(admin_dto: IAdminSchema): Promise<IAdminSchema>;
  delete(user_dto: IAdminSchema): Promise<IAdminSchema>;
  deletes(user_dto: IAdminSchema[]): Promise<IAdminSchema[]>;
  findByUserId(inquiry: InquiryUserDto): Promise<IAdminSchema>;
}
