
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { GenerateProposalDto } from './dto/generate-proposal.dto';
import { ProposalResponseDto } from './dto/proposal-response.dto';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generate(@Body() dto: GenerateProposalDto): Promise<ProposalResponseDto> {
    return this.proposalService.generateProposal(dto);
  }
}