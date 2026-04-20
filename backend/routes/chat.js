const express = require("express");
const { getMathResponse } = require("../services/aiService");

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  // ✅ Greeting message (first load)
  if (!message || message.trim() === "") {
    return res.json({
      message:
        "👋 Hi! I’m MathBuddy 🤖✨\n\nLet’s have fun with math together! 🎉\nAsk me any math question 😊",
    });
  }

  try {
    const reply = await getMathResponse(message);

    res.json({
      message: reply,
    });
  } catch (err) {
    console.error("ERROR:", err);

    res.json({
      message: "⚠️ Error. Try again later.",
    });
  }
});

module.exports = router;