import userRoutes from "routes/user.routes";
import authRoutes from "routes/auth.routes";
import ingredientRoutes from "routes/ingredient.routes";

export default [
  {
    path: "/auth",
    router: authRoutes,
  },
  {
    path: "/ingredient",
    router: ingredientRoutes,
  },
  {
    path: "/user",
    router: userRoutes,
  },
];
