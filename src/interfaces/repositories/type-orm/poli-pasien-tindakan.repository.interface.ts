import { IPoliPasienTindakanSchema } from 'src/interfaces/schemas/poli-pasien-tindakan.schema.interface';
import { Repository } from 'typeorm';

export abstract class IPoliPasienTindakanRepository extends Repository<IPoliPasienTindakanSchema> {
  this: Repository<IPoliPasienTindakanSchema>;
}
