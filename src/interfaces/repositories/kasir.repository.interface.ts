import { InquiryUserDto } from 'src/entities/dtos/user/user.dto';
import { IKasirSchema } from '../schemas/kasir.schema.interface';

export interface IKasirRepository {
  create(kasir_dto: IKasirSchema): Promise<IKasirSchema>;
  save(kasir_dto: IKasirSchema): Promise<IKasirSchema>;
  delete(user_dto: IKasirSchema): Promise<IKasirSchema>;
  deletes(user_dto: IKasirSchema[]): Promise<IKasirSchema[]>;
  findByUserId(inquiry: InquiryUserDto): Promise<IKasirSchema>;
}
