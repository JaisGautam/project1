

import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  confidence: number;

  @ApiProperty({ type: [String] })
  criteria: string[];

  @ApiProperty({ type: [String] })
  examples: string[];

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  productId?: string;

  @ApiProperty({ required: false })
  productName?: string;

  @ApiProperty({ required: false })
  isAIGenerated?: boolean;
}