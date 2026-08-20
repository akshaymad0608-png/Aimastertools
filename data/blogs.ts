import { BlogPost } from '../types';

const _RAW_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'top-10-ai-tools-for-students-in-2026',
    title: 'Top 10 AI Tools for Students in 2026: Research & Writing',
    category: 'EDUCATION',
    excerpt: 'Boost your academic performance with these cutting-edge AI assistants designed for research and writing, from first outline to final draft.',
    date: 'Oct 24, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    url: '/blog/top-10-ai-tools-for-students-in-2026'
  },
  {
    id: '2',
    slug: 'ai-vs-human-creativity-the-balance',
    title: 'AI vs Human Creativity: Finding the Balance in Design',
    category: 'DESIGN',
    excerpt: 'Exploring the ethical boundaries and collaborative potential of generative AI in creative industries, and where the line between tool and author sits.',
    date: 'Oct 20, 2025',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    url: '/blog/ai-vs-human-creativity-the-balance'
  },
  {
    id: '3',
    slug: 'latest-ai-trends-to-watch',
    title: 'Latest AI Trends to Watch: Agents and Multimodal Models',
    category: 'RESEARCH',
    excerpt: 'From autonomous agents to multimodal models, here is what is shaping the future of technology, and which shifts are worth your attention right now.',
    date: 'Oct 15, 2025',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    url: '/blog/latest-ai-trends-to-watch'
  },
  {
    id: '4',
    slug: 'the-rise-of-ai-agents-in-daily-workflows',
    title: 'The Rise of AI Agents: Beyond Chatbots to Real Workflows',
    category: 'PRODUCTIVITY',
    excerpt: 'How autonomous AI agents are moving beyond chatbots to actually execute multi-step work, and what that changes about the tools you already use daily.',
    date: 'Nov 2, 2025',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    url: '/blog/the-rise-of-ai-agents-in-daily-workflows'
  },
  {
    id: '5',
    slug: 'mastering-midjourney-v7-prompt-guide',
    title: 'Mastering Midjourney V7: Complete Prompt and Feature Guide',
    category: 'DESIGN',
    excerpt: 'A comprehensive guide to the latest features in Midjourney, including style references, character consistency, and advanced prompting techniques.',
    date: 'Nov 8, 2025',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    url: '/blog/mastering-midjourney-v7-prompt-guide'
  },
  {
    id: '6',
    slug: 'code-generation-models-compared-claude-vs-gpt-4',
    title: 'Code Generation Compared: Claude vs GPT-4 on Real Tasks',
    category: 'CODING',
    excerpt: 'We benchmarked the top LLMs on complex coding tasks to see which one actually ships working code, and where each model reliably falls short.',
    date: 'Nov 12, 2025',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
    url: '/blog/code-generation-models-compared-claude-vs-gpt-4'
  },
  {
    id: '7',
    slug: 'how-to-build-rag-applications-with-langchain',
    title: 'How to Build RAG Applications with LangChain: Step by Step',
    category: 'CODING',
    excerpt: 'Step-by-step tutorial on building Retrieval-Augmented Generation apps with LangChain, from loading your documents to returning grounded answers.',
    date: 'Nov 15, 2025',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    url: '/blog/how-to-build-rag-applications-with-langchain'
  },
  {
    id: '8',
    slug: 'ai-in-education-personalized-learning-at-scale',
    title: 'AI in Education: Personalized Learning at Scale for Schools',
    category: 'EDUCATION',
    excerpt: 'How schools and universities are integrating AI tutors to provide one-to-one support at a scale no staffing budget could ever reach on its own.',
    date: 'Nov 20, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    url: '/blog/ai-in-education-personalized-learning-at-scale'
  },
];

/**
 * Same defect as data/tools.ts: entries were appended in batches without an id
 * check. Ten duplicates have since been deleted at source — the file held 18
 * records for 8 posts, every extra one a byte-identical copy of a post already
 * above it.
 *
 * This filter stays as the guard that caught them. Without it a repeat means
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
