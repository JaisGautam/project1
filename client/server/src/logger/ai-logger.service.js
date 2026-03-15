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
exports.AILoggerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aiLog_schema_1 = require("../Database/schemas/aiLog.schema");
let AILoggerService = class AILoggerService {
    constructor(aiLogModel) {
        this.aiLogModel = aiLogModel;
    }
    // ✅ Update method signature
    async logInteraction(data) {
        try {
            const log = new this.aiLogModel({
                ...data,
                timestamp: new Date(),
            });
            const saved = await log.save();
            if (process.env.NODE_ENV === 'development') {
                console.log(`[AI Log] Module: ${data.module}, Status: ${data.status}`);
            }
            return saved;
        }
        catch (error) {
            console.error('Failed to save AI log:', error);
            throw error;
        }
    }
    async getLogsByModule(module, limit = 100) {
        return this.aiLogModel
            .find({ module })
            .sort({ timestamp: -1 })
            .limit(limit)
            .exec();
    }
    async getRecentLogs(limit = 50) {
        return this.aiLogModel
            .find()
            .sort({ timestamp: -1 })
            .limit(limit)
            .exec();
    }
    async getErrorLogs(limit = 50) {
        return this.aiLogModel
            .find({ status: 'error' })
            .sort({ timestamp: -1 })
            .limit(limit)
            .exec();
    }
};
exports.AILoggerService = AILoggerService;
exports.AILoggerService = AILoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(aiLog_schema_1.AILog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AILoggerService);
