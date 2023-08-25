import { IPoliPasienSchema } from 'src/interfaces/schemas/poli-pasien.schema.interface';
import { Repository } from 'typeorm';

export class PoliPasienRepository extends Repository<IPoliPasienSchema> {}
