import { AdminSchema } from 'src/entities/schemas/admin.schema';
import { Repository } from 'typeorm';

export class AdminRepository extends Repository<AdminSchema> {}
