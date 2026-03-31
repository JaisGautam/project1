export interface ProductItem {
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
}
export declare function calculateBudgetAllocation(productMix: ProductItem[], budget: number): {
    totalCost: number;
    budgetRemaining: number;
    items: ProductItem[];
};
export declare function calculateImpact(productMix: ProductItem[]): {
    plasticSavedKg: number;
    carbonAvoidedKg: number;
    localSourcingPercent: number;
};
