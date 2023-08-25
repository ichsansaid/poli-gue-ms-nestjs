import { KasirSchema } from 'src/entities/schemas/kasir.schema';
import { Repository } from 'typeorm';

export class KasirRepository extends Repository<KasirSchema> {}
