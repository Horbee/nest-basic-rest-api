import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // disableErrorMessages: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Basic REST Api')
    .setDescription('The Description of the API')
    .setVersion('1.0')
    .addTag('REST')
    .build();

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(app, options),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

/*
  For Heroku deploy:
  heroku config:set NPM_CONFIG_PRODUCTION=false
  heroku config:set NODE_ENV=production
*/
