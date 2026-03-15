

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeminiService } from '../../ai/gemini.service';
import { prompts } from '../../ai/prompts';
import { Proposal, ProposalDocument } from '../../Database/schemas/proposal.schema';
import { AILoggerService } from '../../logger/AILogger.service';
import { GenerateProposalDto } from './dto/generate-proposal.dto';
import { ProposalResponseDto } from './dto/proposal-response.dto';
import { calculateBudgetAllocation, calculateImpact } from './calculators';

export interface ProductItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

@Injectable()
export class ProposalService {
  constructor(
    private geminiService: GeminiService,
    private aiLogger: AILoggerService,
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
  ) {}

  async generateProposal(dto: GenerateProposalDto): Promise<ProposalResponseDto> {
    try {
      console.log('📝 Generating proposal for budget:', dto.budget);
      
      // Generate prompt
      const prompt = prompts.proposalGeneration({
        budget: dto.budget,
        companyType: dto.companyType,
        goals: dto.sustainabilityGoals || []
      });
      
      // Call Gemini API
      const aiResponse = await this.geminiService.generateContent(
        prompt,
        'proposal-module',
        0.4,
        600,
      );

      console.log('🤖 AI Response received:', aiResponse.substring(0, 100) + '...');

      // Parse AI response
      let productMix: ProductItem[] = [];
      try {
        const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(cleanResponse);
        productMix = parsed.productMix || [];
      } catch (e) {
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
      const budgetCalc = calculateBudgetAllocation(productMix, dto.budget);
      const impact = calculateImpact(productMix);

      // Create response
      const proposalId = `prop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const response: ProposalResponseDto = {
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
      
    } catch (error) {
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

  private adjustToBudget(items: ProductItem[], budget: number): ProductItem[] {
    if (!items || items.length === 0) return [];
    
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

  async getRecentProposals(limit: number = 10): Promise<ProposalDocument[]> {
    try {
      return await this.proposalModel
        .find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
    } catch (error) {
      console.error('Error fetching recent proposals:', error);
      return [];
    }
  }

  async getProposalById(id: string): Promise<ProposalDocument | null> {
    try {
      return await this.proposalModel.findById(id).exec();
    } catch (error) {
      console.error('Error fetching proposal:', error);
      return null;
    }
  }
}