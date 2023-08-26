import { IPoliPasienObatSchema } from 'src/interfaces/schemas/poli-pasien-obat.schema.interface';
import { Repository } from 'typeorm';

export abstract class IPoliPasienObatRepository extends Repository<IPoliPasienObatSchema> {
  this: Repository<IPoliPasienObatSchema>;
}
