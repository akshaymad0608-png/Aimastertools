const fs = require('fs');
let code = fs.readFileSync('components/BlogSection.tsx', 'utf8');

if (!code.includes('const [heroImageError, setHeroImageError]')) {
  code = code.replace(
    'export const BlogSection: React.FC = () => {',
    'export const BlogSection: React.FC = () => {\n  const [heroImageError, setHeroImageError] = useState(false);'
  );
}

const targetStr = `{chatbotPost.imageUrl ? (
                    <img src={chatbotPost.imageUrl} alt={chatbotPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="relative flex flex-col items-center justify-center z-10 mt-6 sm:mt-4">
                      <div className="w-16 h-16 rounded-xl bg-[var(--color-cardBg)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
                        <Bot size={32} className="text-[var(--color-primary)]" />
                      </div>
                    </div>
                  )}`;

const newStr = `{chatbotPost.imageUrl && !heroImageError ? (
                    <img src={chatbotPost.imageUrl} alt={chatbotPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" onError={() => setHeroImageError(true)} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full bg-[var(--color-surface)]">
                      <div className="w-16 h-16 rounded-xl bg-[var(--color-cardBg)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
                        <Bot size={32} className="text-[var(--color-primary)]" />
                      </div>
                    </div>
                  )}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, newStr);
  fs.writeFileSync('components/BlogSection.tsx', code, 'utf8');
  console.log('Successfully updated BlogSection.tsx');
} else {
  console.log('Target string not found');
}
