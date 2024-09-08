import { ItemsService } from '../services/items.service';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    getItems(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getItem(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addItem(reqBody: any, itemImage: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    editItem(reqBody: any, itemImage: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    getSubItems(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getSubItem(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addSubItem(reqBody: any, itemImage: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    editSubItem(reqBody: any, itemImage: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    addItemMapping(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    getItemMappings(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    deleteSubItem(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    deleteItem(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
}
