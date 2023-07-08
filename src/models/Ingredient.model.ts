import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../config/database.config";
import { PizzaModel } from "./Pizza.model";

export class IngredientModel extends Model<
  InferAttributes<IngredientModel>,
  InferCreationAttributes<IngredientModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare pizzas?: NonAttribute<PizzaModel[]>;
  declare getPizzas: HasManyGetAssociationsMixin<PizzaModel>;
  declare countPizzas: HasManyGetAssociationsMixin<PizzaModel>;
  declare hasPizza: HasManyGetAssociationsMixin<PizzaModel>;
  declare hasPizzas: HasManyGetAssociationsMixin<PizzaModel>;
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
