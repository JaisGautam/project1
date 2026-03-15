
// // // // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // // // import { Document } from 'mongoose';

// // // // export type ProductDocument = Product & Document;

// // // // @Schema()
// // // // export class Product {
// // // //   @Prop({ required: true })
// // // //   productName: string;

// // // //   @Prop({ required: true })
// // // //   description: string;  // ✅ Add this field

// // // //   @Prop({ required: true })
// // // //   primaryCategory: string;

// // // //   @Prop()
// // // //   subCategory: string;

// // // //   @Prop([String])
// // // //   tags: string[];

// // // //   @Prop([String])
// // // //   filters: string[];

// // // //   @Prop({ default: Date.now })
// // // //   createdAt: Date;
// // // // }

// // // // export const ProductSchema = SchemaFactory.createForClass(Product);

// // // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // // import { Document } from 'mongoose';

// // // export type ProductDocument = Product & Document;

// // // @Schema({ timestamps: true })
// // // export class Product {
// // //   @Prop({ required: true })
// // //   name: string;

// // //   @Prop()
// // //   description: string;

// // //   @Prop({ required: true })
// // //   category: string;

// // //   @Prop({ required: true })
// // //   price: number;

// // //   @Prop()
// // //   carbonFootprint: number;

// // //   @Prop()
// // //   sustainabilityScore: number;

// // //   @Prop({ type: Object })
// // //   metadata: Record<string, any>;
// // // }

// // // export const ProductSchema = SchemaFactory.createForClass(Product);

// // import { Module } from '@nestjs/common';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { ConfigService } from '../config/config.service';

// // @Module({
// //   imports: [
// //     MongooseModule.forRootAsync({
// //       useFactory: (configService: ConfigService) => ({
// //         uri: configService.getMongoUri(),
// //       }),
// //       inject: [ConfigService],
// //     }),
// //   ],
// // })
// // export class DatabaseModule {}

// export const prompts = {

//   categoryGeneration(input: {
//     productName: string;
//     productDescription: string;
//   }) {
//     return `Generate category for ${input.productName}`;
//   },

//   proposalGeneration(input: {
//     budget: number;
//     companyType: string;
//     goals: string[];
//   }) {
//     return `Generate proposal for ${input.companyType}`;
//   },

//   productAndCategoryGeneration(input: {
//     productName: string;
//     productDescription: string;
//   }) {
//     return `Generate product and category for ${input.productName}`;
//   }

// };


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

  @Prop()
  productName: string;

  @Prop()
  productDescription: string;

  @Prop()
  category: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);