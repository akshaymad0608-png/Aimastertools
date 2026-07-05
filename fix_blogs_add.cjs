const fs = require('fs');
let code = fs.readFileSync('data/blogs.ts', 'utf8');

const newBlogs = `,
  {
    id: '4',
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
    title: 'AI in Education: Personalized Learning at Scale',
    category: 'EDUCATION',
    excerpt: 'How schools and universities are integrating AI tutors to provide personalized, 1-on-1 education to every student.',
    date: 'Nov 20, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    url: '/blog/8'
  }
];`;

code = code.replace(/\n  \}\n\];/, '\n  }' + newBlogs);

fs.writeFileSync('data/blogs.ts', code, 'utf8');
console.log('Added more blogs');
