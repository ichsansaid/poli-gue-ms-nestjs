import { IUserSchema } from 'src/interfaces/schemas/user.schema.interface';

export function IUserSchemaAdapter(schema: IUserSchema, data: any) {
  schema.nama_lengkap = data.nama_lengkap;
  schema.username = data.username;
  schema.password = data.password;
  return schema;
}
