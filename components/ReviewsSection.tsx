import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Star, User, Trash2 } from 'lucide-react';
import AuthModal from './AuthModal';

interface Review {
  id: string;
  toolId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: any;
}

interface ReviewsSectionProps {
  toolId: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ toolId }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Form state
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'reviews'),
        where('toolId', '==', toolId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedReviews: Review[] = [];
      snapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [toolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (!text.trim() || rating < 1 || rating > 5) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        toolId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous User',
        rating,
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
      
      setText('');
      setRating(5);
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      setReviews(reviews.filter(r => r.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="mt-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">User Reviews</h2>
          <p className="text-[var(--color-text-secondary)] mt-1">Real experiences from the community</p>
        </div>
        
        {reviews.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 bg-[var(--color-background)] rounded-[var(--radius-sm)] border border-[var(--color-border)]">
            <div className="text-2xl font-semibold text-[var(--color-primary)]">{averageRating}</div>
            <div className="flex flex-col">
              <div className="flex text-[var(--color-accent)]">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i <= Number(averageRating) ? "currentColor" : "transparent"} 
                    className={i <= Number(averageRating) ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--color-text-secondary)] font-medium">{reviews.length} review{reviews.length !== 1 && 's'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-[var(--color-background)] p-5 md:p-6 rounded-[var(--radius-sm)] border border-[var(--color-border)]">
        <h3 className="font-bold text-[var(--color-text-primary)] mb-4">
          {currentUser ? 'Write a review' : 'Log in to write a review'}
        </h3>
        
        <div className="mb-4">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star 
                  size={24} 
                  fill={(hoverRating || rating) >= star ? "currentColor" : "transparent"} 
                  className={(hoverRating || rating) >= star ? "text-[var(--color-accent)]" : "text-[var(--color-border)] hover:text-[var(--color-accent)]"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={currentUser ? "Share your experience with this tool..." : "Please log in to share your experience..."}
            disabled={!currentUser || submitting}
            required
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors min-h-[100px] resize-y"
          />
        </div>

        <div className="flex justify-end">
          {!currentUser ? (
            <button 
              type="button" 
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2.5 rounded-[var(--radius-sm)] font-bold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Log in to Review
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={submitting || !text.trim()}
              className="px-6 py-2.5 rounded-[var(--radius-sm)] font-bold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? 'Submitting...' : 'Post Review'}
            </button>
          )}
        </div>
      </form>

      {/* Reviews List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 bg-[var(--color-background)] rounded-[var(--radius-sm)] border border-[var(--color-border)] border-dashed">
          <p className="text-[var(--color-text-secondary)]">No reviews yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="p-5 rounded-[var(--radius-sm)] bg-[var(--color-background)] border border-[var(--color-border)]">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)]">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-text-primary)] text-sm">{review.userName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i <= review.rating ? "currentColor" : "transparent"} 
                            className={i <= review.rating ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {currentUser && currentUser.uid === review.userId && (
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors p-1"
                    title="Delete review"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-line leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
