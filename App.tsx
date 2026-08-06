import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarkProvider, useBookmarks } from './context/BookmarkContext';
import { ProProvider } from './context/ProContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ScrollToTop from './components/ScrollToTop';
import { TopBanner } from './components/TopBanner';
import { Toaster } from 'react-hot-toast';
import { X, AlertCircle, Loader2 } from 'lucide-react';

import Home from './pages/Home';

// Lazy load pages for better performance
const ToolDetail = lazy(() => import('./pages/ToolDetail'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const Compare = lazy(() => import('./pages/Compare'));
const ComparePair = lazy(() => import('./pages/ComparePair'));
const Categories = lazy(() => import('./pages/Categories'));
// Pricing page removed
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Careers = lazy(() => import('./pages/Careers'));
const Workflows = lazy(() => import('./pages/Workflows'));
const WorkflowDetail = lazy(() => import('./pages/WorkflowDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const AlternativesPage = lazy(() => import('./pages/AlternativesPage'));

const Discover = lazy(() => import('./pages/Discover'));
const Collections = lazy(() => import('./pages/Collections'));
const CollectionDetail = lazy(() => import('./pages/CollectionDetail'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const FindMyTool = lazy(() => import('./pages/FindMyTool'));

const Prompts = lazy(() => import('./pages/Prompts'));
const EarnOnline = lazy(() => import('./pages/EarnOnline'));

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

  if (!bookmarkError) return null;

  return (
    <div
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex w-[90%] max-w-md items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 shadow-2xl backdrop-blur-md animate-fade-in-up"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
      <div className="flex-1">
        <h4 className="text-sm font-bold text-red-500">Action Restricted</h4>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{bookmarkError}</p>
        <button 
          onClick={() => {
            clearBookmarkError();
          }}
          className="mt-3 text-xs font-bold text-[var(--color-primary)] hover:underline"
        >
          Dismiss &rarr;
        </button>
      </div>
      <button onClick={clearBookmarkError} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]" aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
          <AuthProvider>
            <ProProvider>
              <BookmarkProvider>
                <Router>
            <div className="min-h-screen font-sans text-[var(--color-text-primary)] selection:bg-[var(--color-primary)] selection:text-white flex flex-col bg-[var(--color-background)]">
              <TopBanner />
              <Navbar />
              
              <main id="main" className="flex-grow flex flex-col pb-[112px] md:pb-0">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tool/:id" element={<ToolDetail />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blogs" element={<Navigate to="/blog" replace />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/compare/:pair" element={<ComparePair />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/collections/:slug" element={<CollectionDetail />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/find" element={<FindMyTool />} />
                    <Route path="/prompts" element={<Prompts />} />
                    <Route path="/earn" element={<EarnOnline />} />
                    
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/alternatives/:slug" element={<AlternativesPage />} />
                                        <Route path="/workflows" element={<Workflows />} />
                    <Route path="/workflows/:id" element={<WorkflowDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
              <MobileBottomNav />
              <ScrollToTop />
              <GlobalToast />
              <Toaster position="bottom-center" toastOptions={{ style: { background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' } }} />
            </div>
          </Router>
            </BookmarkProvider>
          </ProProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
  );
}

export default App;
