import { ConfigService } from '../config/config.service';
import { AILoggerService } from '../logger/AILogger.service';
export declare class GeminiService {
    private configService;
    private aiLogger;
    private readonly logger;
    constructor(configService: ConfigService, aiLogger: AILoggerService);
    generateContent(prompt: string, module: string, temperature?: number, maxTokens?: number): Promise<string>;
    generateSustainabilityProposal(productData: any): Promise<string>;
}
