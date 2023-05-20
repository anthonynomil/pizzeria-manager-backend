import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const PizzaIngredient = sequelize.define("pizzaIngredients", {
    pizzaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pizzas",
            key: "id",
        }
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "ingredients",
            key: "id",
        }
    }
}, {
    timestamps: false
});