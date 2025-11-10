import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" })); // ✅ needed to read req.body
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
    origin: [
      "http://localhost:5173",  // Local development
      "http://localhost:3000",  // Local testing
      "https://ai-product-visualizer-server-1.onrender.com",  // Render deployment
      "https://ai-product-visualizer.vercel.app",  // Vercel domain 1
      "https://ai-product-visualizer-ebon.vercel.app",  // Vercel domain 2 (the one making the request)
      "https://ai-product-visualizer-git-main-anirudhs-projects-9ebcee76.vercel.app"  // Add https:// protocol
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-freepik-api-key"]
  }));

const PORT = process.env.PORT;

app.use("/api", imageRoutes);
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`${PORT}`);
});

export default app;
