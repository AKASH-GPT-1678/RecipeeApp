import express from "express";
const router = express.Router();
import { addTofavourites, deleteFromFavourites, getFavourites } from "../controllers/recipee.controller.js";


router.post("/favorites" , addTofavourites);
router.delete("/favorites/:userId/:recipeId", deleteFromFavourites);
router.get("/favorites/:userId", getFavourites);

export default router;