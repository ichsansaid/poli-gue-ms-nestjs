import md5 = require('md5');
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { v4, v5 } from 'uuid';

export class StringUtil implements IStringUtil {
  async makeId(unique: any): Promise<string> {
    return v5(unique, v4());
  }
  async hashMd5(teks: string): Promise<string> {
    return md5(teks);
  }
  async snakeToPascalCase(snakeStr: string): Promise<string> {
    return snakeStr
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
}
