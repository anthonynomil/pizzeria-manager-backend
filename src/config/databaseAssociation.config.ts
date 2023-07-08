import { PizzaModel } from "../models/Pizza.model";
import { IngredientModel } from "../models/Ingredient.model";

export const associate = () => {
  PizzaModel.belongsToMany(IngredientModel, { through: "pizza_ingredients" });
  IngredientModel.belongsToMany(PizzaModel, { through: "pizza_ingredients" });
};
