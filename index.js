import cors from "cors";
import express from "express";
import {sequelize} from "./src/config/sequelize.config.js";
import {associate} from "./src/models/db.associations.js";
import routes from "./src/routes/routes.js";

const app = express();

await sequelize.authenticate();
await sequelize.sync();
associate();
console.log("Database connection established.");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/", routes);

app.listen(8000, () => {
    console.log("Server started on port 8000.");
});