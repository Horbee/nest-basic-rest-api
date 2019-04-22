import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

/*
  For Heroku deploy:
  heroku config:set NPM_CONFIG_PRODUCTION=false
  heroku config:set NODE_ENV=production
*/