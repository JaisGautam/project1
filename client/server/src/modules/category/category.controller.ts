import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GenerateCategoryDto } from './dto/generate-categories.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generate(@Body() dto: GenerateCategoryDto) {
    return this.categoryService.generateMetadata(dto);
  }

  @Get('recent')
  async getRecent() {
    return this.categoryService.getRecentProducts();  // ✅ Ye line sahi hai
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getProductById(id);
  }
}