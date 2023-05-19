import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const Order = sequelize.define("order", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
            model: "users",
            key: "id",
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});