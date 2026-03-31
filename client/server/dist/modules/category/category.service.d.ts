import { Model } from 'mongoose';
import { GeminiService } from '../../ai/gemini.service';
import { ProductDocument } from '../../Database/schemas/product.schema';
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
export declare class CategoryService {
    private geminiService;
    private AILogger;
    private productModel;
    constructor(geminiService: GeminiService, AILogger: AILoggerService, productModel: Model<ProductDocument>);
    generateMetadata(dto: GenerateCategoryDto): Promise<CategoryOutput>;
    getRecentProducts(limit?: number): Promise<ProductDocument[]>;
    getProductById(id: string): Promise<ProductDocument | null>;
    private generateFallbackData;
    private generateSubCategory;
    private generateTags;
    private generateFilters;
}
