import md5 = require('md5');
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { v4, v5 } from 'uuid';

export class StringUtil implements IStringUtil {
  async makeId(unique: any): Promise<string> {
    return v5(unique, v4());
  }
  async hashMd5(teks: string, times: number = 1): Promise<string> {
    let hashed = teks;
    for (let i = 0; i < times; i++) {
      hashed = md5(hashed);
    }
    return hashed;
  }
  async snakeToPascalCase(snakeStr: string): Promise<string> {
    return snakeStr
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
}
