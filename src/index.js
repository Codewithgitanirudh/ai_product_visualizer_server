import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" })); // ✅ needed to read req.body
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-product-visualizer-server-1.onrender.com",
      "https://ai-product-visualizer.vercel.app",
    ],
  })
);

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
