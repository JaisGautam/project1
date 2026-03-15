"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service"); // ✅ Import
const category_module_1 = require("./modules/category/category.module");
const proposal_module_1 = require("./modules/proposal/proposal.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // 1. Config module - env vars load karega
            config_module_1.ConfigModule,
            // 2. MongoDB connection with async configuration
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.ConfigModule], // ConfigModule available karo
                useFactory: (configService) => {
                    const uri = configService.getMongoUri();
                    console.log('📦 Connecting to MongoDB:', uri); // Debug log
                    return { uri };
                },
                inject: [config_service_1.ConfigService], // ConfigService inject karo
            }),
            // 3. Feature modules
            category_module_1.CategoryModule,
            proposal_module_1.ProposalModule,
        ],
    })
], AppModule);
