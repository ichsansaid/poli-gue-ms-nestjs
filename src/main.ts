import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorBaseFilter } from './cmd/api/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const exc = new HttpException(
          {
            message: 'Invalid payload',
            errors: errors.map((value) => ({
              [value.property]: value.constraints,
            })),
          },
          400,
        );
        return exc;
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new ErrorBaseFilter());
  const config = new DocumentBuilder()
    .setTitle('Poli Gue Documentation API')
    .setDescription('API Descriptions')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
