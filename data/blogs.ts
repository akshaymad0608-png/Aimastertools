import { BlogPost } from '../types';

const _RAW_BLOG_POSTS: BlogPost[] = [

  {
    id: '1',
    slug: 'top-10-ai-tools-for-students-in-2026',
    title: 'Top 10 AI Tools for Students in 2026',
    category: 'EDUCATION',
    excerpt: 'Boost your academic performance with these cutting-edge AI assistants designed for research and writing.',
    date: 'Oct 24, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    url: '/blog/1'
  },
  {
    id: '2',
    slug: 'ai-vs-human-creativity-the-balance',
    title: 'AI vs Human Creativity: The Balance',
    category: 'DESIGN',
    excerpt: 'Exploring the ethical boundaries and collaborative potential of generative AI in creative industries.',
    date: 'Oct 20, 2025',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    url: '/blog/2'
  },
  {
    id: '3',
    slug: 'latest-ai-trends-to-watch',
    title: 'Latest AI Trends to Watch',
    category: 'RESEARCH',
    excerpt: 'From autonomous agents to multimodal models, here is what is shaping the future of technology.',
    date: 'Oct 15, 2025',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    url: '/blog/3'
  },
  {
    id: '4',
    slug: 'the-rise-of-ai-agents-in-daily-workflows',
    title: 'The Rise of AI Agents in Daily Workflows',
    category: 'PRODUCTIVITY',
    excerpt: 'How autonomous AI agents are moving beyond chatbots to actually execute complex tasks across multiple applications.',
    date: 'Nov 2, 2025',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1531297172864-822d10363259?auto=format&fit=crop&q=80&w=800',
    url: '/blog/4'
  },
  {
    id: '5',
    slug: 'mastering-midjourney-v7-prompt-guide',
    title: 'Mastering Midjourney V7: Prompt Guide',
    category: 'DESIGN',
    excerpt: 'A comprehensive guide to the latest features in Midjourney, including style references, character consistency, and advanced prompting techniques.',
    date: 'Nov 8, 2025',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    url: '/blog/5'
  },
  {
    id: '6',
    slug: 'code-generation-models-compared-claude-vs-gpt-4',
    title: 'Code Generation Models Compared: Claude vs GPT-4',
    category: 'CODING',
    excerpt: 'We benchmarked the top LLMs on complex coding tasks to see which one truly writes the best, most bug-free code.',
    date: 'Nov 12, 2025',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
    url: '/blog/6'
  },
  {
    id: '7',
    slug: 'how-to-build-rag-applications-with-langchain',
    title: 'How to Build RAG Applications with LangChain',
    category: 'CODING',
    excerpt: 'Step-by-step tutorial on building Retrieval-Augmented Generation apps to let your LLM chat with your own documents.',
    date: 'Nov 15, 2025',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    url: '/blog/7'
  },
  {
    id: '8',
    slug: 'ai-in-education-personalized-learning-at-scale',
    title: 'AI in Education: Personalized Learning at Scale',
    category: 'EDUCATION',
    excerpt: 'How schools and universities are integrating AI tutors to provide personalized, 1-on-1 education to every student.',
    date: 'Nov 20, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    url: '/blog/8'
  },
  {
    id: '4',
    slug: 'the-rise-of-ai-agents-in-daily-workflows',
    title: 'The Rise of AI Agents in Daily Workflows',
    category: 'PRODUCTIVITY',
    excerpt: 'How autonomous AI agents are moving beyond chatbots to actually execute complex tasks across multiple applications.',
    date: 'Nov 2, 2025',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    url: '/blog/4'
  },
  {
    id: '5',
    slug: 'mastering-midjourney-v7-prompt-guide',
    title: 'Mastering Midjourney V7: Prompt Guide',
    category: 'DESIGN',
    excerpt: 'A comprehensive guide to the latest features in Midjourney, including style references, character consistency, and advanced prompting techniques.',
    date: 'Nov 8, 2025',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    url: '/blog/5'
  },
  {
    id: '6',
    slug: 'code-generation-models-compared-claude-vs-gpt-4',
    title: 'Code Generation Models Compared: Claude vs GPT-4',
    category: 'CODING',
    excerpt: 'We benchmarked the top LLMs on complex coding tasks to see which one truly writes the best, most bug-free code.',
    date: 'Nov 12, 2025',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    url: '/blog/6'
  },
  {
    id: '7',
    slug: 'how-to-build-rag-applications-with-langchain',
    title: 'How to Build RAG Applications with LangChain',
    category: 'CODING',
    excerpt: 'Step-by-step tutorial on building Retrieval-Augmented Generation apps to let your LLM chat with your own documents.',
    date: 'Nov 15, 2025',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1531297172864-822d10363259?auto=format&fit=crop&q=80&w=800',
    url: '/blog/7'
  },
  {
    id: '8',
    slug: 'ai-in-education-personalized-learning-at-scale',
    title: 'AI in Education: Personalized Learning at Scale',
    category: 'EDUCATION',
    excerpt: 'How schools and universities are integrating AI tutors to provide personalized, 1-on-1 education to every student.',
    date: 'Nov 20, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    url: '/blog/8'
  },
  {
    id: '4',
    slug: 'the-rise-of-ai-agents-in-daily-workflows',
    title: 'The Rise of AI Agents in Daily Workflows',
    category: 'PRODUCTIVITY',
    excerpt: 'How autonomous AI agents are moving beyond chatbots to actually execute complex tasks across multiple applications.',
    date: 'Nov 2, 2025',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1531297172864-822d10363259?auto=format&fit=crop&q=80&w=800',
    url: '/blog/4'
  },
  {
    id: '5',
    slug: 'mastering-midjourney-v7-prompt-guide',
    title: 'Mastering Midjourney V7: Prompt Guide',
    category: 'DESIGN',
    excerpt: 'A comprehensive guide to the latest features in Midjourney, including style references, character consistency, and advanced prompting techniques.',
    date: 'Nov 8, 2025',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    url: '/blog/5'
  },
  {
    id: '6',
    slug: 'code-generation-models-compared-claude-vs-gpt-4',
    title: 'Code Generation Models Compared: Claude vs GPT-4',
    category: 'CODING',
    excerpt: 'We benchmarked the top LLMs on complex coding tasks to see which one truly writes the best, most bug-free code.',
    date: 'Nov 12, 2025',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
    url: '/blog/6'
  },
  {
    id: '7',
    slug: 'how-to-build-rag-applications-with-langchain',
    title: 'How to Build RAG Applications with LangChain',
    category: 'CODING',
    excerpt: 'Step-by-step tutorial on building Retrieval-Augmented Generation apps to let your LLM chat with your own documents.',
    date: 'Nov 15, 2025',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    url: '/blog/7'
  },
  {
    id: '8',
    slug: 'ai-in-education-personalized-learning-at-scale',
    title: 'AI in Education: Personalized Learning at Scale',
    category: 'EDUCATION',
    excerpt: 'How schools and universities are integrating AI tutors to provide personalized, 1-on-1 education to every student.',
    date: 'Nov 20, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    url: '/blog/8'
  }
];

/**
 * Same defect as data/tools.ts: entries were appended in batches without an id
 * check, so the array carries 0 duplicate records. Left alone that means
 * React key collisions, the same card rendered two or three times in one list,
 * and duplicate-content signals aimed at detail routes that can only ever
 * resolve to a single record. First occurrence wins.
 */
const _seen_blog = new Set<string>();
export const BLOG_POSTS = _RAW_BLOG_POSTS.filter((item) => {
  if (!item || !item.id || _seen_blog.has(item.id)) return false;
  _seen_blog.add(item.id);
  return true;
});
