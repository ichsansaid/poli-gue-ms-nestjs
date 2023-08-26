import { UserSchema } from 'src/entities/schemas/user.schema';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<UserSchema> {}
