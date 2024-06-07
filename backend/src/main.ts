import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

type CorsOptions = {
  origin: string;
  methods: string;
  allowedHeaders: string;
  credentials: boolean;
};

async function bootstrap() {
  // set cors options
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: true,
  };

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // enable cors
  app.enableCors(corsOptions);
  await app.listen(4000);
}
bootstrap();
