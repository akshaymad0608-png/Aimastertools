import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Languages, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceSearchProps {
  onTranscript: (transcript: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const [showModal, setShowModal] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
      
      if (event.results[current].isFinal) {
        onTranscript(transcriptText);
        setTimeout(() => {
          setShowModal(false);
          setIsListening(false);
        }, 1000);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone permissions in your browser settings and try again.');
      } else if (event.error === 'no-speech') {
        setError('No speech was detected. Please try again.');
      } else {
        setError(`Error occurred in recognition: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [language, onTranscript]);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setError(null);
      setTranscript('');
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="p-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors rounded-full hover:bg-[var(--color-surface)]"
        title="Voice Search"
        aria-label="Voice Search"
      >
        <Mic size={24} />
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-md p-8 rounded-3xl border border-[var(--color-border)] shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label="Close Voice Search"
              >
                <X size={20} />
              </button>

              <div className="text-center space-y-6">
                <div className="flex justify-center items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Voice Search</h3>
                  <div className="flex bg-[var(--color-surface)] p-1 rounded-xl border border-[var(--color-border)]">
                    <button
                      onClick={() => setLanguage('en-IN')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'en-IN' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
                      aria-label="Switch to English (India)"
                    >
                      EN (IN)
                    </button>
                    <button
                      onClick={() => setLanguage('hi-IN')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'hi-IN' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
                      aria-label="Switch to Hindi (India)"
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                <div className="relative flex justify-center py-8">
                  <AnimatePresence>
                    {isListening && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full blur-3xl"
                      />
                    )}
                  </AnimatePresence>
                  
                  <button
                    onClick={isListening ? () => {} : startListening}
                    disabled={isListening}
                    className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isListening ? 'bg-[var(--color-primary)] text-white scale-110 shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.4)]' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]'}`}
                    aria-label={isListening ? "Listening" : "Start Listening"}
                  >
                    {isListening ? <Loader2 size={40} className="animate-spin" /> : <Mic size={40} />}
                  </button>
                </div>

                <div className="min-h-[60px] flex flex-col items-center justify-center">
                  {error ? (
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                  ) : isListening ? (
                    <p className="text-[var(--color-text-primary)] text-lg font-medium animate-pulse">
                      {transcript || 'Listening...'}
                    </p>
                  ) : transcript ? (
                    <p className="text-[var(--color-text-primary)] text-lg font-medium">
                      {transcript}
                    </p>
                  ) : (
                    <p className="text-[var(--color-text-muted)]">Click the microphone to start</p>
                  )}
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <Languages size={14} />
                    <span>Supports Hindi & English (India)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceSearch;
