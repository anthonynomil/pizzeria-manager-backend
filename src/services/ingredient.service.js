import httpStatus from "http-status";
import {Ingredient} from "../models/ingredient.model.js";
import ApiError from "../utils/ApiError.js";

export const create = async (ingredientBody) => {
    const ingredient = await getByName(ingredientBody.name);
    if (ingredient.length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Ingredient already exists");
    }
    return Ingredient.create(ingredientBody);
};

export const getByName = async (name) => {
    return await Ingredient.findAll({
        where: {
            name: name,
        },
    });
};

export const getById = async (id) => {
    return await Ingredient.findByPk(id);
};

export const getAll = async () => {
    return await Ingredient.findAll();
};

export const updateById = async (id, ingredientBody) => {
    const ingredient = await getById(id);
    console.log(ingredient);
    if (!ingredient) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
    }
    Object.assign(ingredient, ingredientBody);
    await ingredient.save();
    return ingredient;
};

export const removeById = async (id) => {
    const ingredient = await getById(id);
    if (!ingredient) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
    }
    await ingredient.destroy();
    return ingredient;
};