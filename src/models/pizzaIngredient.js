import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const PizzaIngredient = sequelize.define("pizza_ingredient", {
    pizza_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
});