import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { IDb } from "config/sequelize";

class Ingredient extends Model<InferAttributes<Ingredient>, InferCreationAttributes<Ingredient>> {
  declare id: CreationOptional<number>;

  declare name: string;

  static initialize = (sequelize: Sequelize) => {
    Ingredient.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
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

  static associate = (models: IDb) => {};

  static isNameTaken = async (name: string): Promise<boolean> => {
    return !!(await Ingredient.findOne({ where: { name } }));
  };
}

export default Ingredient;
