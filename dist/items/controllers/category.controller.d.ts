import { CategoryService } from '../services/category.service';
export declare class CategoriesController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    totalUsers(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
}
