export const generateChat = async (req, res) => {
  const { messages } = req.body;

  try {

    const response = await fetch(
      `https://openrouter.ai/api/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "x-ai/grok-4.1-fast:free",
          messages: messages,
          reasoning: { enabled: true },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error generating chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
