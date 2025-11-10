import express from "express";
import { generateImage, getImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/generate-image", generateImage);
router.get("/generate-image/:id", getImage);

export default router;