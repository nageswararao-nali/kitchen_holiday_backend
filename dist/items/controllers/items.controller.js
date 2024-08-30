"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("../services/items.service");
const platform_express_1 = require("@nestjs/platform-express");
let ItemsController = class ItemsController {
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    async getItems(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Items list'
        };
        const { items, count } = await this.itemsService.list(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting categories list the user";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async getItem(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Item found'
        };
        const item = await this.itemsService.getItem(reqBody);
        if (!item) {
            response.success = false;
            response.message = "Problem in getting item";
        }
        else {
            response.data = item;
        }
        return response;
    }
    async addItem(reqBody, itemImage) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const odometerUpload = await this.itemsService.addItem(itemImage, reqBody);
        if (!odometerUpload) {
            response.success = false;
            response.message = "Problem in adding item";
        }
        else {
            response.data = odometerUpload;
        }
        return response;
    }
    async getSubItems(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Sub Items list'
        };
        const { items, count } = await this.itemsService.getSubItems(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting sub item list";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async getSubItem(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Item found'
        };
        const item = await this.itemsService.getSubItem(reqBody);
        if (!item) {
            response.success = false;
            response.message = "Problem in getting item";
        }
        else {
            response.data = item;
        }
        return response;
    }
    async addSubItem(reqBody, itemImage) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const odometerUpload = await this.itemsService.addSubItem(itemImage, reqBody);
        if (!odometerUpload) {
            response.success = false;
            response.message = "problem in adding sub item";
        }
        else {
            response.data = odometerUpload;
        }
        return response;
    }
    async addItemMapping(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const odometerUpload = await this.itemsService.addItemMapping(reqBody);
        if (!odometerUpload) {
            response.success = false;
            response.message = "problem in adding sub item";
        }
        else {
            response.data = odometerUpload;
        }
        return response;
    }
    async getItemMappings(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Sub Items list'
        };
        const { items, count } = await this.itemsService.getItemMappings(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting sub item list";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async deleteSubItem(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Item found'
        };
        const item = await this.itemsService.deleteSubItem(reqBody);
        if (!item) {
            response.success = false;
            response.message = "Problem in getting item";
        }
        else {
            response.data = item;
        }
        return response;
    }
    async deleteItem(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Item found'
        };
        const item = await this.itemsService.deleteItem(reqBody);
        if (!item) {
            response.success = false;
            response.message = "Problem in getting item";
        }
        else {
            response.data = item;
        }
        return response;
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getItems", null);
__decorate([
    (0, common_1.Post)('getItem'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getItem", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('itemImage')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)('getSubItems'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getSubItems", null);
__decorate([
    (0, common_1.Post)('getSubItem'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getSubItem", null);
__decorate([
    (0, common_1.Post)('addSubItem'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('itemImage')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "addSubItem", null);
__decorate([
    (0, common_1.Post)('addItemMapping'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "addItemMapping", null);
__decorate([
    (0, common_1.Post)('getItemMappings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getItemMappings", null);
__decorate([
    (0, common_1.Post)('deleteSubItem'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deleteSubItem", null);
__decorate([
    (0, common_1.Post)('deleteItem'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deleteItem", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map