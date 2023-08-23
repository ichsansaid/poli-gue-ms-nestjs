export interface BasicUtils {
  validate: (object: any) => Promise<any[]>;
  make_id: (unique: any) => string;
  hash_md5: (teks: string) => string;
}
