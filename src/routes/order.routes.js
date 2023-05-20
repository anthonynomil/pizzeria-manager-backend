import express from "express";

export const orderRoutes = express.Router();

orderRoutes.get("/send", (req, res) => {
    res.send("Sending orders");
});