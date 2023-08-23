import { IObjectUtils } from 'src/interfaces/utils/object.util.interface';

export class ObjectUtils extends IObjectUtils {
  async getDifferentValue(source: any, data: any): Promise<any> {
    const diff = {};
    for (const key of Object.keys(data)) {
      if (key in source) {
        if (source[key] != data[key]) {
          diff[key] = data[key];
        }
      }
    }
    return diff;
  }
}
