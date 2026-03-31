"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompts = void 0;
exports.prompts = {
    categoryGeneration(input) {
        return `Generate category for ${input.productName}`;
    },
    proposalGeneration(input) {
        return `Generate proposal for ${input.companyType}`;
    },
    productAndCategoryGeneration(input) {
        return `Generate product and category for ${input.productName}`;
    }
};
//# sourceMappingURL=prompts.js.map