import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import Dish from "models/Dish.model";
import Ingredient from "models/Ingredient.model";
import { Uuidv4 } from "types";

class DishIngredient extends Model<InferAttributes<DishIngredient>, InferCreationAttributes<DishIngredient>> {
  declare id: CreationOptional<Uuidv4>;

  declare dishId: ForeignKey<Dish["id"]>;
  declare ingredientId: ForeignKey<Ingredient["id"]>;

  static initialize = (sequelize: Sequelize) => {
    DishIngredient.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        dishId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          references: {
            model: "dishes",
            key: "id",
          },
        },
        ingredientId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          references: {
            model: "ingredients",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "dish_ingredients",
      },
    );
  };
}

export default DishIngredient;
