

import { IsNumber, IsString, IsArray, IsOptional, Min, Max } from 'class-validator';

export class GenerateProposalDto {
  @IsNumber()
  @Min(1000)
  @Max(1000000)
  budget: number;

  @IsString()
  companyType: string;

  @IsArray()
  @IsOptional()
  sustainabilityGoals?: string[];
}