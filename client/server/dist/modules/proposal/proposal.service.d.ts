import { Model } from 'mongoose';
import { GeminiService } from '../../ai/gemini.service';
import { ProposalDocument } from '../../Database/schemas/proposal.schema';
import { AILoggerService } from '../../logger/AILogger.service';
import { GenerateProposalDto } from './dto/generate-proposal.dto';
import { ProposalResponseDto } from './dto/proposal-response.dto';
export interface ProductItem {
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
}
export declare class ProposalService {
    private geminiService;
    private aiLogger;
    private proposalModel;
    constructor(geminiService: GeminiService, aiLogger: AILoggerService, proposalModel: Model<ProposalDocument>);
    generateProposal(dto: GenerateProposalDto): Promise<ProposalResponseDto>;
    private adjustToBudget;
    getRecentProposals(limit?: number): Promise<ProposalDocument[]>;
    getProposalById(id: string): Promise<ProposalDocument | null>;
}
