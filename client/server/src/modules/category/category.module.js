"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const gemini_service_1 = require("../../ai/gemini.service");
const AILogger_service_1 = require("../../logger/AILogger.service"); // ✅ Fixed: AiLoggerService → AILoggerService
const config_service_1 = require("../../config/config.service");
const product_schema_1 = require("../../Database/schemas/product.schema");
const aiLog_schema_1 = require("../../Database/schemas/aiLog.schema");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: aiLog_schema_1.AILog.name, schema: aiLog_schema_1.AILogSchema },
            ]),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [
            category_service_1.CategoryService,
            gemini_service_1.GeminiService,
            AILogger_service_1.AILoggerService, // ✅ Fixed: AiLoggerService → AILoggerService
            config_service_1.ConfigService
        ],
        exports: [category_service_1.CategoryService],
    })
], CategoryModule);
