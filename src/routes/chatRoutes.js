import express from "express";
import { generateChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/generate-chat", generateChat);

export default router;