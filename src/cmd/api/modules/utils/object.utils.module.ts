import { Module } from '@nestjs/common';
import { IObjectUtils } from 'src/interfaces/utils/object.util.interface';
import { ObjectUtils } from 'src/internal/utils/object.util';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IObjectUtils,
      useClass: ObjectUtils,
    },
  ],
  exports: [IObjectUtils],
})
export class ObjectUtilsModule {}
