import userRoutes from "routes/user.routes";
import authRoutes from "routes/auth.routes";

export default [
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/auth",
    router: authRoutes,
  },
];
