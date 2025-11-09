import express from "express";
// import fetch from "node-fetch"; // for Node.js
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" })); // ✅ needed to read req.body
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ai-product-visualizer.vercel.app"],
  })
);

app.post("/api/generate-image", async (req, res) => {
  try {
    const url = "https://api.freepik.com/v1/ai/gemini-2-5-flash-image-preview";

    const response = await fetch(url, {
      method: "POST", // ✅ you missed this
      headers: {
        "x-freepik-api-key": process.env.FREEPIK_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: req.body.prompt,
        reference_images: req.body.reference_images,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/generate-image/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `https://api.freepik.com/v1/ai/gemini-2-5-flash-image-preview/${id}`,
      {
        method: "GET", // ✅ you missed this
        headers: {
          "x-freepik-api-key": process.env.FREEPIK_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error getting image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});

export default app;
