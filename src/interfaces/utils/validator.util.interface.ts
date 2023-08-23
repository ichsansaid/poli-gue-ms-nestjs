export abstract class IValidatorUtils {
  abstract validate(object: any): Promise<any[]>;
}
