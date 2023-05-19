import httpStatus from "http-status";
import {Pizza} from "../models/pizza.model.js";
import {PizzaIngredient} from "../models/pizzaIngredient.js";
import ApiError from "../utils/ApiError.js";
import {getByName as getIngredientByName} from "./ingredient.service.js";

export const create = async (pizzaBody, ingredients) => {
    let pizza = await getByName(pizzaBody.name);
    if (pizza) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Pizza already exists");
    }
    pizza = await Pizza.create(pizzaBody);
    await addIngredients(pizza, ingredients);
    return pizza;
};

export const addIngredient = async (name, ingredient) => {
    const ingredientModel = await getIngredientByName(ingredient);
    const pizza = await getByName(name);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    if (!ingredientModel) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
    }
    await pizza.addIngredient(ingredientModel);
};

const addIngredients = async (pizza, ingredients) => {
    for (const ingredient of ingredients) {
        const ingredientModel = await getIngredientByName(ingredient);
        if (!ingredientModel) {
            pizza.destroy();
            throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
        }
        await pizza.addIngredient(ingredientModel);
    }
};

export const getAll = async () => {
    return await Pizza.findAll();
};

export const getById = async (id) => {
    return await Pizza.findByPk(id);
};

export const updateById = async (id, pizzaBody, ingredients) => {
    const pizza = await getById(id);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    Object.assign(pizza, pizzaBody);
    await pizza.save();
    await PizzaIngredient.destroy({
        where: {
            pizza_id: id
        }
    });
    await addIngredients(pizza, ingredients);
    return pizza;
};

export const removeById = async (id) => {
    const pizza = await getById(id);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    await PizzaIngredient.destroy({
        where: {
            pizza_id: id
        }
    });
    await pizza.destroy();
    return pizza;
};

export const removeByName = async (name) => {
    const pizza = await getByName(name);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    await PizzaIngredient.destroy({
        where: {
            pizza_id: pizza.id
        }
    });
    await pizza.destroy();
    return pizza;
};

export const getByName = async (name) => {
    return await Pizza.findOne({
        where: {
            name: name,
        }
    });
};

export const getIngredientsById = async (id) => {
    const pizza = await getById(id);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    const ingredients = await pizza.getIngredients();
    if (!ingredients) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ingredients not found");
    }
    return ingredients;
};

export const getIngredientsByName = async (name) => {
    const pizza = await getByName(name);
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    const ingredients = await pizza.getIngredients();
    if (!ingredients) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ingredients not found");
    }
    return ingredients;
};