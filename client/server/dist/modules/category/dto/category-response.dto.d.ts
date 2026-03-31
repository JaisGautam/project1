export declare class CategoryResponseDto {
    id: string;
    name: string;
    description: string;
    confidence: number;
    criteria: string[];
    examples: string[];
    status: string;
    createdAt: Date;
    productId?: string;
    productName?: string;
    isAIGenerated?: boolean;
}
