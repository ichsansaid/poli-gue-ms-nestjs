import { Module } from '@nestjs/common';
import { StringUtilsModule } from './string.utils.module';
import { ValidatorUtilsModule } from './validator.utils.module';
import { ObjectUtilsModule } from './object.utils.module';

@Module({
  imports: [StringUtilsModule, ValidatorUtilsModule, ObjectUtilsModule],
  exports: [StringUtilsModule, ValidatorUtilsModule, ObjectUtilsModule],
})
export class GeneralUtilsModule {}
