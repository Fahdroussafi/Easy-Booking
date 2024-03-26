import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as express from 'express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('easy-booking Api')
    .setDescription('easy-booking API Description')
    .setVersion('0.1')
    .setExternalDoc('Postman Collection', '/api-json')
    .addTag('easy-booking')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    origin: '*',
  };
  app.enableCors(corsOptions);

  const configService = app.get(ConfigService);
  await app.listen(+configService.get('PORT') || 3001, '0.0.0.0');
}
bootstrap();
