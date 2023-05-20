import httpStatus from "http-status";
import * as pizzaService from "../services/pizza.service.js";
import ApiError from "../utils/ApiError.js";
import {catchAsync} from "../utils/catchAsync.js";
import {sendResponse} from "../utils/response.js";

export const add = catchAsync(async (req, res) => {
    const {
        name,
        price,
        ingredients
    } = req.body;
    const pizzaBody = {
        name: name,
        price: price,
    };
    const pizza = await pizzaService.create(pizzaBody, ingredients);
    res.status(httpStatus.CREATED).send(pizza);
});

export const getAll = catchAsync(async (req, res) => {
    const pizzas = await pizzaService.getAll();
    res.status(httpStatus.OK).send(pizzas);
});

export const getById = catchAsync(async (req, res) => {
    const {id} = req.query;
    const pizza = await pizzaService.getById(id);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    res.status(httpStatus.OK).send(pizza);
});

export const updateById = catchAsync(async (req, res) => {
    const {
        id,
        name,
        price,
        ingredients
    } = req.body;
    const pizzaBody = {
        name: name,
        price: price,
    };
    const pizza = await pizzaService.updateById(id, pizzaBody, ingredients);
    res.status(httpStatus.OK).send(pizza);
});

export const removeById = catchAsync(async (req, res) => {
    const {id} = req.body;
    const pizza = await pizzaService.removeById(id);
    res.status(httpStatus.OK).send(pizza);
});

export const getIngredientsByPizzaId = catchAsync(async (req, res) => {
    const {id} = req.query;
    const ingredients = await pizzaService.getIngredientsById(id);
    res.status(httpStatus.OK).send(ingredients);
});

export const getIngredientsByPizzaName = catchAsync(async (req, res) => {
    const {name} = req.query;
    const ingredients = await pizzaService.getIngredientsByName(name);
    res.status(httpStatus.OK).send(ingredients);
});

export const getByName = catchAsync(async (req, res) => {
    const {name} = req.query;
    const pizza = await pizzaService.getByName(name);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    res.status(httpStatus.OK).send(pizza);
});

export const removeByName = catchAsync(async (req, res) => {
    const {
        oldName,
        name,
        price,
        ingredients
    } = req.body;
    const pizzaBody = {
        name: name,
        price: price,
        ingredients: ingredients
    };
    const pizza = await pizzaService.updateByName(oldName, pizzaBody);
    sendResponse(res, httpStatus.OK, {
        pizza: pizza,
        message: "Pizza updated"
    });
});