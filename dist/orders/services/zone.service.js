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
const zoneMapping_entity_1 = require("../models/zoneMapping.entity");
let ZonesService = class ZonesService {
    constructor(zoneRepo, dsRepo, zoneMapRepo) {
        this.zoneRepo = zoneRepo;
        this.dsRepo = dsRepo;
        this.zoneMapRepo = zoneMapRepo;
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
            zipcode: reqBody.zipcode
        };
        if (reqBody.latitude) {
            subscription['latitude'] = reqBody.latitude;
            subscription['longitude'] = reqBody.longitude;
            subscription['location'] = `POINT(${reqBody.latitude} ${reqBody.longitude})`;
        }
        const zoneData = await this.zoneRepo.query(`SELECT *, ST_AsText(location) AS location FROM zones where name='${reqBody.name}' and zipcode='${reqBody.zipcode}' and latitude='${reqBody.latitude}';`);
        console.log("zoneData");
        console.log(zoneData);
        if (!zoneData.length) {
            console.log(subscription);
            const createdItem = await this.zoneRepo.save(subscription);
            return createdItem;
        }
        return zoneData;
    }
    async editZone(reqBody) {
        let subscription = {
            name: reqBody.name,
            coordinates: reqBody.coordinates
        };
        const createdItem = await this.zoneRepo.update({ id: reqBody.id }, subscription);
        return createdItem;
    }
    async deleteZone(reqBody) {
        const createdItem = await this.zoneRepo.delete({ id: reqBody.id });
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
    async addUserMapping(reqBody) {
        let mapping = await this.zoneMapRepo.findOneBy({ userId: reqBody.userId });
        if (!mapping) {
            let zipMap = {
                userId: reqBody.userId,
                zipcodes: reqBody.zipcodes
            };
            const createdItem = await this.zoneMapRepo.save(zipMap);
            return createdItem;
        }
        else {
            const createdItem = await this.zoneMapRepo.update({ userId: reqBody.userId }, { zipcodes: reqBody.zipcodes });
            return createdItem;
        }
    }
    async getUserMapping(reqBody) {
        const [items, count] = await this.zoneMapRepo.findAndCount({ where: { userId: reqBody.userId } });
        return { items, count };
    }
};
exports.ZonesService = ZonesService;
exports.ZonesService = ZonesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zone_entity_1.ZonesEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(deliverySlots_entity_1.DeliverySlotsEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(zoneMapping_entity_1.ZoneMappingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ZonesService);
//# sourceMappingURL=zone.service.js.map