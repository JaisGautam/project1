"use strict";
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Product, ProductSchema } from './schemas/product.schema';
// import { Proposal, ProposalSchema } from './schemas/proposal.schema';
// import { AILog, AILogSchema } from './schemas/aiLog.schema';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: Product.name, schema: ProductSchema },
//       { name: Proposal.name, schema: ProposalSchema },
//       { name: AILog.name, schema: AILogSchema },
//     ]),
//   ],
//   exports: [MongooseModule],
// })
// export class DatabaseModule {}
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema = require("./schemas/product.schema");
const proposal_schema_1 = require("./schemas/proposal.schema");
const aiLog_schema_1 = require("./schemas/aiLog.schema");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI),
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: proposal_schema_1.Proposal.name, schema: proposal_schema_1.ProposalSchema },
                { name: aiLog_schema_1.AILog.name, schema: aiLog_schema_1.AILogSchema },
            ]),
        ],
        exports: [mongoose_1.MongooseModule],
    })
], DatabaseModule);
