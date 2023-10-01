import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import Dish from "models/Dish.model";
import Ingredient from "models/Ingredient.model";

class DishIngredient extends Model<InferAttributes<DishIngredient>, InferCreationAttributes<DishIngredient>> {
  declare id: number;

  declare dishId: ForeignKey<Dish["id"]>;
  declare ingredientId: ForeignKey<Ingredient["id"]>;

  static initialize = (sequelize: Sequelize) => {
    DishIngredient.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        dishId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "dishes",
            key: "id",
          },
        },
        ingredientId: {
          type: DataTypes.INTEGER,
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
