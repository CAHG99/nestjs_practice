// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,             // Remueve propiedades que no están en el DTO
    forbidNonWhitelisted: true,  // Error si llegan propiedades no permitidas
    transform: true,             // Transforma payloads a instancias de clases DTO
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Usuarios')
    .setDescription('Documentación de la API de usuarios')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
dotenv.config();
