"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompts = void 0;
exports.prompts = {
    // CATEGORY GENERATION PROMPT
    categoryGeneration: (input) => {
        return `You are a JSON-only API. Your response must contain ONLY valid JSON, no other text.

Analyze this sustainable product and return a JSON object with these exact fields:
- primaryCategory: string (one of: "Electronics", "Fashion", "Home", "Personal Care", "Food", "Other")
- subCategory: string (more specific, 2-3 words)
- tags: array of 5-10 strings (SEO-friendly tags)
- sustainabilityFilters: array of strings (applicable from: "plastic-free", "vegan", "compostable", "recycled", "local", "organic", "fair-trade")

Product Name: ${input.productName}
Description: ${input.productDescription}

IMPORTANT: Return ONLY the JSON object. No markdown, no explanations, no backticks.`;
    },
    // PROPOSAL GENERATION PROMPT
    proposalGeneration: (input) => {
        return `You are a JSON-only API. Your response must contain ONLY valid JSON, no other text.

Generate a sustainable B2B proposal within ₹${input.budget} for ${input.companyType}.
Sustainability goals: ${input.goals.join(', ') || 'general sustainability'}

Return ONLY a JSON object with this exact structure:
{
  "productMix": [
    {
      "name": "string",
      "quantity": number,
      "unitPrice": number,
      "total": number
    }
  ]
}

Rules:
- total = quantity * unitPrice
- Sum of all totals must be less than ${input.budget}
- Include 3-5 different sustainable products
- Return ONLY the JSON object. No other text.`;
    }
};
