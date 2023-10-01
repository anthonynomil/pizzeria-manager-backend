import { CreateOptions, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { compare, hash } from "bcryptjs";
import { IDb } from "config/sequelize";
import userRoles, { TUserRoles } from "const/enums/user.roles";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare uuid: CreationOptional<string>;

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
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
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
          async afterCreate(attributes: User, options: CreateOptions<User>): Promise<void> {
            if (attributes.password) attributes.password = await hash(attributes.password, 10);
          },
          async afterUpdate(attributes: User, options: CreateOptions<User>): Promise<void> {
            if (attributes.password) attributes.password = await hash(attributes.password, 10);
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

  static isEmailTaken = async (email: string): Promise<boolean> => {
    return !!(await User.findOne({ where: { email } }));
  };

  passwordMatch: NonAttribute<Function> = async (password: string): Promise<boolean> => {
    return await compare(password, this.password!);
  };
}

export default User;
