export interface ProductItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export function calculateBudgetAllocation(
  productMix: ProductItem[],
  budget: number,
): {
  totalCost: number;
  budgetRemaining: number;
  items: ProductItem[];
} {
  const totalCost = productMix.reduce((sum, item) => sum + item.total, 0);
  
  return {
    totalCost,
    budgetRemaining: budget - totalCost,
    items: productMix,
  };
}

export function calculateImpact(productMix: ProductItem[]): {
  plasticSavedKg: number;
  carbonAvoidedKg: number;
  localSourcingPercent: number;
} {
  // Example logic - can be enhanced based on actual products
  const plasticSavedKg = productMix.reduce(
    (sum, item) => sum + item.quantity * 0.1, // 100g plastic saved per item
    0,
  );
  
  const carbonAvoidedKg = productMix.reduce(
    (sum, item) => sum + item.quantity * 0.5, // 500g CO2 avoided per item
    0,
  );
  
  return {
    plasticSavedKg: Math.round(plasticSavedKg * 10) / 10,
    carbonAvoidedKg: Math.round(carbonAvoidedKg * 10) / 10,
    localSourcingPercent: 75, // Example value
  };
}