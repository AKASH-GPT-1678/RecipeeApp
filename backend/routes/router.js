import express from "express";
const router = express.Router();
import { addTofavourites, deleteFromFavourites } from "../controllers/recipee.controller.js";


router.post("/favorites" , addTofavourites);
router.delete("/favorites/:userId/:recipeId", deleteFromFavourites);

export default router;