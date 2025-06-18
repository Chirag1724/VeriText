const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { plagiarismScore, detailedPlagiarismAnalysis } = require("./lcs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Route for checking plagiarism with detailed analysis
app.post("/check-plagiarism", (req, res) => {
    const { text1, text2 } = req.body;

    if (!text1 || !text2) {
        return res.status(400).json({ error: "Both texts are required" });
    }

    try {
        const result = detailedPlagiarismAnalysis(text1, text2);
        res.json(result);
    } catch (error) {
        console.error("Error during plagiarism analysis:", error);
        res.status(500).json({ 
            error: "Internal server error during analysis",
            details: error.message 
        });
    }
});

// Legacy API route for simple score (backward compatibility)
app.post("/check-plagiarism-simple", (req, res) => {
    const { text1, text2 } = req.body;

    if (!text1 || !text2) {
        return res.status(400).json({ error: "Both texts are required" });
    }

    try {
        const score = plagiarismScore(text1, text2);
        res.json({ 
            score, 
            message: score > 60 ? "Potential Plagiarism Detected!" : "No Plagiarism Detected." 
        });
    } catch (error) {
        console.error("Error during plagiarism analysis:", error);
        res.status(500).json({ 
            error: "Internal server error during analysis",
            details: error.message 
        });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Plagiarism checker API is running" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
    console.log(`⚡ VeriText API is ready to serve! ✨`);
});