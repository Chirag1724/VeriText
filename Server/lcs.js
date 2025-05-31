function preprocessText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
}

function getTextLines(text) {
    return text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}

function getWordsWithPositions(text) {
    const lines = text.split('\n');
    const wordsWithPos = [];
    
    lines.forEach((line, lineIndex) => {
        const words = line.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(word => word.length > 0);
        words.forEach((word, wordIndex) => {
            wordsWithPos.push({
                word: word,
                line: lineIndex + 1,
                position: wordIndex + 1,
                originalLine: line.trim()
            });
        });
    });
    
    return wordsWithPos;
}

function findLCSWithDetails(X, Y) {
    let m = X.length, n = Y.length;
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    // Build the LCS table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (X[i - 1].word === Y[j - 1].word) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack to find the actual LCS
    let lcsWords = [];
    let matchedIndices1 = new Set();
    let matchedIndices2 = new Set();
    
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (X[i - 1].word === Y[j - 1].word) {
            lcsWords.unshift({
                word: X[i - 1].word,
                text1Position: i - 1,
                text2Position: j - 1,
                text1Line: X[i - 1].line,
                text2Line: Y[j - 1].line,
                text1OriginalLine: X[i - 1].originalLine,
                text2OriginalLine: Y[j - 1].originalLine
            });
            matchedIndices1.add(i - 1);
            matchedIndices2.add(j - 1);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return {
        length: dp[m][n],
        matches: lcsWords,
        matchedIndices1: matchedIndices1,
        matchedIndices2: matchedIndices2
    };
}

function findConsecutiveMatches(matches) {
    const sequences = [];
    let currentSequence = [];
    
    for (let i = 0; i < matches.length; i++) {
        if (currentSequence.length === 0) {
            currentSequence.push(matches[i]);
        } else {
            const lastMatch = currentSequence[currentSequence.length - 1];
            const currentMatch = matches[i];
            
            // Check if words are consecutive
            if (currentMatch.text1Position === lastMatch.text1Position + 1 && 
                currentMatch.text2Position === lastMatch.text2Position + 1) {
                currentSequence.push(currentMatch);
            } else {
                if (currentSequence.length >= 3) { // Only consider sequences of 3+ words
                    sequences.push([...currentSequence]);
                }
                currentSequence = [currentMatch];
            }
        }
    }
    
    // Don't forget the last sequence
    if (currentSequence.length >= 3) {
        sequences.push(currentSequence);
    }
    
    return sequences;
}

function detailedPlagiarismAnalysis(text1, text2) {
    const words1 = getWordsWithPositions(text1);
    const words2 = getWordsWithPositions(text2);
    
    if (words1.length === 0 || words2.length === 0) {
        return {
            score: 0,
            message: "One or both texts are empty",
            details: {
                totalWords1: 0,
                totalWords2: 0,
                matchedWords: 0,
                matchedLines: [],
                consecutiveSequences: [],
                highlightedText1: text1,
                highlightedText2: text2
            }
        };
    }
    
    const lcsResult = findLCSWithDetails(words1, words2);
    const avgLength = (words1.length + words2.length) / 2;
    const score = (lcsResult.length / avgLength) * 100;
    
    // Find consecutive sequences
    const consecutiveSequences = findConsecutiveMatches(lcsResult.matches);
    
    // Group matches by line
    const matchedLines = {};
    lcsResult.matches.forEach(match => {
        const key = `${match.text1Line}-${match.text2Line}`;
        if (!matchedLines[key]) {
            matchedLines[key] = {
                text1Line: match.text1Line,
                text2Line: match.text2Line,
                text1Content: match.text1OriginalLine,
                text2Content: match.text2OriginalLine,
                matchedWords: []
            };
        }
        matchedLines[key].matchedWords.push(match.word);
    });
    
    // Create highlighted versions of the texts
    const highlightedText1 = highlightMatches(text1, words1, lcsResult.matchedIndices1);
    const highlightedText2 = highlightMatches(text2, words2, lcsResult.matchedIndices2);
    
    let message = "";
    if (score > 70) {
        message = "High similarity detected! Significant portions of text match.";
    } else if (score > 40) {
        message = "Moderate similarity found. Some sections may need review.";
    } else if (score > 15) {
        message = "Low similarity detected. Minor overlapping content found.";
    } else {
        message = "Very low similarity. Content appears to be largely original.";
    }
    
    return {
        score: Math.round(score * 10) / 10,
        message: message,
        details: {
            totalWords1: words1.length,
            totalWords2: words2.length,
            matchedWords: lcsResult.length,
            matchedLines: Object.values(matchedLines),
            consecutiveSequences: consecutiveSequences,
            highlightedText1: highlightedText1,
            highlightedText2: highlightedText2,
            uniqueMatchedWords: [...new Set(lcsResult.matches.map(m => m.word))].length
        }
    };
}

function highlightMatches(originalText, wordsWithPos, matchedIndices) {
    const lines = originalText.split('\n');
    const highlightedLines = [];
    
    lines.forEach((line, lineIndex) => {
        if (line.trim().length === 0) {
            highlightedLines.push(line);
            return;
        }
        
        const wordsInLine = wordsWithPos.filter(w => w.line === lineIndex + 1);
        let highlightedLine = line;
        let offset = 0;
        
        // Sort words by their appearance in the original line
        const originalWords = line.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
        
        originalWords.forEach((word, wordIndex) => {
            const wordPos = wordsInLine.findIndex(w => w.word === word && w.position === wordIndex + 1);
            if (wordPos !== -1) {
                const globalIndex = wordsWithPos.findIndex(w => 
                    w.word === word && w.line === lineIndex + 1 && w.position === wordIndex + 1
                );
                
                if (matchedIndices.has(globalIndex)) {
                    const wordStart = highlightedLine.toLowerCase().indexOf(word, offset);
                    if (wordStart !== -1) {
                        const originalWord = highlightedLine.substring(wordStart, wordStart + word.length);
                        const highlighted = `<mark class="highlight">${originalWord}</mark>`;
                        highlightedLine = highlightedLine.substring(0, wordStart) + 
                                        highlighted + 
                                        highlightedLine.substring(wordStart + word.length);
                        offset = wordStart + highlighted.length;
                    }
                }
            }
        });
        
        highlightedLines.push(highlightedLine);
    });
    
    return highlightedLines.join('\n');
}

// Legacy function for backward compatibility
function plagiarismScore(text1, text2) {
    const result = detailedPlagiarismAnalysis(text1, text2);
    return result.score;
}

module.exports = { 
    plagiarismScore, 
    detailedPlagiarismAnalysis 
};