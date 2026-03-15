// // // // import { Module } from '@nestjs/common';
// // // // import { MongooseModule } from '@nestjs/mongoose';
// // // // import { ConfigModule } from './config/config.module';
// // // // import { ConfigService } from './config/config.service';  // ✅ Import
// // // // import { CategoryModule } from './modules/category/category.module';
// // // // import { ProposalModule } from './modules/proposal/proposal.module';

// // // // @Module({
// // // //   imports: [
// // // //     // 1. Config module - env vars load karega
// // // //     ConfigModule,
    
// // // //     // 2. MongoDB connection with async configuration
// // // //     MongooseModule.forRootAsync({
// // // //       imports: [ConfigModule],  // ConfigModule available karo
// // // //       useFactory: (configService: ConfigService) => {
// // // //         const uri = configService.getMongoUri();
// // // //         console.log('📦 Connecting to MongoDB:', uri);  // Debug log
// // // //         return { uri };
// // // //       },
// // // //       inject: [ConfigService],  // ConfigService inject karo
// // // //     }),
    
// // // //     // 3. Feature modules
// // // //     CategoryModule,
// // // //     ProposalModule,
// // // //   ],
// // // // })
// // // // export class AppModule {}


// // // import { Module } from '@nestjs/common';
// // // import { ConfigModule } from '@nestjs/config';
// // // import { DatabaseModule } from './database/database.module';
// // // import { GeminiModule } from './gemini/gemini.module';
// // // import { ProductModule } from './product/product.module';
// // // import { ProposalModule } from './proposal/proposal.module';
// // // import { AILoggerModule } from './logger/ai-logger.module';
// // // import { AppController } from './app.controller';
// // // import { ConfigService } from './config/config.service';

// // // @Module({
// // //   imports: [
// // //     ConfigModule.forRoot({
// // //       isGlobal: true,
// // //       envFilePath: '.env',
// // //     }),
// // //     DatabaseModule,
// // //     GeminiModule,
// // //     ProductModule,
// // //     ProposalModule,
// // //     AILoggerModule,
// // //   ],
// // //   controllers: [AppController],
// // //   providers: [ConfigService],
// // // })
// // // export class AppModule {}

// // import { Module } from '@nestjs/common';
// // import { ConfigModule } from '@nestjs/config';

// // import { DatabaseModule } from './database/database.module';

// // import { ProposalModule } from '.';
// // import { GeminiModule } from './gemini/gemini.module';
// // import { AILoggerModule } from './logger/ai-logger.module';

// // import { AppController } from './app.controller';

// // @Module({
// //   imports: [

// //     ConfigModule.forRoot({
// //       isGlobal: true
// //     }),

// //     DatabaseModule,
// //     ProductModule,
// //     ProposalModule,
// //     GeminiModule,
// //     AILoggerModule

// //   ],

// //   controllers: [AppController]

// // })

// // export class AppModule {}

// // import { Module } from '@nestjs/common';
// // import { ConfigModule } from '@nestjs/config';


// // @Module({
// //   imports: [
// //     ConfigModule.forRoot({
// //       isGlobal: true
// //     }),
    
// //   ],
// // })
// // export class AppModule {}


// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
//     MongooseModule.forRoot(process.env.MONGODB_URI),
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { CategoryModule } from './modules/category/category.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI),

    CategoryModule,
    ProposalModule,
  AppController,
  ],
})
export class AppModule {}