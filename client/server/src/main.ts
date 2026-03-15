// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';
// // import { ValidationPipe } from '@nestjs/common';
// // import * as dotenv from 'dotenv'; 

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
  
// //   // Enable validation
// //   app.useGlobalPipes(new ValidationPipe({
// //     whitelist: true,
// //     forbidNonWhitelisted: true,
// //     transform: true,
// //   }));
  
// //   // Enable CORS
// //   app.enableCors();
  
// //   const port = process.env.PORT || 5000;
// //   await app.listen(port);
// //   console.log(`🚀 Server running on http://localhost:${port}`);
// // }
// // bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';

// dotenv.config();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   // CORS for frontend
//   app.enableCors({
//     origin: '*',
//   });

//   const port = process.env.PORT || 5000;

//   await app.listen(port);

//   console.log(`🚀 Server running on port ${port}`);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global prefix (optional)
  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 5000;

  await app.listen(port, '0.0.0.0');
  
  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);
}

bootstrap();