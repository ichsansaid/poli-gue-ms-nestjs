import md5 from 'md5';
import { v4, v5 } from 'uuid';

export function snakeToPascal(snakeStr: string): string {
  return snakeStr
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

export function make_id(unique: string): string {
  return v5(unique, v4());
}

export function hash_md5(teks: string): string {
  return md5(teks);
}
