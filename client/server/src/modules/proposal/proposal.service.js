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
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gemini_service_1 = require("../../ai/gemini.service");
const prompts_1 = require("../../ai/prompts");
const proposal_schema_1 = require("../../Database/schemas/proposal.schema");
const AILogger_service_1 = require("../../logger/AILogger.service");
const calculators_1 = require("./calculators");
let ProposalService = class ProposalService {
    constructor(geminiService, aiLogger, proposalModel) {
        this.geminiService = geminiService;
        this.aiLogger = aiLogger;
        this.proposalModel = proposalModel;
    }
    async generateProposal(dto) {
        try {
            console.log('📝 Generating proposal for budget:', dto.budget);
            // Generate prompt
            const prompt = prompts_1.prompts.proposalGeneration({
                budget: dto.budget,
                companyType: dto.companyType,
                goals: dto.sustainabilityGoals || []
            });
            // Call Gemini API
            const aiResponse = await this.geminiService.generateContent(prompt, 'proposal-module', 0.4, 600);
            console.log('🤖 AI Response received:', aiResponse.substring(0, 100) + '...');
            // Parse AI response
            let productMix = [];
            try {
                const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
                const parsed = JSON.parse(cleanResponse);
                productMix = parsed.productMix || [];
            }
            catch (e) {
                console.warn('Failed to parse AI response, using fallback products');
                productMix = [
                    { name: 'Bamboo Pen Set', quantity: 50, unitPrice: 120, total: 6000 },
                    { name: 'Recycled Notebook', quantity: 50, unitPrice: 150, total: 7500 },
                    { name: 'Seed Paper Bookmarks', quantity: 100, unitPrice: 25, total: 2500 },
                ];
            }
            // Adjust to budget
            productMix = this.adjustToBudget(productMix, dto.budget);
            // Calculate budget and impact
            const budgetCalc = (0, calculators_1.calculateBudgetAllocation)(productMix, dto.budget);
            const impact = (0, calculators_1.calculateImpact)(productMix);
            // Create response
            const proposalId = `prop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
            const response = {
                proposalId,
                budget: dto.budget,
                productMix: budgetCalc.items,
                totalCost: budgetCalc.totalCost,
                budgetRemaining: budgetCalc.budgetRemaining,
                impactSummary: impact,
                status: 'success',
                timestamp: new Date().toISOString(),
            };
            // ✅ Save to database - ONLY with fields that exist in schema
            const proposal = new this.proposalModel({
                proposalId,
                budget: dto.budget,
                companyType: dto.companyType,
                sustainabilityGoals: dto.sustainabilityGoals || [],
                productMix: response.productMix,
                totalCost: response.totalCost,
                budgetRemaining: response.budgetRemaining,
                impactSummary: response.impactSummary,
                createdAt: new Date(),
                // ❌ Don't include extra fields
            });
            await proposal.save();
            console.log('💾 Saved to database');
            // Log success
            await this.aiLogger.logInteraction({
                module: 'proposal-module',
                prompt,
                response: aiResponse,
                status: 'success',
            });
            return response;
        }
        catch (error) {
            console.error('❌ Proposal service error:', error.message);
            await this.aiLogger.logInteraction({
                module: 'proposal-module',
                prompt: `Error: ${error.message}`,
                response: '',
                status: 'error',
                error: error.message,
            });
            return {
                proposalId: `error_${Date.now()}`,
                budget: dto.budget,
                productMix: [],
                totalCost: 0,
                budgetRemaining: dto.budget,
                impactSummary: {
                    plasticSavedKg: 0,
                    carbonAvoidedKg: 0,
                    localSourcingPercent: 0,
                },
                status: 'error',
                timestamp: new Date().toISOString(),
            };
        }
    }
    adjustToBudget(items, budget) {
        if (!items || items.length === 0)
            return [];
        let total = items.reduce((sum, item) => sum + (item.total || 0), 0);
        if (total <= budget) {
            return items;
        }
        const ratio = budget / total;
        return items.map(item => ({
            ...item,
            quantity: Math.floor(item.quantity * ratio),
            total: Math.floor(item.unitPrice * item.quantity * ratio),
        }));
    }
    async getRecentProposals(limit = 10) {
        try {
            return await this.proposalModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .exec();
        }
        catch (error) {
            console.error('Error fetching recent proposals:', error);
            return [];
        }
    }
    async getProposalById(id) {
        try {
            return await this.proposalModel.findById(id).exec();
        }
        catch (error) {
            console.error('Error fetching proposal:', error);
            return null;
        }
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(proposal_schema_1.Proposal.name)),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService,
        AILogger_service_1.AILoggerService,
        mongoose_2.Model])
], ProposalService);
