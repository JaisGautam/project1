import { ProposalService } from './proposal.service';
import { GenerateProposalDto } from './dto/generate-proposal.dto';
import { ProposalResponseDto } from './dto/proposal-response.dto';
export declare class ProposalController {
    private readonly proposalService;
    constructor(proposalService: ProposalService);
    generate(dto: GenerateProposalDto): Promise<ProposalResponseDto>;
}
