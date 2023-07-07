"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getById = exports.get = exports.add = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const ingredients_service_1 = __importDefault(require("../services/ingredients.service"));
exports.add = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const ingredient = yield ingredients_service_1.default.create(name);
    res.status(http_status_1.default.CREATED).send({
        message: "Ingredient created",
        ingredient,
    });
}));
exports.get = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield ingredients_service_1.default.get();
    if (!ingredients) {
        res.status(http_status_1.default.NOT_FOUND).send({
            message: "Ingredients not found",
        });
    }
    res.status(http_status_1.default.OK).send({
        message: "Ingredients found",
        ingredients,
    });
}));
exports.getById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ingredient = yield ingredients_service_1.default.getById(id);
    if (!ingredient) {
        res.status(http_status_1.default.NOT_FOUND).send({
            message: "Ingredient not found",
        });
    }
    res.status(http_status_1.default.OK).send({
        message: "Ingredient found",
        ingredient,
    });
}));
exports.remove = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ingredient = yield ingredients_service_1.default.remove(id);
    res.status(http_status_1.default.OK).send({
        message: "Ingredient deleted",
        ingredient,
    });
}));
