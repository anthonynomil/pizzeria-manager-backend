import {Ingredient} from "./ingredient.model.js";
import {Order} from "./order.model.js";
import {OrderPizza} from "./orderPizza.js";
import {Pizza} from "./pizza.model.js";
import {PizzaIngredient} from "./pizzaIngredient.js";
import {Token} from "./token.model.js";
import {User} from "./user.model.js";

export const associate = () => {
    Pizza.belongsToMany(Ingredient, {
        through: PizzaIngredient,
        foreignKey: "pizzaId",
    });
    Ingredient.belongsToMany(Pizza, {
        through: PizzaIngredient,
        foreignKey: "ingredientId",
    });
    Order.belongsToMany(Pizza, {
        through: OrderPizza,
        foreignKey: "orderId",
    });
    Pizza.belongsToMany(Order, {
        through: OrderPizza,
        foreignKey: "pizzaId",
    });
    User.hasMany(Order, {
        foreignKey: "userId",
        as: "order",
    });
    Order.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });
    User.hasMany(Token, {
        foreignKey: "userId",
        as: "token",
    });
    Token.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });
};