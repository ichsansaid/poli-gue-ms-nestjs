import { IApotekerSchema } from '../schemas/apoteker.schema.interface';

export interface IApotekerRepository {
  create(apoteker_dto: IApotekerSchema): Promise<IApotekerSchema>;
  save(apoteker_dto: IApotekerSchema): Promise<IApotekerSchema>;
  delete(user_dto: IApotekerSchema): Promise<IApotekerSchema>;
  deletes(user_dto: IApotekerSchema[]): Promise<IApotekerSchema[]>;
}
