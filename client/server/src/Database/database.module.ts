

// // // // import { Module } from '@nestjs/common';
// // // // import { MongooseModule } from '@nestjs/mongoose';
// // // // import { Product, ProductSchema } from './schemas/product.schema';
// // // // import { Proposal, ProposalSchema } from './schemas/proposal.schema';
// // // // import { AILog, AILogSchema } from './schemas/aiLog.schema';

// // // // @Module({
// // // //   imports: [
// // // //     MongooseModule.forFeature([
// // // //       { name: Product.name, schema: ProductSchema },
// // // //       { name: Proposal.name, schema: ProposalSchema },
// // // //       { name: AILog.name, schema: AILogSchema },
// // // //     ]),
// // // //   ],
// // // //   exports: [MongooseModule],
// // // // })
// // // // export class DatabaseModule {}


// // // import { Module } from '@nestjs/common';
// // // import { MongooseModule } from '@nestjs/mongoose';
// // // import { Product, ProductSchema } from './schemas/product.schema';
// // // import { Proposal, ProposalSchema } from './schemas/proposal.schema';
// // // import { AILog, AILogSchema } from './schemas/aiLog.schema';

// // // @Module({
// // //   imports: [
// // //     MongooseModule.forRoot(process.env.MONGODB_URI),

// // //     MongooseModule.forFeature([
// // //       { name: Product.name, schema: ProductSchema },
// // //       { name: Proposal.name, schema: ProposalSchema },
// // //       { name: AILog.name, schema: AILogSchema },
// // //     ]),
// // //   ],
// // //   exports: [MongooseModule],
// // // })
// // // export class DatabaseModule {}


// // import { Module } from '@nestjs/common';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { ConfigService } from '../config/config.service';
// // import { ConfigModule } from '../config/config.module';

// // @Module({
// //   imports: [
// //     MongooseModule.forRootAsync({
// //       imports: [ConfigModule],
// //       useFactory: async (configService: ConfigService) => ({
// //         uri: configService.getMongoUri(),
// //         connectionFactory: (connection) => {
// //           console.log('✅ MongoDB connected successfully');
// //           return connection;
// //         },
// //       }),
// //       inject: [ConfigService],
// //     }),
// //   ],
// //   exports: [MongooseModule],
// // })
// // export class DatabaseModule {}


// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigService } from '../config/config.service';
// import { ConfigModule } from '../config/config.module';

// import { Product, ProductSchema } from './schemas/product.schema';
// import { Proposal, ProposalSchema } from './schemas/proposal.schema';
// import { AILog, AILogSchema } from './schemas/aiLog.schema';

// @Module({
//   imports: [
//     // MongoDB connection
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.getMongoUri(),
//       }),
//       inject: [ConfigService],
//     }),

//     // Register schemas
//     MongooseModule.forFeature([
//       { name: Product.name, schema: ProductSchema },
//       { name: Proposal.name, schema: ProposalSchema },
//       { name: AILog.name, schema: AILogSchema },
//     ]),
//   ],

//   exports: [MongooseModule],
// })
// export class DatabaseModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

import { Product, ProductSchema } from './schemas/product.schema';
import { Proposal, ProposalSchema } from './schemas/proposal.schema';
import { AILog, AILogSchema } from './schemas/aiLog.schema';

@Module({
  imports: [
        ConfigModule,

    // MongoDB connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getMongoUri(),
      }),
      inject: [ConfigService],
    }),

    // Register schemas
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Proposal.name, schema: ProposalSchema },
      { name: AILog.name, schema: AILogSchema },
    ]),
  ],

  exports: [MongooseModule],
})
export class DatabaseModule {}