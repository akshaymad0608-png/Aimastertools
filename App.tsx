import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarkProvider, useBookmarks } from './context/BookmarkContext';
import { ProProvider } from './context/ProContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Submit = lazy(() => import('./pages/Submit'));
const ToolDetail = lazy(() => import('./pages/ToolDetail'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Compare = lazy(() => import('./pages/Compare'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Careers = lazy(() => import('./pages/Careers'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="flex-grow flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
  </div>
);

const GlobalToast = () => {
  const { bookmarkError, clearBookmarkError } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookmarkError) {
      const timer = setTimeout(() => {
        clearBookmarkError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [bookmarkError, clearBookmarkError]);

  return (
    <AnimatePresence>
      {bookmarkError && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-[100] flex w-[90%] max-w-md items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 shadow-2xl backdrop-blur-md"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-red-500">Action Restricted</h4>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{bookmarkError}</p>
            <button 
              onClick={() => {
                clearBookmarkError();
                navigate('/pricing');
              }}
              className="mt-3 text-xs font-bold text-[var(--color-primary)] hover:underline"
            >
              Upgrade to Pro &rarr;
            </button>
          </div>
          <button onClick={clearBookmarkError} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <>
      <title>AI Master Tools | Professional AI Prompt Engineering</title>
      <meta name="description" content="Explore advanced AI tools and professional prompt engineering resources by Akshay Mahajan. Boost your AI productivity with AI Master Tools." />
      <meta name="keywords" content="AI Master Tools, Akshay Mahajan, Prompt Engineering, Google AI Studio tools, AI ML Engineering, AI Tools Directory" />
      <meta property="og:title" content="AI Master Tools | Professional AI Prompt Engineering" />
      <meta property="og:description" content="Explore advanced AI tools and professional prompt engineering resources by Akshay Mahajan." />
      <ThemeProvider>
        <AuthProvider>
          <ProProvider>
            <BookmarkProvider>
              <Router>
            <div className="min-h-screen font-sans text-[var(--color-text-primary)] selection:bg-[var(--color-primary)] selection:text-white flex flex-col bg-[var(--color-background)] overflow-x-hidden">
              <Navbar />
              
              <main className="flex-grow flex flex-col">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/submit" element={<Submit />} />
                    <Route path="/tool/:id" element={<ToolDetail />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
              <CommandPalette />
              <GlobalToast />
            </div>
          </Router>
          </BookmarkProvider>
        </ProProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
