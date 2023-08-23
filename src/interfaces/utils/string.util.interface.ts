export abstract class IStringUtil {
  abstract makeId: (unique: any) => Promise<string>;
  abstract hashMd5: (teks: string) => Promise<string>;
  abstract snakeToPascalCase: (teks: string) => Promise<string>;
}
