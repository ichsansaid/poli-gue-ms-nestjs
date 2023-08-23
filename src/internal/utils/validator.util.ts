import { ValidationError, validate } from 'class-validator';
import { IValidatorUtils } from 'src/interfaces/utils/validator.util.interface';

export class ValidatorUtils extends IValidatorUtils {
  async validate(object: any): Promise<ValidationError[]> {
    if (!(object instanceof Array)) {
      object = [object];
    }
    let errors: ValidationError[] = [];
    for (const obj of object) {
      errors = errors.concat(await validate(obj));
    }
    return errors;
  }
}
