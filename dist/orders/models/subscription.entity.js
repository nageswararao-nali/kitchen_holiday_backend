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
exports.SubscriptionsEntity = void 0;
const typeorm_1 = require("typeorm");
let SubscriptionsEntity = class SubscriptionsEntity {
};
exports.SubscriptionsEntity = SubscriptionsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubscriptionsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubscriptionsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubscriptionsEntity.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SubscriptionsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], SubscriptionsEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], SubscriptionsEntity.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SubscriptionsEntity.prototype, "isVeg", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SubscriptionsEntity.prototype, "created_at", void 0);
exports.SubscriptionsEntity = SubscriptionsEntity = __decorate([
    (0, typeorm_1.Entity)('subscriptions')
], SubscriptionsEntity);
//# sourceMappingURL=subscription.entity.js.map