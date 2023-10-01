import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { Uuidv4 } from "types";
import { Db } from "config/sequelize";

class Dish extends Model<InferAttributes<Dish>, InferCreationAttributes<Dish>> {
  declare id: CreationOptional<Uuidv4>;

  declare name: string;
  declare description: CreationOptional<string>;

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
    Dish.hasMany(db.DishIngredient, {
      foreignKey: "dishId",
      as: "dishIngredients",
    });
  };

  static isNameTaken = async (name: string) => {
    return !!(await Dish.findOne({ where: { name } }));
  };
}

export default Dish;
