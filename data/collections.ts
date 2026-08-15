import { SEOCollection } from '../types';

export const COLLECTIONS: SEOCollection[] = [
  {
    id: 'best-free-ai-tools',
    slug: 'best-free-ai-tools',
    title: 'Best Free AI Tools for Everyone (2026)',
    metaTitle: '10+ Best Free AI Tools You Can Use Today Without Paying',
    metaDescription: 'Discover the top free AI tools for writing, coding, image generation, and productivity. Boost your workflow today without spending a dime.',
    intro: 'Artificial intelligence is no longer just for big tech companies. There is an incredible ecosystem of free AI tools that can help you write faster, generate stunning images, and solve complex problems. We have curated the absolute best free AI applications you can start using today, no credit card required.',
    toolIds: ['chatgpt', 'claude', 'perplexity-ai', 'hugging-face', 'canva-ai', 'notion-ai'],
    faqs: [
      {
        question: 'Are these AI tools completely free?',
        answer: 'Many of the tools listed offer a completely free tier with basic functionality. Some may have usage limits or premium upgrades, but you can achieve a lot without paying.'
      },
      {
        question: 'What is the best free AI tool for writing?',
        answer: 'ChatGPT (Free tier) and Claude are generally considered the best free AI tools for writing, brainstorming, and drafting content.'
      }
    ],
    relatedCollectionIds: ['chatgpt-alternatives', 'best-ai-tools-for-students'],
    ctaText: 'Find More Free Tools',
    ctaUrl: '/find?pricing=Free'
  },
  {
    id: 'best-ai-tools-for-students',
    slug: 'best-ai-tools-for-students',
    title: 'Best AI Tools for Students (Study Smarter)',
    metaTitle: 'Top AI Tools for Students: Study, Write, & Research Faster',
    metaDescription: 'Explore the best AI tools for students to help with research, essay writing, math problems, and staying organized.',
    intro: 'As a student, time is your most valuable asset. AI tools can act as your personal tutor, research assistant, and study buddy. From breaking down complex topics to helping you organize your notes, these AI applications will help you study smarter and achieve better grades.',
    toolIds: ['chatgpt', 'perplexity-ai', 'notion-ai', 'grammarly-go', 'quizlet-ai', 'otter-ai'],
    faqs: [
      {
        question: 'Can I use AI to write my essays?',
        answer: 'While AI can help you brainstorm, outline, and proofread your essays, you should not use it to write the entire essay for you. Many schools have strict policies against plagiarism and use AI detection tools.'
      },
      {
        question: 'Are there student discounts for AI tools?',
        answer: 'Yes, many AI platforms like Notion and GitHub (Copilot) offer free or heavily discounted plans for students with a valid .edu email address.'
      }
    ],
    relatedCollectionIds: ['best-free-ai-tools', 'best-ai-tools-for-youtubers']
  },
  {
    id: 'best-ai-tools-for-youtubers',
    slug: 'best-ai-tools-for-youtubers',
    title: 'Best AI Tools for YouTubers & Creators',
    metaTitle: 'Top AI Tools for YouTubers: Edit Video, Create Thumbnails & Scripts',
    metaDescription: 'Supercharge your YouTube channel with these top AI tools for video editing, script writing, thumbnail generation, and analytics.',
    intro: 'Growing a YouTube channel requires constant content creation. AI tools can dramatically reduce the time you spend on scripting, editing, and designing thumbnails, allowing you to focus on being creative. Here are the best AI tools every YouTuber should have in their arsenal.',
    toolIds: ['midjourney', 'dalle3', 'descript', 'elevenlabs', 'opus-clip', 'vidio'],
    faqs: [
      {
        question: 'Can AI edit my YouTube videos?',
        answer: 'Yes, tools like Descript and Opus Clip can automatically transcribe your videos, remove silences, and even generate viral shorts from long-form content.'
      },
      {
        question: 'Is it safe to use AI voices for YouTube?',
        answer: 'Yes, using high-quality AI voice generators like ElevenLabs is common for faceless channels or voiceovers, and YouTube generally allows monetizing this content as long as it adds educational or entertainment value.'
      }
    ],
    relatedCollectionIds: ['best-ai-image-generators', 'best-ai-tools-for-developers']
  },
  {
    id: 'best-ai-tools-for-developers',
    slug: 'best-ai-tools-for-developers',
    title: 'Top AI Tools for Developers & Programmers',
    metaTitle: 'Best AI Tools for Developers: Coding Assistants & Generators',
    metaDescription: 'Boost your coding speed with the best AI tools for developers. Explore top AI coding assistants, code generators, and debugging tools.',
    intro: 'AI is fundamentally changing how software is built. From intelligent autocomplete to automated debugging and refactoring, AI coding assistants are making developers 10x more productive. Explore the top AI tools that every programmer should be using.',
    toolIds: ['github-copilot', 'cursor', 'claude', 'chatgpt', 'tabnine', 'replit-ghostwriter'],
    faqs: [
      {
        question: 'Will AI replace software developers?',
        answer: 'AI is unlikely to replace developers entirely in the near future. Instead, it acts as a powerful assistant that takes over repetitive tasks, allowing developers to focus on higher-level architecture and problem-solving.'
      },
      {
        question: 'What is the best AI for writing code?',
        answer: 'GitHub Copilot and Cursor are currently the industry leaders for integrated AI coding, while Claude 3.5 Sonnet is widely considered the best foundational model for coding tasks.'
      }
    ],
    relatedCollectionIds: ['chatgpt-alternatives', 'best-free-ai-tools']
  },
  {
    id: 'chatgpt-alternatives',
    slug: 'chatgpt-alternatives',
    title: 'Top 10 ChatGPT Alternatives You Should Try',
    metaTitle: 'Best ChatGPT Alternatives in 2026 (Free & Paid)',
    metaDescription: 'Looking for a ChatGPT alternative? Compare the best AI chatbots including Claude, Gemini, Perplexity, and open-source models.',
    intro: 'While ChatGPT kicked off the generative AI revolution, it is no longer the only game in town. Depending on your needs—whether it is coding, creative writing, or web research—there are now several powerful alternatives that might suit you better.',
    toolIds: ['claude', 'gemini', 'perplexity-ai', 'mistral', 'meta-llama', 'pi'],
    faqs: [
      {
        question: 'Is there a better AI than ChatGPT?',
        answer: 'It depends on your use case. Claude is often preferred for creative writing and large document analysis, while Perplexity is superior for web research and citations.'
      },
      {
        question: 'Are there free alternatives to ChatGPT?',
        answer: 'Yes, Google Gemini, Microsoft Copilot, and Anthropic Claude all offer robust free tiers that rival or exceed ChatGPTs free version.'
      }
    ],
    relatedCollectionIds: ['best-free-ai-tools', 'best-ai-tools-for-developers']
  },
  {
    id: 'best-ai-image-generators',
    slug: 'best-ai-image-generators',
    title: 'Best AI Image Generators in 2026',
    metaTitle: 'Top AI Image Generators: Create Stunning Art & Photos',
    metaDescription: 'Compare the best AI image generators. Find the perfect tool for creating digital art, photorealistic images, and graphic design assets.',
    intro: 'Text-to-image AI models have reached breathtaking levels of realism and creativity. Whether you are a graphic designer, marketer, or just want to generate fun images, here are the top AI image generators that will turn your words into stunning visuals.',
    toolIds: ['midjourney', 'dalle3', 'stable-diffusion', 'adobe-firefly', 'leonardo-ai', 'ideogram'],
    faqs: [
      {
        question: 'Which AI image generator is the most realistic?',
        answer: 'Midjourney v6 is widely considered to produce the most photorealistic and aesthetically pleasing images, though it requires a Discord account and a paid subscription.'
      },
      {
        question: 'Can I use AI generated images commercially?',
        answer: 'Most paid tiers of tools like Midjourney, DALL-E 3, and Adobe Firefly grant you commercial rights to the images you generate, but you should always check the specific licensing terms of the platform.'
      }
    ],
    relatedCollectionIds: ['best-ai-tools-for-youtubers', 'best-free-ai-tools']
  }
];
