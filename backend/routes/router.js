import express from "express";
const router = express.Router();

import { testDealer,createDealer , getDealers } from "../controllers/dealer.controller.js";



router.post("/testDealer", testDealer);
router.post("/dealer", createDealer);
router.get("/getdealer", getDealers);




export default router