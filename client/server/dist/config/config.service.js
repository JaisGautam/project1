"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
let ConfigService = class ConfigService {
    get(key) {
        return process.env[key];
    }
    getMongoUri() {
        return this.get('MONGODB_URI=mongodb+srv://jaisgautam:Amit123@cluster0.m1k5sz6.mongodb.net/ai-sustainability') || '';
    }
    getGeminiApiKey() {
        return this.get('GEMINI_API_KEY=AIzaSyBd-nlYa3COWpXeYrKUA5wzg-TtO_luMOM') || '';
    }
    getPort() {
        return Number(this.get('5000')) || 5000;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)()
], ConfigService);
//# sourceMappingURL=config.service.js.map