import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../config/database.config";
import { IngredientModel } from "./Ingredient.model";

export class PizzaModel extends Model<
  InferAttributes<PizzaModel, { omit: "ingredients" }>,
  InferCreationAttributes<PizzaModel>
> {
  declare static associations: {
    ingredients: Association<PizzaModel, IngredientModel>;
  };
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare custom: boolean;
  declare ingredients?: NonAttribute<IngredientModel[]>;
  declare createIngredient: HasManyAddAssociationMixin<IngredientModel, number>;
  declare addIngredient: HasManyAddAssociationMixin<IngredientModel, number>;
  declare getIngredients: HasManyGetAssociationsMixin<IngredientModel>;
  declare addIngredients: HasManyAddAssociationMixin<IngredientModel, number>;
  declare setIngredients: HasManyAddAssociationMixin<IngredientModel, number>;
  declare removeIngredients: HasManyAddAssociationMixin<IngredientModel, number>;
  declare removeIngredient: HasManyAddAssociationMixin<IngredientModel, number>;
  declare countIngredients: HasManyAddAssociationMixin<IngredientModel, number>;
  declare hasIngredient: HasManyAddAssociationMixin<IngredientModel, number>;
  declare hasIngredients: HasManyAddAssociationMixin<IngredientModel, number>;
}

PizzaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    custom: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    tableName: "pizzas",
    timestamps: false,
  }
);
