
import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { GeminiService } from '../../ai/gemini.service';
import { AILoggerService } from '../../logger/AILogger.service';
import { ConfigService } from '../../config/config.service';
import { Product, ProductSchema } from '../../Database/schemas/product.schema';
import { AILog, AILogSchema } from '../../Database/schemas/aiLog.schema';
import { Logger } from 'winston';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: AILog.name, schema: AILogSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService, 
    GeminiService,
    AILoggerService,  // ✅ Fixed: AiLoggerService → AILoggerService
    ConfigService
  ],
  exports: [CategoryService],
})
export class CategoryModule {}