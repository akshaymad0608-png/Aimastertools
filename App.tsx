import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarkProvider } from './context/BookmarkContext';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer';
import Home from './pages/Home';
import Submit from './pages/Submit';
import ToolDetail from './pages/ToolDetail';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        {/* वेबसाइट का टाइटल जो गूगल सर्च में दिखेगा */}
        <title>AI Master Tools | Professional AI Prompt Engineering</title>

        {/* वेबसाइट का छोटा विवरण (160 characters max) */}
        <meta name="description" content="अक्षय महाजन द्वारा बनाए गए एडवांस AI टूल्स और प्रॉम्प्ट इंजीनियरिंग रिसोर्सेज को एक्सप्लोर करें। अपनी AI प्रोडक्टिविटी बढ़ाएं।" />

        {/* सर्च कीवर्ड्स */}
        <meta name="keywords" content="AI Master Tools, Akshay Mahajan, Prompt Engineering, Google AI Studio tools, AI ML Engineering" />

        {/* सोशल मीडिया (Open Graph) के लिए */}
        <meta property="og:title" content="AI Master Tools" />
        <meta property="og:description" content="Expert AI Tools for Prompt Engineers." />
      </Helmet>
      <ThemeProvider>
        <BookmarkProvider>
          <Router>
          <div className="min-h-screen font-sans text-[var(--color-text-primary)] selection:bg-[var(--color-primary)] selection:text-white flex flex-col bg-[var(--color-background)]">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/tool/:id" element={<ToolDetail />} />
                <Route path="/blog/:id" element={<BlogPost />} />
              </Routes>
            </main>

            <Footer />
            <CommandPalette />
          </div>
        </Router>
        </BookmarkProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
