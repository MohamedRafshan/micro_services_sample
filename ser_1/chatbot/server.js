const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();


// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY; // Ensure this is correctly set
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  tools: [{ codeExecution: {} }],
});

// Configuration for generation
const generationConfig = {
  temperature: 0.85,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// Handle POST requests to /chat
router.post('/', async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Start a chat session
    const chatSession = await model.startChat({
      generationConfig,
      history: [
        { role: 'user', parts: [{ text: 'hlw\n' }] },
        { role: 'model', parts: [{ text: 'Hello! 👋 How can I help you today? 😊 \n' }] },
        { role: 'user', parts: [{ text: 'what are the questions I can ask?' }] },
        { role: 'model', parts: [{ text: 'Only agriculture-related questions.\n\n' }] },
        { role: 'user', parts: [{ text: 'how can you help me?' }] },
        { role: 'model', parts: [{ text: 'I can help you with a wide range of agriculture-related questions... 🌾' }] },
      ],
    });

    // Send user message and receive response
    const result = await chatSession.sendMessage(userInput);
    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
