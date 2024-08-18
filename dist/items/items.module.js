"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModule = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./services/items.service");
const items_controller_1 = require("./controllers/items.controller");
const item_entity_1 = require("./models/item.entity");
const users_module_1 = require("../users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./models/category.entity");
const category_service_1 = require("./services/category.service");
const category_controller_1 = require("./controllers/category.controller");
const subItem_entity_1 = require("./models/subItem.entity");
const itemMapping_entity_1 = require("./models/itemMapping.entity");
let ItemsModule = class ItemsModule {
};
exports.ItemsModule = ItemsModule;
exports.ItemsModule = ItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([item_entity_1.ItemEntity, category_entity_1.CategoriesEntity, subItem_entity_1.SubItemEntity, itemMapping_entity_1.ItemMappingEntity]),
            users_module_1.UsersModule,
        ],
        providers: [items_service_1.ItemsService, category_service_1.CategoryService],
        controllers: [items_controller_1.ItemsController, category_controller_1.CategoriesController],
        exports: [items_service_1.ItemsService]
    })
], ItemsModule);
//# sourceMappingURL=items.module.js.map