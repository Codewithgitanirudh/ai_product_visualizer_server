export const generateImage = async (req, res) => {
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
};

export const getImage = async (req, res) => {
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
};
