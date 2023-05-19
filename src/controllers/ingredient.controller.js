import httpStatus from "http-status";
import * as serviceIngredient from "../services/ingredient.service.js";
import ApiError from "../utils/ApiError.js";
import {catchAsync} from "../utils/catchAsync.js";

export const add = catchAsync(async (req, res) => {
    const {name} = req.body;
    const ingredientBody = {
        name: name
    };
    const ingredient = await serviceIngredient.create(ingredientBody);
    res.status(httpStatus.CREATED).send(ingredient);
});

export const getAll = catchAsync(async (req, res) => {
    const ingredients = await serviceIngredient.getAll();
    res.status(httpStatus.OK).send(ingredients);
});

export const getById = catchAsync(async (req, res) => {
    const {id} = req.query;
    const ingredient = await serviceIngredient.getById(id);
    if (!ingredient) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
    }
    res.status(httpStatus.OK).send(ingredient);
});

export const updateById = catchAsync(async (req, res) => {
    const {
        id,
        name
    } = req.body;

    const ingredientBody = {
        name: name,
    };
    const ingredient = await serviceIngredient.updateById(id, ingredientBody);
    res.status(httpStatus.OK).send(ingredient);
});

export const removeById = catchAsync(async (req, res) => {
    const {id} = req.body;
    const ingredient = await serviceIngredient.removeById(id);
    res.status(httpStatus.OK).send(ingredient);
});

