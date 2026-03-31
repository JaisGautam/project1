export declare const prompts: {
    categoryGeneration(input: {
        productName: string;
        productDescription: string;
    }): string;
    proposalGeneration(input: {
        budget: number;
        companyType: string;
        goals: string[];
    }): string;
    productAndCategoryGeneration(input: {
        productName: string;
        productDescription: string;
    }): string;
};
