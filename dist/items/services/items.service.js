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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const item_entity_1 = require("../models/item.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subItem_entity_1 = require("../models/subItem.entity");
const itemMapping_entity_1 = require("../models/itemMapping.entity");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
let ItemsService = class ItemsService {
    constructor(itemModel, subItemModel, itemMappingModel, configService) {
        this.itemModel = itemModel;
        this.subItemModel = subItemModel;
        this.itemMappingModel = itemMappingModel;
        this.configService = configService;
    }
    findAll() {
        return this.itemModel.find();
    }
    findOne(id) {
        return this.itemModel.findOneBy({ id });
    }
    async list(reqBody) {
        const [items, count] = await this.itemModel.findAndCount({});
        return { items, count };
    }
    async getItem(reqBody) {
        const item = await this.itemModel.findOneBy({ id: reqBody.id });
        return item;
    }
    async addItem(file, reqBody) {
        let imagePath = "";
        if (file) {
            console.log("uploading file");
            const { originalname } = file;
            const bucketS3 = 'kitchen-holiday-images';
            const uploadedData = await this.uploadS3(file.buffer, bucketS3, originalname);
            imagePath = uploadedData.Location;
        }
        let item = {
            name: reqBody.name,
            category: reqBody.category,
            description: reqBody.description,
            image: imagePath,
            isVeg: reqBody.isVeg,
            price: reqBody.price
        };
        const createdItem = await this.itemModel.save(item);
        return createdItem;
    }
    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
    getS3() {
        return new aws_sdk_1.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
        });
    }
    async getSubItems(reqBody) {
        const [items, count] = await this.subItemModel.findAndCount({});
        return { items, count };
    }
    async getSubItem(reqBody) {
        const item = await this.subItemModel.findOneBy({ id: reqBody.id });
        return item;
    }
    async addSubItem(file, reqBody) {
        let imagePath = "";
        if (file) {
            const { originalname } = file;
            const bucketS3 = 'kitchen-holiday-images';
            const uploadedData = await this.uploadS3(file.buffer, bucketS3, originalname);
            imagePath = uploadedData.Location;
        }
        let item = {
            name: reqBody.name,
            description: reqBody.description,
            isVeg: reqBody.isVeg,
            image: imagePath,
            quantity: reqBody.quantity,
            price: reqBody.price
        };
        const createdItem = await this.subItemModel.save(item);
        return createdItem;
    }
    async addItemMapping(reqBody) {
        let mapping = await this.itemMappingModel.findOneBy({ itemId: reqBody.itemId });
        if (!mapping) {
            let item = {
                itemId: reqBody.itemId,
                subItemsIds: JSON.stringify(reqBody.subItemIds)
            };
            const createdItem = await this.itemMappingModel.save(item);
            return createdItem;
        }
        else {
            const createdItem = await this.itemMappingModel.update({ itemId: reqBody.itemId }, { subItemIds: JSON.stringify(reqBody.subItemIds) });
            return createdItem;
        }
    }
    async getItemMappings(reqBody) {
        const [items, count] = await this.itemMappingModel.findAndCount({ where: { itemId: reqBody.itemId } });
        return { items, count };
    }
    async deleteItem(reqBody) {
        const item = await this.itemModel.delete({ id: reqBody.id });
        return item;
    }
    async deleteSubItem(reqBody) {
        const item = await this.subItemModel.delete({ id: reqBody.id });
        return item;
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_entity_1.ItemEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(subItem_entity_1.SubItemEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(itemMapping_entity_1.ItemMappingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], ItemsService);
//# sourceMappingURL=items.service.js.map