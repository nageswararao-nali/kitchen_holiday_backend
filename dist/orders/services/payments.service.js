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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const payments_entity_1 = require("../models/payments.entity");
const refund_entity_1 = require("../models/refund.entity");
let PaymentsService = class PaymentsService {
    constructor(paymentRepo, refundRepo) {
        this.paymentRepo = paymentRepo;
        this.refundRepo = refundRepo;
    }
    async getPayments(reqBody) {
        let whereCon = {};
        if (reqBody.user_id) {
            whereCon['user_id'] = reqBody.user_id;
        }
        console.log(whereCon);
        const [items, count] = await this.paymentRepo.findAndCount({ where: whereCon, order: { created_at: 'DESC' } });
        return { items, count };
    }
    async getRefunds(reqBody) {
        let whereCon = {};
        if (reqBody.user_id) {
            whereCon['user_id'] = reqBody.user_id;
        }
        const [items, count] = await this.refundRepo.findAndCount({ where: whereCon, order: { created_at: 'DESC' } });
        return { items, count };
    }
    async updateRefund(user, reqBody) {
        let refund = await this.refundRepo.findOneBy({ id: reqBody.id });
        if (refund) {
            let refundData = {
                refundIssuedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                approved: true,
                approved_by: user.id
            };
            const createdItem = await this.refundRepo.update({ id: reqBody.id }, refundData);
            return createdItem;
        }
        return false;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payments_entity_1.PaymentsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(refund_entity_1.RefundsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map