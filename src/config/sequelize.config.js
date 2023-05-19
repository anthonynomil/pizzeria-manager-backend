import {Sequelize} from "sequelize";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "joe",
    password: "sail",
    database: "postgres",
});