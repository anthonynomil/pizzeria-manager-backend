import { Sequelize } from "sequelize";
import env from "config/env";

const sequelize: Sequelize = new Sequelize({
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: false,
});

export default sequelize;
