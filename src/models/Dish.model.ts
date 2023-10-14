import {
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Op,
  Sequelize,
} from "sequelize";
import { Uuidv4 } from "types";
import { Db } from "config/sequelize";
import Ingredient from "models/Ingredient.model";

class Dish extends Model<InferAttributes<Dish>, InferCreationAttributes<Dish>> {
  declare id: CreationOptional<Uuidv4>;

  declare name: string;
  declare description: CreationOptional<string>;

  declare addIngredient: HasManyAddAssociationMixin<Ingredient, Uuidv4>;
  declare addIngredients: HasManyAddAssociationsMixin<Ingredient[], Uuidv4>;
  declare getIngredients: HasManyGetAssociationsMixin<Ingredient>;
  declare removeIngredient: HasManyRemoveAssociationMixin<Ingredient, Uuidv4>;

  static initialize(sequelize: Sequelize) {
    Dish.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "dishes",
      },
    );
  }

  static associate = (db: Db) => {
    Dish.belongsToMany(db.Ingredient, {
      foreignKey: "dishId",
      targetKey: "id",
      as: "ingredients",
      through: db.DishIngredient,
    });
  };

  static isNameTaken = async (name: string, id?: Uuidv4) => {
    const where = id ? { [Op.and]: [{ name }, { id: { [Op.not]: id } }] } : { name };
    return !!(await Dish.findOne({ where }));
  };
}

export default Dish;
