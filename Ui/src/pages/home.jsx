import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Shield, Zap, CheckCircle, Users, Search, ArrowRight, Cloud, Lock, Star, Mail, Phone, MapPin, Github, Linkedin, Twitter, Sun, Moon, Menu, X } from 'lucide-react';

const VeriTextHomepage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [visibleStep, setVisibleStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.dataset.step);
            if (stepIndex !== undefined) {
              setTimeout(() => setVisibleStep(stepIndex), stepIndex * 300);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const steps = document.querySelectorAll('[data-step]');
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const redirectToCheckPage = () => {
    navigate('/check');
  };

  const smoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 20 
          ? isDarkMode 
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-700' 
            : 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                VeriText
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <button onClick={() => smoothScroll('features')} className={`${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              } transition-colors font-medium`}>
                Features
              </button>
              <button onClick={() => smoothScroll('how-it-works')} className={`${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              } transition-colors font-medium`}>
                How It Works
              </button>
              <button onClick={() => smoothScroll('about')} className={`${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              } transition-colors font-medium`}>
                About
              </button>
              <button onClick={() => smoothScroll('contact')} className={`${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              } transition-colors font-medium`}>
                Contact
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <button
                onClick={redirectToCheckPage}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 xl:px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Controls */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`lg:hidden mt-4 py-4 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex flex-col space-y-4">
                <button onClick={() => smoothScroll('features')} className={`text-left ${
                  isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors font-medium`}>
                  Features
                </button>
                <button onClick={() => smoothScroll('how-it-works')} className={`text-left ${
                  isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors font-medium`}>
                  How It Works
                </button>
                <button onClick={() => smoothScroll('about')} className={`text-left ${
                  isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors font-medium`}>
                  About
                </button>
                <button onClick={() => smoothScroll('contact')} className={`text-left ${
                  isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors font-medium`}>
                  Contact
                </button>
                <button
                  onClick={() => {
                    redirectToCheckPage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-left"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-600/10 to-indigo-600/10' 
            : 'bg-gradient-to-r from-blue-600/5 to-indigo-600/5'
        } -skew-y-1 transform origin-top-left`}></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Protect Your Work.
                  </span>
                  <br />
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Stay Original.</span>
                </h1>
                <p className={`text-lg sm:text-xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } max-w-lg mx-auto lg:mx-0 leading-relaxed`}>
                  Plagiarism detection using cutting-edge sequence matching algorithms (LCS).
                  Trusted by students, educators, and researchers worldwide for maintaining academic integrity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={redirectToCheckPage}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-base sm:text-lg flex items-center justify-center group"
                >
                  Check Document Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => smoothScroll('how-it-works')}
                  className={`border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold text-base sm:text-lg ${
                    isDarkMode ? 'hover:bg-blue-600' : ''
                  }`}
                >
                  Learn More
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Free to try
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-blue-500 mr-2" />
                  Privacy-first approach
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  Academic-grade accuracy
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className={`relative ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-slate-800' 
                  : 'bg-gradient-to-br from-blue-100 to-indigo-100'
              } rounded-3xl p-6 sm:p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500`}>
                <div className={`${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } rounded-2xl p-4 sm:p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className={`${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    } text-xs sm:text-sm`}>VeriText Analysis</div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className={`h-3 sm:h-4 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } rounded animate-pulse`}></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-red-200 to-red-400 rounded"></div>
                    <div className={`h-3 sm:h-4 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } rounded animate-pulse`}></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded"></div>
                    <div className={`h-3 sm:h-4 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } rounded animate-pulse`}></div>

                    <div className={`mt-4 sm:mt-6 p-3 sm:p-4 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700' 
                        : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                    } rounded-lg border`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
                          <span className={`font-semibold text-sm sm:text-base ${
                            isDarkMode ? 'text-green-400' : 'text-green-800'
                          }`}>Analysis Complete</span>
                        </div>
                        <div className={`text-xl sm:text-2xl font-bold ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>98.5%</div>
                      </div>
                      <div className={`text-xs sm:text-sm ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      } mt-1`}>Original Content</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-blue-500 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-green-500 text-white p-2 sm:p-3 rounded-full shadow-lg animate-pulse">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={`py-12 sm:py-20 px-4 sm:px-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>How VeriText Works</h2>
            <p className={`text-lg sm:text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-3xl mx-auto`}>
              Our advanced LCS algorithm analyzes document sequences to detect similarities with unprecedented accuracy and reliability
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Animated Progress Line */}
              <div className={`absolute left-6 sm:left-8 top-0 bottom-0 w-1 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              } rounded-full overflow-hidden`}>
                <div
                  className="w-full bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ height: visibleStep >= 3 ? '100%' : `${(visibleStep + 1) * 33.33}%` }}
                ></div>
              </div>

              {/* Step 1 */}
              <div
                className={`relative flex items-center mb-12 sm:mb-16 transition-all duration-700 ${
                  visibleStep >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                data-step="0"
              >
                <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg relative z-10 transition-all duration-500 ${
                  visibleStep >= 0 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`}>
                  1
                </div>
                <div className="ml-6 sm:ml-8 flex-1">
                  <div className={`${
                    isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                  } p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border`}>
                    <div className="flex flex-col sm:flex-row items-start mb-4">
                      <div className={`${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50' 
                          : 'bg-gradient-to-r from-blue-100 to-indigo-100'
                      } p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6`}>
                        <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className={`text-xl sm:text-2xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        } mb-2 sm:mb-3`}>Upload Documents</h3>
                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        } leading-relaxed text-sm sm:text-base`}>
                          Simply upload your Texts.
                          Our secure system handles Text processing with complete privacy protection and data encryption.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`relative flex items-center mb-12 sm:mb-16 transition-all duration-700 delay-300 ${
                  visibleStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                data-step="1"
              >
                <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg relative z-10 transition-all duration-500 delay-300 ${
                  visibleStep >= 1 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`}>
                  2
                </div>
                <div className="ml-6 sm:ml-8 flex-1">
                  <div className={`${
                    isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                  } p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border`}>
                    <div className="flex flex-col sm:flex-row items-start mb-4">
                      <div className={`${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' 
                          : 'bg-gradient-to-r from-purple-100 to-pink-100'
                      } p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6`}>
                        <Search className={`h-6 w-6 sm:h-8 sm:w-8 text-purple-600 ${visibleStep >= 1 ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl sm:text-2xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        } mb-2 sm:mb-3`}>LCS Analysis</h3>
                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        } leading-relaxed text-sm sm:text-base`}>
                          Our sophisticated Longest Common Subsequence algorithm analyzes text patterns,
                          identifies potential matches, and compares against another Text with precision and speed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`relative flex items-center transition-all duration-700 delay-600 ${
                  visibleStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                data-step="2"
              >
                <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg relative z-10 transition-all duration-500 delay-600 ${
                  visibleStep >= 2 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`}>
                  3
                </div>
                <div className="ml-6 sm:ml-8 flex-1">
                  <div className={`${
                    isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                  } p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border`}>
                    <div className="flex flex-col sm:flex-row items-start mb-4">
                      <div className={`${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50' 
                          : 'bg-gradient-to-r from-green-100 to-emerald-100'
                      } p-3 sm:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6`}>
                        <FileText className={`h-6 w-6 sm:h-8 sm:w-8 text-green-600 ${visibleStep >= 2 ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl sm:text-2xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        } mb-2 sm:mb-3`}>Detailed Results</h3>
                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        } leading-relaxed text-sm sm:text-base`}>
                          Receive comprehensive reports with similarity scores, highlighted matches, source citations,
                          and actionable recommendations for improving document originality.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-12 sm:py-20 px-4 sm:px-6 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>Why Choose VeriText?</h2>
            <p className={`text-lg sm:text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-3xl mx-auto`}>
              Built for the modern academic world with cutting-edge technology, robust security, and intuitive user experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Processing",
                description: "Process documents in seconds with our optimized LCS algorithm implementation and cloud infrastructure.",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: Shield,
                title: "99.5% Accuracy Rate",
                description: "Advanced sequence matching and machine learning deliver precise, reliable results you can trust completely.",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: FileText,
                title: "Universal Format Support",
                description: "Seamlessly works with PDF, DOC, DOCX, and more file formats with intelligent text extraction.",
                color: "from-blue-400 to-indigo-500",
                comingSoon: true
              },
              {
                icon: Lock,
                title: "Enterprise-Grade Security",
                description: "Your documents are processed securely with end-to-end encryption and automatic deletion after analysis.",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: Users,
                title: "Academic Excellence",
                description: "Trusted by 500+ universities and research institutions worldwide for maintaining academic integrity.",
                color: "from-indigo-400 to-blue-500"
              },
              {
                icon: Star,
                title: "Intuitive Interface",
                description: "User-friendly design crafted specifically for students, educators, and researchers of all technical levels.",
                color: "from-rose-400 to-red-500"
              }
            ].map((feature, index) => (
              <div key={index} className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border relative`}>
                {feature.comingSoon && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                    Coming Soon
                  </div>
                )}
                <div className={`bg-gradient-to-r ${feature.color} p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } mb-2 sm:mb-3`}>{feature.title}</h3>
                <p className={`${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } leading-relaxed text-sm sm:text-base`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-12 sm:py-20 px-4 sm:px-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } mb-6 sm:mb-8`}>About VeriText</h2>
            <div className={`space-y-4 sm:space-y-6 text-base sm:text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } leading-relaxed max-w-4xl mx-auto`}>
              <p>
                VeriText is a cutting-edge plagiarism detection platform developed specifically for the academic community.
                Our mission is to promote academic integrity while making sophisticated plagiarism detection accessible,
                accurate, and user-friendly for institutions worldwide.
              </p>
              <p>
                Utilizing the advanced Longest Common Subsequence (LCS) algorithm,
                we provide precise document analysis that helps students learn proper citation practices,
                assists educators in maintaining academic standards, and supports researchers in ensuring
                the originality and integrity of their scholarly work.
              </p>
              <p>
                We believe that technology should empower education, not complicate it. That's why VeriText combines
                sophisticated algorithms with an intuitive interface, making professional-grade plagiarism detection
                available to everyone in the academic community, from high school students to university professors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-12 sm:py-20 px-4 sm:px-6 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          } mb-6 sm:mb-8`}>Get in Touch</h2>
          <p className={`text-lg sm:text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } mb-8 sm:mb-12`}>
            Have questions or need support? Our academic integrity experts are here to help.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className={`${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-800' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50'
            } p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border`}>
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className={`font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              } mb-2 text-sm sm:text-base`}>Email Support</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } text-sm sm:text-base`}>chiragdwivediji@gmail.com</p>
            </div>
            <div className={`${
              isDarkMode 
                ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-800' 
                : 'bg-gradient-to-br from-green-50 to-emerald-50'
            } p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border`}>
              <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-3 sm:mb-4" />
              <h3 className={`font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              } mb-2 text-sm sm:text-base`}>Phone Support</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } text-sm sm:text-base`}>+91 95681 40156</p>
            </div>
            <div className={`${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-800' 
                : 'bg-gradient-to-br from-purple-50 to-pink-50'
            } p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border sm:col-span-2 lg:col-span-1`}>
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-3 sm:mb-4" />
              <h3 className={`font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              } mb-2 text-sm sm:text-base`}>Location</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } text-sm sm:text-base`}>Mehragav, Bhimtal</p>
            </div>
          </div>

          <button
            onClick={redirectToCheckPage}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-base sm:text-lg"
          >
            Start Your Free Check Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${
        isDarkMode ? 'bg-black' : 'bg-gray-900'
      } text-white py-12 sm:py-16 px-4 sm:px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8 sm:mb-12">
            {/* Brand Section */}
            <div className="flex-1 max-w-lg">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">VeriText</span>
              </div>
              <p className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              } mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base`}>
                Empowering academic integrity through advanced plagiarism detection technology.
                Built for students, educators, and researchers worldwide who value originality and excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div className={`${
                    isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'
                  } p-2 rounded-lg transition-colors cursor-pointer`}>
                    <Github className="h-5 w-5 text-white" />
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/chiragdwivedi/" target="_blank" rel="noopener noreferrer">
                  <div className={`${
                    isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'
                  } p-2 rounded-lg transition-colors cursor-pointer`}>
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                </a>
                <a href="https://x.com/dwivedi_ch58529" target="_blank" rel="noopener noreferrer">
                  <div className={`${
                    isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'
                  } p-2 rounded-lg transition-colors cursor-pointer`}>
                    <Twitter className="h-5 w-5 text-white" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:ml-auto">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><button onClick={() => smoothScroll('about')} className="hover:text-white transition-colors text-left">About VeriText</button></li>
                <li><button onClick={() => smoothScroll('features')} className="hover:text-white transition-colors text-left">Features</button></li>
                <li><button onClick={() => smoothScroll('how-it-works')} className="hover:text-white transition-colors text-left">How It Works</button></li>
                <li><button onClick={redirectToCheckPage} className="hover:text-white transition-colors text-left">Start Checking</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VeriTextHomepage;