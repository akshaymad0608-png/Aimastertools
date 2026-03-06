import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
