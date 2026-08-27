const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// GEMINI AI
// ========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {
  res.send("Movie AI Backend is running!");
});


// ========================================
// CHAT ROUTE
// ========================================

app.post("/api/chat", async (req, res) => {

  try {

    // Get message from React
    const { message } = req.body;


    // ========================================
    // CHECK MESSAGE
    // ========================================

    if (!message || !message.trim()) {

      return res.status(400).json({
        reply: "Please enter a message.",
      });

    }


    console.log("User:", message);


    // ========================================
    // GEMINI REQUEST
    // ========================================

    const response = await ai.models.generateContent({

      model: "gemini-3.6-flash",

      contents: `
You are MovieApp AI, a simple movie assistant.

Your job is to help users with movies, actors, directors,
genres, recommendations and basic movie information.

IMPORTANT RESPONSE RULES:

1. Give only 2 to 3 short lines.
2. Keep the answer simple and easy to understand.
3. Do not give long explanations.
4. Do not create long lists.
5. For movie recommendations, suggest only 1 or 2 movies.
6. Give one short reason for each recommendation.
7. If the user asks about an actor, give the main actor's name
   and the movie name in a short answer.
8. If the user says hello, give a short friendly greeting.
9. Do not use large headings.
10. Do not repeat the user's question.
11. Do not add unnecessary information.
12. Keep the response suitable for a small chatbot window.

Examples:

User: hi

Answer:
Hi 👋 I'm MovieApp AI!
How can I help you with movies?

User: tamil movies suggestion

Answer:
Try Maharaja (2024) for a gripping Tamil thriller.
You can also watch Good Night (2023) for a light-hearted comedy.

User: Who is the actor in Leo?

Answer:
The lead actor in the Tamil movie Leo (2023) is Vijay.
He plays the main character, Leo Das.

User: suggest a comedy movie

Answer:
Try Good Night (2023), a fun Tamil romantic comedy.
It is a simple and entertaining movie.

Now answer this user message:

${message}
      `,

    });


    // ========================================
    // GET AI RESPONSE
    // ========================================

    const reply = response.text;


    console.log("AI:", reply);


    // ========================================
    // SEND RESPONSE TO REACT
    // ========================================

    res.json({
      reply: reply,
    });


  } catch (error) {

    // ========================================
    // ERROR HANDLING
    // ========================================

    console.error("Gemini Error:", error);


    res.status(500).json({

      reply: "Sorry, I could not process your request.",

    });

  }

});


// ========================================
// START SERVER
// ========================================

app.listen(5000, () => {

  console.log(
    "AI Server running on http://localhost:5000"
  );

});