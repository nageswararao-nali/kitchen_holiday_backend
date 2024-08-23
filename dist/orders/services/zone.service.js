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
exports.ZonesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const zone_entity_1 = require("../models/zone.entity");
const deliverySlots_entity_1 = require("../models/deliverySlots.entity");
let ZonesService = class ZonesService {
    constructor(zoneRepo, dsRepo) {
        this.zoneRepo = zoneRepo;
        this.dsRepo = dsRepo;
    }
    findOne(id) {
        return this.zoneRepo.findOneBy({ id });
    }
    async getZones(reqBody) {
        let whereCon = {};
        const [items, count] = await this.zoneRepo.findAndCount({ where: whereCon, order: { created_at: 'DESC' } });
        return { items, count };
    }
    async addZone(reqBody) {
        let subscription = {
            name: reqBody.name,
            coordinates: reqBody.coordinates
        };
        const createdItem = await this.zoneRepo.save(subscription);
        return createdItem;
    }
    async getDeliverySlots(reqBody) {
        let whereCon = {};
        const [items, count] = await this.dsRepo.findAndCount({ where: whereCon, order: { created_at: 'DESC' } });
        return { items, count };
    }
    async addDeliverySlot(reqBody) {
        let subscription = {
            name: reqBody.name,
            startTime: reqBody.startTime,
            endTime: reqBody.endTime
        };
        const createdItem = await this.dsRepo.save(subscription);
        return createdItem;
    }
};
exports.ZonesService = ZonesService;
exports.ZonesService = ZonesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zone_entity_1.ZonesEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(deliverySlots_entity_1.DeliverySlotsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ZonesService);
//# sourceMappingURL=zone.service.js.map