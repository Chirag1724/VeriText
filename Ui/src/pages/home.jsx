import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Search, Shield } from "lucide-react";

function App() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // Handle scroll for header effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const checkPlagiarism = async () => {
        if (!text1 || !text2) {
            alert("Both texts are required!");
            return;
        }

        setIsLoading(true);
        
        // Simulate API call with delay
        setTimeout(() => {
            // Mock result for demonstration
            const mockScore = Math.floor(Math.random() * 100);
            const mockResult = {
                score: mockScore,
                message: mockScore > 70 
                    ? "High similarity detected. Please review the content carefully." 
                    : mockScore > 40 
                    ? "Moderate similarity found. Some sections may need attention."
                    : "Low similarity detected. Content appears to be original."
            };
            setResult(mockResult);
            setIsLoading(false);
        }, 2000);

        /* Original API call - uncomment when backend is available
        try {
            const response = await axios.post("http://localhost:5000/check-plagiarism", { text1, text2 });
            setResult(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
        }
        */
    };

    const getScoreColor = (score) => {
        if (score > 70) return "text-red-600";
        if (score > 40) return "text-yellow-600";
        return "text-green-600";
    };

    const getScoreIcon = (score) => {
        if (score > 70) return <AlertTriangle className="w-5 h-5 text-red-600" />;
        if (score > 40) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    };

    const handleGetStarted = () => {
        // Smooth scroll to main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrollY > 20 ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100' : 'bg-transparent'
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
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</a>
                            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</a>
                            <button 
                                onClick={handleGetStarted}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
                            >
                                Get Started
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-20 py-8 px-4 main-content">
                {/* Main Card */}
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-2xl font-semibold text-white flex items-center">
                            <Search className="w-6 h-6 mr-3" />
                            Text Comparison Analysis
                        </h2>
                        <p className="text-blue-100 mt-2">
                            Enter two text samples below for similarity analysis
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* First Text Area */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Original Text
                                </label>
                                <textarea
                                    placeholder="Paste or type the first text sample here..."
                                    value={text1}
                                    onChange={(e) => setText1(e.target.value)}
                                    rows="8"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
                                />
                                <div className="text-sm text-gray-500">
                                    {text1.length} characters
                                </div>
                            </div>

                            {/* Second Text Area */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Comparison Text
                                </label>
                                <textarea
                                    placeholder="Paste or type the second text sample here..."
                                    value={text2}
                                    onChange={(e) => setText2(e.target.value)}
                                    rows="8"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
                                />
                                <div className="text-sm text-gray-500">
                                    {text2.length} characters
                                </div>
                            </div>
                        </div>

                        {/* Check Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={checkPlagiarism}
                                disabled={isLoading || !text1 || !text2}
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
                                        <span>Check for Plagiarism</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    {result && (
                        <div className="border-t border-gray-100 bg-gray-50 p-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                        {getScoreIcon(result.score)}
                                        <span className="ml-3">Analysis Results</span>
                                    </h3>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                                            Similarity Score
                                        </div>
                                        <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                                            {result.score.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Score Bar */}
                                <div className="mb-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className={`h-3 rounded-full transition-all duration-500 ${
                                                result.score > 70 ? 'bg-red-500' : 
                                                result.score > 40 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                            style={{ width: `${Math.min(result.score, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        <span className="font-semibold">Assessment:</span> {result.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="max-w-4xl mx-auto text-center mt-8 text-gray-500 text-sm">
                    <p>VeriText uses advanced algorithms to detect text similarity and potential plagiarism</p>
                </div>
            </div>
        </div>
    );
}

export default App;