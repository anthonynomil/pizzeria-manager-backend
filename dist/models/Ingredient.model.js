"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientModel = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config");
class IngredientModel extends sequelize_1.Model {
}
exports.IngredientModel = IngredientModel;
IngredientModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: database_config_1.sequelize,
    tableName: "ingredients",
    timestamps: false,
});
