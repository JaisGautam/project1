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
var OpenAIService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
const prompts_1 = require("./prompts");
let OpenAIService = OpenAIService_1 = class OpenAIService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(OpenAIService_1.name);
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not defined');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey,
        });
    }
    async generateProductAndCategories(input) {
        try {
            const prompt = prompts_1.prompts.productAndCategoryGeneration(input);
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a sustainability expert. Generate product details and categories.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000,
            });
            const response = completion.choices[0]?.message?.content;
            if (!response) {
                throw new Error('No response from OpenAI');
            }
            const parsedResponse = JSON.parse(response);
            return {
                data: parsedResponse,
                usage: {
                    totalTokens: completion.usage?.total_tokens || 0,
                },
            };
        }
        catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
    async generateSustainabilityCategories(input) {
        try {
            const prompt = prompts_1.prompts.categoryGeneration(input);
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a sustainability expert. Generate categories.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000,
            });
            const response = completion.choices[0]?.message?.content;
            if (!response) {
                throw new Error('No response from OpenAI');
            }
            const parsedResponse = JSON.parse(response);
            return {
                data: parsedResponse,
                usage: {
                    totalTokens: completion.usage?.total_tokens || 0,
                },
            };
        }
        catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
    async generateSustainabilityProposal(input) {
        try {
            const prompt = prompts_1.prompts.proposalGeneration(input);
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a sustainability consultant. Create proposals.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2500,
            });
            const response = completion.choices[0]?.message?.content;
            if (!response) {
                throw new Error('No response from OpenAI');
            }
            const parsedResponse = JSON.parse(response);
            return {
                data: parsedResponse,
                usage: {
                    totalTokens: completion.usage?.total_tokens || 0,
                },
            };
        }
        catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
};
exports.OpenAIService = OpenAIService;
exports.OpenAIService = OpenAIService = OpenAIService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenAIService);
