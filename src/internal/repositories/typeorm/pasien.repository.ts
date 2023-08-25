import { IPasienSchema } from 'src/interfaces/schemas/pasien.schema.interface';
import { Repository } from 'typeorm';

export class PasienRepository extends Repository<IPasienSchema> {}
