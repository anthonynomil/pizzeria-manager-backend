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
exports.remove = exports.getById = exports.getByName = exports.get = exports.create = void 0;
const Ingredient_model_1 = require("../models/Ingredient.model");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const create = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredient = yield (0, exports.getByName)(name);
    if (ingredient) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Ingredient already exists");
    }
    return yield Ingredient_model_1.IngredientModel.create({ name });
});
exports.create = create;
const get = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Ingredient_model_1.IngredientModel.findAll();
});
exports.get = get;
const getByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Ingredient_model_1.IngredientModel.findOne({ where: { name } });
});
exports.getByName = getByName;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Ingredient_model_1.IngredientModel.findByPk(id);
});
exports.getById = getById;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredient = yield (0, exports.getById)(id);
    if (!ingredient)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Ingredient not found");
    yield ingredient.destroy();
    return ingredient;
});
exports.remove = remove;
const iServices = {
    get: exports.get,
    create: exports.create,
    getById: exports.getById,
    remove: exports.remove,
};
exports.default = iServices;
