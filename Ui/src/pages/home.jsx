import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Shield, Zap, CheckCircle, Users, Search, ArrowRight, Cloud, Lock, Star, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const VeriTextHomepage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [visibleStep, setVisibleStep] = useState(0);

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
    // Handle file drop logic here
    console.log('Files dropped:', e.dataTransfer.files);
  };

  // Fixed navigation function
  const redirectToCheckPage = () => {
    navigate('/check');
  };

  const smoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 20 ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                VeriText
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => smoothScroll('features')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Features
              </button>
              <button onClick={() => smoothScroll('how-it-works')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                How It Works
              </button>
              <button onClick={() => smoothScroll('about')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </button>
              <button onClick={() => smoothScroll('contact')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Contact
              </button>
              <button
                onClick={redirectToCheckPage}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 -skew-y-1 transform origin-top-left"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Protect Your Work.
                  </span>
                  <br />
                  <span className="text-gray-900">Stay Original.</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Plagiarism detection using cutting-edge sequence matching algorithms (LCS).
                  Trusted by students, educators, and researchers worldwide for maintaining academic integrity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={redirectToCheckPage}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg flex items-center justify-center group"
                >
                  Check Document Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => smoothScroll('how-it-works')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold text-lg"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
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
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-gray-400 text-sm">VeriText Analysis</div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-red-200 to-red-400 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-800">Analysis Complete</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">98.5%</div>
                      </div>
                      <div className="text-sm text-green-600 mt-1">Original Content</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Shield className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How VeriText Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced LCS algorithm analyzes document sequences to detect similarities with unprecedented accuracy and reliability
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Animated Progress Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="w-full bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ height: visibleStep >= 3 ? '100%' : `${(visibleStep + 1) * 33.33}%` }}
                ></div>
              </div>

              {/* Step 1 */}
              <div
                className={`relative flex items-center mb-16 transition-all duration-700 ${visibleStep >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                data-step="0"
              >
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10 transition-all duration-500 ${visibleStep >= 0 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                  }`}>
                  1
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl mr-6">
                        <Upload className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Documents</h3>
                        <p className="text-gray-600 leading-relaxed">
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
                className={`relative flex items-center mb-16 transition-all duration-700 delay-300 ${visibleStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                data-step="1"
              >
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10 transition-all duration-500 delay-300 ${visibleStep >= 1 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                  }`}>
                  2
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl mr-6">
                        <Search className={`h-8 w-8 text-purple-600 ${visibleStep >= 1 ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">LCS Analysis</h3>
                        <p className="text-gray-600 leading-relaxed">
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
                className={`relative flex items-center transition-all duration-700 delay-600 ${visibleStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                data-step="2"
              >
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10 transition-all duration-500 delay-600 ${visibleStep >= 2 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                  }`}>
                  3
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl mr-6">
                        <FileText className={`h-8 w-8 text-green-600 ${visibleStep >= 2 ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Detailed Results</h3>
                        <p className="text-gray-600 leading-relaxed">
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
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose VeriText?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for the modern academic world with cutting-edge technology, robust security, and intuitive user experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                description: "Seamlessly works with PDF, DOC, DOCX, TXT, and more file formats with intelligent text extraction.",
                color: "from-blue-400 to-indigo-500"
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
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100">
                <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About VeriText</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              <p>
                VeriText is a cutting-edge plagiarism detection platform developed specifically for the academic community.
                Our mission is to promote academic integrity while making sophisticated plagiarism detection accessible,
                accurate, and user-friendly for institutions worldwide.
              </p>
              <p>
                Utilizing the advanced Longest Common Subsequence (LCS) algorithm ,
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
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            Have questions or need support? Our academic integrity experts are here to help.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600">chiragdwivediji@gmail.com</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600">+91 95681 40156</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Mehragav, Bhimtal</p>
            </div>
          </div>

          <button
            onClick={redirectToCheckPage}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg"
          >
            Start Your Free Check Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            {/* Brand Section */}
            <div className="flex-1 max-w-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">VeriText</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Empowering academic integrity through advanced plagiarism detection technology.
                Built for students, educators, and researchers worldwide who value originality and excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <Github className="h-5 w-5 text-white" />
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/chiragdwivedi/" target="_blank" rel="noopener noreferrer">
                  <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                </a>

                <a href="https://x.com/dwivedi_ch58529" target="_blank" rel="noopener noreferrer">
                  <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <Twitter className="h-5 w-5 text-white" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:ml-auto">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => smoothScroll('about')} className="hover:text-white transition-colors">About VeriText</button></li>
                <li><button onClick={() => smoothScroll('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => smoothScroll('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
                <li><button onClick={redirectToCheckPage} className="hover:text-white transition-colors">Start Checking</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VeriTextHomepage;