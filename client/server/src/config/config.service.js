"use strict";
// import { Injectable } from '@nestjs/common';
// import { ConfigService as NestConfigService } from '@nestjs/config';  // ✅ NestJS ka built-in config use karo
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
exports.ConfigService = void 0;
// @Injectable()
// export class ConfigService {
//   constructor(private configService: NestConfigService) {}  // ✅ Inject NestJS ConfigService
//   getGeminiApiKey(): string {
//     const key = this.configService.get<string>('GEMINI_API_KEY');  // ✅ NestJS config se lo
//     console.log('🔑 Gemini API Key loaded:', key ? 'Yes' : 'No');  // Debug log
//     if (!key) {
//       throw new Error('GEMINI_API_KEY is not defined in environment variables');
//     }
//     return key;
//   }
//   getMongoUri(): string {
//     return this.configService.get<string>('MONGODB_URI');
//   }
//   getPort(): number {
//     return this.configService.get<number>('PORT') || 5000;
//   }
// }
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ConfigService = class ConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    getGeminiApiKey() {
        const key = this.configService.get('GEMINI_API_KEY');
        if (!key) {
            throw new Error('GEMINI_API_KEY not found');
        }
        return key;
    }
    getMongoUri() {
        const uri = this.configService.get('MONGODB_URI');
        if (!uri) {
            throw new Error('MONGODB_URI not found');
        }
        return uri;
    }
    getPort() {
        return this.configService.get('PORT') || 5000;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigService);
