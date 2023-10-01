import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

class Dish extends Model<InferAttributes<Dish>, InferCreationAttributes<Dish>> {
  declare id: CreationOptional<number>;

  declare name: string;
  declare description: CreationOptional<string>;

  static initialize(sequelize: Sequelize) {
    Dish.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
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

  static associate = () => {};

  static isNameTaken = async (name: string) => {
    return !!(await Dish.findOne({ where: { name } }));
  };
}

export default Dish;
