"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBudgetAllocation = calculateBudgetAllocation;
exports.calculateImpact = calculateImpact;
function calculateBudgetAllocation(productMix, budget) {
    const totalCost = productMix.reduce((sum, item) => sum + item.total, 0);
    return {
        totalCost,
        budgetRemaining: budget - totalCost,
        items: productMix,
    };
}
function calculateImpact(productMix) {
    // Example logic - can be enhanced based on actual products
    const plasticSavedKg = productMix.reduce((sum, item) => sum + item.quantity * 0.1, // 100g plastic saved per item
    0);
    const carbonAvoidedKg = productMix.reduce((sum, item) => sum + item.quantity * 0.5, // 500g CO2 avoided per item
    0);
    return {
        plasticSavedKg: Math.round(plasticSavedKg * 10) / 10,
        carbonAvoidedKg: Math.round(carbonAvoidedKg * 10) / 10,
        localSourcingPercent: 75, // Example value
    };
}
