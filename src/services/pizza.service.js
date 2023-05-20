import httpStatus from "http-status";
import {Pizza} from "../models/pizza.model.js";
import {PizzaIngredient} from "../models/pizzaIngredient.js";
import ApiError from "../utils/ApiError.js";
import {getByName as getIngredientByName} from "./ingredient.service.js";

export const create = async (pizzaBody, ingredients) => {
    let pizza = await Pizza.findOne({
        where: {
            name: pizzaBody.name,
        }
    });
    if (pizza) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Pizza already exists");
    }
    pizza = await Pizza.create(pizzaBody);
    await addIngredients(pizza, ingredients);
    return pizza;
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
    return await Pizza.findAll({
        include: "ingredients",
    });
};

export const getById = async (id) => {
    const pizza = await Pizza.findByPk(id, {
        include: "ingredients",
    });
    if (!pizza) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pizza not found");
    }
    return pizza;
};

export const update = async (id, pizzaBody, ingredients) => {
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

export const remove = async (id) => {
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

export const getIngredients = async (id) => {
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
