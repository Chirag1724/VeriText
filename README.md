# VeriText 📊

A full-stack web application that detects and compares the similarity between two documents using the **Longest Common Subsequence (LCS)** algorithm. VeriText provides an intuitive interface for document comparison with efficient backend processing.

## 🌐 Live Demo

**[Try VeriText Live →](https://veritext.onrender.com)**

*Experience the application in action without any setup required!*

## 🌟 Features

- **Document Similarity Detection**: Compare two text documents and get precise similarity scores
- **LCS Algorithm Implementation**: Uses the robust Longest Common Subsequence algorithm for accurate text comparison
- **Real-time Analysis**: Fast processing and instant results
- **Responsive Design**: Modern, clean UI that works across all devices
- **User-friendly Interface**: Intuitive design for seamless document comparison
- **Detailed Results**: Visual representation of similarities and differences

## 🛠️ Tech Stack

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Fast, unopinionated web framework for Node.js
- **LCS Algorithm**: Custom implementation for document similarity detection

## 🚀 Getting Started

### Quick Start (Recommended)

**[🌐 Try the Live Demo](https://veritext.onrender.com)** - No installation required!

### Local Development Setup

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chirag1724/VeriText.git
   cd VeriText
   ```

2. **Install dependencies for both frontend and backend**
   
   For the backend:
   ```bash
   cd server
   npm install
   ```
   
   For the frontend:
   ```bash
   cd ui
   npm install
   ```

3. **Start the development servers**
   
   Start the backend server:
   ```bash
   cd server
   node server.js
   ```
   
   Start the frontend development server (in a new terminal):
   ```bash
   cd ui
   npm run dev
   ```

4. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## 📖 How to Use

1. **Upload Documents**: Select or paste two text documents you want to compare
2. **Run Analysis**: Click the "Compare Documents" button to start the similarity analysis
3. **View Results**: Get detailed similarity scores and visual comparisons
4. **Analyze Output**: Review the highlighted common subsequences and similarity percentage

## 🔍 Algorithm Details

### Longest Common Subsequence (LCS)

The LCS algorithm finds the longest subsequence common to two sequences. In the context of document similarity:

- **Time Complexity**: O(m×n) where m and n are the lengths of the two documents
- **Space Complexity**: O(m×n) for the dynamic programming table
- **Accuracy**: Provides precise similarity measurements by finding the longest common subsequences

### Why LCS for Document Similarity?

- **Preserves Order**: Maintains the sequence of words/characters in the original documents
- **Handles Variations**: Effective at detecting similarities even with insertions, deletions, or modifications
- **Robust**: Works well with documents of different lengths
- **Interpretable**: Results are easy to understand and visualize

## 🏗️ Project Structure

```
VeriText/
├── Ui/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   |   ├── home.jsx
│   │   |   ├── plagcheck.jsx
│   ├── public/
│   └── App.jsx
│   └── index.css
│   └── main.jsx
│   └── package.json
│   └── README.md
├── Server/
│   └── lcs.js
│   └── server.js
│   └── package.json
```

## 🎯 Use Cases

- **Plagiarism Detection**: Identify potential plagiarism in academic papers
- **Content Comparison**: Compare different versions of documents
- **Text Analysis**: Analyze similarity between different text sources
- **Quality Assurance**: Verify document consistency and accuracy
- **Research**: Academic research on text similarity algorithms

## 🚀 Deployment

This application is deployed on [Render](https://render.com/) for seamless access and reliability.

**Live Application**: [https://veritext.onrender.com](https://veritext.onrender.com)

### Deployment Features:
- **Automatic Deployments**: Connected to GitHub for continuous deployment
- **Scalable Infrastructure**: Hosted on Render's reliable platform
- **HTTPS Security**: Secure connection for all users
- **Global Accessibility**: Available worldwide with fast loading times


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Chirag** - Project Lead & Developer
- GitHub: [@Chirag1724](https://github.com/Chirag1724)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Inspired by the need for accurate document similarity detection
- Built with modern web technologies for optimal performance

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing [Issues](https://github.com/Chirag1724/VeriText/issues)
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the problem

---

⭐ **Star this repository if you found it helpful!** ⭐
