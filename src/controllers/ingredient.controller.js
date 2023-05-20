import httpStatus from "http-status";
import * as serviceIngredient from "../services/ingredient.service.js";
import ApiError from "../utils/ApiError.js";
import {catchAsync} from "../utils/catchAsync.js";
import {sendResponse} from "../utils/response.js";

export const add = catchAsync(async (req, res) => {
    const {name} = req.body;
    const ingredientBody = {
        name: name
    };
    const ingredient = await serviceIngredient.create(ingredientBody);
    sendResponse(res, httpStatus.CREATED, {
        message: "Ingredient created",
        ingredient: ingredient
    });
});

export const getAll = catchAsync(async (req, res) => {
    const ingredients = await serviceIngredient.getAll();
    sendResponse(res, httpStatus.OK, {
        message: "Ingredients found",
        ingredients: ingredients
    });
});

export const getId = catchAsync(async (req, res) => {
    const {id} = req.params;
    const ingredient = await serviceIngredient.getById(id);
    if (!ingredient) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
    }
    sendResponse(res, httpStatus.OK, {
        message: "Ingredient found",
        ingredient: ingredient
    });
});
export const updateById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const ingredientBody = {
        name: name,
    };
    const ingredient = await serviceIngredient.updateById(id, ingredientBody);
    sendResponse(res, httpStatus.OK, {
        message: "Ingredient updated",
        ingredient: ingredient
    });
});

export const removeById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const ingredient = await serviceIngredient.removeById(id);
    sendResponse(res, httpStatus.OK, {
        message: "Ingredient removed",
        ingredient: ingredient
    });
});

export const getPizzasById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const pizzas = await serviceIngredient.getPizzasById(id);
    sendResponse(res, httpStatus.OK, {
        message: "Pizzas found",
        pizzas: pizzas
    });
});