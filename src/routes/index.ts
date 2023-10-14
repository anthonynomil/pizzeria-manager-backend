import userRoutes from "routes/user.routes";
import authRoutes from "routes/auth.routes";
import ingredientRoutes from "routes/ingredient.routes";
import dishRoutes from "routes/dish.routes";
import ingredientsRoutes from "routes/ingredients.routes";

export default [
  {
    path: "/auth",
    router: authRoutes,
  },
  {
    path: "/dish",
    router: dishRoutes,
  },
  {
    path: "/ingredient",
    router: ingredientRoutes,
  },
  {
    path: "/ingredients",
    router: ingredientsRoutes,
  },
  {
    path: "/user",
    router: userRoutes,
  },
];
