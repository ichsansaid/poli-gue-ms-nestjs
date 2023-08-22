export interface BasicUtils {
  validate: (object: any) => [];
  make_id: (unique: any) => string;
  hash_md5: (teks: string) => string;
}
