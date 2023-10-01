import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { Db } from "config/sequelize";
import { Uuidv4 } from "types";

class Ingredient extends Model<InferAttributes<Ingredient>, InferCreationAttributes<Ingredient>> {
  declare id: CreationOptional<Uuidv4>;

  declare name: string;

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
      },
    );
  };

  static associate = (models: Db) => {};

  static isNameTaken = async (name: string): Promise<boolean> => {
    return !!(await Ingredient.findOne({ where: { name } }));
  };
}

export default Ingredient;
