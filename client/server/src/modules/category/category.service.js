"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gemini_service_1 = require("../../ai/gemini.service");
const prompts_1 = require("../../ai/prompts");
const product_schema_1 = require("../../Database/schemas/product.schema");
const AILogger_service_1 = require("../../logger/AILogger.service");
let CategoryService = class CategoryService {
    constructor(geminiService, AILogger, productModel) {
        this.geminiService = geminiService;
        this.AILogger = AILogger;
        this.productModel = productModel;
    }
    // ============= MAIN METHOD =============
    async generateMetadata(dto) {
        try {
            console.log('📝 Generating metadata for:', dto.productName);
            const prompt = prompts_1.prompts.categoryGeneration({
                productName: dto.productName,
                productDescription: dto.description
            });
            const aiResponse = await this.geminiService.generateContent(prompt, 'category-module', 0.3, 500);
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
            }
            catch (parseError) {
                console.warn('⚠️ Failed to parse AI response, using fallback');
                console.warn('Parse error:', parseError.message);
                // Intelligent fallback based on product name
                parsedData = this.generateFallbackData(dto.productName, dto.description);
            }
            // Validate required fields
            const output = {
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
        }
        catch (error) {
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
    async getRecentProducts(limit = 10) {
        try {
            console.log(`📋 Fetching ${limit} recent products...`);
            const products = await this.productModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .exec();
            console.log(`✅ Found ${products.length} products`);
            return products;
        }
        catch (error) {
            console.error('❌ Error fetching recent products:', error.message);
            return [];
        }
    }
    // ============= GET PRODUCT BY ID METHOD =============
    async getProductById(id) {
        try {
            return await this.productModel.findById(id).exec();
        }
        catch (error) {
            console.error('❌ Error fetching product:', error.message);
            return null;
        }
    }
    // ============= HELPER METHODS =============
    generateFallbackData(productName, description) {
        const categories = ['Electronics', 'Fashion', 'Home', 'Personal Care', 'Food', 'Other'];
        let category = 'Other';
        // Simple keyword matching
        if (productName.toLowerCase().includes('toothbrush'))
            category = 'Personal Care';
        else if (productName.toLowerCase().includes('shirt'))
            category = 'Fashion';
        else if (productName.toLowerCase().includes('bottle'))
            category = 'Home';
        return {
            primaryCategory: category,
            subCategory: this.generateSubCategory(productName),
            tags: this.generateTags(productName),
            sustainabilityFilters: this.generateFilters(productName)
        };
    }
    generateSubCategory(productName) {
        if (productName.toLowerCase().includes('toothbrush'))
            return 'Oral Care';
        if (productName.toLowerCase().includes('shirt'))
            return 'Apparel';
        if (productName.toLowerCase().includes('bottle'))
            return 'Kitchenware';
        return 'General';
    }
    generateTags(productName) {
        const words = productName.toLowerCase().split(' ');
        const tags = new Set(['sustainable', 'eco-friendly', ...words]);
        return Array.from(tags).slice(0, 8);
    }
    generateFilters(productName) {
        const filters = ['eco-friendly'];
        if (productName.toLowerCase().includes('bamboo'))
            filters.push('biodegradable');
        if (productName.toLowerCase().includes('plastic'))
            filters.push('recycled');
        return filters;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService,
        AILogger_service_1.AILoggerService,
        mongoose_2.Model])
], CategoryService);
