import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const OrderPizza = sequelize.define("orderPizza", {
    pizzaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pizzas",
            key: "id",
        }
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "orders",
            key: "id",
        }
    },
}, {
    timestamps: false
});