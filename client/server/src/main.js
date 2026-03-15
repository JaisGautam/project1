// "use strict";
// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';
// // import { ValidationPipe } from '@nestjs/common';
// // import * as dotenv from 'dotenv'; 
// Object.defineProperty(exports, "__esModule", { value: true });
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
// const core_1 = require("@nestjs/core");
// const app_module_1 = require("./app.module");
// const common_1 = require("@nestjs/common");
// const dotenv = require("dotenv");
// dotenv.config();
// async function bootstrap() {
//     const app = await core_1.NestFactory.create(app_module_1.AppModule);
//     app.useGlobalPipes(new common_1.ValidationPipe({
//         whitelist: true,
//         forbidNonWhitelisted: true,
//         transform: true,
//     }));
//     // CORS for frontend
//     app.enableCors({
//         origin: '*',
//     });
//     const port = process.env.PORT || 5000;
//     await app.listen(port);
//     console.log(`🚀 Server running on port ${port}`);
// }
// bootstrap()import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: '*',
  });

  const port = process.env.PORT || 5000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();;


