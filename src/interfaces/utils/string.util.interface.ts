export abstract class IStringUtil {
  abstract makeId: (unique: any) => Promise<string>;
  abstract hashMd5: (teks: string, times?: number) => Promise<string>;
  abstract snakeToPascalCase: (teks: string) => Promise<string>;
}
