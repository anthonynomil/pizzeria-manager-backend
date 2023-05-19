import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const Ingredient = sequelize.define("ingredient", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});