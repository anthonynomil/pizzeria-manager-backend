import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { compare, hash } from "bcrypt";
import { IDb } from "config/sequelize";
import userRoles, { TUserRoles } from "const/enums/user.roles";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;

  declare email: string;
  declare password?: string;

  declare name: CreationOptional<string>;
  declare role: CreationOptional<TUserRoles>;

  static initialize = (sequelize: Sequelize): void => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: userRoles.USER,
        },
      },
      {
        sequelize,
        tableName: "users",
        hooks: {
          async beforeCreate(user: User, options: any): Promise<void> {
            if (user.password) user.password = await hash(user.password, 10);
          },
          async beforeUpdate(user: User, options: any): Promise<void> {
            if (user.password) user.password = await hash(user.password, 10);
          },
        },
      },
    );
  };

  static associate = (models: IDb) => {
    User.hasMany(models.Token, {
      foreignKey: "userId",
      as: "tokens",
    });
  };

  static isEmailTaken = async (email: string): Promise<boolean> => !!(await User.findOne({ where: { email } }));

  passwordMatch: NonAttribute<Function> = async (password: string): Promise<boolean> => {
    return await compare(password, this.password!);
  };
}

export default User;
