

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { GeminiService } from '../../ai/gemini.service';
import { AILoggerService } from '../../logger/AILogger.service';
import { ConfigService } from '../../config/config.service';
import { Proposal, ProposalSchema } from '../../Database/schemas/proposal.schema';
import { AILog, AILogSchema } from '../../Database/schemas/aiLog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
      { name: AILog.name, schema: AILogSchema },
    ]),
  ],
  controllers: [ProposalController],
  providers: [ProposalService, GeminiService, AILoggerService, ConfigService],
})
export class ProposalModule {}