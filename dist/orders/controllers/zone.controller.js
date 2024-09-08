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
exports.ZonesController = void 0;
const common_1 = require("@nestjs/common");
const zone_service_1 = require("../services/zone.service");
let ZonesController = class ZonesController {
    constructor(zoneService) {
        this.zoneService = zoneService;
    }
    async getZones(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Zones list'
        };
        const { items, count } = await this.zoneService.getZones(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting zones list";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async addZone(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.zoneService.addZone(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in adding zone";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async editZone(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.zoneService.editZone(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in editing zone";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async deleteZone(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.zoneService.deleteZone(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in deleting zone";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async addUserMapping(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.zoneService.addUserMapping(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in adding zone mapping";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async getUserMapping(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const { items, count } = await this.zoneService.getUserMapping(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting sub item list";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async getDeliverySlots(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Zones list'
        };
        const { items, count } = await this.zoneService.getDeliverySlots(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting zones list";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async addDeliverySlot(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.zoneService.addDeliverySlot(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in adding zone";
        }
        else {
            response.data = order;
        }
        return response;
    }
};
exports.ZonesController = ZonesController;
__decorate([
    (0, common_1.Post)('getZones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "getZones", null);
__decorate([
    (0, common_1.Post)('addZone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "addZone", null);
__decorate([
    (0, common_1.Post)('editZone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "editZone", null);
__decorate([
    (0, common_1.Post)('deleteZone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "deleteZone", null);
__decorate([
    (0, common_1.Post)('addUserMapping'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "addUserMapping", null);
__decorate([
    (0, common_1.Post)('getUserMapping'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "getUserMapping", null);
__decorate([
    (0, common_1.Post)('getDeliverySlots'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "getDeliverySlots", null);
__decorate([
    (0, common_1.Post)('addDeliverySlot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZonesController.prototype, "addDeliverySlot", null);
exports.ZonesController = ZonesController = __decorate([
    (0, common_1.Controller)('zones'),
    __metadata("design:paramtypes", [zone_service_1.ZonesService])
], ZonesController);
//# sourceMappingURL=zone.controller.js.map