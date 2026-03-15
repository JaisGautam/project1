

export class ProductItemDto {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export class ImpactSummaryDto {
  plasticSavedKg: number;
  carbonAvoidedKg: number;
  localSourcingPercent: number;
}

export class ProposalResponseDto {
  proposalId: string;
  budget: number;
  productMix: ProductItemDto[];
  totalCost: number;
  budgetRemaining: number;
  impactSummary: ImpactSummaryDto;
  status: 'success' | 'error';
  timestamp: string;
}