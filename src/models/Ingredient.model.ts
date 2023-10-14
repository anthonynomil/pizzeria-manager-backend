import {
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Op,
  Sequelize,
} from "sequelize";
import { Db } from "config/sequelize";
import { Uuidv4 } from "types";

class Ingredient extends Model<InferAttributes<Ingredient>, InferCreationAttributes<Ingredient>> {
  declare id: CreationOptional<Uuidv4>;

  declare name: string;

  declare addDish: HasManyAddAssociationMixin<Ingredient, Uuidv4>;
  declare addDishes: HasManyAddAssociationsMixin<Ingredient[], Uuidv4>;
  declare getDishes: HasManyGetAssociationsMixin<Ingredient>;

  static initialize = (sequelize: Sequelize) => {
    Ingredient.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        tableName: "ingredients",
        sequelize,
        defaultScope: {
          include: { all: true, nested: true },
        },
      },
    );
  };

  static associate = (db: Db) => {
    Ingredient.belongsToMany(db.Dish, {
      as: "dishes",
      foreignKey: "ingredientId",
      targetKey: "id",
      through: db.DishIngredient,
    });
  };

  static isNameTaken = async (name: string, id?: Uuidv4): Promise<boolean> => {
    const where = id ? { [Op.and]: [{ name }, { id: { [Op.not]: id } }] } : { name };
    return !!(await Ingredient.findOne({ where }));
  };
}

export default Ingredient;
