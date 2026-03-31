import { ConfigService } from '../config/config.service';
export declare class GeminiService {
    private configService;
    private readonly logger;
    private genAI;
    constructor(configService: ConfigService);
    generateProductAndCategories(input: {
        productName?: string;
        productDescription: string;
        industry?: string;
    }): Promise<{
        data: string;
    }>;
    generateSustainabilityCategories(input: {
        productName?: string;
        productDescription: string;
        industry?: string;
    }): Promise<{
        data: string;
    }>;
    generateSustainabilityProposal(input: {
        title: string;
        description: string;
        category: string;
        goals?: string[];
        constraints?: string;
    }): Promise<{
        data: string;
    }>;
}
