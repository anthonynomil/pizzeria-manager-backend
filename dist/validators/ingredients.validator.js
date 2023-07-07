"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteId = exports.getId = exports.add = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = {
    name: joi_1.default.string().required().alphanum().min(1).max(30).lowercase(),
    id: joi_1.default.number().required().min(1),
};
exports.add = joi_1.default.object({
    body: joi_1.default.object({
        name: schema.name,
    }),
});
exports.getId = joi_1.default.object({
    params: joi_1.default.object({
        id: schema.id,
    }),
});
exports.deleteId = joi_1.default.object({
    params: joi_1.default.object({
        id: schema.id,
    }),
});
