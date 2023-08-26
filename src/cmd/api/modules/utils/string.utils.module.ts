import { Module } from '@nestjs/common';
import { IStringUtil } from 'src/interfaces/utils/string.util.interface';
import { StringUtil } from 'src/internal/utils/string.util';

@Module({
  providers: [
    {
      provide: IStringUtil,
      useClass: StringUtil,
    },
  ],
  exports: [IStringUtil],
})
export class StringUtilsModule {}
