import { CategoryService } from './category.service';
import { GenerateCategoryDto } from './dto/generate-categories.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    generate(dto: GenerateCategoryDto): Promise<import("./category.service").CategoryOutput>;
    getRecent(): Promise<import("../../Database/schemas/product.schema").ProductDocument[]>;
    getById(id: string): Promise<import("../../Database/schemas/product.schema").ProductDocument>;
}
