import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config()

const app = express()
const PORT = 5000

const corsOptions = {
    origin: [process.env.CLIENT_URL],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body
    try {
        const result = await model.generateContent(prompt)
        const text = result.response.text()
        res.json({ text })
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content." })
    }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))