import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import Dish from "models/Dish.model";
import Ingredient from "models/Ingredient.model";
import { Uuidv4 } from "types";
import { Db } from "config/sequelize";

class DishIngredient extends Model<InferAttributes<DishIngredient>, InferCreationAttributes<DishIngredient>> {
  declare id: CreationOptional<Uuidv4>;

  declare dishId: ForeignKey<Dish["id"]>;
  declare ingredientId: ForeignKey<Ingredient["id"]>;

  static initialize = (sequelize: Sequelize) => {
    DishIngredient.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        dishId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "dishes",
            key: "id",
          },
        },
        ingredientId: {
          type: DataTypes.UUID,
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
        timestamps: false,
      },
    );
  };

  static associate = (db: Db) => {
    DishIngredient.belongsTo(db.Dish, {
      foreignKey: "dishId",
      as: "dishes",
      onDelete: "CASCADE",
    });
    DishIngredient.belongsTo(db.Ingredient, {
      foreignKey: "ingredientId",
      as: "ingredients",
      onDelete: "CASCADE",
    });
  };
}

export default DishIngredient;
