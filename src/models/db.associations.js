import {Ingredient} from "./ingredient.model.js";
import {Order} from "./order.model.js";
import {OrderPizza} from "./orderPizza.js";
import {Pizza} from "./pizza.model.js";
import {PizzaIngredient} from "./pizzaIngredient.js";
import {User} from "./user.model.js";

export const associate = () => {
    Pizza.belongsToMany(Ingredient, {
        through: PizzaIngredient,
        foreignKey: "pizza_id",
    });
    Ingredient.belongsToMany(Pizza, {
        through: PizzaIngredient,
        foreignKey: "ingredient_id",
    });
    Order.belongsToMany(Pizza, {
        through: OrderPizza,
        foreignKey: "order_id",
    });
    Pizza.belongsToMany(Order, {
        through: OrderPizza,
        foreignKey: "pizza_id",
    });
    User.hasMany(Order, {
        foreignKey: "user_id",
        as: "order",
    });
    Order.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
    });
};