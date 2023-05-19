import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const OrderPizza = sequelize.define("order_pizza", {
    pizza_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false
});