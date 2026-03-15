import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeminiService } from '../../ai/gemini.service';
import { prompts } from '../../ai/prompts';
import { Product, ProductDocument } from '../../Database/schemas/product.schema';
import { AILoggerService } from '../../logger/AILogger.service';
import { GenerateCategoryDto } from './dto/generate-categories.dto';

export interface CategoryOutput {
  productName: string;
  primaryCategory: string;
  subCategory: string;
  tags: string[];
  sustainabilityFilters: string[];
  status: 'success' | 'error';
  timestamp: string;
}

@Injectable()
export class CategoryService {
  constructor(
    private geminiService: GeminiService,
    private AILogger: AILoggerService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // ============= MAIN METHOD =============
  async generateMetadata(dto: GenerateCategoryDto): Promise<CategoryOutput> {
    try {
      console.log('📝 Generating metadata for:', dto.productName);
      
      const prompt = prompts.categoryGeneration({
        productName: dto.productName,
        productDescription: dto.description
      });

      const aiResponse = await this.geminiService.generateContent(
        prompt,
        'category-module',
        0.3,
        500,
      );

      console.log('🤖 Raw AI Response:', aiResponse.substring(0, 200) + '...');

      // Parse AI response
      let parsedData;
      try {
        // Remove markdown code blocks if present
        let cleanResponse = aiResponse
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        
        // Try to find JSON object if there's extra text
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanResponse = jsonMatch[0];
        }
        
        parsedData = JSON.parse(cleanResponse);
        console.log('✅ Successfully parsed AI response');
        
      } catch (parseError) {
        console.warn('⚠️ Failed to parse AI response, using fallback');
        console.warn('Parse error:', parseError.message);
        
        // Intelligent fallback based on product name
        parsedData = this.generateFallbackData(dto.productName, dto.description);
      }

      // Validate required fields
      const output: CategoryOutput = {
        productName: dto.productName,
        primaryCategory: parsedData.primaryCategory || 'Other',
        subCategory: parsedData.subCategory || this.generateSubCategory(dto.productName),
        tags: Array.isArray(parsedData.tags) ? parsedData.tags.slice(0, 10) : this.generateTags(dto.productName),
        sustainabilityFilters: Array.isArray(parsedData.sustainabilityFilters) 
          ? parsedData.sustainabilityFilters.slice(0, 5) 
          : this.generateFilters(dto.productName),
        status: 'success',
        timestamp: new Date().toISOString(),
      };

      // Save to database
      const product = new this.productModel({
        productName: dto.productName,
        primaryCategory: output.primaryCategory,
        subCategory: output.subCategory,
        tags: output.tags,
        filters: output.sustainabilityFilters,
        description: dto.description,
        createdAt: new Date(),
      });
      
      await product.save();
      console.log('💾 Saved to database');

      return output;
      
    } catch (error) {
      console.error('❌ Category service error:', error.message);
      
      return {
        productName: dto.productName,
        primaryCategory: 'Other',
        subCategory: this.generateSubCategory(dto.productName),
        tags: this.generateTags(dto.productName),
        sustainabilityFilters: this.generateFilters(dto.productName),
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  // ============= RECENT PRODUCTS METHOD =============
  async getRecentProducts(limit: number = 10): Promise<ProductDocument[]> {
    try {
      console.log(`📋 Fetching ${limit} recent products...`);
      const products = await this.productModel
        .find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
      
      console.log(`✅ Found ${products.length} products`);
      return products;
    } catch (error) {
      console.error('❌ Error fetching recent products:', error.message);
      return [];
    }
  }

  // ============= GET PRODUCT BY ID METHOD =============
  async getProductById(id: string): Promise<ProductDocument | null> {
    try {
      return await this.productModel.findById(id).exec();
    } catch (error) {
      console.error('❌ Error fetching product:', error.message);
      return null;
    }
  }

  // ============= HELPER METHODS =============
  private generateFallbackData(productName: string, description: string): any {
    const categories = ['Electronics', 'Fashion', 'Home', 'Personal Care', 'Food', 'Other'];
    let category = 'Other';
    
    // Simple keyword matching
    if (productName.toLowerCase().includes('toothbrush')) category = 'Personal Care';
    else if (productName.toLowerCase().includes('shirt')) category = 'Fashion';
    else if (productName.toLowerCase().includes('bottle')) category = 'Home';
    
    return {
      primaryCategory: category,
      subCategory: this.generateSubCategory(productName),
      tags: this.generateTags(productName),
      sustainabilityFilters: this.generateFilters(productName)
    };
  }

  private generateSubCategory(productName: string): string {
    if (productName.toLowerCase().includes('toothbrush')) return 'Oral Care';
    if (productName.toLowerCase().includes('shirt')) return 'Apparel';
    if (productName.toLowerCase().includes('bottle')) return 'Kitchenware';
    return 'General';
  }

  private generateTags(productName: string): string[] {
    const words = productName.toLowerCase().split(' ');
    const tags = new Set(['sustainable', 'eco-friendly', ...words]);
    return Array.from(tags).slice(0, 8);
  }

  private generateFilters(productName: string): string[] {
    const filters = ['eco-friendly'];
    if (productName.toLowerCase().includes('bamboo')) filters.push('biodegradable');
    if (productName.toLowerCase().includes('plastic')) filters.push('recycled');
    return filters;
  }
}