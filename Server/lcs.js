function preprocessText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
}

function lcs(X, Y) {
    let m = X.length, n = Y.length;
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (X[i - 1] === Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

function plagiarismScore(text1, text2) {
    let words1 = preprocessText(text1);
    let words2 = preprocessText(text2);

    let lcsLength = lcs(words1, words2);
    let avgLength = (words1.length + words2.length) / 2;
    
    return (lcsLength / avgLength) * 100;
}

module.exports = { plagiarismScore };
