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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service"); // ✅ Tumhara ConfigService
const AILogger_service_1 = require("../logger/AILogger.service");
let GeminiService = class GeminiService {
    constructor(configService, // ✅ NestJS inject karega
    aiLogger) {
        this.configService = configService;
        this.aiLogger = aiLogger;
        // ✅ Constructor mein hi check kar lo
        const key = this.configService.getGeminiApiKey();
        console.log('🔑 GeminiService initialized with key');
    }
    async generateContent(prompt, module, temperature = 0.3, maxTokens = 500) {
        try {
            const apiKey = this.configService.getGeminiApiKey();
            // ✅ Use correct model name - choose ONE:
            const modelName = 'gemini-2.5-flash'; // Latest (recommended)
            // OR
            // const modelName = 'gemini-2.0-flash';  // Stable
            console.log(`📡 Calling Gemini API with model: ${modelName}`);
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature,
                        maxOutputTokens: maxTokens,
                    },
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ Gemini API Error:', errorData);
                throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
            }
            const data = await response.json();
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            await this.aiLogger.logInteraction({
                module,
                prompt,
                response: content,
                status: 'success',
            });
            return content;
        }
        catch (error) {
            console.error('❌ GeminiService error:', error.message);
            await this.aiLogger.logInteraction({
                module,
                prompt,
                response: '',
                status: 'error',
                error: error.message,
            });
            throw error;
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        AILogger_service_1.AILoggerService])
], GeminiService);
