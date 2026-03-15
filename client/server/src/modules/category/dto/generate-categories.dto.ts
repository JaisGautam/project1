

import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class GenerateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  productName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  description: string;
}