import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import User from "models/User.model";
import { Db } from "config/sequelize";
import tokensType, { TTokenTypes } from "const/enums/tokens.type";
import type { Uuidv4 } from "types";

class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  declare id: CreationOptional<Uuidv4>;

  declare userId: ForeignKey<User["id"]>;

  declare token: string;

  declare expires: Date;
  declare type: TTokenTypes;
  declare valid: CreationOptional<boolean>;

  static initialize = (sequelize: Sequelize) => {
    Token.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          unique: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          references: {
            model: User,
            key: "id",
          },
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        expires: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM,
          values: [...Object.values(tokensType)],
        },
        valid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        tableName: "tokens",
        sequelize,
        timestamps: false,
      },
    );
  };

  static associate = (models: Db) => {
    Token.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };
}

export default Token;
