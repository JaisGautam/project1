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
var GeminiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const generative_ai_1 = require("@google/generative-ai");
const prompts_1 = require("./prompts");
let GeminiService = GeminiService_1 = class GeminiService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(GeminiService_1.name);
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not defined');
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    }
    async generateProductAndCategories(input) {
        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = prompts_1.prompts.productAndCategoryGeneration({
                productName: input.productName || "",
                productDescription: input.productDescription
            });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return {
                data: text
            };
        }
        catch (error) {
            this.logger.error(`Gemini Error: ${error.message}`);
            throw error;
        }
    }
    async generateSustainabilityCategories(input) {
        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = prompts_1.prompts.categoryGeneration({
                productName: input.productName || "",
                productDescription: input.productDescription
            });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return {
                data: response.text()
            };
        }
        catch (error) {
            this.logger.error(`Gemini Error: ${error.message}`);
            throw error;
        }
    }
    async generateSustainabilityProposal(input) {
        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = prompts_1.prompts.proposalGeneration({
                budget: 1000,
                companyType: input.category,
                goals: input.goals || []
            });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return {
                data: response.text()
            };
        }
        catch (error) {
            this.logger.error(`Gemini Error: ${error.message}`);
            throw error;
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = GeminiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], GeminiService);
//# sourceMappingURL=service.js.map