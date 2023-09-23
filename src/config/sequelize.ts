import { Sequelize } from "sequelize";
import env from "config/env";
import User from "models/User.model";
import Token from "models/Token.model";

const sequelize: Sequelize = new Sequelize({
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: false,
});

export interface IDb {
  Sequelize: typeof Sequelize;
  sequelize: typeof sequelize;

  Token: typeof Token;
  User: typeof User;
}

export const db: IDb = {
  Sequelize,
  sequelize,

  Token,
  User,
};

User.initialize(db.sequelize);
Token.initialize(db.sequelize);

User.associate(db);
Token.associate(db);

export default sequelize;
