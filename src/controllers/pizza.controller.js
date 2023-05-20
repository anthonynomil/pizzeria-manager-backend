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
    sendResponse(res, httpStatus.CREATED, {
        pizza: pizza,
        message: "Pizza created"
    });
});

export const addCustom = catchAsync(async (req, res) => {
    const {
        name,
        price,
        ingredients
    } = req.body;

    const pizzaBody = {
        name: name,
        price: price,
        custom: true,
    };
    const pizza = await pizzaService.create(pizzaBody, ingredients);
    sendResponse(res, httpStatus.CREATED, {
        pizza: pizza,
        message: "Pizza created"
    });
});

export const getAll = catchAsync(async (req, res) => {
    const pizzas = await pizzaService.getAll();
    sendResponse(res, httpStatus.OK, {
        pizzas: pizzas,
        message: "Pizzas retrieved",
    });
});

export const getById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const pizza = await pizzaService.getById(id);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    sendResponse(res, httpStatus.OK, {
        pizza: pizza,
        message: "Pizza retrieved",
    });
});

export const update = catchAsync(async (req, res) => {
    const {
        name,
        price,
        ingredients
    } = req.body;
    const {id} = req.params;
    const pizzaBody = {
        name: name,
        price: price,
    };
    const pizza = await pizzaService.update(id, pizzaBody, ingredients);
    sendResponse(res, httpStatus.OK, {
        pizza: pizza,
        message: "Pizza updated",
    });
});

export const remove = catchAsync(async (req, res) => {
    const {id} = req.params;
    const pizza = await pizzaService.remove(id);
    sendResponse(res, httpStatus.OK, {
        pizza: pizza,
        message: "Pizza deleted",
    });
});

export const getIngredients = catchAsync(async (req, res) => {
    const {id} = req.params;
    const ingredients = await pizzaService.getIngredients(id);
    sendResponse(res, httpStatus.OK, {
        ingredients: ingredients,
        message: "Ingredients retrieved",
    });
});