import { ValidationError } from 'class-validator';

export async function validate(object: any) {
  if (!(object instanceof Array)) {
    object = [object];
  }
  let errors: ValidationError[] = [];
  for (const obj of object) {
    errors = errors.concat(await validate(obj));
  }
  return errors;
}
