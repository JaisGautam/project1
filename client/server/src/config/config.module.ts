// // // import { Module } from '@nestjs/common';
// // // import { ConfigModule as NestConfigModule } from '@nestjs/config';
// // // import { ConfigService } from './config.service';

// // // @Module({
// // //   imports: [
// // //     NestConfigModule.forRoot({
// // //       envFilePath: '.env',
// // //       isGlobal: true,  // ✅ Global banao
// // //     }),
// // //   ],
// // //   providers: [ConfigService],
// // //   exports: [ConfigService],
// // // })
// // // export class ConfigModule {}


// // import { Module } from '@nestjs/common';
// // import { ConfigService } from './config.service';

// // @Module({
// //   providers: [ConfigService],
// //   exports: [ConfigService],
// // })
// // export class ConfigModule {}


// // import { Module } from '@nestjs/common';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { ConfigService } from '../config/config.service';

// // @Module({
// //   imports: [
// //     MongooseModule.forRoot(process.env.MONGODB_URI),
// //   ],
// // })
// // // export class DatabaseModule {}


// // import { Module } from '@nestjs/common';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { ConfigModule } from '../config/config.module';

// // @Module({
// //   imports: [
// //     ConfigModule,
// //     MongooseModule.forRoot(process.env.MONGODB_URI || '')
// //   ],
// // })
// // export class ConfigModule {}

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
   
//     MongooseModule.forRoot(process.env.MONGODB_URI || '')
//   ],
// })
// export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],   // IMPORTANT
})
export class ConfigModule {}