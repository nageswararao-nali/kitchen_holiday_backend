import { CategoriesEntity } from '../models/category.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private categoryRepo;
    constructor(categoryRepo: Repository<CategoriesEntity>);
    list(reqBody: any): Promise<any>;
}
