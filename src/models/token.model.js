import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

export const Token = sequelize.define("token", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});