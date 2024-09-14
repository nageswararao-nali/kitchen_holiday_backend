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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLocationsEntity = void 0;
const typeorm_1 = require("typeorm");
let OrderLocationsEntity = class OrderLocationsEntity {
};
exports.OrderLocationsEntity = OrderLocationsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderLocationsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderLocationsEntity.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrderLocationsEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrderLocationsEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'point', spatialFeatureType: 'Point', srid: 4326, nullable: true }),
    __metadata("design:type", String)
], OrderLocationsEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderLocationsEntity.prototype, "created_at", void 0);
exports.OrderLocationsEntity = OrderLocationsEntity = __decorate([
    (0, typeorm_1.Entity)('order_locations')
], OrderLocationsEntity);
//# sourceMappingURL=orderLocations.entity.js.map