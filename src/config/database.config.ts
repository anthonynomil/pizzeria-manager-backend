import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "joe",
  password: "sail",
  database: "postgres",
});

export const connectToDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};
