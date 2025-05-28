const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { plagiarismScore } = require("./lcs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Route for checking plagiarism
app.post("/check-plagiarism", (req, res) => {
    const { text1, text2 } = req.body;

    if (!text1 || !text2) {
        return res.status(400).json({ error: "Both texts are required" });
    }

    const score = plagiarismScore(text1, text2);
    res.json({ score, message: score > 60 ? "Potential Plagiarism Detected!" : "No Plagiarism Detected." });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
