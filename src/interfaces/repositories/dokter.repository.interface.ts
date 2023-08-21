import { IDokterSchema } from '../schemas/dokter.schema.interface';

export interface IDokterRepository {
  create(dokter_dto: IDokterSchema): Promise<IDokterSchema>;
  save(dokter_dto: IDokterSchema): Promise<IDokterSchema>;
  delete(user_dto: IDokterSchema): Promise<IDokterSchema>;
  deletes(user_dto: IDokterSchema[]): Promise<IDokterSchema[]>;
}
