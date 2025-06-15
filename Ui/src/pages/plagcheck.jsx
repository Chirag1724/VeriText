import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Search, Shield, Eye, BarChart3, FileText, Copy, Moon, Sun } from "lucide-react";

function App() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Handle scroll for header effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Load theme preference from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    // Save theme preference to localStorage
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const checkPlagiarism = async () => {
        if (!text1 || !text2) {
            alert("Both texts are required!");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);
        setActiveTab("overview");

        try {
            const response = await fetch("https://plagiarism-backend-sye8.onrender.com/check-plagiarism", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text1, text2 }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to connect to the server. Please make sure your backend is running on http://localhost:5000");
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score > 70) return isDarkMode ? "text-red-400" : "text-red-600";
        if (score > 40) return isDarkMode ? "text-yellow-400" : "text-yellow-600";
        return isDarkMode ? "text-green-400" : "text-green-600";
    };

    const getScoreIcon = (score) => {
        const iconClass = isDarkMode ? "w-5 h-5" : "w-5 h-5";
        if (score > 70) return <AlertTriangle className={`${iconClass} ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />;
        if (score > 40) return <AlertTriangle className={`${iconClass} ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />;
        return <CheckCircle className={`${iconClass} ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />;
    };

    const clearAll = () => {
        setText1("");
        setText2("");
        setResult(null);
        setError(null);
        setActiveTab("overview");
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // You could add a toast notification here
        });
    };

    const renderHighlightedText = (highlightedText, title) => {
        return (
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
                <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h4>
                    <button
                        onClick={() => copyToClipboard(highlightedText.replace(/<[^>]*>/g, ''))}
                        className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                        title="Copy text"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
                <div
                    className={`text-sm ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'} leading-relaxed whitespace-pre-wrap font-mono p-3 rounded border max-h-96 overflow-y-auto`}
                    dangerouslySetInnerHTML={{
                        __html: highlightedText.replace(/\n/g, '<br>')
                    }}
                    style={{
                        lineHeight: '1.6'
                    }}
                />
            </div>
        );
    };

    const themeClasses = {
        background: isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50',
        cardBg: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100',
        text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
        textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        inputBg: isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-700 placeholder-gray-400',
        sectionBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
        headerBg: isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-blue-100',
    };

    return (
        <div className={`min-h-screen ${themeClasses.background}`}>
            <style jsx>{`
                .highlight {
                    background-color: ${isDarkMode ? '#fbbf24' : '#fef3c7'};
                    border: 1px solid ${isDarkMode ? '#f59e0b' : '#f59e0b'};
                    border-radius: 3px;
                    padding: 1px 2px;
                    font-weight: 600;
                    color: ${isDarkMode ? '#1f2937' : '#92400e'};
                }
            `}</style>

            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 20 ? `${themeClasses.headerBg} backdrop-blur-lg shadow-lg border-b` : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                VeriText
                            </span>
                        </div>
                        
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode 
                                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-20 py-8 px-4 main-content">
                {/* Main Card */}
                <div className={`max-w-6xl mx-auto ${themeClasses.cardBg} rounded-2xl shadow-xl border overflow-hidden`}>
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-2xl font-semibold text-white flex items-center">
                            <Search className="w-6 h-6 mr-3" />
                            Advanced Text Similarity Analysis
                        </h2>
                        <p className="text-blue-100 mt-2">
                            Enter two text samples below for comprehensive plagiarism detection with detailed insights
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className={`mx-8 mt-6 ${isDarkMode ? 'bg-red-900/50 border-red-700' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
                            <div className="flex items-center">
                                <AlertTriangle className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'} mr-2`} />
                                <p className={`${isDarkMode ? 'text-red-300' : 'text-red-800'} text-sm`}>{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Input Section */}
                    <div className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* First Text Area */}
                            <div className="space-y-3">
                                <label className={`block text-sm font-semibold ${themeClasses.textSecondary} uppercase tracking-wide`}>
                                    Original Text
                                </label>
                                <textarea
                                    placeholder="Paste or type the first text sample here..."
                                    value={text1}
                                    onChange={(e) => setText1(e.target.value)}
                                    rows="10"
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none font-mono text-sm ${themeClasses.inputBg}`}
                                />
                                <div className={`flex justify-between text-sm ${themeClasses.textMuted}`}>
                                    <span>{text1.length} characters</span>
                                    <span>{text1.split(/\s+/).filter(word => word.length > 0).length} words</span>
                                </div>
                            </div>

                            {/* Second Text Area */}
                            <div className="space-y-3">
                                <label className={`block text-sm font-semibold ${themeClasses.textSecondary} uppercase tracking-wide`}>
                                    Comparison Text
                                </label>
                                <textarea
                                    placeholder="Paste or type the second text sample here..."
                                    value={text2}
                                    onChange={(e) => setText2(e.target.value)}
                                    rows="10"
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none font-mono text-sm ${themeClasses.inputBg}`}
                                />
                                <div className={`flex justify-between text-sm ${themeClasses.textMuted}`}>
                                    <span>{text2.length} characters</span>
                                    <span>{text2.split(/\s+/).filter(word => word.length > 0).length} words</span>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 pt-4">
                            <button
                                onClick={clearAll}
                                className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-500 hover:bg-gray-600'} text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2`}
                            >
                                <span>Clear All</span>
                            </button>
                            <button
                                onClick={checkPlagiarism}
                                disabled={isLoading || !text1.trim() || !text2.trim()}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" />
                                        <span>Analyze for Plagiarism</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    {result && (
                        <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'} p-8`}>
                            {/* Score Overview */}
                            <div className={`${themeClasses.cardBg} rounded-xl shadow-sm border p-6 mb-6`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`text-xl font-bold ${themeClasses.text} flex items-center`}>
                                        {getScoreIcon(result.score)}
                                        <span className="ml-3">Analysis Results</span>
                                    </h3>
                                    <div className="text-right">
                                        <div className={`text-sm ${themeClasses.textMuted} uppercase tracking-wide font-medium`}>
                                            Similarity Score
                                        </div>
                                        <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                                            {result.score}%
                                        </div>
                                    </div>
                                </div>

                                {/* Score Bar */}
                                <div className="mb-4">
                                    <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3`}>
                                        <div
                                            className={`h-3 rounded-full transition-all duration-500 ${result.score > 70 ? 'bg-red-500' :
                                                    result.score > 40 ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${Math.min(Math.max(result.score, 0), 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className={`${themeClasses.sectionBg} rounded-lg p-4`}>
                                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                                        <span className="font-semibold">Assessment:</span> {result.message}
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Analysis Tabs */}
                            <div className={`${themeClasses.cardBg} rounded-xl shadow-sm border overflow-hidden`}>
                                {/* Tab Headers */}
                                <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <nav className="flex">
                                        <button
                                            onClick={() => setActiveTab("overview")}
                                            className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${activeTab === "overview"
                                                    ? `border-blue-500 text-blue-600 ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-50'}`
                                                    : `border-transparent ${themeClasses.textMuted} hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                                                }`}
                                        >
                                            <BarChart3 className="w-4 h-4" />
                                            <span>Statistics</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("highlights")}
                                            className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${activeTab === "highlights"
                                                    ? `border-blue-500 text-blue-600 ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-50'}`
                                                    : `border-transparent ${themeClasses.textMuted} hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                                                }`}
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Highlighted Text</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("matches")}
                                            className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${activeTab === "matches"
                                                    ? `border-blue-500 text-blue-600 ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-50'}`
                                                    : `border-transparent ${themeClasses.textMuted} hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                                                }`}
                                        >
                                            <FileText className="w-4 h-4" />
                                            <span>Line Matches</span>
                                        </button>
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="p-6">
                                    {activeTab === "overview" && result.details && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className={`${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-50'} rounded-lg p-4`}>
                                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                                        {result.details.totalWords1}
                                                    </div>
                                                    <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>Words in Text 1</div>
                                                </div>
                                                <div className={`${isDarkMode ? 'bg-green-900/50' : 'bg-green-50'} rounded-lg p-4`}>
                                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                                        {result.details.totalWords2}
                                                    </div>
                                                    <div className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>Words in Text 2</div>
                                                </div>
                                                <div className={`${isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-50'} rounded-lg p-4`}>
                                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                                        {result.details.matchedWords}
                                                    </div>
                                                    <div className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>Matched Words</div>
                                                </div>
                                                <div className={`${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-50'} rounded-lg p-4`}>
                                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                                        {result.details.uniqueMatchedWords}
                                                    </div>
                                                    <div className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>Unique Matches</div>
                                                </div>
                                            </div>

                                            {result.details.consecutiveSequences && result.details.consecutiveSequences.length > 0 && (
                                                <div className="mt-6">
                                                    <h4 className={`font-semibold ${themeClasses.text} mb-3`}>Consecutive Word Sequences (3+ words)</h4>
                                                    <div className="space-y-2">
                                                        {result.details.consecutiveSequences.map((sequence, index) => (
                                                            <div key={index} className={`${isDarkMode ? 'bg-red-900/50 border-red-700' : 'bg-red-50 border-red-200'} border rounded-lg p-3`}>
                                                                <div className={`font-medium ${isDarkMode ? 'text-red-300' : 'text-red-900'}`}>
                                                                    Sequence {index + 1}: {sequence.length} consecutive words
                                                                </div>
                                                                <div className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-700'} mt-1`}>
                                                                    "{sequence.map(s => s.word).join(' ')}"
                                                                </div>
                                                                <div className={`text-xs ${isDarkMode ? 'text-red-500' : 'text-red-600'} mt-1`}>
                                                                    Lines: {sequence[0].text1Line} → {sequence[0].text2Line}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === "highlights" && result.details && (
                                        <div className="space-y-6">
                                            <div className="grid lg:grid-cols-2 gap-6">
                                                {renderHighlightedText(result.details.highlightedText1, "Original Text (Highlighted Matches)")}
                                                {renderHighlightedText(result.details.highlightedText2, "Comparison Text (Highlighted Matches)")}
                                            </div>
                                            <div className={`${isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4`}>
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 bg-yellow-300 border border-yellow-500 rounded mr-2"></div>
                                                    <span className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'} font-medium`}>
                                                        Highlighted words indicate matches between the two texts
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "matches" && result.details && result.details.matchedLines && (
                                        <div className="space-y-4">
                                            <div className={`text-sm ${themeClasses.textSecondary} mb-4`}>
                                                Found {result.details.matchedLines.length} line pairs with matching content
                                            </div>
                                            {result.details.matchedLines.length > 0 ? (
                                                <div className="space-y-4">
                                                    {result.details.matchedLines.map((match, index) => (
                                                        <div key={index} className={`border ${isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'} rounded-lg p-4`}>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>
                                                                    Line Match #{index + 1}
                                                                </span>
                                                                <span className={`text-xs ${themeClasses.textMuted}`}>
                                                                    Lines: {match.text1Line} ↔ {match.text2Line}
                                                                </span>
                                                            </div>

                                                            <div className="grid md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <div className={`text-xs font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} mb-1`}>
                                                                        Original Text (Line {match.text1Line})
                                                                    </div>
                                                                    <div className={`text-sm ${themeClasses.textSecondary} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded border`}>
                                                                        {match.text1Content}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className={`text-xs font-medium ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-1`}>
                                                                        Comparison Text (Line {match.text2Line})
                                                                    </div>
                                                                    <div className={`text-sm ${themeClasses.textSecondary} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded border`}>
                                                                        {match.text2Content}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                                                <div className={`text-xs ${themeClasses.textSecondary}`}>
                                                                    <span className="font-medium">Matched words:</span>{' '}
                                                                    <span className={`${isDarkMode ? 'text-orange-400' : 'text-orange-700'} font-medium`}>
                                                                        {match.matchedWords.join(', ')}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className={`text-center py-8 ${themeClasses.textMuted}`}>
                                                    <FileText className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                                                    <p>No matching lines found between the texts</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`max-w-6xl mx-auto text-center mt-8 ${themeClasses.textMuted} text-sm`}>
                    <p>VeriText uses advanced LCS algorithms to detect text similarity with detailed visual analysis</p>
                </div>
            </div>
        </div>
    );
}

export default App;