import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database.config";

export class IngredientModel extends Model<
  InferAttributes<IngredientModel>,
  InferCreationAttributes<IngredientModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

IngredientModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "ingredients",
    timestamps: false,
  }
);
