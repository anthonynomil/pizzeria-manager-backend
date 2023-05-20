import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const Pizza = sequelize.define("pizza", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    custom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});