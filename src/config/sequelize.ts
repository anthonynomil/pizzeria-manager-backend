import { Sequelize } from "sequelize";
import env from "config/env";
import User from "models/User.model";
import Token from "models/Token.model";
import Ingredient from "models/Ingredient.model";
import Dish from "models/Dish.model";
import DishIngredient from "models/DishIngredient.model";

const sequelize: Sequelize = new Sequelize({
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: false,
});

export const db = {
  Sequelize,
  sequelize,

  Dish,
  DishIngredient,
  Ingredient,
  Token,
  User,
};

export type Db = typeof db;

User.initialize(db.sequelize);
Token.initialize(db.sequelize);
Dish.initialize(db.sequelize);
Ingredient.initialize(db.sequelize);
DishIngredient.initialize(db.sequelize);

User.associate(db);
Token.associate(db);
Dish.associate(db);
Ingredient.associate(db);
DishIngredient.associate(db);

export default sequelize;
