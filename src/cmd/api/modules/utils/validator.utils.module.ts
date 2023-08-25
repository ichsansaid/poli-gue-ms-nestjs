import { Module } from '@nestjs/common';
import { IValidatorUtils } from 'src/interfaces/utils/validator.util.interface';
import { ValidatorUtils } from 'src/internal/utils/validator.util';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IValidatorUtils,
      useClass: ValidatorUtils,
    },
  ],
  exports: [IValidatorUtils],
})
export class ValidatorUtilsModule {}
