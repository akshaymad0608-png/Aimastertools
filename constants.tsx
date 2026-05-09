import { Tool, CategoryStat, BlogPost } from './types';
import { 
  PenTool, Image as ImageIcon, Video, Code, MessageSquare, 
  Mic, TrendingUp, Zap, Briefcase, FileText, Layers,
  Database, GraduationCap, Box, DollarSign, Scale, Search,
  Music, Headphones, Globe, Cpu, Palette, Smile,
  Heart, Plane, Gamepad2, Shirt, Home, Pill, FlaskConical,
  Users, Target, Newspaper, Share2, Bitcoin, Layout, ShoppingBag,
  Presentation, Shield, User, Sparkles, Wand2, Bot, Headset, Languages, BookOpen,
  LineChart, Percent, Archive, Calculator, Workflow, Component
} from 'lucide-react';

const TAGS_BY_CATEGORY: Record<string, string[]> = {
  'Writing': ['Copywriting', 'Email Assistant', 'SEO Writing', 'Storytelling', 'Technical Writing', 'Screenwriting', 'Poetry', 'Summarization', 'Paraphrasing', 'Translation', 'Grammar Check', 'Plagiarism Check'],
  'Image': ['Image Editing', 'Upscaling', 'Background Removal', 'Restoration', 'Colorization', 'Vectorizing', 'Logo Design', 'Icon Generation', 'UI Design', '3D Textures'],
  'Video': ['Text to Video', 'Video Editing', 'Subtitles', 'Dubbing', 'Personalized Video', 'Video Repurposing', 'Deepfake', 'Lip Sync', 'Face Swap', 'Motion Graphics', 'VFX'],
  'Voice': ['Text-to-Speech', 'Speech-to-Text', 'Voice Cloning', 'Audio Engineering', 'Noise Reduction', 'Podcasting', 'Audiobooks', 'Transcription', 'Meeting Notes'],
  'Coding': ['Code Generation', 'Debugging', 'Documentation', 'SQL Assistant', 'Regex Helper', 'Unit Testing', 'Refactoring', 'UX to Code', 'DevOps', 'Cybersecurity', 'Prompt Engineering', 'Fine-tuning', 'LLMOps', 'Vector DB'],
  'Chatbots': ['Agents', 'Autonomous Agents', 'Customer Support', 'CRM', 'Sales Outreach', 'Lead Gen'],
  'Marketing': ['Social Media', 'Ad Creative', 'Influencer Marketing', 'Affiliate Marketing', 'Analytics'],
  'SEO': ['Keyword Research', 'Rank Tracking', 'On-Page SEO', 'Backlink Analysis', 'Content Optimization', 'Technical SEO', 'Local SEO', 'Competitor Analysis'],
  'Productivity': ['Workflow Automation', 'No-Code', 'Website Builder', 'App Builder', 'Document Management', 'PDF Tools', 'OCR', 'Scanning', 'Printing', 'Fax', 'Mail', 'Shipping', 'Logistics', 'Supply Chain', 'Inventory', 'Warehouse', 'Manufacturing'],
  'Presentation': ['Slides', 'Pitch Decks', 'Storytelling', 'Templates', 'Design'],
  'Business': ['Startup', 'Management', 'Sales', 'Banking', 'Loans', 'Credit', 'Mortgage', 'Retirement', 'Estate Planning', 'Will', 'Trust', 'Divorce', 'Immigration', 'Visa', 'Passport', 'Driver License', 'ID', 'Notary', 'Signature'],
  'Career': ['Resume', 'Job Search', 'Interview'],
  'Data': ['Analytics', 'Visualization', 'Spreadsheets', 'Business Intelligence', 'Predictive Analytics', 'Data Cleaning', 'NLP', 'SQL Generator'],
  'Education': ['Tutoring', 'Language Learning', 'Course Creation', 'Flashcards', 'Math Solver', 'Physics', 'Chemistry', 'Biology', 'Medical'],
  '3D': ['Modeling', 'Rendering', 'Textures', 'Game Assets', 'VR', 'AR', 'Metaverse'],
  'Finance': ['Tax', 'Investing', 'Trading', 'Real Estate', 'Crypto', 'Blockchain', 'NFT', 'Web3', 'DAO', 'Smart Contract'],
  'Legal': ['Legal Research', 'Contract Review', 'Patent Search', 'Compliance', 'Governance', 'Audit', 'Risk Management', 'Insurance'],
  'Audio': ['Audio Editing', 'Noise Removal', 'Mastering', 'Podcast', 'Recording'],
  'Research': ['Papers', 'Summary', 'Citations', 'Academic', 'Fact Checking', 'Fake News Detector', 'AI Detector', 'Copyright', 'Ethics', 'Safety', 'Security', 'Privacy'],
  'Music': ['Composition', 'Generation', 'Lyrics', 'Production', 'Beats'],
  'Avatars': ['Video', 'Virtual', 'Presentation', 'Marketing', 'Social'],
  'Design': ['UI/UX', 'Web', 'Graphic', 'Logo', 'Prototyping', 'Fashion Design', 'Product Design', 'User Research', 'UX Research', 'Color Palette', 'Font Pairing', 'Interior Design', 'Architecture'],
  'Health': ['Fitness', 'Mental Health', 'Medical Diagnosis', 'Nutrition', 'Workout', 'Meditation', 'Therapy', 'Symptom Checker', 'Drug Discovery', 'Genomics'],
  'Travel': ['Trip Planning', 'Flight Finding', 'Hotel Booking', 'Itinerary', 'Translation', 'Guide', 'Maps', 'Recommendations'],
  'Gaming': ['NPC Gen', 'Game Design', 'Asset Creation', 'Level Design', 'Storytelling', 'Voice Acting', 'Testing', 'Analytics'],
  'Fashion': ['Virtual Try-on', 'Trend Analysis', 'Design', 'Styling', 'Personal Shopper', 'Inventory Management'],
  'Real Estate': ['Property Valuation', 'Virtual Tours', 'Interior Design', 'Market Analysis', 'Lead Gen', 'Contract Analysis'],
  'Pharma': ['Drug Discovery', 'Clinical Trials', 'Molecular Modeling', 'Regulatory Affairs', 'Pharmacovigilance'],
  'Science': ['Lab Automation', 'Data Analysis', 'Simulation', 'Genomics', 'Proteomics', 'Chemistry'],
  'HR': ['Recruiting', 'Onboarding', 'Employee Engagement', 'Performance Review', 'Payroll', 'Benefits', 'Compliance'],
  'Sales': ['Lead Generation', 'Outreach', 'CRM', 'Sales Intelligence', 'Forecasting', 'Coaching'],
  'News': ['Aggregator', 'Summarization', 'Fact Checking', 'Personalized Feed', 'Market Intelligence'],
  'Social Media': ['Scheduling', 'Content Creation', 'Analytics', 'Community Management', 'Influencer Search'],
  'Crypto': ['Trading', 'Analytics', 'Signals', 'Portfolio Management', 'Smart Contracts', 'DeFi'],
  'No-Code': ['App Builder', 'Website Builder', 'Automation', 'Database', 'Internal Tools'],
  'E-commerce': ['Product Descriptions', 'Customer Support', 'Recommendation Engine', 'Inventory Management', 'Pricing Optimization', 'Fraud Detection', 'Virtual Try-on'],
  'Cybersecurity': ['Threat Detection', 'Vulnerability Scanning', 'Phishing Protection', 'Identity Management', 'Network Security', 'Code Analysis'],
  'Personal Assistant': ['Scheduling', 'Email Management', 'Travel Planning', 'Lifestyle', 'Shopping', 'Reminders'],
  'Self-Improvement': ['Habit Tracking', 'Learning', 'Meditation', 'Goal Setting', 'Journaling', 'Coaching'],
  'Prompt Engineering': ['Prompts', 'Templates', 'Optimization', 'Testing', 'Marketplace'],
  'Agentic AI': ['Autonomous', 'Task Management', 'Workflow', 'Multi-Agent', 'Browser Automation'],
  'Generative AI': ['LLM', 'Image Generation', 'Text-to-Video', 'Text Generation', 'Foundation Models'],
  'Customer Support': ['Helpdesk', 'Chatbots', 'Ticketing', 'Knowledge Base', 'CRM'],
  'Language Translation': ['Translation', 'Localization', 'Dubbing', 'Subtitles', 'Multilingual'],
  'Student': ['Study', 'Homework', 'Notes', 'Research', 'Writing', 'Math Solver', 'Flashcards']
};

export const CATEGORY_META = [
  { id: 'AI Writing & Content',      name: 'AI Writing & Content',      icon: 'ti-pencil',       bg: '#EEEDFE', color: '#534AB7' },
  { id: 'Gen AI Creator Tools',      name: 'Gen AI Creator Tools',      icon: 'ti-wand',         bg: '#EEEDFE', color: '#534AB7' },
  { id: 'Image & Art Generation',    name: 'Image & Art Generation',    icon: 'ti-palette',      bg: '#E6F1FB', color: '#185FA5' },
  { id: 'Code & Development',        name: 'Code & Development',        icon: 'ti-code',         bg: '#EAF3DE', color: '#3B6D11' },
  { id: 'Voice Creator Tools',       name: 'Voice Creator Tools',       icon: 'ti-microphone',     bg: '#FBEAF0', color: '#72243E' },
  { id: 'Video & Audio Tools',       name: 'Video & Audio Tools',       icon: 'ti-video',        bg: '#FAEEDA', color: '#633806' },
  { id: 'Chatbot Creator Tools',     name: 'Chatbot Creator Tools',     icon: 'ti-messages',     bg: '#EAF3DE', color: '#3B6D11' },
  { id: 'AI Chatbots & Assistants',  name: 'AI Chatbots & Assistants',  icon: 'ti-robot',        bg: '#E1F5EE', color: '#0F6E56' },
  { id: 'Marketing & SEO',           name: 'Marketing & SEO',           icon: 'ti-speakerphone', bg: '#FBEAF0', color: '#72243E' },
  { id: 'Productivity & Automation', name: 'Productivity & Automation', icon: 'ti-bolt',         bg: '#FAECE7', color: '#712B13' },
  { id: 'Research & Analysis',       name: 'Research & Analysis',       icon: 'ti-search',       bg: '#E6F1FB', color: '#185FA5' },
  { id: 'UI/UX & Design Tools',      name: 'UI/UX & Design Tools',      icon: 'ti-brush',        bg: '#EEEDFE', color: '#534AB7' },
  { id: 'Business & Finance AI',     name: 'Business & Finance AI',     icon: 'ti-briefcase',    bg: '#EAF3DE', color: '#3B6D11' },
  { id: 'Learning & Education',      name: 'Learning & Education',      icon: 'ti-book',         bg: '#FAEEDA', color: '#633806' },
  { id: 'AI Agents & Automation',    name: 'AI Agents & Automation',    icon: 'ti-brain',        bg: '#E1F5EE', color: '#0F6E56' },
];

export const MOCK_TOOLS: Tool[] = [
  {
    "id": "runwayml",
    "name": "Runway",
    "description": "Advancing creativity with artificial intelligence. Offers Gen-3 Alpha for high-fidelity text-to-video and image-to-video generation.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/runwayml.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://runwayml.com", "domain": "runwayml.com", "brandColor": "#000000",
    "featured": true,
    "rating": 4.9,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Video Generation", "Generative AI", "Creative Suite"]
  },
  {
    "id": "luma-dream-machine",
    "name": "Luma Dream Machine",
    "description": "An AI model that makes high quality, realistic videos fast from text and images.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/lumalabs.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://lumalabs.ai/dream-machine", "domain": "lumalabs.ai", "brandColor": "#000000",
    "featured": true,
    "rating": 4.8,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Video Generation", "Text-to-Video", "Generative AI"]
  },
  {
    "id": "pika-labs",
    "name": "Pika",
    "description": "An idea-to-video platform that sets your creativity in motion. Generate videos from text, images, or existing videos.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/pika.art?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://pika.art", "domain": "pika.art", "brandColor": "#f8f9fb",
    "featured": false,
    "rating": 4.7,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Video Generation", "Animation", "Generative AI"]
  },
  {
    "id": "scenario-gg",
    "name": "Scenario",
    "description": "AI-generated game assets. Train your own AI models to generate consistent assets matching your game's art style.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/scenario.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://scenario.com", "domain": "scenario.com", "brandColor": "#0e1117",
    "featured": false,
    "rating": 4.6,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Game Development", "Assets", "Generative AI"]
  },
  {
    "id": "leonardo-ai-gen",
    "name": "Leonardo.Ai",
    "description": "Create production-quality visual assets with unprecedented quality, speed, and style-consistency.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/leonardo.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://leonardo.ai", "domain": "leonardo.ai", "brandColor": "#15181c",
    "featured": false,
    "rating": 4.8,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Image Generation", "Assets", "Generative AI"]
  },

  {
    "id": "voiceflow",
    "name": "Voiceflow",
    "description": "Collaborative AI agent builder. Design, test, and launch conversational assistants and chatbots.",
    "category": "Chatbot Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/voiceflow.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://voiceflow.com", "domain": "voiceflow.com", "brandColor": "#0b5bff",
    "featured": true,
    "rating": 4.8,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "AI Agents", "No-Code"]
  },
  {
    "id": "botpress",
    "name": "Botpress",
    "description": "The first OpenAI-powered generative AI platform for building ChatGPT-like bots for your business.",
    "category": "Chatbot Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/botpress.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://botpress.com", "domain": "botpress.com", "brandColor": "#292e35",
    "featured": true,
    "rating": 4.7,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "Customer Service", "GPT-4"]
  },
  {
    "id": "chatbase",
    "name": "Chatbase",
    "description": "Custom ChatGPT for your data. Upload documents or add a link to your website and get a chatbot that answers questions about it.",
    "category": "Chatbot Creator Tools",
    "pricing": "Paid",
    "imageUrl": "https://img.logo.dev/chatbase.co?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://chatbase.co", "domain": "chatbase.co", "brandColor": "#000000",
    "featured": false,
    "rating": 4.6,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "Data", "Knowledge Base"]
  },
  {
    "id": "dante-ai",
    "name": "Dante AI",
    "description": "Create custom AI chatbots powered by GPT-4 trained on your own data in minutes with zero coding.",
    "category": "Chatbot Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/dante-ai.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://dante-ai.com", "domain": "dante-ai.com", "brandColor": "#534AB7",
    "featured": false,
    "rating": 4.5,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "No-Code", "AI Agents"]
  },
  {
    "id": "stack-ai",
    "name": "Stack AI",
    "description": "No-code AI platform to build, deploy, and scale enterprise-grade AI applications and chatbots.",
    "category": "Chatbot Creator Tools",
    "pricing": "Paid",
    "imageUrl": "https://img.logo.dev/stack-ai.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://stack-ai.com", "domain": "stack-ai.com", "brandColor": "#0f172a",
    "featured": false,
    "rating": 4.7,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "Enterprise", "Workflow"]
  },

  {
    "id": "playht",
    "name": "PlayHT",
    "description": "Ultra-realistic text-to-speech voice generation. Clone your voice or choose from hundreds of languages and accents.",
    "category": "Voice Creator Tools",
    pricing: "Freemium",
    imageUrl: "https://img.logo.dev/play.ht?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://play.ht", "domain": "play.ht", "brandColor": "#0c0c0c",
    featured: true,
    "rating": 4.8,
    
    dateAdded: "2026-05-09T00:00:00Z",
    "tags": ["TTS", "Voiceover", "Audio"]
  },
  {
    "id": "murf-ai",
    "name": "Murf AI",
    "description": "Create studio-quality voiceovers in minutes. Features pitch control, emphasis, and audio sync.",
    "category": "Voice Creator Tools",
    pricing: "Freemium",
    imageUrl: "https://img.logo.dev/murf.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://murf.ai", "domain": "murf.ai", "brandColor": "#0a1f44",
    featured: true,
    "rating": 4.7,
    
    dateAdded: "2026-05-09T00:00:00Z",
    "tags": ["Voiceover", "Presentation", "Audio"]
  },
  {
    "id": "speechify-voice",
    "name": "Speechify",
    "description": "Listen to docs, articles, PDF, email, and various other formats. Also offers a robust text-to-speech creation tool.",
    "category": "Voice Creator Tools",
    pricing: "Freemium",
    imageUrl: "https://img.logo.dev/speechify.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://speechify.com", "domain": "speechify.com", "brandColor": "#1d6afa",
    featured: false,
    "rating": 4.9,
    
    dateAdded: "2026-05-09T00:00:00Z",
    "tags": ["TTS", "Accessibility", "Voice"]
  },
  {
    "id": "lovo-ai",
    "name": "Lovo.ai",
    "description": "Award-winning AI Voice Generator and text to speech platform with 500+ voices in 100 languages.",
    "category": "Voice Creator Tools",
    pricing: "Freemium",
    imageUrl: "https://img.logo.dev/lovo.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://lovo.ai", "domain": "lovo.ai", "brandColor": "#8d43ff",
    featured: false,
    "rating": 4.6,
    
    dateAdded: "2026-05-09T00:00:00Z",
    "tags": ["TTS", "Video Creation", "Audio"]
  },
  {
    "id": "resemble-ai",
    "name": "Resemble AI",
    "description": "Generate AI voices for your games, videos, and applications. Offers real-time voice cloning APIs.",
    "category": "Voice Creator Tools",
    pricing: "Paid",
    imageUrl: "https://img.logo.dev/resemble.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://resemble.ai", "domain": "resemble.ai", "brandColor": "#0b1521",
    featured: false,
    "rating": 4.5,
    
    dateAdded: "2026-05-09T00:00:00Z",
    "tags": ["Voice Cloning", "Developers", "Audio"]
  },

  {
    "id": "trending-chatgpt",
    "name": "ChatGPT (GPT-5.5)",
    "description": "AI Chatbot, Content Writing, Coding, Research. Best For: Students, Creators, Developers.",
    "category": "AI Chatbots & Assistants",
    "url": "https://chat.openai.com", "domain": "openai.com", "brandColor": "#10a37f",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 5,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Chatbot",
      "GPT-5.5"
    ]
  },
  {
    "id": "trending-claude",
    "name": "Claude Opus 4.7",
    "description": "Deep Reasoning, Long Documents, Coding. Best For: Writers & Programmers.",
    "category": "AI Chatbots & Assistants",
    "url": "https://claude.ai", "domain": "anthropic.com", "brandColor": "#c96442",
    "imageUrl": "https://images.unsplash.com/photo-1698047915509-9fc62fb6a18d?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 5,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Claude",
      "Opus"
    ]
  },
  {
    "id": "trending-cursor",
    "name": "Cursor AI",
    "description": "AI Coding Editor. Best For: Website & App Developers.",
    "category": "Code & Development",
    "url": "https://cursor.sh", "domain": "cursor.sh", "brandColor": "#1a1a2e",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 5,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Coding",
      "Editor"
    ]
  },
  {
    "id": "trending-perplexity",
    "name": "Perplexity AI",
    "description": "AI Search Engine with Sources. Best For: Research & News.",
    "category": "Research & Analysis",
    "url": "https://perplexity.ai", "domain": "perplexity.ai", "brandColor": "#185FA5",
    "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Search",
      "Research"
    ]
  },
  {
    "id": "trending-bolt",
    "name": "Bolt.new",
    "description": "Prompt to Website/App Build. Best For: Beginners & Startups.",
    "category": "Code & Development",
    "url": "https://bolt.new", "domain": "bolt.new", "brandColor": "#7c3aed",
    "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Website",
      "App Builder"
    ]
  },
  {
    "id": "trending-lovable",
    "name": "Lovable AI",
    "description": "Full Stack AI App Builder. Best For: SaaS & Startup Projects.",
    "category": "Code & Development",
    "url": "https://lovable.dev", "domain": "lovable.dev", "brandColor": "#185FA5",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "SaaS",
      "Builder"
    ]
  },
  {
    "id": "trending-runway",
    "name": "Runway ML",
    "description": "AI Video Generation & Editing. Best For: YouTube & Reel Creators.",
    "category": "Video & Audio Tools",
    "url": "https://runwayml.com", "domain": "runwayml.com", "brandColor": "#21c8a0",
    "imageUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Video",
      "Editing"
    ]
  },
  {
    "id": "trending-pika",
    "name": "Pika Labs",
    "description": "Cinematic AI Video Creator. Best For: Viral Shorts & Reels.",
    "category": "Video & Audio Tools",
    "url": "https://pika.art", "domain": "pika.art", "brandColor": "#72243E",
    "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Video",
      "Cinematic"
    ]
  },
  {
    "id": "trending-kling",
    "name": "Kling AI",
    "description": "Hyper Realistic AI Videos. Best For: Cinematic Content.",
    "category": "Video & Audio Tools",
    "url": "https://klingai.com", "domain": "klingai.com", "brandColor": "#7c3aed",
    "imageUrl": "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Video",
      "Hyper Realistic"
    ]
  },
  {
    "id": "trending-heygen",
    "name": "HeyGen",
    "description": "AI Avatar & Translation Videos. Best For: Business & YouTubers.",
    "category": "Video & Audio Tools",
    "url": "https://heygen.com", "domain": "heygen.com", "brandColor": "#5b21b6",
    "imageUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Avatar",
      "Translation"
    ]
  },
  {
    "id": "trending-elevenlabs",
    "name": "ElevenLabs",
    "description": "AI Voice Cloning & Voiceovers. Best For: Voice Content.",
    "category": "Voice",
    "url": "https://elevenlabs.io", "domain": "elevenlabs.io", "brandColor": "#000000",
    "imageUrl": "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 5,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Voice",
      "Cloning"
    ]
  },
  {
    "id": "trending-suno",
    "name": "Suno AI",
    "description": "AI Music Generator. Best For: Singers & Music Creators.",
    "category": "Music",
    "url": "https://suno.com", "domain": "suno.com", "brandColor": "#712B13",
    "imageUrl": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Music",
      "Generator"
    ]
  },
  {
    "id": "trending-gamma",
    "name": "Gamma App",
    "description": "AI Presentation Maker. Best For: Students & Office Work.",
    "category": "Presentation",
    "url": "https://gamma.app", "domain": "gamma.app", "brandColor": "#633806",
    "imageUrl": "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Presentation",
      "Slides"
    ]
  },
  {
    "id": "trending-notion",
    "name": "Notion AI",
    "description": "Notes, Planning & Productivity. Best For: Daily Workflow.",
    "category": "Productivity & Automation",
    "url": "https://notion.so", "domain": "notion.so", "brandColor": "#000000",
    "imageUrl": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Notes",
      "Productivity"
    ]
  },
  {
    "id": "trending-canva",
    "name": "Canva AI",
    "description": "AI Graphic Designing Tools. Best For: Social Media Posts.",
    "category": "UI/UX & Design Tools",
    "url": "https://canva.com", "domain": "canva.com", "brandColor": "#00c4cc",
    "imageUrl": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 5,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Design",
      "Graphics"
    ]
  },
  {
    "id": "trending-leonardo",
    "name": "Leonardo AI",
    "description": "AI Art & Graphics Generator. Best For: Designers & Gaming Art.",
    "category": "UI/UX & Design Tools",
    "url": "https://leonardo.ai", "domain": "leonardo.ai", "brandColor": "#f97316",
    "imageUrl": "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Image",
      "Art"
    ]
  },
  {
    "id": "trending-midjourney",
    "name": "Midjourney",
    "description": "Premium AI Image Generator. Best For: Professional Designers.",
    "category": "UI/UX & Design Tools",
    "url": "https://midjourney.com", "domain": "midjourney.com", "brandColor": "#1a1a2e",
    "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 5,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Image",
      "Design"
    ]
  },
  {
    "id": "trending-n8n",
    "name": "n8n AI",
    "description": "AI Workflow Automation. Best For: Businesses & Automation.",
    "category": "AI Agents & Automation",
    "url": "https://n8n.io", "domain": "n8n.io", "brandColor": "#ea4b71",
    "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Automation",
      "Workflow"
    ]
  },
  {
    "id": "trending-zapier",
    "name": "Zapier AI",
    "description": "App Automation with AI. Best For: Freelancers & Teams.",
    "category": "AI Agents & Automation",
    "url": "https://zapier.com", "domain": "zapier.com", "brandColor": "#ff4a00",
    "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Automation",
      "Integration"
    ]
  },
  {
    "id": "trending-notebooklm",
    "name": "NotebookLM",
    "description": "AI Study Assistant & PDF Summary. Best For: Students.",
    "category": "Productivity & Automation",
    "url": "https://notebooklm.google.com", "domain": "notebooklm.google.com", "brandColor": "#712B13",
    "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    "pricing": "Free",
    "rating": 4.8,
    "featured": true,
    "dateAdded": "2026-05-09T00:00:00.000Z",
    "tags": [
      "Study",
      "Research"
    ]
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3 Alpha",
    description: "The next frontier in Generative AI for video. Highly photorealistic, consistent, and controllable text-to-video generation.",
    category: "AI Writing & Content",
    url: 'https://runwayml.com', domain: 'runwayml.com', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Generative AI", "Text-to-Video", "Foundation Models"]
  },
  {
    id: "crewai",
    name: "CrewAI",
    description: "Framework for orchestrating role-playing, autonomous AI agents. Build complex multi-agent systems.",
    category: "Agentic AI",
    url: 'https://crewai.com', domain: 'crewai.com', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Autonomous", "Multi-Agent", "Workflow"]
  },
  {
    id: "meta-llama-3",
    name: "Llama 3",
    description: "Meta's open-source Generative AI foundation model. Excels at broad reasoning, coding, and chat.",
    category: "AI Writing & Content",
    url: 'https://llama.meta.com', domain: 'llama.meta.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Generative AI", "LLM", "Foundation Models"]
  },
  {
    id: "chatgpt-5",
    name: "ChatGPT-5",
    description: "The next-generation multimodal large language model from OpenAI, featuring agentic capabilities, reasoning, and real-time interaction.",
    category: "AI Chatbots & Assistants",
    url: 'https://chatgpt.com', domain: 'chatgpt.com', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1673847401561-fcd87b21e8e2?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Agents", "Autonomous Agents", "Multimodal"]
  },
  {
    id: "gemini-3.0",
    name: "Gemini 3.0",
    description: "Google's most capable AI model yet, natively built to be multimodal and agentic, integrating seamlessly across the workspace.",
    category: "AI Chatbots & Assistants",
    url: 'https://gemini.google.com', domain: 'gemini.google.com', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1684369176162-811cce3b9d03?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Agents", "Autonomous Agents"]
  },
  {
    id: "claude-4",
    name: "Claude 4",
    description: "Anthropic's latest masterpiece for long-context understanding, highly technical coding tasks, and unprecedented safety.",
    category: "Code & Development",
    url: 'https://claude.ai', domain: 'anthropic.com', brandColor: '#c96442', 
    imageUrl: "https://images.unsplash.com/photo-1681289139150-13f502476579?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Code Generation", "Debugging", "Agents"]
  },
  {
    id: "sora-2.0",
    name: "Sora 2.0",
    description: "OpenAI's groundbreaking text-to-video AI model now with audio sync, physical accuracy, and extended 10-minute generation.",
    category: "Video & Audio Tools",
    url: 'https://openai.com/sora', domain: 'openai.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Text to Video", "Motion Graphics", "VFX"]
  },
  {
    id: "midjourney-v8",
    name: "Midjourney v8",
    description: "The premier AI image generator of 2026, offering absolute photorealism, precise character consistency, and built-in text rendering.",
    category: "Image & Art Generation",
    url: 'https://midjourney.com', domain: 'midjourney.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Image Generation", "UI Design", "3D Textures"]
  },
  {
    id: "devin-3.0",
    name: "Devin 3.0",
    description: "The first fully autonomous AI software engineer. Simply give it a prompt and watch it plan, write code, run, test, and deploy.",
    category: "Code & Development",
    url: 'https://cognition.ai', domain: 'cognition.ai', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Code Generation", "DevOps", "LLMOps"]
  },
  {
    id: "cursor-2026",
    name: "Cursor AI",
    description: "The AI-first IDE that revolutionized how developers code. Features context-aware whole-codebase generation and instantaneous bug fixing.",
    category: "Code & Development",
    url: 'https://cursor.com', domain: 'cursor.sh', brandColor: '#1a1a2e',
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dddf8b60ddb?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Code Generation", "Refactoring", "Debugging"]
  },
  {
    id: "elevenlabs-2.0",
    name: "ElevenLabs Voice 2.0",
    description: "Unmatched ultra-realistic emotional voice generation, real-time dubbing, and AI voice cloning.",
    category: "Voice",
    url: 'https://elevenlabs.io', domain: 'elevenlabs.io', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Voice Cloning", "Text-to-Speech", "Dubbing"]
  },
  {
    id: "copilot-pro-2026",
    name: "Microsoft 365 Copilot",
    description: "Your everyday AI companion powered by GPT-5. Automates excel macros, crafts perfect presentations, and orchestrates your email.",
    category: "Productivity & Automation",
    url: 'https://copilot.microsoft.com', domain: 'copilot.microsoft.com', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Workflow Automation", "Mail", "Document Management"]
  },
  {
    id: "suno-v5",
    name: "Suno v5",
    description: "Generate radio-quality, full-length songs with vocals and instrumentation in seconds. Now supports track separation and stem editing.",
    category: "Music",
    url: 'https://suno.com', domain: 'suno.com', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-08",
    tags: ["Generation", "Music", "Production"]
  },
  {
    id: "looka",
    name: "Looka",
    description: "Use Looka's AI-powered platform to design a logo and build a brand you love.",
    category: "Image & Art Generation",
    url: 'https://looka.com', domain: 'looka.com', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-15",
    tags: [
      "Logo Design",
      "Branding",
      "Design"
    ]
  },
  {
    id: "logoai",
    name: "LogoAI",
    description: "An AI logo maker and brand-building platform that can help you create professional logos, design matching identities, and automate brand promotion.",
    category: "Image & Art Generation",
    url: 'https://www.logoai.com', domain: 'logoai.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-16",
    tags: [
      "Logo Design",
      "Brand Identity",
      "Design"
    ]
  },
  {
    id: "brandmark",
    name: "Brandmark",
    description: "Create a unique, professional logo for your business. Kickstart your brand with business card designs, social media graphics, app icons, letterheads and more.",
    category: "Image & Art Generation",
    url: 'https://brandmark.io', domain: 'brandmark.io', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-05-17",
    tags: [
      "Logo Design",
      "Styleguide",
      "AI Logo"
    ]
  },
  {
    id: "canva",
    name: "Canva AI",
    description: "Canva incorporates powerful AI tools for image generation, magic design, and rapid logo creation within its massive design ecosystem.",
    category: "UI/UX & Design Tools",
    url: 'https://www.canva.com', domain: 'canva.com', brandColor: '#00c4cc',
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-18",
    tags: [
      "Logo Design",
      "Graphic Design",
      "Image Gen"
    ]
  },
  {
    id: "flux-1",
    name: "Flux.1",
    description: "State-of-the-art open-source image generation model by Black Forest Labs, offering unparalleled photorealism and prompt adherence.",
    category: "Image & Art Generation",
    url: 'https://blackforestlabs.ai', domain: 'blackforestlabs.ai', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-04-06",
    tags: [
      "Image Gen",
      "Open Source",
      "Design"
    ]
  },
  {
    id: "opus-clip",
    name: "Opus Clip",
    description: "Generative AI video repurposing tool that turns long videos into viral short clips with one click. Perfect for TikTok, YouTube Shorts, and Reels.",
    category: "Video & Audio Tools",
    url: 'https://www.opus.pro', domain: 'opus.pro', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-04-06",
    tags: [
      "Video Editing",
      "Social Media",
      "Shorts"
    ]
  },
  {
    id: "leonardo-ai",
    name: "Leonardo AI",
    description: "Create production-quality visual assets for your projects with unprecedented quality, speed, and style-consistency.",
    category: "Image & Art Generation",
    url: 'https://leonardo.ai', domain: 'leonardo.ai', brandColor: '#f97316',
    imageUrl: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-04-06",
    tags: [
      "Image Gen",
      "Game Assets",
      "Art"
    ]
  },
  {
    id: "character-ai",
    name: "Character.ai",
    description: "Neural language models that allow you to chat with hyper-realistic AI personalities, historical figures, or create your own custom characters.",
    category: "AI Chatbots & Assistants",
    url: 'https://character.ai', domain: 'character.ai', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2026-04-06",
    tags: [
      "Chatbots",
      "Entertainment",
      "Roleplay"
    ]
  },
  {
    id: "trae-ai",
    name: "Trae",
    description: "An adaptive AI IDE that understands your codebase and helps you write, refactor, and debug code faster than ever.",
    category: "Code & Development",
    url: 'https://www.trae.ai', domain: 'trae.ai', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-04-06",
    tags: [
      "IDE",
      "Coding",
      "Developer Tools"
    ]
  },
  {
    id: "qwen",
    name: "Qwen",
    description: "Alibaba Cloud's large language model series, featuring powerful reasoning, coding, and multilingual capabilities.",
    category: "AI Chatbots & Assistants",
    url: 'https://qwenlm.github.io', domain: 'qwenlm.github.io', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2026-04-06",
    tags: [
      "LLM",
      "Open Source",
      "AI Model"
    ]
  },
  {
    id: "miro-ai",
    name: "Miro AI",
    description: "AI-powered visual workspace for innovation. Generate mind maps, summarize sticky notes, and brainstorm ideas collaboratively.",
    category: "Productivity & Automation",
    url: 'https://miro.com/ai', domain: 'miro.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2026-04-06",
    tags: [
      "Whiteboarding",
      "Brainstorming",
      "Collaboration"
    ]
  },
  {
    id: "napkin-ai",
    name: "Napkin AI",
    description: "Turn your text into engaging visuals effortlessly. Napkin AI automatically generates diagrams, charts, and graphics from your text content.",
    category: "UI/UX & Design Tools",
    url: 'https://www.napkin.ai', domain: 'napkin.ai', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-04-05",
    tags: [
      "Visuals",
      "Diagrams",
      "Presentation"
    ]
  },
  {
    id: "websim-ai",
    name: "WebSim AI",
    description: "A powerful AI tool that lets you generate, simulate, and interact with fully functional websites and web applications just by describing them.",
    category: "Code & Development",
    url: 'https://websim.ai', domain: 'websim.ai', brandColor: '#633806',
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-04-04",
    tags: [
      "Web Design",
      "Coding",
      "Simulation"
    ]
  },
  {
    id: "minimax-video",
    name: "MiniMax",
    description: "High-quality AI video generation model capable of creating highly realistic and imaginative video clips from text prompts.",
    category: "Video & Audio Tools",
    url: 'https://hailuoai.video', domain: 'hailuoai.video', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1574717024453-354056a3df3c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2026-04-03",
    tags: [
      "Video Gen",
      "AI Video",
      "Creative"
    ]
  },
  {
    id: "genspark",
    name: "Genspark",
    description: "An AI-powered search engine that generates custom Sparkpages to provide comprehensive, unbiased, and synthesized answers to your queries.",
    category: "Search",
    url: 'https://www.genspark.ai', domain: 'genspark.ai', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-04-02",
    tags: [
      "Search Engine",
      "Research",
      "Information"
    ]
  },
  {
    id: "hedra-ai",
    name: "Hedra",
    description: "Create expressive and controllable AI video avatars. Hedra allows you to generate singing or speaking characters from audio and images.",
    category: "Video & Audio Tools",
    url: 'https://www.hedra.com', domain: 'hedra.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2026-04-01",
    tags: [
      "Avatars",
      "Lip Sync",
      "Video Gen"
    ]
  },
  {
    id: "vidu-ai",
    name: "Vidu AI",
    description: "A powerful AI video generator that creates highly consistent and dynamic videos from text and images with fast generation speeds.",
    category: "Video & Audio Tools",
    url: 'https://www.vidu.studio', domain: 'vidu.studio', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2026-03-30",
    tags: [
      "Video Gen",
      "Text-to-Video",
      "Animation"
    ]
  },
  {
    id: "chatpdf",
    name: "ChatPDF",
    description: "Chat with any PDF. Fast and easy way to extract information from large PDF files like manuals, essays, legal contracts, books, and research papers.",
    category: "Student",
    url: 'https://www.chatpdf.com', domain: 'chatpdf.com', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-13",
    tags: [
      "Study",
      "Research",
      "Notes"
    ]
  },
  {
    id: "consensus",
    name: "Consensus",
    description: "Consensus is a search engine that uses AI to extract and surface findings directly from scientific research.",
    category: "Student",
    url: 'https://consensus.app', domain: 'consensus.app', brandColor: '#3b82f6',
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-14",
    tags: [
      "Research",
      "Study"
    ]
  },
  {
    id: "brainly",
    name: "Brainly",
    description: "The world's largest social learning network for students. Get AI-powered homework help and explanations for any subject.",
    category: "Student",
    url: 'https://brainly.com', domain: 'brainly.com', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-15",
    tags: [
      "Homework",
      "Study",
      "Math Solver"
    ]
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    description: "Record and transcribe lectures, meetings, and interviews in real-time. Generate AI summaries and notes automatically.",
    category: "Student",
    url: 'https://otter.ai', domain: 'otter.ai', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-16",
    tags: [
      "Notes",
      "Study"
    ]
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    description: "An AI-powered search engine that provides accurate, cited answers to your questions. Perfect for academic research and fact-checking.",
    category: "Student",
    url: 'https://www.perplexity.ai', domain: 'perplexity.ai', brandColor: '#633806',
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-17",
    tags: [
      "Research",
      "Study",
      "Homework"
    ]
  },
  {
    id: "quizlet-qchat",
    name: "Quizlet Q-Chat",
    description: "An AI tutor that helps you learn any subject through interactive chat, flashcards, and personalized study paths.",
    category: "Student",
    url: 'https://quizlet.com/features/q-chat', domain: 'quizlet.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-10",
    tags: [
      "Study",
      "Flashcards",
      "Tutoring"
    ]
  },
  {
    id: "socratic",
    name: "Socratic by Google",
    description: "Get unstuck. Learn better. Socratic uses Google AI to help you understand your school work at a high school and university level.",
    category: "Student",
    url: 'https://socratic.org', domain: 'socratic.org', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-11",
    tags: [
      "Homework",
      "Math Solver",
      "Research"
    ]
  },
  {
    id: "photomath",
    name: "Photomath",
    description: "Learn math, check homework and study for upcoming tests and ACTs/SATs with the most used math learning app in the world.",
    category: "Student",
    url: 'https://photomath.com', domain: 'photomath.com', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-12",
    tags: [
      "Math Solver",
      "Homework",
      "Study"
    ]
  },
  {
    id: "promptbase",
    name: "PromptBase",
    description: "The premier marketplace for buying and selling high-quality DALL-E, GPT-4, Midjourney, and Stable Diffusion prompts.",
    category: "Prompt Engineering",
    url: 'https://promptbase.com', domain: 'promptbase.com', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-01",
    tags: [
      "Marketplace",
      "Prompts",
      "Templates"
    ]
  },
  {
    id: "flowgpt",
    name: "FlowGPT",
    description: "Share, discover, and learn about the most useful ChatGPT prompts that help you streamline your tasks and increase productivity.",
    category: "Prompt Engineering",
    url: 'https://flowgpt.com', domain: 'flowgpt.com', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-02",
    tags: [
      "Prompts",
      "Community",
      "Templates"
    ]
  },
  {
    id: "autogpt",
    name: "AutoGPT",
    description: "An experimental open-source attempt to make GPT-4 fully autonomous. Chain together LLM thoughts to achieve any goal.",
    category: "Agentic AI",
    url: 'https://agpt.co', domain: 'agpt.co', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-03",
    tags: [
      "Autonomous",
      "Task Management",
      "Multi-Agent"
    ]
  },
  {
    id: "agentgpt",
    name: "AgentGPT",
    description: "Assemble, configure, and deploy autonomous AI Agents in your browser. Give it a goal and watch it think, learn, and execute.",
    category: "Agentic AI",
    url: 'https://agentgpt.reworkd.ai', domain: 'agentgpt.reworkd.ai', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1684369175833-8b88d8740128?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-04",
    tags: [
      "Autonomous",
      "Workflow",
      "Browser Automation"
    ]
  },
  {
    id: "intercom-fin",
    name: "Intercom Fin",
    description: "A breakthrough AI bot that resolves customer issues instantly and accurately with zero setup required.",
    category: "Customer Support",
    url: 'https://www.intercom.com/fin', domain: 'intercom.com', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-05",
    tags: [
      "Chatbots",
      "Helpdesk",
      "Knowledge Base"
    ]
  },
  {
    id: "deepl",
    name: "DeepL",
    description: "The world's most accurate translator. Translate texts and full document files instantly with advanced AI technology.",
    category: "Language Translation",
    url: 'https://www.deepl.com', domain: 'deepl.com', brandColor: '#633806',
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 5,
    featured: true,
    dateAdded: "2024-05-06",
    tags: [
      "Translation",
      "Multilingual",
      "Localization"
    ]
  },
  {
    id: "gamma",
    name: "Gamma",
    description: "A new medium for presenting ideas, powered by AI. Create beautiful, engaging content with none of the formatting and design work.",
    category: "Presentation",
    url: 'https://gamma.app', domain: 'gamma.app', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-05-15",
    tags: [
      "Slides",
      "Pitch Decks",
      "Storytelling"
    ]
  },
  {
    id: "tome",
    name: "Tome",
    description: "The AI-powered storytelling format. Tome helps you build compelling narratives with AI-generated text and images.",
    category: "Presentation",
    url: 'https://tome.app', domain: 'tome.app', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1542744094-24638ea0b56c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2023-03-10",
    tags: [
      "Storytelling",
      "Slides",
      "Design"
    ]
  },
  {
    id: "beautiful-ai",
    name: "Beautiful.ai",
    description: "Presentation software that designs for you. Beautiful.ai uses AI to automatically format your slides as you add content.",
    category: "Presentation",
    url: 'https://www.beautiful.ai', domain: 'beautiful.ai', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2022-11-20",
    tags: [
      "Slides",
      "Templates",
      "Design"
    ]
  },
  {
    id: "1",
    name: "ChatGPT",
    description: "OpenAI's state-of-the-art conversational AI model.",
    category: "AI Chatbots & Assistants",
    url: 'https://chat.openai.com', domain: 'chat.openai.com', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-04-01",
    tags: [
      "LLM",
      "Chatbot",
      "Assistant"
    ]
  },
  {
    id: "2",
    name: "Midjourney",
    description: "Generates hyper-realistic images from textual descriptions.",
    category: "Image & Art Generation",
    url: 'https://www.midjourney.com', domain: 'midjourney.com', brandColor: '#1a1a2e',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 5,
    featured: true,
    dateAdded: "2026-04-01",
    tags: [
      "Image Gen",
      "Art",
      "Creative"
    ]
  },
  {
    id: "3",
    name: "Claude 3",
    description: "Anthropic's most powerful AI model, excelling at reasoning and coding.",
    category: "AI Chatbots & Assistants",
    url: 'https://www.anthropic.com', domain: 'anthropic.com', brandColor: '#633806',
    imageUrl: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-04-01",
    tags: [
      "LLM",
      "Chatbot",
      "Coding"
    ]
  },
  {
    id: "4",
    name: "Gemini",
    description: "Google's most capable AI model, built from the ground up to be multimodal.",
    category: "AI Chatbots & Assistants",
    url: 'https://gemini.google.com', domain: 'gemini.google.com', brandColor: '#4285F4',
    imageUrl: "https://images.unsplash.com/photo-1684369175833-8b88d8740128?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-18",
    tags: [
      "Multimodal",
      "Google",
      "Chatbot"
    ]
  },
  {
    id: "5",
    name: "Perplexity",
    description: "AI-powered search engine that provides direct answers with citations.",
    category: "Research & Analysis",
    url: 'https://www.perplexity.ai', domain: 'perplexity.ai', brandColor: '#1fb8cd',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-08",
    tags: [
      "Search",
      "Research",
      "Citations"
    ]
  },
  {
    id: "6",
    name: "Jasper",
    description: "Advanced AI content generation for marketers and writers.",
    category: "AI Writing & Content",
    url: 'https://www.jasper.ai', domain: 'jasper.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-6/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-10-01",
    tags: [
      "Copywriting",
      "Marketing",
      "Blog"
    ]
  },
  {
    id: "7",
    name: "Copy.ai",
    description: "The AI platform for go-to-market teams. Write better copy, faster.",
    category: "AI Writing & Content",
    url: 'https://www.copy.ai', domain: 'copy.ai', brandColor: '#7c3aed',
    imageUrl: "https://picsum.photos/seed/ai-tool-7/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-20",
    tags: [
      "Copywriting",
      "Marketing",
      "Social Media"
    ]
  },
  {
    id: "8",
    name: "Stable Diffusion",
    description: "Latent text-to-image diffusion model capable of generating photo-realistic images.",
    category: "Image & Art Generation",
    url: 'https://stability.ai', domain: 'stability.ai', brandColor: '#7c3aed',
    imageUrl: "https://picsum.photos/seed/ai-tool-8/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-27",
    tags: [
      "Open Source",
      "Image Gen",
      "Art"
    ]
  },
  {
    id: "9",
    name: "Leonardo.ai",
    description: "Create production-quality visual assets for your projects with unprecedented quality.",
    category: "Image & Art Generation",
    url: 'https://leonardo.ai', domain: 'leonardo.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-9/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-04-20",
    tags: [
      "Game Assets",
      "Art",
      "Image Gen"
    ]
  },
  {
    id: "10",
    name: "Sora",
    description: "Create realistic and imaginative scenes from text instructions.",
    category: "Video & Audio Tools",
    url: 'https://openai.com/sora', domain: 'openai.com', brandColor: '#10a37f',
    imageUrl: "https://picsum.photos/seed/ai-tool-10/400/200",
    pricing: "Paid",
    rating: 5,
    featured: true,
    dateAdded: "2024-04-19",
    tags: [
      "Text to Video",
      "OpenAI",
      "Simulation"
    ]
  },
  {
    id: "11",
    name: "Runway",
    description: "Advancing creativity with artificial intelligence. Gen-2 and more.",
    category: "Video & Audio Tools",
    url: 'https://runwayml.com', domain: 'runwayml.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-11/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-22",
    tags: [
      "Video Gen",
      "VFX",
      "Creative"
    ]
  },
  {
    id: "12",
    name: "Pika",
    description: "An idea-to-video platform that brings your creativity to motion.",
    category: "Video & Audio Tools",
    url: 'https://pika.art', domain: 'pika.art', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-12/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-04-22",
    tags: [
      "Animation",
      "Video Gen",
      "Motion"
    ]
  },
  {
    id: "13",
    name: "ElevenLabs",
    description: "The most realistic AI text-to-speech and voice cloning software.",
    category: "Voice",
    url: 'https://elevenlabs.io', domain: 'elevenlabs.io', brandColor: '#000000',
    imageUrl: "https://picsum.photos/seed/ai-tool-13/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-09",
    tags: [
      "Text-to-Speech",
      "Voice Cloning",
      "Audio"
    ]
  },
  {
    id: "14",
    name: "Suno",
    description: "Make a song about anything. Award-winning music generation AI.",
    category: "Music",
    url: 'https://suno.com', domain: 'suno.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-14/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-19",
    tags: [
      "Music Gen",
      "Songs",
      "Audio"
    ]
  },
  {
    id: "15",
    name: "Udio",
    description: "Make music with AI. Generate high-fidelity songs in seconds.",
    category: "Music",
    url: 'https://www.udio.com', domain: 'udio.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-15/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-14",
    tags: [
      "Music Gen",
      "Audio",
      "Creative"
    ]
  },
  {
    id: "16",
    name: "GitHub Copilot",
    description: "Your AI pair programmer. Code faster with less work.",
    category: "Code & Development",
    url: 'https://github.com/features/copilot', domain: 'github.com', brandColor: '#24292e',
    imageUrl: "https://picsum.photos/seed/ai-tool-16/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2023-08-20",
    tags: [
      "IDE",
      "Coding",
      "Copilot"
    ]
  },
  {
    id: "17",
    name: "Cursor",
    description: "The AI-first code editor built for pair programming.",
    category: "Code & Development",
    url: 'https://cursor.sh', domain: 'cursor.sh', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-17/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-10",
    tags: [
      "IDE",
      "Coding",
      "Copilot"
    ]
  },
  {
    id: "18",
    name: "Replit",
    description: "Collaborative browser-based IDE with AI features.",
    category: "Code & Development",
    url: 'https://replit.com', domain: 'replit.com', brandColor: '#f26207',
    imageUrl: "https://picsum.photos/seed/ai-tool-18/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-07",
    tags: [
      "IDE",
      "Cloud",
      "Coding"
    ]
  },
  {
    id: "19",
    name: "Notion AI",
    description: "Access the limitless power of AI, right inside Notion.",
    category: "Productivity & Automation",
    url: 'https://www.notion.so/product/ai', domain: 'notion.so', brandColor: '#000000',
    imageUrl: "https://picsum.photos/seed/ai-tool-19/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-04-26",
    tags: [
      "Writing",
      "Organization",
      "Workspace"
    ]
  },
  {
    id: "20",
    name: "Zapier",
    description: "The leader in no-code automation. Connect your apps and automate workflows.",
    category: "Productivity & Automation",
    url: 'https://zapier.com', domain: 'zapier.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-20/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-07",
    tags: [
      "Workflow Automation",
      "No-Code",
      "Integration"
    ]
  },
  {
    id: "23",
    name: "Synthesia",
    description: "Create professional AI videos from text in 120+ languages.",
    category: "Video & Audio Tools",
    url: 'https://www.synthesia.io', domain: 'synthesia.io', brandColor: '#7b2ff7',
    imageUrl: "https://picsum.photos/seed/ai-tool-23/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-04-11",
    tags: [
      "Avatars",
      "Text to Video",
      "Marketing"
    ]
  },
  {
    id: "24",
    name: "HeyGen",
    description: "AI video generator. Create engaging videos with AI avatars.",
    category: "Video & Audio Tools",
    url: 'https://www.heygen.com', domain: 'heygen.com', brandColor: '#5b21b6',
    imageUrl: "https://picsum.photos/seed/ai-tool-24/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-04-27",
    tags: [
      "Avatars",
      "Translation",
      "Marketing"
    ]
  },
  {
    id: "25",
    name: "Descript",
    description: "There's a new way to make video and podcasts. A good way.",
    category: "Video & Audio Tools",
    url: 'https://www.descript.com', domain: 'descript.com', brandColor: '#7c3aed',
    imageUrl: "https://picsum.photos/seed/ai-tool-25/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-21",
    tags: [
      "Video Editing",
      "Podcasting",
      "Transcription"
    ]
  },
  {
    id: "27",
    name: "Fireflies.ai",
    description: "Automate your meeting notes. Transcribe, summarize, and analyze voice conversations.",
    category: "Productivity & Automation",
    url: 'https://fireflies.ai', domain: 'fireflies.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-27/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-04-16",
    tags: [
      "Transcription",
      "Meetings",
      "Notes"
    ]
  },
  {
    id: "28",
    name: "Grammarly",
    description: "AI writing assistance that helps you communicate with confidence.",
    category: "AI Writing & Content",
    url: 'https://www.grammarly.com', domain: 'grammarly.com', brandColor: '#15c39a',
    imageUrl: "https://picsum.photos/seed/ai-tool-28/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-09-10",
    tags: [
      "Grammar Check",
      "Writing",
      "Communication"
    ]
  },
  {
    id: "29",
    name: "Quillbot",
    description: "AI-powered paraphrasing tool to enhance your writing.",
    category: "AI Writing & Content",
    url: 'https://quillbot.com', domain: 'quillbot.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-29/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2023-11-05",
    tags: [
      "Paraphrasing",
      "Writing",
      "Summarization"
    ]
  },
  {
    id: "30",
    name: "Adobe Firefly",
    description: "Generative AI for creators, focused on image generation and text effects.",
    category: "Image & Art Generation",
    url: 'https://firefly.adobe.com', domain: 'adobe.com', brandColor: '#ff0000',
    imageUrl: "https://picsum.photos/seed/ai-tool-30/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-06",
    tags: [
      "Image Gen",
      "Design",
      "Creative"
    ]
  },
  {
    id: "31",
    name: "Canva",
    description: "Design tool with powerful AI features like Magic Edit and Magic Write.",
    category: "UI/UX & Design Tools",
    url: 'https://www.canva.com', domain: 'canva.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-31/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-03-29",
    tags: [
      "Design",
      "Image Gen",
      "Marketing"
    ]
  },
  {
    id: "32",
    name: "Figma",
    description: "Collaborative interface design tool with AI plugins.",
    category: "UI/UX & Design Tools",
    url: 'https://www.figma.com', domain: 'figma.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-32/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-03-30",
    tags: [
      "Design",
      "UI/UX",
      "Prototyping"
    ]
  },
  {
    id: "33",
    name: "Uizard",
    description: "Design wireframes, mockups, and prototypes in minutes with AI.",
    category: "UI/UX & Design Tools",
    url: 'https://uizard.io', domain: 'uizard.io', brandColor: '#6366f1',
    imageUrl: "https://picsum.photos/seed/ai-tool-33/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-03-31",
    tags: [
      "Design",
      "Wireframing",
      "Prototyping"
    ]
  },
  {
    id: "34",
    name: "Luma AI",
    description: "Capture 3D assets from the real world with your phone.",
    category: "3D",
    url: 'https://lumalabs.ai', domain: 'lumalabs.ai', brandColor: '#000000',
    imageUrl: "https://picsum.photos/seed/ai-tool-34/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-03-18",
    tags: [
      "3D",
      "Capture",
      "NeRF"
    ]
  },
  {
    id: "35",
    name: "Spline",
    description: "3D design tool with AI features.",
    category: "3D",
    url: 'https://spline.design', domain: 'spline.design', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-35/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-03-17",
    tags: [
      "3D",
      "Design",
      "Web"
    ]
  },
  {
    id: "36",
    name: "Hugging Face",
    description: "The AI community building the future. Build, train and deploy state of the art models.",
    category: "Data",
    url: 'https://huggingface.co', domain: 'huggingface.co', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-36/400/200",
    pricing: "Free",
    rating: 5,
    featured: true,
    dateAdded: "2024-04-13",
    tags: [
      "Open Source",
      "Models",
      "Datasets"
    ]
  },
  {
    id: "37",
    name: "Mistral AI",
    description: "Open-weight models that rival top-tier proprietary systems.",
    category: "AI Chatbots & Assistants",
    url: 'https://mistral.ai', domain: 'mistral.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-37/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-12",
    tags: [
      "Open Source",
      "LLM",
      "Coding"
    ]
  },
  {
    id: "38",
    name: "Poe",
    description: "Fast, helpful AI chat. Access GPT-4, Claude 3, and more.",
    category: "AI Chatbots & Assistants",
    url: 'https://poe.com', domain: 'poe.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-38/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-04-24",
    tags: [
      "Aggregator",
      "Chatbot",
      "Models"
    ]
  },
  {
    id: "grok",
    name: "Grok",
    description: "An AI modeled after the Hitchhiker's Guide to the Galaxy, designed to answer spicy questions and exhibit humor.",
    category: "AI Chatbots & Assistants",
    url: 'https://grok.x.ai', domain: 'x.ai', brandColor: '#000000',
    imageUrl: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-23",
    tags: ["X", "Real-time", "Humor"]
  },
  {
    id: "perplexity-ai",
    name: "Perplexity AI",
    description: "AI search engine that provides complex answers along with citations, combining the best of search and conversational AI.",
    category: "AI Chatbots & Assistants",
    url: 'https://www.perplexity.ai', domain: 'perplexity.ai', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-01-10",
    tags: ["Search", "Research", "Citations"]
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    description: "The AI community building the future. Build, train and deploy state of the art models powered by the reference open source in machine learning.",
    category: "Code & Development",
    url: 'https://huggingface.co', domain: 'huggingface.co', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2023-11-20",
    tags: ["Models", "Open Source", "Platform"]
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description: "AI copywriter that generates high-quality marketing copy in seconds.",
    category: "AI Writing & Content",
    url: 'https://www.copy.ai', domain: 'copy.ai', brandColor: '#7c3aed',
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2023-10-05",
    tags: ["Copywriting", "Marketing", "Content"]
  },
  {
    id: "jaspar",
    name: "Jasper",
    description: "AI copilot for marketing teams that helps create high-performing content faster.",
    category: "AI Writing & Content",
    url: 'https://www.jasper.ai', domain: 'jasper.ai', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1664575602276-acd073f1300c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2023-09-12",
    tags: ["Copywriting", "Marketing", "Enterprise"]
  },
  {
    id: "synthesia",
    name: "Synthesia",
    description: "AI video generation platform. Turn text into video with AI avatars and voiceovers.",
    category: "Video & Audio Tools",
    url: 'https://www.synthesia.io', domain: 'synthesia.io', brandColor: '#7b2ff7',
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-08-25",
    tags: ["Avatars", "Video Gen", "Presentations"]
  },
  {
    id: "42",
    name: "Magnific AI",
    description: "AI upscaler and enhancer that hallucinates details to reimagine images.",
    category: "Image & Art Generation",
    url: 'https://magnific.ai', domain: 'magnific.ai', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-42/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-10",
    tags: [
      "Upscaling",
      "Enhancement",
      "Image Gen"
    ]
  },
  {
    id: "43",
    name: "Krea AI",
    description: "Real-time AI image generation and enhancement tool.",
    category: "Image & Art Generation",
    url: 'https://www.krea.ai', domain: 'krea.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-43/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-11",
    tags: [
      "Real-time",
      "Image Gen",
      "Design"
    ]
  },
  {
    id: "44",
    name: "Civitai",
    description: "The place to share and discover AI art models.",
    category: "Image & Art Generation",
    url: 'https://civitai.com', domain: 'civitai.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-44/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-25",
    tags: [
      "Models",
      "Stable Diffusion",
      "LoRA"
    ]
  },
  {
    id: "45",
    name: "Tabnine",
    description: "AI code assistant that accelerates development and keeps your code safe.",
    category: "Code & Development",
    url: 'https://www.tabnine.com', domain: 'tabnine.com', brandColor: '#6366f1',
    imageUrl: "https://picsum.photos/seed/ai-tool-45/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-06",
    tags: [
      "Code Generation",
      "Autocomplete",
      "DevOps"
    ]
  },
  {
    id: "46",
    name: "v0",
    description: "Generative UI system by Vercel. Generate UI components with text.",
    category: "Code & Development",
    url: 'https://v0.dev', domain: 'v0.dev', brandColor: '#000000',
    imageUrl: "https://picsum.photos/seed/ai-tool-46/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-07",
    tags: [
      "UI Design",
      "Code Generation",
      "React"
    ]
  },
  {
    id: "47",
    name: "Bolt",
    description: "AI-powered development sandbox to build, edit, and deploy full-stack apps.",
    category: "Code & Development",
    url: 'https://bolt.new', domain: 'bolt.new', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-47/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-07",
    tags: [
      "Web Development",
      "Full Stack",
      "IDE"
    ]
  },
  {
    id: "48",
    name: "Lovable",
    description: "AI tool to generate full-stack web apps from text descriptions.",
    category: "UI/UX & Design Tools",
    url: 'https://lovable.dev', domain: 'lovable.dev', brandColor: '#e11d48',
    imageUrl: "https://picsum.photos/seed/ai-tool-48/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-07",
    tags: [
      "Prototyping",
      "Web Design",
      "Code Generation"
    ]
  },
  {
    id: "49",
    name: "Windsurf",
    description: "AI-powered IDE that helps you stay in the flow.",
    category: "Code & Development",
    url: 'https://windsurf.ai', domain: 'windsurf.com', brandColor: '#0ea5e9',
    imageUrl: "https://picsum.photos/seed/ai-tool-49/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-07",
    tags: [
      "IDE",
      "Code Generation",
      "Productivity"
    ]
  },
  {
    id: "50",
    name: "Elicit",
    description: "Analyze research papers at superhuman speed.",
    category: "Research & Analysis",
    url: 'https://elicit.com', domain: 'elicit.com', brandColor: '#6366f1',
    imageUrl: "https://picsum.photos/seed/ai-tool-50/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-03-12",
    tags: [
      "Research",
      "Analysis",
      "Papers"
    ]
  },
  {
    id: "52",
    name: "Scite",
    description: "Assistant for researchers to better understand and evaluate scientific articles.",
    category: "Research & Analysis",
    url: 'https://scite.ai', domain: 'scite.ai', brandColor: '#10b981',
    imageUrl: "https://picsum.photos/seed/ai-tool-52/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-03-15",
    tags: [
      "Research",
      "Citations",
      "Analysis"
    ]
  },
  {
    id: "53",
    name: "Scholarcy",
    description: "The AI-powered article summarizer.",
    category: "Research & Analysis",
    url: 'https://www.scholarcy.com', domain: 'scholarcy.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-53/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-03-13",
    tags: [
      "Summarization",
      "Research",
      "Academic"
    ]
  },
  {
    id: "54",
    name: "tl;dv",
    description: "The AI meeting recorder for Zoom and Google Meet.",
    category: "Productivity & Automation",
    url: 'https://tldv.io', domain: 'tldv.io', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-54/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-14",
    tags: [
      "Meetings",
      "Recording",
      "Summarization"
    ]
  },
  {
    id: "56",
    name: "Speechify",
    description: "The #1 text to speech reader. Turn any text into audio.",
    category: "Voice",
    url: 'https://speechify.com', domain: 'speechify.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-56/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-07",
    tags: [
      "Text-to-Speech",
      "Accessibility",
      "Audiobooks"
    ]
  },
  {
    id: "57",
    name: "Murf AI",
    description: "Go from text to speech with a versatile AI voice generator.",
    category: "Voice",
    url: 'https://murf.ai', domain: 'murf.ai', brandColor: '#6366f1',
    imageUrl: "https://picsum.photos/seed/ai-tool-57/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-07",
    tags: [
      "Text-to-Speech",
      "Voiceover",
      "Audio"
    ]
  },
  {
    id: "58",
    name: "Krisp",
    description: "AI noise cancellation for online meetings.",
    category: "Video & Audio Tools",
    url: 'https://krisp.ai', domain: 'krisp.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-58/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-04-15",
    tags: [
      "Noise Cancellation",
      "Meetings",
      "Audio"
    ]
  },
  {
    id: "60",
    name: "InVideo",
    description: "Turn text into video with AI. Create professional videos in minutes.",
    category: "Video & Audio Tools",
    url: 'https://invideo.io', domain: 'invideo.io', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-60/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-17",
    tags: [
      "Text to Video",
      "Marketing",
      "Creation"
    ]
  },
  {
    id: "61",
    name: "Harvey AI",
    description: "Generative AI for elite law firms. Legal research and drafting.",
    category: "Legal",
    url: 'https://www.harvey.ai', domain: 'harvey.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-61/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-03-01",
    tags: [
      "Legal",
      "Research",
      "Enterprise"
    ]
  },
  {
    id: "62",
    name: "Casetext",
    description: "CoCounsel is the first reliable AI legal assistant.",
    category: "Legal",
    url: 'https://casetext.com', domain: 'casetext.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-62/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-03-05",
    tags: [
      "Legal",
      "Assistant",
      "Research"
    ]
  },
  {
    id: "63",
    name: "Ironclad",
    description: "Digital contracting platform with AI-powered contract analysis.",
    category: "Legal",
    url: 'https://ironcladapp.com', domain: 'ironcladapp.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-63/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-03-10",
    tags: [
      "Contracts",
      "Legal",
      "Management"
    ]
  },
  {
    id: "64",
    name: "Khanmigo",
    description: "AI-powered tutor by Khan Academy for personalized learning.",
    category: "Learning & Education",
    url: 'https://www.khanacademy.org/khan-labs', domain: 'khanacademy.org', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-64/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-02-20",
    tags: [
      "Tutoring",
      "Education",
      "Learning"
    ]
  },
  {
    id: "65",
    name: "Duolingo Max",
    description: "Language learning with AI-powered roleplay and explanations.",
    category: "Learning & Education",
    url: 'https://www.duolingo.com', domain: 'duolingo.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-65/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-02-25",
    tags: [
      "Language",
      "Education",
      "Learning"
    ]
  },
  {
    id: "66",
    name: "Quizlet",
    description: "AI-powered flashcards and study tools.",
    category: "Learning & Education",
    url: 'https://quizlet.com', domain: 'quizlet.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-66/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-02-28",
    tags: [
      "Study",
      "Flashcards",
      "Education"
    ]
  },
  {
    id: "68",
    name: "AlphaSense",
    description: "Market intelligence and search platform for financial professionals.",
    category: "Business & Finance AI",
    url: 'https://www.alpha-sense.com', domain: 'alpha-sense.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-68/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-03-15",
    tags: [
      "Finance",
      "Research",
      "Market"
    ]
  },
  {
    id: "69",
    name: "BloombergGPT",
    description: "Large language model purpose-built for finance.",
    category: "Business & Finance AI",
    url: 'https://www.bloomberg.com', domain: 'bloomberg.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-69/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-03-20",
    tags: [
      "Finance",
      "LLM",
      "Enterprise"
    ]
  },
  {
    id: "70",
    name: "Cleo",
    description: "AI assistant that helps you budget, save, and build credit.",
    category: "Business & Finance AI",
    url: 'https://web.meetcleo.com', domain: 'web.meetcleo.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-70/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-03-25",
    tags: [
      "Personal Finance",
      "Budgeting",
      "Savings"
    ]
  },
  {
    id: "71",
    name: "Soundraw",
    description: "AI music generator for creators. Royalty-free music.",
    category: "Music",
    url: 'https://soundraw.io', domain: 'soundraw.io', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-71/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-01",
    tags: [
      "Music Gen",
      "Royalty Free",
      "Audio"
    ]
  },
  {
    id: "72",
    name: "Boomy",
    description: "Make instant music with AI and share it with the world.",
    category: "Music",
    url: 'https://boomy.com', domain: 'boomy.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-72/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-05",
    tags: [
      "Music Gen",
      "Creation",
      "Audio"
    ]
  },
  {
    id: "73",
    name: "AIVA",
    description: "The Artificial Intelligence Virtual Artist for unique music.",
    category: "Music",
    url: 'https://www.aiva.ai', domain: 'aiva.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-73/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-08",
    tags: [
      "Composition",
      "Music",
      "Classical"
    ]
  },
  {
    id: "74",
    name: "Lalal.ai",
    description: "High-quality stem splitter based on the world's #1 AI-powered technology.",
    category: "Video & Audio Tools",
    url: 'https://www.lalal.ai', domain: 'lalal.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-74/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-10",
    tags: [
      "Stem Splitter",
      "Audio",
      "Music"
    ]
  },
  {
    id: "75",
    name: "Descript Overdub",
    description: "Create a text-to-speech model of your own voice.",
    category: "Voice",
    url: 'https://www.descript.com/overdub', domain: 'descript.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-75/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-12",
    tags: [
      "Voice Cloning",
      "Audio",
      "Editing"
    ]
  },
  {
    id: "76",
    name: "Resemble AI",
    description: "Generate realistic AI voices for any use case.",
    category: "Voice",
    url: 'https://www.resemble.ai', domain: 'resemble.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-76/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-15",
    tags: [
      "Voice Cloning",
      "TTS",
      "Audio"
    ]
  },
  {
    id: "77",
    name: "Replika",
    description: "The AI companion who cares. Always here to listen and talk.",
    category: "AI Chatbots & Assistants",
    url: 'https://replika.com', domain: 'replika.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-77/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-04-18",
    tags: [
      "Companion",
      "Chatbot",
      "Social"
    ]
  },
  {
    id: "78",
    name: "Pi",
    description: "A personalized AI, designed to be supportive, smart, and there for you.",
    category: "AI Chatbots & Assistants",
    url: 'https://pi.ai', domain: 'pi.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-78/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-20",
    tags: [
      "Personal Assistant",
      "Chatbot",
      "Supportive"
    ]
  },
  {
    id: "79",
    name: "HuggingChat",
    description: "Open source alternative to ChatGPT by Hugging Face.",
    category: "AI Chatbots & Assistants",
    url: 'https://huggingface.co/chat', domain: 'huggingface.co', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-79/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-22",
    tags: [
      "Open Source",
      "Chatbot",
      "Models"
    ]
  },
  {
    id: "80",
    name: "Le Chat",
    description: "Mistral AI's conversational interface.",
    category: "AI Chatbots & Assistants",
    url: 'https://chat.mistral.ai', domain: 'chat.mistral.ai', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-80/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-25",
    tags: [
      "Mistral",
      "Chatbot",
      "European"
    ]
  },
  {
    id: "82",
    name: "Taskade",
    description: "AI-powered productivity platform for teams.",
    category: "Productivity & Automation",
    url: 'https://www.taskade.com', domain: 'taskade.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-82/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-03-08",
    tags: [
      "Tasks",
      "Collaboration",
      "AI Agents"
    ]
  },
  {
    id: "83",
    name: "ClickUp AI",
    description: "AI features integrated into the all-in-one productivity platform.",
    category: "Productivity & Automation",
    url: 'https://clickup.com/ai', domain: 'clickup.com', brandColor: '#7b68ee',
    imageUrl: "https://picsum.photos/seed/ai-tool-83/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-03-12",
    tags: [
      "Project Management",
      "Writing",
      "Summarization"
    ]
  },
  {
    id: "84",
    name: "Monday.com AI",
    description: "AI assistant for work management and automation.",
    category: "Productivity & Automation",
    url: 'https://monday.com', domain: 'monday.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-84/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-03-15",
    tags: [
      "Work Management",
      "Automation",
      "Productivity"
    ]
  },
  {
    id: "85",
    name: "Asana Intelligence",
    description: "AI features to drive clarity and accountability.",
    category: "Productivity & Automation",
    url: 'https://asana.com', domain: 'asana.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-85/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-03-18",
    tags: [
      "Project Management",
      "Intelligence",
      "Work"
    ]
  },
  {
    id: "86",
    name: "Synthesys",
    description: "Create AI audio and video with real human voices.",
    category: "Video & Audio Tools",
    url: 'https://synthesys.io', domain: 'synthesys.io', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-86/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-03-22",
    tags: [
      "Avatars",
      "Voice",
      "Video"
    ]
  },
  {
    id: "87",
    name: "Fliki",
    description: "Turn text into videos with AI voices.",
    category: "Video & Audio Tools",
    url: 'https://fliki.ai', domain: 'fliki.ai', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-87/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-03-25",
    tags: [
      "Text to Video",
      "Social Media",
      "Content"
    ]
  },
  {
    id: "88",
    name: "Pictory",
    description: "Automatically create short, highly-sharable branded videos from long form content.",
    category: "Video & Audio Tools",
    url: 'https://pictory.ai', domain: 'pictory.ai', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-88/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-03-28",
    tags: [
      "Video Editing",
      "Repurposing",
      "Marketing"
    ]
  },
  {
    id: "89",
    name: "DeepBrain AI",
    description: "AI video generator with realistic AI avatars.",
    category: "Video & Audio Tools",
    url: 'https://www.deepbrain.io', domain: 'deepbrain.io', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-89/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-01",
    tags: [
      "Avatars",
      "Video Gen",
      "Business"
    ]
  },
  {
    id: "90",
    name: "Colossyan",
    description: "AI video creator for workplace learning.",
    category: "Video & Audio Tools",
    url: 'https://www.colossyan.com', domain: 'colossyan.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-90/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-05",
    tags: [
      "Training",
      "Education",
      "Video"
    ]
  },
  {
    id: "91",
    name: "AdCreative.ai",
    description: "Generate conversion-focused ad creatives and social media post creatives.",
    category: "Marketing & SEO",
    url: 'https://www.adcreative.ai', domain: 'adcreative.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-91/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-08",
    tags: [
      "Ads",
      "Marketing",
      "Design"
    ]
  },
  {
    id: "92",
    name: "Predis.ai",
    description: "AI social media post generator. Create posts, reels, and carousels.",
    category: "Marketing & SEO",
    url: 'https://predis.ai', domain: 'predis.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-92/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-10",
    tags: [
      "Social Media",
      "Content",
      "Marketing"
    ]
  },
  {
    id: "93",
    name: "Ocoya",
    description: "Content marketing platform to create, schedule and analyze content.",
    category: "Marketing & SEO",
    url: 'https://www.ocoya.com', domain: 'ocoya.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-93/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-12",
    tags: [
      "Social Media",
      "Scheduling",
      "Marketing"
    ]
  },
  {
    id: "94",
    name: "Surfer SEO",
    description: "SEO tool to rank your content with AI.",
    category: "Marketing & SEO",
    url: 'https://surferseo.com', domain: 'surferseo.com', brandColor: '#0ea5e9',
    imageUrl: "https://picsum.photos/seed/ai-tool-94/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-15",
    tags: [
      "SEO",
      "Content",
      "Ranking"
    ]
  },
  {
    id: "95",
    name: "Semrush",
    description: "Online visibility management platform with AI features.",
    category: "Marketing & SEO",
    url: 'https://www.semrush.com', domain: 'semrush.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-95/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-18",
    tags: [
      "SEO",
      "Marketing",
      "Analytics"
    ]
  },
  {
    id: "96",
    name: "Ahrefs",
    description: "SEO tools and resources to grow your search traffic.",
    category: "Marketing & SEO",
    url: 'https://ahrefs.com', domain: 'ahrefs.com', brandColor: '#f97316',
    imageUrl: "https://picsum.photos/seed/ai-tool-96/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-20",
    tags: [
      "SEO",
      "Backlinks",
      "Keywords"
    ]
  },
  {
    id: "97",
    name: "Frase",
    description: "AI for SEO content and research.",
    category: "Marketing & SEO",
    url: 'https://www.frase.io', domain: 'frase.io', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-97/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-22",
    tags: [
      "Content",
      "SEO",
      "Research"
    ]
  },
  {
    id: "98",
    name: "MarketMuse",
    description: "AI content planning and optimization software.",
    category: "Marketing & SEO",
    url: 'https://www.marketmuse.com', domain: 'marketmuse.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-98/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-25",
    tags: [
      "Content Strategy",
      "SEO",
      "Planning"
    ]
  },
  {
    id: "99",
    name: "Scalenut",
    description: "AI-powered SEO and content marketing platform.",
    category: "Marketing & SEO",
    url: 'https://www.scalenut.com', domain: 'scalenut.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-99/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-04-28",
    tags: [
      "Content",
      "SEO",
      "Marketing"
    ]
  },
  {
    id: "100",
    name: "Writer",
    description: "The full-stack generative AI platform for enterprises.",
    category: "AI Writing & Content",
    url: 'https://writer.com', domain: 'writer.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-100/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-04-30",
    tags: [
      "Enterprise",
      "Writing",
      "Brand Voice"
    ]
  },
  {
    id: "101",
    name: "Insilico Medicine",
    description: "Generative AI for drug discovery and development.",
    category: "Pharma",
    url: 'https://insilico.com', domain: 'insilico.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-101/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-01",
    tags: [
      "Drug Discovery",
      "Pharma",
      "Biotech"
    ]
  },
  {
    id: "102",
    name: "Recursion",
    description: "Decoding biology to radically improve lives.",
    category: "Pharma",
    url: 'https://www.recursion.com', domain: 'recursion.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-102/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-02",
    tags: [
      "Biology",
      "Pharma",
      "TechBio"
    ]
  },
  {
    id: "103",
    name: "BenchSci",
    description: "AI-powered biomedical artificial intelligence.",
    category: "Science",
    url: 'https://www.benchsci.com', domain: 'benchsci.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-103/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-03",
    tags: [
      "Research",
      "Science",
      "Biomedical"
    ]
  },
  {
    id: "104",
    name: "DeepMind AlphaFold",
    description: "AI system that predicts a protein's 3D structure from its amino acid sequence.",
    category: "Science",
    url: 'https://deepmind.google/technologies/alphafold', domain: 'deepmind.google', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-104/400/200",
    pricing: "Free",
    rating: 5,
    featured: true,
    dateAdded: "2024-05-04",
    tags: [
      "Biology",
      "Science",
      "Proteins"
    ]
  },
  {
    id: "105",
    name: "Exscientia",
    description: "AI-driven pharmatech company committed to discovering, designing and developing the best possible drugs.",
    category: "Pharma",
    url: 'https://www.exscientia.ai', domain: 'exscientia.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-105/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-05",
    tags: [
      "Drug Design",
      "Pharma",
      "AI"
    ]
  },
  {
    id: "106",
    name: "Atomwise",
    description: "Using AI for structure-based drug discovery.",
    category: "Pharma",
    url: 'https://www.atomwise.com', domain: 'atomwise.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-106/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-05-06",
    tags: [
      "Drug Discovery",
      "Pharma",
      "AI"
    ]
  },
  {
    id: "107",
    name: "LabGenius",
    description: "The next generation of protein therapeutics using machine learning.",
    category: "Science",
    url: 'https://www.labgenius.com', domain: 'labgenius.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-107/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-07",
    tags: [
      "Proteins",
      "Therapeutics",
      "Science"
    ]
  },
  {
    id: "108",
    name: "Iktos",
    description: "AI solutions for chemical research.",
    category: "Science",
    url: 'https://iktos.ai', domain: 'iktos.ai', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-108/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-05-08",
    tags: [
      "Chemistry",
      "Research",
      "Science"
    ]
  },
  {
    id: "109",
    name: "BioRender",
    description: "Create professional science figures in minutes.",
    category: "Science",
    url: 'https://biorender.com', domain: 'biorender.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-109/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-09",
    tags: [
      "Visualization",
      "Science",
      "Design"
    ]
  },
  {
    id: "110",
    name: "Tempus",
    description: "Data-driven precision medicine.",
    category: "Health",
    url: 'https://www.tempus.com', domain: 'tempus.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-110/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-10",
    tags: [
      "Medicine",
      "Health",
      "Data"
    ]
  },
  {
    id: "111",
    name: "Gong",
    description: "Revenue intelligence platform for sales teams.",
    category: "Business & Finance AI",
    url: 'https://www.gong.io', domain: 'gong.io', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-111/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-11",
    tags: [
      "Sales",
      "Intelligence",
      "Business"
    ]
  },
  {
    id: "112",
    name: "Lavender",
    description: "The AI email assistant that helps you get more replies in less time.",
    category: "Business & Finance AI",
    url: 'https://www.lavender.ai', domain: 'lavender.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-112/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: false,
    dateAdded: "2024-05-12",
    tags: [
      "Sales",
      "Email",
      "Writing"
    ]
  },
  {
    id: "113",
    name: "Teal",
    description: "AI resume builder and job tracker.",
    category: "Career",
    url: 'https://www.tealhq.com', domain: 'tealhq.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-113/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-13",
    tags: [
      "Resume",
      "Job Search",
      "Career"
    ]
  },
  {
    id: "114",
    name: "Rezi",
    description: "AI resume builder that writes your resume for you.",
    category: "Career",
    url: 'https://www.rezi.ai', domain: 'rezi.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-114/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-14",
    tags: [
      "Resume",
      "Writing",
      "Career"
    ]
  },
  {
    id: "115",
    name: "Yoodli",
    description: "AI speech coach for interview preparation.",
    category: "Career",
    url: 'https://yoodli.ai', domain: 'yoodli.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-115/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-15",
    tags: [
      "Interview",
      "Speech",
      "Coaching"
    ]
  },
  {
    id: "116",
    name: "D-ID",
    description: "Create realistic digital humans from text or audio.",
    category: "Video & Audio Tools",
    url: 'https://www.d-id.com', domain: 'd-id.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-116/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-05-16",
    tags: [
      "Avatars",
      "Video",
      "Animation"
    ]
  },
  {
    id: "117",
    name: "Soul Machines",
    description: "Astonishingly lifelike Digital People.",
    category: "Video & Audio Tools",
    url: 'https://www.soulmachines.com', domain: 'soulmachines.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-117/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-05-17",
    tags: [
      "Avatars",
      "Customer Experience",
      "AI"
    ]
  },
  {
    id: "118",
    name: "Tripnotes",
    description: "The intelligent travel planner.",
    category: "Travel",
    url: 'https://tripnotes.ai', domain: 'tripnotes.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-118/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-05-18",
    tags: [
      "Travel",
      "Planning",
      "Itinerary"
    ]
  },
  {
    id: "119",
    name: "Roam Around",
    description: "AI travel planner powered by GPT-4.",
    category: "Travel",
    url: 'https://www.roamaround.io', domain: 'roamaround.io', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-119/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-05-19",
    tags: [
      "Travel",
      "Planning",
      "GPT-4"
    ]
  },
  {
    id: "120",
    name: "Scenario",
    description: "AI-generated game assets. Create high-quality, style-consistent assets.",
    category: "Gaming",
    url: 'https://www.scenario.com', domain: 'scenario.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-120/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-20",
    tags: [
      "Game Assets",
      "Gaming",
      "Design"
    ]
  },
  {
    id: "121",
    name: "Inworld AI",
    description: "The leading engine for AI NPCs.",
    category: "Gaming",
    url: 'https://inworld.ai', domain: 'inworld.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-121/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-21",
    tags: [
      "NPCs",
      "Gaming",
      "Characters"
    ]
  },
  {
    id: "122",
    name: "Layer AI",
    description: "Game art generation for professional studios.",
    category: "Gaming",
    url: 'https://layer.ai', domain: 'layer.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-122/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-22",
    tags: [
      "Game Art",
      "Gaming",
      "Assets"
    ]
  },
  {
    id: "123",
    name: "Botika",
    description: "Generative AI for fashion models.",
    category: "Fashion",
    url: 'https://botika.io', domain: 'botika.io', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-123/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: true,
    dateAdded: "2024-05-23",
    tags: [
      "Fashion",
      "Models",
      "Photography"
    ]
  },
  {
    id: "124",
    name: "The New Black",
    description: "AI fashion design and visualization.",
    category: "Fashion",
    url: 'https://www.thenewblack.ai', domain: 'thenewblack.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-124/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-05-24",
    tags: [
      "Fashion",
      "Design",
      "Visualization"
    ]
  },
  {
    id: "125",
    name: "Virtual Staging AI",
    description: "AI virtual staging for real estate agents.",
    category: "Real Estate",
    url: 'https://www.virtualstagingai.app', domain: 'virtualstagingai.app', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-125/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-05-25",
    tags: [
      "Real Estate",
      "Staging",
      "Interior"
    ]
  },
  {
    id: "126",
    name: "Restb.ai",
    description: "Computer vision for real estate.",
    category: "Real Estate",
    url: 'https://restb.ai', domain: 'restb.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-126/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-05-26",
    tags: [
      "Real Estate",
      "Vision",
      "Analysis"
    ]
  },
  {
    id: "127",
    name: "Sudowrite",
    description: "The non-judgmental, always-there AI creative writing partner.",
    category: "AI Writing & Content",
    url: 'https://www.sudowrite.com', domain: 'sudowrite.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-127/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-27",
    tags: [
      "Creative Writing",
      "Fiction",
      "Storytelling"
    ]
  },
  {
    id: "128",
    name: "Wordtune",
    description: "Your personal writing assistant and editor.",
    category: "AI Writing & Content",
    url: 'https://www.wordtune.com', domain: 'wordtune.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-128/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-28",
    tags: [
      "Editing",
      "Rewriting",
      "Productivity"
    ]
  },
  {
    id: "129",
    name: "Play.ht",
    description: "Generate realistic Text to Speech audio using AI.",
    category: "Voice",
    url: 'https://play.ht', domain: 'play.ht', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-129/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-29",
    tags: [
      "TTS",
      "Voice Cloning",
      "Audio"
    ]
  },
  {
    id: "130",
    name: "Codeium",
    description: "Free AI Code Completion & Chat.",
    category: "Code & Development",
    url: 'https://codeium.com', domain: 'codeium.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-130/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-30",
    tags: [
      "Autocomplete",
      "IDE",
      "Free"
    ]
  },
  {
    id: "131",
    name: "Blackbox AI",
    description: "AI Coding Assistant to code faster.",
    category: "Code & Development",
    url: 'https://www.blackbox.ai', domain: 'blackbox.ai', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-131/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-05-31",
    tags: [
      "Chat",
      "Search",
      "Coding"
    ]
  },
  {
    id: "132",
    name: "ManyChat",
    description: "Automate interactive conversations in Instagram Direct Messages, Facebook Messenger, and SMS.",
    category: "AI Chatbots & Assistants",
    url: 'https://manychat.com', domain: 'manychat.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-132/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-01",
    tags: [
      "Marketing",
      "Automation",
      "Social"
    ]
  },
  {
    id: "133",
    name: "Tidio",
    description: "Customer service platform that merges live chat and chatbots.",
    category: "AI Chatbots & Assistants",
    url: 'https://www.tidio.com', domain: 'tidio.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-133/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-02",
    tags: [
      "Customer Support",
      "Ecommerce",
      "Chat"
    ]
  },
  {
    id: "134",
    name: "HubSpot AI",
    description: "AI-powered tools for marketing, sales, and customer service.",
    category: "Marketing & SEO",
    url: 'https://www.hubspot.com/ai', domain: 'hubspot.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-134/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-03",
    tags: [
      "CRM",
      "Marketing",
      "Sales"
    ]
  },
  {
    id: "135",
    name: "Brandwatch",
    description: "Consumer intelligence and social media management.",
    category: "Marketing & SEO",
    url: 'https://www.brandwatch.com', domain: 'brandwatch.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-135/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-04",
    tags: [
      "Social Listening",
      "Analytics",
      "Intelligence"
    ]
  },
  {
    id: "136",
    name: "Mangools",
    description: "Juicy SEO tools you will love.",
    category: "Marketing & SEO",
    url: 'https://mangools.com', domain: 'mangools.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-136/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-05",
    tags: [
      "Keywords",
      "SERP",
      "Backlinks"
    ]
  },
  {
    id: "137",
    name: "Ubersuggest",
    description: "Generate keyword ideas for your content marketing strategy.",
    category: "Marketing & SEO",
    url: 'https://neilpatel.com/ubersuggest', domain: 'neilpatel.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-137/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-06",
    tags: [
      "Keywords",
      "SEO",
      "Marketing"
    ]
  },
  {
    id: "138",
    name: "Motion",
    description: "AI that builds your schedule.",
    category: "Productivity & Automation",
    url: 'https://www.usemotion.com', domain: 'usemotion.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-138/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-06-07",
    tags: [
      "Calendar",
      "Scheduling",
      "Tasks"
    ]
  },
  {
    id: "139",
    name: "Mem",
    description: "The self-organizing workspace.",
    category: "Productivity & Automation",
    url: 'https://mem.ai', domain: 'mem.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-139/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-08",
    tags: [
      "Notes",
      "Knowledge Base",
      "Organization"
    ]
  },
  {
    id: "140",
    name: "Mixpanel",
    description: "Product analytics for mobile, web, and more.",
    category: "Data",
    url: 'https://mixpanel.com', domain: 'mixpanel.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-140/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-09",
    tags: [
      "Analytics",
      "Product",
      "Insights"
    ]
  },
  {
    id: "141",
    name: "Tableau",
    description: "Visual analytics platform transforming the way we use data to solve problems.",
    category: "Data",
    url: 'https://www.tableau.com', domain: 'tableau.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-141/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-10",
    tags: [
      "Visualization",
      "BI",
      "Analytics"
    ]
  },
  {
    id: "142",
    name: "Socratic",
    description: "Get unstuck based on Google AI.",
    category: "Learning & Education",
    url: 'https://socratic.org', domain: 'socratic.org', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-142/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-11",
    tags: [
      "Homework",
      "Learning",
      "Google"
    ]
  },
  {
    id: "144",
    name: "Masterpiece Studio",
    description: "The first complete VR 3D creative suite.",
    category: "3D",
    url: 'https://masterpiecestudio.com', domain: 'masterpiecestudio.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-144/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-13",
    tags: [
      "VR",
      "Modeling",
      "Animation"
    ]
  },
  {
    id: "145",
    name: "Kaedim",
    description: "Turn 2D images into 3D models with AI.",
    category: "3D",
    url: 'https://www.kaedim3d.com', domain: 'kaedim3d.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-145/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-06-14",
    tags: [
      "2D to 3D",
      "Modeling",
      "Assets"
    ]
  },
  {
    id: "146",
    name: "Booke.ai",
    description: "Automate your bookkeeping with AI.",
    category: "Business & Finance AI",
    url: 'https://booke.ai', domain: 'booke.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-146/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-15",
    tags: [
      "Bookkeeping",
      "Accounting",
      "Automation"
    ]
  },
  {
    id: "147",
    name: "Truewind",
    description: "AI-powered finance and accounting for startups.",
    category: "Business & Finance AI",
    url: 'https://www.truewind.ai', domain: 'truewind.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-147/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-16",
    tags: [
      "Accounting",
      "Startups",
      "Finance"
    ]
  },
  {
    id: "148",
    name: "LegalRobot",
    description: "Automated legal analysis.",
    category: "Legal",
    url: 'https://legalrobot.com', domain: 'legalrobot.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-148/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-06-17",
    tags: [
      "Analysis",
      "Contracts",
      "Legal"
    ]
  },
  {
    id: "149",
    name: "DoNotPay",
    description: "The world's first robot lawyer.",
    category: "Legal",
    url: 'https://donotpay.com', domain: 'donotpay.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-149/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: true,
    dateAdded: "2024-06-18",
    tags: [
      "Consumer Rights",
      "Legal",
      "Assistant"
    ]
  },
  {
    id: "150",
    name: "Cleanvoice",
    description: "Remove filler words, mouth sounds, and stuttering from your audio.",
    category: "Video & Audio Tools",
    url: 'https://cleanvoice.ai', domain: 'cleanvoice.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-150/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-19",
    tags: [
      "Editing",
      "Podcasting",
      "Cleanup"
    ]
  },
  {
    id: "151",
    name: "Podcastle",
    description: "Studio-quality recording, AI editing, and seamless exporting.",
    category: "Video & Audio Tools",
    url: 'https://podcastle.ai', domain: 'podcastle.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-151/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-20",
    tags: [
      "Podcasting",
      "Recording",
      "Editing"
    ]
  },
  {
    id: "152",
    name: "Semantic Scholar",
    description: "AI-powered research tool for scientific literature.",
    category: "Research & Analysis",
    url: 'https://www.semanticscholar.org', domain: 'semanticscholar.org', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-152/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-06-21",
    tags: [
      "Literature",
      "Search",
      "Academic"
    ]
  },
  {
    id: "153",
    name: "Connected Papers",
    description: "Explore connected papers in a visual graph.",
    category: "Research & Analysis",
    url: 'https://www.connectedpapers.com', domain: 'connectedpapers.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-153/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-06-22",
    tags: [
      "Visualization",
      "Discovery",
      "Research"
    ]
  },
  {
    id: "154",
    name: "Beatoven.ai",
    description: "Create royalty-free background music for your videos.",
    category: "Music",
    url: 'https://www.beatoven.ai', domain: 'beatoven.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-154/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-23",
    tags: [
      "Background Music",
      "Video",
      "Creation"
    ]
  },
  {
    id: "155",
    name: "Mubert",
    description: "Generative music for content creators, brands, and developers.",
    category: "Music",
    url: 'https://mubert.com', domain: 'mubert.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-155/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-24",
    tags: [
      "Streaming",
      "API",
      "Music"
    ]
  },
  {
    id: "156",
    name: "Elai.io",
    description: "Create AI videos from just text.",
    category: "Video & Audio Tools",
    url: 'https://elai.io', domain: 'elai.io', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-156/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-25",
    tags: [
      "Video",
      "Presentations",
      "Avatars"
    ]
  },
  {
    id: "157",
    name: "Hour One",
    description: "The AI video generator for professional use.",
    category: "Video & Audio Tools",
    url: 'https://hourone.ai', domain: 'hourone.ai', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-157/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-26",
    tags: [
      "Virtual Humans",
      "Video",
      "Enterprise"
    ]
  },
  {
    id: "158",
    name: "Looka",
    description: "Design your own beautiful brand.",
    category: "UI/UX & Design Tools",
    url: 'https://looka.com', domain: 'looka.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-158/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-27",
    tags: [
      "Logo",
      "Branding",
      "Design"
    ]
  },
  {
    id: "159",
    name: "Khroma",
    description: "The AI color tool for designers.",
    category: "UI/UX & Design Tools",
    url: 'https://www.khroma.co', domain: 'khroma.co', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-159/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-28",
    tags: [
      "Color",
      "Palettes",
      "Inspiration"
    ]
  },
  {
    id: "160",
    name: "Woebot",
    description: "Your personal mental health ally.",
    category: "Health",
    url: 'https://woebothealth.com', domain: 'woebothealth.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-160/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-29",
    tags: [
      "Mental Health",
      "Chatbot",
      "Therapy"
    ]
  },
  {
    id: "161",
    name: "Ada",
    description: "Check your symptoms and find out what could be causing them.",
    category: "Health",
    url: 'https://ada.com', domain: 'ada.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-161/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-30",
    tags: [
      "Symptom Checker",
      "Medical",
      "Health"
    ]
  },
  {
    id: "162",
    name: "Hopper",
    description: "The travel app that helps you save money.",
    category: "Travel",
    url: 'https://hopper.com', domain: 'hopper.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-162/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-07-01",
    tags: [
      "Flights",
      "Hotels",
      "Savings"
    ]
  },
  {
    id: "163",
    name: "GuideGeek",
    description: "Your personal AI travel assistant.",
    category: "Travel",
    url: 'https://guidegeek.com', domain: 'guidegeek.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-163/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-07-02",
    tags: [
      "Assistant",
      "Planning",
      "WhatsApp"
    ]
  },
  {
    id: "164",
    name: "Rosebud AI",
    description: "The AI game creation platform.",
    category: "Gaming",
    url: 'https://www.rosebud.ai', domain: 'rosebud.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-164/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-07-03",
    tags: [
      "Game Dev",
      "Assets",
      "Creation"
    ]
  },
  {
    id: "165",
    name: "Promethean AI",
    description: "World's first AI for virtual world creation.",
    category: "Gaming",
    url: 'https://www.prometheanai.com', domain: 'prometheanai.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-165/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-07-04",
    tags: [
      "Environment",
      "3D",
      "Gaming"
    ]
  },
  {
    id: "166",
    name: "Vue.ai",
    description: "AI-powered retail automation.",
    category: "Fashion",
    url: 'https://vue.ai', domain: 'vue.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-166/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-07-05",
    tags: [
      "Retail",
      "Automation",
      "Fashion"
    ]
  },
  {
    id: "167",
    name: "Heuritech",
    description: "Predicting fashion trends with AI.",
    category: "Fashion",
    url: 'https://www.heuritech.com', domain: 'heuritech.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-167/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: true,
    dateAdded: "2024-07-06",
    tags: [
      "Trends",
      "Analytics",
      "Fashion"
    ]
  },
  {
    id: "168",
    name: "GeoPhy",
    description: "AI-powered real estate valuation.",
    category: "Real Estate",
    url: 'https://geophy.com', domain: 'geophy.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-168/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-07-07",
    tags: [
      "Valuation",
      "Data",
      "Real Estate"
    ]
  },
  {
    id: "169",
    name: "Skyline AI",
    description: "Commercial real estate investment technology.",
    category: "Real Estate",
    url: 'https://www.skyline.ai', domain: 'skyline.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-169/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-07-08",
    tags: [
      "Investment",
      "Commercial",
      "Real Estate"
    ]
  },
  {
    id: "170",
    name: "BenevolentAI",
    description: "Leading clinical-stage AI-enabled drug discovery company.",
    category: "Pharma",
    url: 'https://www.benevolent.com', domain: 'benevolent.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-170/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-07-09",
    tags: [
      "Drug Discovery",
      "Clinical",
      "Pharma"
    ]
  },
  {
    id: "171",
    name: "Verge Genomics",
    description: "Finding new drugs for complex diseases.",
    category: "Pharma",
    url: 'https://www.vergegenomics.com', domain: 'vergegenomics.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-171/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-07-10",
    tags: [
      "Genomics",
      "Drug Discovery",
      "Pharma"
    ]
  },
  {
    id: "172",
    name: "IBM RXN",
    description: "Predict chemical reactions with AI.",
    category: "Science",
    url: 'https://rxn.res.ibm.com', domain: 'rxn.res.ibm.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-172/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-07-11",
    tags: [
      "Chemistry",
      "Reactions",
      "Science"
    ]
  },
  {
    id: "173",
    name: "Iris.ai",
    description: "Your AI science assistant.",
    category: "Science",
    url: 'https://iris.ai', domain: 'iris.ai', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-173/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-07-12",
    tags: [
      "Research",
      "Analysis",
      "Science"
    ]
  },
  {
    id: "174",
    name: "Effy AI",
    description: "AI-powered performance reviews and feedback.",
    category: "Business & Finance AI",
    url: 'https://www.effy.ai', domain: 'effy.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-174/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-08-01",
    tags: [
      "Performance Review",
      "HR",
      "Feedback"
    ]
  },
  {
    id: "175",
    name: "Textio",
    description: "Augmented writing for job descriptions and guidance.",
    category: "Business & Finance AI",
    url: 'https://textio.com', domain: 'textio.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-175/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-08-02",
    tags: [
      "Recruiting",
      "Writing",
      "HR"
    ]
  },
  {
    id: "176",
    name: "Apollo.io",
    description: "Sales intelligence and engagement platform.",
    category: "Business & Finance AI",
    url: 'https://www.apollo.io', domain: 'apollo.io', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-176/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-03",
    tags: [
      "Sales Intelligence",
      "Lead Gen",
      "Sales"
    ]
  },
  {
    id: "178",
    name: "Feedly AI",
    description: "AI research assistant to track insights and trends.",
    category: "News",
    url: 'https://feedly.com', domain: 'feedly.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-178/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-08-05",
    tags: [
      "Aggregator",
      "Trends",
      "News"
    ]
  },
  {
    id: "179",
    name: "PresenAI",
    description: "Summarizes news articles into concise updates.",
    category: "News",
    url: 'https://presenai.com', domain: 'presenai.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-179/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-08-06",
    tags: [
      "Summarization",
      "News",
      "Updates"
    ]
  },
  {
    id: "180",
    name: "FeedHive",
    description: "AI-powered social media scheduling and management.",
    category: "Social Media",
    url: 'https://feedhive.com', domain: 'feedhive.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-180/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-08-07",
    tags: [
      "Scheduling",
      "Social Media",
      "Content"
    ]
  },
  {
    id: "182",
    name: "TokenMetrics",
    description: "AI-driven cryptocurrency investment research.",
    category: "Crypto",
    url: 'https://www.tokenmetrics.com', domain: 'tokenmetrics.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-182/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-08-09",
    tags: [
      "Analytics",
      "Crypto",
      "Investing"
    ]
  },
  {
    id: "183",
    name: "CoinScreener",
    description: "Real-time crypto market signals and analysis.",
    category: "Crypto",
    url: 'https://coinscreener.ai', domain: 'coinscreener.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-183/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-08-10",
    tags: [
      "Signals",
      "Crypto",
      "Trading"
    ]
  },
  {
    id: "184",
    name: "Bubble",
    description: "Visual programming to build web and mobile apps without code.",
    category: "No-Code",
    url: 'https://bubble.io', domain: 'bubble.io', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-184/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-11",
    tags: [
      "App Builder",
      "No-Code",
      "Development"
    ]
  },
  {
    id: "185",
    name: "Softr",
    description: "Build client portals and internal tools from Airtable/Google Sheets.",
    category: "No-Code",
    url: 'https://www.softr.io', domain: 'softr.io', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-185/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-08-12",
    tags: [
      "Website Builder",
      "No-Code",
      "Internal Tools"
    ]
  },
  {
    id: "186",
    name: "Rytr",
    description: "AI writing assistant that helps you create high-quality content.",
    category: "AI Writing & Content",
    url: 'https://rytr.me', domain: 'rytr.me', brandColor: '#7c3aed',
    imageUrl: "https://picsum.photos/seed/ai-tool-186/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-08-13",
    tags: [
      "Copywriting",
      "Blog",
      "Email"
    ]
  },
  {
    id: "187",
    name: "Writesonic",
    description: "AI writer for SEO blogs, ads, and marketing copy.",
    category: "AI Writing & Content",
    url: 'https://writesonic.com', domain: 'writesonic.com', brandColor: '#7c5cfc',
    imageUrl: "https://picsum.photos/seed/ai-tool-187/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-08-14",
    tags: [
      "SEO",
      "Marketing",
      "Content"
    ]
  },
  {
    id: "188",
    name: "Photoroom",
    description: "Create professional product photos with AI background removal.",
    category: "Image & Art Generation",
    url: 'https://www.photoroom.com', domain: 'photoroom.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-188/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-08-15",
    tags: [
      "E-commerce",
      "Editing",
      "Background Removal"
    ]
  },
  {
    id: "189",
    name: "Clipchamp",
    description: "All-in-one video editor with AI features.",
    category: "Video & Audio Tools",
    url: 'https://clipchamp.com', domain: 'clipchamp.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-189/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-08-16",
    tags: [
      "Editing",
      "Video",
      "Microsoft"
    ]
  },
  {
    id: "191",
    name: "DeepCode",
    description: "AI code review tool to find bugs and security vulnerabilities.",
    category: "Code & Development",
    url: 'https://www.deepcode.ai', domain: 'deepcode.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-191/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-08-18",
    tags: [
      "Security",
      "Review",
      "Debugging"
    ]
  },
  {
    id: "194",
    name: "ClickUp",
    description: "One app to replace them all. Tasks, docs, chat, and AI.",
    category: "Productivity & Automation",
    url: 'https://clickup.com', domain: 'clickup.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-194/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-08-21",
    tags: [
      "Project Management",
      "Tasks",
      "Collaboration"
    ]
  },
  {
    id: "195",
    name: "Monday.com",
    description: "Work OS that powers teams to run projects and workflows.",
    category: "Productivity & Automation",
    url: 'https://monday.com', domain: 'monday.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-195/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-08-22",
    tags: [
      "Project Management",
      "Workflows",
      "Business"
    ]
  },
  {
    id: "196",
    name: "Duolingo",
    description: "The world's best way to learn a language.",
    category: "Learning & Education",
    url: 'https://www.duolingo.com', domain: 'duolingo.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-196/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-23",
    tags: [
      "Language",
      "Learning",
      "Gamification"
    ]
  },
  {
    id: "198",
    name: "QuickBooks",
    description: "Accounting software with AI features for small businesses.",
    category: "Business & Finance AI",
    url: 'https://quickbooks.intuit.com', domain: 'quickbooks.intuit.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-198/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-08-25",
    tags: [
      "Accounting",
      "Business",
      "Invoicing"
    ]
  },
  {
    id: "199",
    name: "Xero",
    description: "Online accounting software for small businesses.",
    category: "Business & Finance AI",
    url: 'https://www.xero.com', domain: 'xero.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-199/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-08-26",
    tags: [
      "Accounting",
      "Business",
      "Finance"
    ]
  },
  {
    id: "203",
    name: "Headspace",
    description: "Meditation and sleep app with AI personalization.",
    category: "Health",
    url: 'https://www.headspace.com', domain: 'headspace.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-203/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-30",
    tags: [
      "Meditation",
      "Wellness",
      "Mindfulness"
    ]
  },
  {
    id: "204",
    name: "Calm",
    description: "App for sleep, meditation and relaxation.",
    category: "Health",
    url: 'https://www.calm.com', domain: 'calm.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-204/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-31",
    tags: [
      "Sleep",
      "Relaxation",
      "Wellness"
    ]
  },
  {
    id: "205",
    name: "TripIt",
    description: "Organize your travel plans in one place.",
    category: "Travel",
    url: 'https://www.tripit.com', domain: 'tripit.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-205/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-01",
    tags: [
      "Itinerary",
      "Organization",
      "Travel"
    ]
  },
  {
    id: "206",
    name: "Unity Muse",
    description: "AI capabilities for game development in Unity.",
    category: "Gaming",
    url: 'https://unity.com/products/muse', domain: 'unity.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-206/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-02",
    tags: [
      "Game Dev",
      "Assets",
      "Coding"
    ]
  },
  {
    id: "207",
    name: "Stitch Fix",
    description: "Personal styling service using AI.",
    category: "Fashion",
    url: 'https://www.stitchfix.com', domain: 'stitchfix.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-207/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-09-03",
    tags: [
      "Styling",
      "Personal Shopper",
      "Clothing"
    ]
  },
  {
    id: "208",
    name: "Zillow",
    description: "Real estate marketplace with AI home value estimation (Zestimate).",
    category: "Real Estate",
    url: 'https://www.zillow.com', domain: 'zillow.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-208/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-04",
    tags: [
      "Marketplace",
      "Valuation",
      "Home Buying"
    ]
  },
  {
    id: "209",
    name: "Redfin",
    description: "Full-service real estate brokerage with AI tools.",
    category: "Real Estate",
    url: 'https://www.redfin.com', domain: 'redfin.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-209/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-05",
    tags: [
      "Brokerage",
      "Buying",
      "Selling"
    ]
  },
  {
    id: "212",
    name: "Wolfram Alpha",
    description: "Computational intelligence engine.",
    category: "Science",
    url: 'https://www.wolframalpha.com', domain: 'wolframalpha.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-212/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-09-08",
    tags: [
      "Math",
      "Computation",
      "Knowledge"
    ]
  },
  {
    id: "213",
    name: "BambooHR",
    description: "HR software with AI features for hiring and onboarding.",
    category: "Business & Finance AI",
    url: 'https://www.bamboohr.com', domain: 'bamboohr.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-213/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-09",
    tags: [
      "HRIS",
      "Management",
      "People"
    ]
  },
  {
    id: "214",
    name: "Salesforce Einstein",
    description: "AI integrated into the Salesforce CRM platform.",
    category: "Business & Finance AI",
    url: 'https://www.salesforce.com/products/einstein/overview', domain: 'salesforce.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-214/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-10",
    tags: [
      "CRM",
      "Enterprise",
      "Analytics"
    ]
  },
  {
    id: "215",
    name: "Google News",
    description: "Comprehensive up-to-date news coverage, aggregated from sources all over the world.",
    category: "News",
    url: 'https://news.google.com', domain: 'news.google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-215/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-09-11",
    tags: [
      "Aggregator",
      "Global",
      "Search"
    ]
  },
  {
    id: "216",
    name: "Buffer",
    description: "Social media management platform with AI assistant.",
    category: "Social Media",
    url: 'https://buffer.com', domain: 'buffer.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-216/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-12",
    tags: [
      "Scheduling",
      "Analytics",
      "Engagement"
    ]
  },
  {
    id: "217",
    name: "CoinGecko",
    description: "Cryptocurrency data aggregator with market insights.",
    category: "Crypto",
    url: 'https://www.coingecko.com', domain: 'coingecko.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-217/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-13",
    tags: [
      "Data",
      "Market",
      "Tracking"
    ]
  },
  {
    id: "218",
    name: "Webflow",
    description: "Build professional websites visually without code.",
    category: "No-Code",
    url: 'https://webflow.com', domain: 'webflow.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-218/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-09-14",
    tags: [
      "Website Builder",
      "Design",
      "CMS"
    ]
  },
  {
    id: "219",
    name: "Shopify Magic",
    description: "AI-powered tools for e-commerce businesses on Shopify.",
    category: "E-commerce",
    url: 'https://www.shopify.com/magic', domain: 'shopify.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-219/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-15",
    tags: [
      "Product Descriptions",
      "E-commerce",
      "Marketing"
    ]
  },
  {
    id: "220",
    name: "Octane AI",
    description: "Zero-party data platform for Shopify brands.",
    category: "E-commerce",
    url: 'https://www.octaneai.com', domain: 'octaneai.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-220/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-09-16",
    tags: [
      "Quiz",
      "Personalization",
      "E-commerce"
    ]
  },
  {
    id: "221",
    name: "Algolia",
    description: "AI-powered search and discovery platform.",
    category: "E-commerce",
    url: 'https://www.algolia.com', domain: 'algolia.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-221/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-09-17",
    tags: [
      "Search",
      "Discovery",
      "E-commerce"
    ]
  },
  {
    id: "222",
    name: "Syte",
    description: "Visual AI for e-commerce product discovery.",
    category: "E-commerce",
    url: 'https://www.syte.ai', domain: 'syte.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-222/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: true,
    dateAdded: "2024-09-18",
    tags: [
      "Visual Search",
      "Discovery",
      "E-commerce"
    ]
  },
  {
    id: "226",
    name: "DALL-E 3",
    description: "OpenAI's advanced image generation model.",
    category: "Image & Art Generation",
    url: 'https://openai.com/dall-e-3', domain: 'openai.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-226/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-22",
    tags: [
      "Art",
      "Generation",
      "OpenAI"
    ]
  },
  {
    id: "231",
    name: "HubSpot",
    description: "CRM platform with AI-powered marketing and sales tools.",
    category: "Marketing & SEO",
    url: 'https://www.hubspot.com', domain: 'hubspot.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-231/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-27",
    tags: [
      "CRM",
      "Marketing",
      "Sales"
    ]
  },
  {
    id: "235",
    name: "Coursera",
    description: "Online learning platform with AI-driven course recommendations.",
    category: "Learning & Education",
    url: 'https://www.coursera.org', domain: 'coursera.org', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-235/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-10-01",
    tags: [
      "Courses",
      "Learning",
      "Skills"
    ]
  },
  {
    id: "236",
    name: "Udemy",
    description: "Online course marketplace with AI features.",
    category: "Learning & Education",
    url: 'https://www.udemy.com', domain: 'udemy.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-236/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-02",
    tags: [
      "Courses",
      "Learning",
      "Skills"
    ]
  },
  {
    id: "237",
    name: "Mint",
    description: "Personal finance app with AI insights (now Credit Karma).",
    category: "Business & Finance AI",
    url: 'https://www.creditkarma.com', domain: 'creditkarma.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-237/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-10-03",
    tags: [
      "Budgeting",
      "Finance",
      "Tracking"
    ]
  },
  {
    id: "238",
    name: "LegalZoom",
    description: "Online legal technology company.",
    category: "Legal",
    url: 'https://www.legalzoom.com', domain: 'legalzoom.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-238/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-10-04",
    tags: [
      "Legal Services",
      "Business",
      "Documents"
    ]
  },
  {
    id: "239",
    name: "Audacity",
    description: "Free, open source, cross-platform audio software with AI plugins.",
    category: "Video & Audio Tools",
    url: 'https://www.audacityteam.org', domain: 'audacityteam.org', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-239/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-05",
    tags: [
      "Editing",
      "Recording",
      "Open Source"
    ]
  },
  {
    id: "241",
    name: "MyFitnessPal",
    description: "Track calories, breakdown ingredients, and log activities with AI.",
    category: "Health",
    url: 'https://www.myfitnesspal.com', domain: 'myfitnesspal.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-241/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-10-07",
    tags: [
      "Fitness",
      "Nutrition",
      "Tracking"
    ]
  },
  {
    id: "242",
    name: "Expedia",
    description: "Travel booking site with AI trip planning.",
    category: "Travel",
    url: 'https://www.expedia.com', domain: 'expedia.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-242/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-10-08",
    tags: [
      "Booking",
      "Travel",
      "Planning"
    ]
  },
  {
    id: "243",
    name: "Roblox Studio",
    description: "Create games on Roblox with AI coding assistant.",
    category: "Gaming",
    url: 'https://create.roblox.com', domain: 'create.roblox.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-243/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-10-09",
    tags: [
      "Game Dev",
      "Coding",
      "Platform"
    ]
  },
  {
    id: "244",
    name: "ASOS",
    description: "Fashion retailer with AI visual search and recommendations.",
    category: "Fashion",
    url: 'https://www.asos.com', domain: 'asos.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-244/400/200",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-10-10",
    tags: [
      "Shopping",
      "Clothing",
      "Retail"
    ]
  },
  {
    id: "245",
    name: "Opendoor",
    description: "Buy and sell homes online with AI pricing.",
    category: "Real Estate",
    url: 'https://www.opendoor.com', domain: 'opendoor.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-245/400/200",
    pricing: "Free",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-10-11",
    tags: [
      "Buying",
      "Selling",
      "Real Estate"
    ]
  },
  {
    id: "247",
    name: "NASA AI",
    description: "NASA uses AI for space exploration and data analysis.",
    category: "Science",
    url: 'https://www.nasa.gov/artificial-intelligence', domain: 'nasa.gov', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-247/400/200",
    pricing: "Free",
    rating: 5,
    featured: true,
    dateAdded: "2024-10-13",
    tags: [
      "Space",
      "Research",
      "Exploration"
    ]
  },
  {
    id: "248",
    name: "Workday",
    description: "Enterprise management cloud for finance and HR.",
    category: "Business & Finance AI",
    url: 'https://www.workday.com', domain: 'workday.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-248/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: true,
    dateAdded: "2024-10-14",
    tags: [
      "HRIS",
      "Finance",
      "Enterprise"
    ]
  },
  {
    id: "250",
    name: "Feedly",
    description: "News aggregator with AI research assistant Leo.",
    category: "News",
    url: 'https://feedly.com', domain: 'feedly.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-250/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-10-16",
    tags: [
      "Aggregator",
      "Research",
      "News"
    ]
  },
  {
    id: "251",
    name: "Hootsuite",
    description: "Social media marketing and management dashboard.",
    category: "Social Media",
    url: 'https://www.hootsuite.com', domain: 'hootsuite.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-251/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-10-17",
    tags: [
      "Management",
      "Marketing",
      "Social Media"
    ]
  },
  {
    id: "252",
    name: "Binance",
    description: "Cryptocurrency exchange with AI trading bots.",
    category: "Crypto",
    url: 'https://www.binance.com', domain: 'binance.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-252/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-10-18",
    tags: [
      "Exchange",
      "Trading",
      "Crypto"
    ]
  },
  {
    id: "254",
    name: "Klaviyo",
    description: "Marketing automation platform for e-commerce.",
    category: "E-commerce",
    url: 'https://www.klaviyo.com', domain: 'klaviyo.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-254/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-10-20",
    tags: [
      "Marketing",
      "Email",
      "SMS"
    ]
  },
  {
    id: "261",
    name: "Slack",
    description: "Team communication platform with AI features.",
    category: "Productivity & Automation",
    url: 'https://slack.com', domain: 'slack.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-261/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-10-27",
    tags: [
      "Communication",
      "Team",
      "Chat"
    ]
  },
  {
    id: "262",
    name: "Trello",
    description: "Visual tool for organizing your work and life.",
    category: "Productivity & Automation",
    url: 'https://trello.com', domain: 'trello.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-262/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-28",
    tags: [
      "Project Management",
      "Kanban",
      "Organization"
    ]
  },
  {
    id: "263",
    name: "Zoom",
    description: "Video conferencing platform with AI companion.",
    category: "Productivity & Automation",
    url: 'https://zoom.us', domain: 'zoom.us', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-263/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2024-10-29",
    tags: [
      "Video Calls",
      "Meetings",
      "Communication"
    ]
  },
  {
    id: "274",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's latest model, setting new industry benchmarks for intelligence.",
    category: "AI Chatbots & Assistants",
    url: 'https://claude.ai', domain: 'anthropic.com', brandColor: '#c96442', 
    imageUrl: "https://picsum.photos/seed/ai-tool-274/400/200",
    pricing: "Freemium",
    rating: 5,
    featured: true,
    dateAdded: "2024-06-20",
    tags: [
      "LLM",
      "Coding",
      "Anthropic"
    ]
  },
  {
    id: "275",
    name: "Llama 3.1",
    description: "Meta's most capable open-source model to date.",
    category: "AI Chatbots & Assistants",
    url: 'https://llama.meta.com', domain: 'llama.meta.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-275/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-07-23",
    tags: [
      "Open Source",
      "LLM",
      "Meta"
    ]
  },
  {
    id: "277",
    name: "Kling AI",
    description: "High-quality video generation model capable of creating realistic videos up to 2 minutes.",
    category: "Video & Audio Tools",
    url: 'https://klingai.com', domain: 'klingai.com', brandColor: '#7c3aed',
    imageUrl: "https://picsum.photos/seed/ai-tool-277/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-07-15",
    tags: [
      "Video Gen",
      "Realism",
      "Text to Video"
    ]
  },
  {
    id: "278",
    name: "NotebookLM",
    description: "Google's AI-powered research and writing assistant that uses your own documents.",
    category: "Research & Analysis",
    url: 'https://notebooklm.google.com', domain: 'notebooklm.google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-278/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-06-15",
    tags: [
      "Research",
      "Notes",
      "Google"
    ]
  },
  {
    id: "279",
    name: "DeepSeek",
    description: "Powerful open-source models for coding and mathematics.",
    category: "Code & Development",
    url: 'https://www.deepseek.com', domain: 'deepseek.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-279/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-10",
    tags: [
      "Coding",
      "LLM",
      "Open Source"
    ]
  },
  {
    id: "280",
    name: "Groq",
    description: "Ultra-fast AI inference platform using LPU technology.",
    category: "Code & Development",
    url: 'https://groq.com', domain: 'groq.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-280/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-03-01",
    tags: [
      "Inference",
      "Speed",
      "API"
    ]
  },
  {
    id: "281",
    name: "OpenAI o1",
    description: "A new series of reasoning models for complex problem solving.",
    category: "AI Chatbots & Assistants",
    url: 'https://openai.com/o1', domain: 'openai.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-281/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-09-12",
    tags: [
      "Reasoning",
      "STEM",
      "OpenAI"
    ]
  },
  {
    id: "282",
    name: "Mistral Large 2",
    description: "Mistral's flagship model with top-tier reasoning and multilingual capabilities.",
    category: "AI Chatbots & Assistants",
    url: 'https://mistral.ai', domain: 'mistral.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-282/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-07-24",
    tags: [
      "LLM",
      "Multilingual",
      "Mistral"
    ]
  },
  {
    id: "283",
    name: "SearchGPT",
    description: "OpenAI's prototype search engine with real-time information access.",
    category: "Research & Analysis",
    url: 'https://openai.com/searchgpt', domain: 'openai.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-283/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-07-25",
    tags: [
      "Search",
      "Real-time",
      "OpenAI"
    ]
  },
  {
    id: "284",
    name: "Gemini 1.5 Pro",
    description: "Google's most advanced model with a massive 2-million token context window.",
    category: "AI Chatbots & Assistants",
    url: 'https://gemini.google.com', domain: 'gemini.google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-284/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-14",
    tags: [
      "LLM",
      "Context Window",
      "Google"
    ]
  },
  {
    id: "285",
    name: "Luma Dream Machine",
    description: "High-speed video generation model that creates realistic, high-quality videos.",
    category: "Video & Audio Tools",
    url: 'https://lumalabs.ai/dream-machine', domain: 'lumalabs.ai', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-285/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-12",
    tags: [
      "Video Gen",
      "Realism",
      "Luma"
    ]
  },
  {
    id: "286",
    name: "Runway Gen-3 Alpha",
    description: "The next generation of video generation, offering unprecedented control and fidelity.",
    category: "Video & Audio Tools",
    url: 'https://runwayml.com', domain: 'runwayml.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-286/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-06-17",
    tags: [
      "Video Gen",
      "VFX",
      "Runway"
    ]
  },
  {
    id: "287",
    name: "Fal.ai",
    description: "The fastest AI inference platform for developers, specializing in media generation.",
    category: "Code & Development",
    url: 'https://fal.ai', domain: 'fal.ai', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-287/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: false,
    dateAdded: "2024-01-15",
    tags: [
      "Inference",
      "Media Gen",
      "API"
    ]
  },
  {
    id: "288",
    name: "Replicate",
    description: "Run AI models in the cloud with a simple API.",
    category: "Code & Development",
    url: 'https://replicate.com', domain: 'replicate.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-288/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2023-05-20",
    tags: [
      "Cloud",
      "Models",
      "API"
    ]
  },
  {
    id: "289",
    name: "Together AI",
    description: "The fastest cloud platform for building and running generative AI.",
    category: "Code & Development",
    url: 'https://www.together.ai', domain: 'together.ai', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-289/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2023-11-10",
    tags: [
      "Inference",
      "Training",
      "Open Source"
    ]
  },
  {
    id: "290",
    name: "LangChain",
    description: "A framework for developing applications powered by large language models.",
    category: "Code & Development",
    url: 'https://www.langchain.com', domain: 'langchain.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-290/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-01-15",
    tags: [
      "Framework",
      "LLM",
      "Agents"
    ]
  },
  {
    id: "291",
    name: "Pinecone",
    description: "The vector database for building knowledgeable AI applications.",
    category: "Code & Development",
    url: 'https://www.pinecone.io', domain: 'pinecone.io', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-291/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2023-02-10",
    tags: [
      "Vector DB",
      "RAG",
      "Search"
    ]
  },
  {
    id: "292",
    name: "Supabase AI",
    description: "Open source Firebase alternative with built-in vector support and AI tools.",
    category: "Code & Development",
    url: 'https://supabase.com/ai', domain: 'supabase.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-292/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2023-08-15",
    tags: [
      "Backend",
      "Vector DB",
      "Open Source"
    ]
  },
  {
    id: "293",
    name: "Vercel AI SDK",
    description: "The standard toolkit for building AI-powered web applications.",
    category: "Code & Development",
    url: 'https://sdk.vercel.ai', domain: 'sdk.vercel.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-293/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2023-06-15",
    tags: [
      "Framework",
      "React",
      "Next.js"
    ]
  },
  {
    id: "294",
    name: "Stable Diffusion 3.5",
    description: "The latest and most capable version of the Stable Diffusion family.",
    category: "Image & Art Generation",
    url: 'https://stability.ai', domain: 'stability.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-294/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-10-22",
    tags: [
      "Image Gen",
      "Open Source",
      "Art"
    ]
  },
  {
    id: "295",
    name: "Grok-2",
    description: "xAI's latest frontier model with state-of-the-art reasoning and image generation.",
    category: "AI Chatbots & Assistants",
    url: 'https://x.ai', domain: 'x.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-295/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-08-14",
    tags: [
      "LLM",
      "X",
      "Real-time"
    ]
  },
  {
    id: "296",
    name: "Udio v1.5",
    description: "The latest version of Udio, featuring improved audio quality and control.",
    category: "Music",
    url: 'https://udio.com', domain: 'udio.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-296/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-09-15",
    tags: [
      "Music Gen",
      "Audio",
      "Creative"
    ]
  },
  {
    id: "297",
    name: "Suno v3.5",
    description: "Suno's most advanced music generation model to date.",
    category: "Music",
    url: 'https://suno.com', domain: 'suno.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-297/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-06-10",
    tags: [
      "Music Gen",
      "Audio",
      "Creative"
    ]
  },
  {
    id: "298",
    name: "HeyGen Interactive Avatar",
    description: "Real-time interactive AI avatars for customer service and engagement.",
    category: "Video & Audio Tools",
    url: 'https://heygen.com', domain: 'heygen.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-298/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-08-01",
    tags: [
      "Avatars",
      "Real-time",
      "Interactive"
    ]
  },
  {
    id: "299",
    name: "ElevenLabs Reader",
    description: "An app that lets you listen to any text in high-quality AI voices.",
    category: "Voice",
    url: 'https://elevenlabs.io/reader', domain: 'elevenlabs.io', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-299/400/200",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-06-25",
    tags: [
      "TTS",
      "Audiobooks",
      "Productivity"
    ]
  },
  {
    id: "300",
    name: "Midjourney v6.1",
    description: "The latest Midjourney model with improved skin textures, lighting, and detail.",
    category: "Image & Art Generation",
    url: 'https://midjourney.com', domain: 'midjourney.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-300/400/200",
    pricing: "Paid",
    rating: 5,
    featured: true,
    dateAdded: "2024-07-30",
    tags: [
      "Image Gen",
      "Art",
      "Creative"
    ]
  },
  {
    id: "303",
    name: " Playground AI",
    description: "A free-to-use online AI image creator with powerful editing features.",
    category: "Image & Art Generation",
    url: 'https://playgroundai.com', domain: 'playgroundai.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-303/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-15",
    tags: [
      "Image Gen",
      "Editing",
      "Art"
    ]
  },
  {
    id: "304",
    name: "Recraft.ai",
    description: "AI graphic design tool that generates vector art, icons, and 3D images.",
    category: "Image & Art Generation",
    url: 'https://www.recraft.ai', domain: 'recraft.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-304/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-10",
    tags: [
      "Vector Art",
      "Design",
      "Icons"
    ]
  },
  {
    id: "305",
    name: "NightCafe",
    description: "AI art generator with multiple methods and a vibrant community.",
    category: "Image & Art Generation",
    url: 'https://creator.nightcafe.studio', domain: 'creator.nightcafe.studio', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-305/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-03-20",
    tags: [
      "Art",
      "Community",
      "Image Gen"
    ]
  },
  {
    id: "306",
    name: "Artbreeder",
    description: "Create unique images by mixing and breeding different styles and subjects.",
    category: "Image & Art Generation",
    url: 'https://www.artbreeder.com', domain: 'artbreeder.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-306/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-02-15",
    tags: [
      "Art",
      "Creative",
      "Mixing"
    ]
  },
  {
    id: "307",
    name: "BlueWillow",
    description: "A free AI image generator that works through Discord, similar to Midjourney.",
    category: "Image & Art Generation",
    url: 'https://www.bluewillow.ai', domain: 'bluewillow.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-307/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-01-10",
    tags: [
      "Discord",
      "Image Gen",
      "Free"
    ]
  },
  {
    id: "308",
    name: "SeaArt.ai",
    description: "Powerful AI art generator with a vast library of models and styles.",
    category: "Image & Art Generation",
    url: 'https://www.seaart.ai', domain: 'seaart.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-308/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-07-05",
    tags: [
      "Art",
      "Models",
      "Image Gen"
    ]
  },
  {
    id: "309",
    name: "Tensor.art",
    description: "Free online AI image generation and model hosting platform.",
    category: "Image & Art Generation",
    url: 'https://tensor.art', domain: 'tensor.art', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-309/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-07-15",
    tags: [
      "Models",
      "Hosting",
      "Image Gen"
    ]
  },
  {
    id: "310",
    name: "PixAI.art",
    description: "AI anime art generator and community for anime enthusiasts.",
    category: "Image & Art Generation",
    url: 'https://pixai.art', domain: 'pixai.art', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-310/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-06-20",
    tags: [
      "Anime",
      "Art",
      "Community"
    ]
  },
  {
    id: "311",
    name: "Regie.ai",
    description: "AI-powered sales prospecting and content generation platform.",
    category: "Business & Finance AI",
    url: 'https://www.regie.ai', domain: 'regie.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-311/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-08-10",
    tags: [
      "Sales",
      "Prospecting",
      "Business"
    ]
  },
  {
    id: "312",
    name: "Glean",
    description: "AI-powered search across all your company's apps and data.",
    category: "Business & Finance AI",
    url: 'https://www.glean.com', domain: 'glean.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-312/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-12",
    tags: [
      "Search",
      "Enterprise",
      "Knowledge"
    ]
  },
  {
    id: "313",
    name: "Moveworks",
    description: "AI platform for employee support and automated service desk.",
    category: "Business & Finance AI",
    url: 'https://www.moveworks.com', domain: 'moveworks.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-313/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-08-15",
    tags: [
      "HR",
      "Support",
      "Automation"
    ]
  },
  {
    id: "314",
    name: "Eightfold AI",
    description: "Talent intelligence platform for hiring, retention, and diversity.",
    category: "Business & Finance AI",
    url: 'https://eightfold.ai', domain: 'eightfold.ai', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-314/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-08-18",
    tags: [
      "Hiring",
      "HR",
      "Talent"
    ]
  },
  {
    id: "315",
    name: "Scale AI",
    description: "Data labeling and management platform for AI development.",
    category: "Business & Finance AI",
    url: 'https://scale.com', domain: 'scale.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-315/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-20",
    tags: [
      "Data",
      "ML",
      "Enterprise"
    ]
  },
  {
    id: "316",
    name: "DataRobot",
    description: "AI platform for building, deploying, and managing machine learning models.",
    category: "Business & Finance AI",
    url: 'https://www.datarobot.com', domain: 'datarobot.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-316/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-08-22",
    tags: [
      "ML",
      "Data Science",
      "Business"
    ]
  },
  {
    id: "317",
    name: "Zest AI",
    description: "AI-powered credit underwriting for lenders to make better decisions.",
    category: "Business & Finance AI",
    url: 'https://www.zest.ai', domain: 'zest.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-317/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-08-25",
    tags: [
      "Finance",
      "Lending",
      "Credit"
    ]
  },
  {
    id: "318",
    name: "Upstart",
    description: "AI-powered lending platform for personal loans and credit.",
    category: "Business & Finance AI",
    url: 'https://www.upstart.com', domain: 'upstart.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-318/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-08-28",
    tags: [
      "Finance",
      "Lending",
      "AI"
    ]
  },
  {
    id: "319",
    name: "Vanta",
    description: "AI-powered security and compliance platform for automated audits.",
    category: "Business & Finance AI",
    url: 'https://www.vanta.com', domain: 'vanta.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-319/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-01",
    tags: [
      "Security",
      "Compliance",
      "SaaS"
    ]
  },
  {
    id: "320",
    name: "Drift",
    description: "AI-powered conversational marketing and sales platform.",
    category: "Business & Finance AI",
    url: 'https://www.drift.com', domain: 'drift.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-320/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-05",
    tags: [
      "Marketing",
      "Sales",
      "Chatbot"
    ]
  },
  {
    id: "321",
    name: "Anyword",
    description: "AI writing platform that predicts the performance of your copy.",
    category: "AI Writing & Content",
    url: 'https://anyword.com', domain: 'anyword.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-321/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-10",
    tags: [
      "Copywriting",
      "Marketing",
      "Analytics"
    ]
  },
  {
    id: "322",
    name: "Peppertype.ai",
    description: "AI-powered content generation for social media, blogs, and ads.",
    category: "AI Writing & Content",
    url: 'https://www.peppercontent.io/peppertype-ai/', domain: 'peppercontent.io', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-322/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-12",
    tags: [
      "Content Gen",
      "Social Media",
      "Writing"
    ]
  },
  {
    id: "323",
    name: "ContentBot",
    description: "AI writer for founders and marketers. Automate your content strategy.",
    category: "AI Writing & Content",
    url: 'https://contentbot.ai', domain: 'contentbot.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-323/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-09-15",
    tags: [
      "Automation",
      "Blogs",
      "Writing"
    ]
  },
  {
    id: "324",
    name: "WordHero",
    description: "AI writing tool that helps you write high-quality content in seconds.",
    category: "AI Writing & Content",
    url: 'https://wordhero.co', domain: 'wordhero.co', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-324/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-18",
    tags: [
      "Copywriting",
      "Blogs",
      "Writing"
    ]
  },
  {
    id: "325",
    name: "ClosersCopy",
    description: "AI writing assistant with specialized frameworks for sales copy.",
    category: "AI Writing & Content",
    url: 'https://www.closerscopy.com', domain: 'closerscopy.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-325/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-09-20",
    tags: [
      "Sales Copy",
      "Marketing",
      "Writing"
    ]
  },
  {
    id: "326",
    name: "Outranking",
    description: "AI writing and SEO platform for planning and optimizing content.",
    category: "AI Writing & Content",
    url: 'https://www.outranking.io', domain: 'outranking.io', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-326/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-22",
    tags: [
      "SEO",
      "Content Strategy",
      "Writing"
    ]
  },
  {
    id: "327",
    name: "Neuraltext",
    description: "AI writing assistant and SEO tool for content creators.",
    category: "AI Writing & Content",
    url: 'https://www.neuraltext.com', domain: 'neuraltext.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-327/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-09-25",
    tags: [
      "SEO",
      "Writing",
      "Content Gen"
    ]
  },
  {
    id: "328",
    name: "LongShot AI",
    description: "AI writing assistant for long-form content and blog posts.",
    category: "AI Writing & Content",
    url: 'https://www.longshot.ai', domain: 'longshot.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-328/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-09-28",
    tags: [
      "Long-form",
      "Blogs",
      "Writing"
    ]
  },
  {
    id: "329",
    name: "ZimmWriter",
    description: "The world's first AI writing software for Windows.",
    category: "AI Writing & Content",
    url: 'https://www.zimmwriter.com', domain: 'zimmwriter.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-329/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-10-01",
    tags: [
      "Windows",
      "SEO",
      "Writing"
    ]
  },
  {
    id: "330",
    name: "KoalaWriter",
    description: "AI writing tool optimized for SEO and affiliate marketing.",
    category: "AI Writing & Content",
    url: 'https://koala.sh', domain: 'koala.sh', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-330/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-10-05",
    tags: [
      "SEO",
      "Affiliate",
      "Writing"
    ]
  },
  {
    id: "331",
    name: "WellSaid Labs",
    description: "The highest quality AI voice platform for enterprise content.",
    category: "Voice",
    url: 'https://wellsaidlabs.com', domain: 'wellsaidlabs.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-331/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-10-10",
    tags: [
      "Enterprise",
      "TTS",
      "Voiceover"
    ]
  },
  {
    id: "332",
    name: "Lovo.ai",
    description: "Award-winning AI voice generator and text to speech software.",
    category: "Voice",
    url: 'https://lovo.ai', domain: 'lovo.ai', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-332/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-10-12",
    tags: [
      "Voiceover",
      "TTS",
      "Video"
    ]
  },
  {
    id: "333",
    name: "Uberduck",
    description: "AI-generated vocals for music and voiceovers. Create your own AI rap.",
    category: "Voice",
    url: 'https://uberduck.ai', domain: 'uberduck.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-333/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-15",
    tags: [
      "Music",
      "Voiceover",
      "Creative"
    ]
  },
  {
    id: "334",
    name: "FakeYou",
    description: "Deepfake text to speech and voice conversion tool.",
    category: "Voice",
    url: 'https://fakeyou.com', domain: 'fakeyou.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-334/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-10-18",
    tags: [
      "Deepfake",
      "TTS",
      "Fun"
    ]
  },
  {
    id: "335",
    name: "Kits.ai",
    description: "AI voice platform for musicians. Voice cloning and vocal processing.",
    category: "Voice",
    url: 'https://www.kits.ai', domain: 'kits.ai', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-335/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-10-20",
    tags: [
      "Music",
      "Voice Cloning",
      "Production"
    ]
  },
  {
    id: "336",
    name: "Voicify.ai",
    description: "Create AI covers of your favorite songs with high-quality models.",
    category: "Voice",
    url: 'https://www.voicify.ai', domain: 'voicify.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-336/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-22",
    tags: [
      "Music",
      "AI Covers",
      "Fun"
    ]
  },
  {
    id: "337",
    name: "Rask.ai",
    description: "AI video localization and dubbing tool. Translate videos into 130+ languages.",
    category: "Voice",
    url: 'https://www.rask.ai', domain: 'rask.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-337/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-10-25",
    tags: [
      "Dubbing",
      "Translation",
      "Video"
    ]
  },
  {
    id: "338",
    name: "Dubverse",
    description: "AI-powered video dubbing platform for creators and businesses.",
    category: "Voice",
    url: 'https://dubverse.ai', domain: 'dubverse.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-338/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-28",
    tags: [
      "Dubbing",
      "Video",
      "Translation"
    ]
  },
  {
    id: "339",
    name: "Speechmatics",
    description: "Autonomous speech recognition for high-accuracy transcription.",
    category: "Voice",
    url: 'https://www.speechmatics.com', domain: 'speechmatics.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-339/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-11-01",
    tags: [
      "Transcription",
      "ASR",
      "Enterprise"
    ]
  },
  {
    id: "340",
    name: "Deepgram",
    description: "AI speech-to-text and text-to-speech for developers.",
    category: "Voice",
    url: 'https://deepgram.com', domain: 'deepgram.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-340/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-11-05",
    tags: [
      "STT",
      "TTS",
      "API"
    ]
  },
  {
    id: "341",
    name: "Mutiny",
    description: "AI-powered personalization platform for B2B websites.",
    category: "Marketing & SEO",
    url: 'https://www.mutinyhq.com', domain: 'mutinyhq.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-341/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-11-10",
    tags: [
      "Personalization",
      "B2B",
      "Conversion"
    ]
  },
  {
    id: "342",
    name: "Albert",
    description: "AI-driven marketing platform for autonomous campaign management.",
    category: "Marketing & SEO",
    url: 'https://albert.ai', domain: 'albert.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-342/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-11-12",
    tags: [
      "Campaigns",
      "Automation",
      "Ads"
    ]
  },
  {
    id: "343",
    name: "Phrasee",
    description: "AI-powered content generation for email subject lines and marketing copy.",
    category: "Marketing & SEO",
    url: 'https://phrasee.co', domain: 'phrasee.co', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-343/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-11-15",
    tags: [
      "Email",
      "Copywriting",
      "Optimization"
    ]
  },
  {
    id: "344",
    name: "Persado",
    description: "AI-powered motivation platform for generating high-performing marketing content.",
    category: "Marketing & SEO",
    url: 'https://www.persado.com', domain: 'persado.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-344/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-11-18",
    tags: [
      "Content Gen",
      "Psychology",
      "Enterprise"
    ]
  },
  {
    id: "345",
    name: "Seventh Sense",
    description: "AI-powered email delivery optimization for HubSpot and Marketo.",
    category: "Marketing & SEO",
    url: 'https://www.theseventhsense.com', domain: 'theseventhsense.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-345/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-11-20",
    tags: [
      "Email",
      "Optimization",
      "HubSpot"
    ]
  },
  {
    id: "346",
    name: "Optimove",
    description: "AI-powered CRM marketing platform for customer-led growth.",
    category: "Marketing & SEO",
    url: 'https://www.optimove.com', domain: 'optimove.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-346/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-11-22",
    tags: [
      "CRM",
      "Retention",
      "Growth"
    ]
  },
  {
    id: "348",
    name: "Sprout Social",
    description: "AI-powered social media management and optimization platform.",
    category: "Marketing & SEO",
    url: 'https://sproutsocial.com', domain: 'sproutsocial.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-348/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-11-28",
    tags: [
      "Social Media",
      "Management",
      "Analytics"
    ]
  },
  {
    id: "349",
    name: "Emplifi",
    description: "AI-powered customer experience platform for social marketing and commerce.",
    category: "Marketing & SEO",
    url: 'https://emplifi.io', domain: 'emplifi.io', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-349/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-12-01",
    tags: [
      "CX",
      "Social Commerce",
      "Marketing"
    ]
  },
  {
    id: "350",
    name: "Braze",
    description: "AI-powered customer engagement platform for cross-channel marketing.",
    category: "Marketing & SEO",
    url: 'https://www.braze.com', domain: 'braze.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-350/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-12-05",
    tags: [
      "Engagement",
      "Cross-channel",
      "Mobile"
    ]
  },
  {
    id: "351",
    name: "HiredScore",
    description: "AI-powered talent orchestration for enterprise hiring and retention.",
    category: "Career",
    url: 'https://www.hiredscore.com', domain: 'hiredscore.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-351/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-12-10",
    tags: [
      "Hiring",
      "Enterprise",
      "HR"
    ]
  },
  {
    id: "352",
    name: "Jobscan",
    description: "Optimize your resume and LinkedIn profile for applicant tracking systems (ATS).",
    category: "Career",
    url: 'https://www.jobscan.co', domain: 'jobscan.co', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-352/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-12-12",
    tags: [
      "Resume",
      "ATS",
      "Job Search"
    ]
  },
  {
    id: "353",
    name: "Interviewing.io",
    description: "Practice anonymous technical interviews with engineers from top tech companies.",
    category: "Career",
    url: 'https://interviewing.io', domain: 'interviewing.io', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-353/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-12-15",
    tags: [
      "Interviews",
      "Tech",
      "Coaching"
    ]
  },
  {
    id: "354",
    name: "Pymetrics",
    description: "AI-powered behavioral assessments to match candidates with the right roles.",
    category: "Career",
    url: 'https://www.pymetrics.ai', domain: 'pymetrics.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-354/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-12-18",
    tags: [
      "Assessments",
      "Hiring",
      "Psychology"
    ]
  },
  {
    id: "355",
    name: "Wonsulting AI",
    description: "AI tools to help you land your dream job, from resume building to networking.",
    category: "Career",
    url: 'https://www.wonsulting.ai', domain: 'wonsulting.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-355/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-12-20",
    tags: [
      "Resume",
      "Networking",
      "Job Search"
    ]
  },
  {
    id: "356",
    name: "Kickresume",
    description: "AI resume and cover letter builder with professional templates.",
    category: "Career",
    url: 'https://www.kickresume.com', domain: 'kickresume.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-356/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-12-22",
    tags: [
      "Resume",
      "Cover Letter",
      "Design"
    ]
  },
  {
    id: "357",
    name: "Careerflow.ai",
    description: "AI-powered job search assistant and LinkedIn profile optimizer.",
    category: "Career",
    url: 'https://www.careerflow.ai', domain: 'careerflow.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-357/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-12-25",
    tags: [
      "LinkedIn",
      "Job Search",
      "Automation"
    ]
  },
  {
    id: "358",
    name: "Prepper",
    description: "AI-powered interview preparation tool to help you ace your next job interview.",
    category: "Career",
    url: 'https://prepper.io', domain: 'prepper.io', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-358/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-12-28",
    tags: [
      "Interviews",
      "Preparation",
      "Coaching"
    ]
  },
  {
    id: "359",
    name: "SkillSync",
    description: "AI tool that matches your skills with the best job opportunities available.",
    category: "Career",
    url: 'https://skillsync.ai', domain: 'skillsync.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-359/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-01-02",
    tags: [
      "Skills",
      "Matching",
      "Job Search"
    ]
  },
  {
    id: "360",
    name: "Resume Worded",
    description: "AI platform that gives you instant feedback on your resume and LinkedIn profile.",
    category: "Career",
    url: 'https://resumeworded.com', domain: 'resumeworded.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-360/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-01-05",
    tags: [
      "Resume",
      "LinkedIn",
      "Feedback"
    ]
  },
  {
    id: "361",
    name: "Akkio",
    description: "AI-powered data platform for predictive modeling and business analytics.",
    category: "Data",
    url: 'https://www.akkio.com', domain: 'akkio.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-361/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-01-10",
    tags: [
      "Predictive",
      "Analytics",
      "Business"
    ]
  },
  {
    id: "362",
    name: "Polymer",
    description: "AI tool that transforms spreadsheets into searchable, interactive databases.",
    category: "Data",
    url: 'https://www.polymersearch.com', domain: 'polymersearch.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-362/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-01-12",
    tags: [
      "Spreadsheets",
      "Database",
      "Search"
    ]
  },
  {
    id: "363",
    name: "MonkeyLearn",
    description: "AI platform for text analysis and data visualization of customer feedback.",
    category: "Data",
    url: 'https://monkeylearn.com', domain: 'monkeylearn.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-363/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-01-15",
    tags: [
      "Text Analysis",
      "Feedback",
      "NLP"
    ]
  },
  {
    id: "364",
    name: "ThoughtSpot",
    description: "AI-powered search and analytics platform for data-driven insights.",
    category: "Data",
    url: 'https://www.thoughtspot.com', domain: 'thoughtspot.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-364/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-01-18",
    tags: [
      "Search",
      "Analytics",
      "Enterprise"
    ]
  },
  {
    id: "365",
    name: "Sisense AI",
    description: "Infuse analytics everywhere with AI-powered data insights and apps.",
    category: "Data",
    url: 'https://www.sisense.com', domain: 'sisense.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-365/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-01-20",
    tags: [
      "BI",
      "Analytics",
      "Embedded"
    ]
  },
  {
    id: "366",
    name: "Domo AI",
    description: "AI-powered business cloud for data integration and real-time insights.",
    category: "Data",
    url: 'https://www.domo.com', domain: 'domo.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-366/400/200",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-01-22",
    tags: [
      "Cloud",
      "BI",
      "Integration"
    ]
  },
  {
    id: "367",
    name: "AnswerRocket",
    description: "AI-powered analytics platform for natural language data exploration.",
    category: "Data",
    url: 'https://www.answerrocket.com', domain: 'answerrocket.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-367/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-01-25",
    tags: [
      "NLP",
      "Analytics",
      "Business"
    ]
  },
  {
    id: "368",
    name: "Pyramid Analytics",
    description: "AI-driven decision intelligence platform for enterprise data.",
    category: "Data",
    url: 'https://www.pyramidanalytics.com', domain: 'pyramidanalytics.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-368/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-01-28",
    tags: [
      "Decision Intelligence",
      "BI",
      "Enterprise"
    ]
  },
  {
    id: "369",
    name: "GoodData",
    description: "AI-powered analytics platform for building and scaling data products.",
    category: "Data",
    url: 'https://www.gooddata.com', domain: 'gooddata.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-369/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-02-01",
    tags: [
      "Analytics",
      "SaaS",
      "Data Products"
    ]
  },
  {
    id: "370",
    name: "Tellius",
    description: "AI-driven analytics platform that combines BI with machine learning.",
    category: "Data",
    url: 'https://www.tellius.com', domain: 'tellius.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-370/400/200",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-02-05",
    tags: [
      "BI",
      "ML",
      "Insights"
    ]
  },
  {
    id: "371",
    name: "Meshy",
    description: "Create stunning 3D game assets from text or images in seconds.",
    category: "3D",
    url: 'https://www.meshy.ai', domain: 'meshy.ai', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-371/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-02-10",
    tags: [
      "3D Assets",
      "Game Dev",
      "Text-to-3D"
    ]
  },
  {
    id: "372",
    name: "Tripo AI",
    description: "Fast and high-quality AI 3D model generator from text or image.",
    category: "3D",
    url: 'https://www.tripo3d.ai', domain: 'tripo3d.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-372/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-02-12",
    tags: [
      "Modeling",
      "Generative AI",
      "3D"
    ]
  },
  {
    id: "373",
    name: "Rodin",
    description: "Hyper-realistic 3D generation model for high-fidelity assets.",
    category: "3D",
    url: 'https://hyperhuman.deemos.com', domain: 'hyperhuman.deemos.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-373/400/200",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2025-02-15",
    tags: [
      "High Fidelity",
      "Avatars",
      "3D"
    ]
  },
  {
    id: "374",
    name: "Sloyd",
    description: "Generate 3D models for games and virtual worlds instantly.",
    category: "3D",
    url: 'https://www.sloyd.ai', domain: 'sloyd.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-374/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-02-18",
    tags: [
      "Game Assets",
      "Low Poly",
      "3D"
    ]
  },
  {
    id: "375",
    name: "CSM",
    description: "Common Sense Machines - Turn any image into a game-engine ready 3D asset.",
    category: "3D",
    url: 'https://csm.ai', domain: 'csm.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-375/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: true,
    dateAdded: "2025-02-20",
    tags: [
      "Image-to-3D",
      "Game Dev",
      "Assets"
    ]
  },
  {
    id: "376",
    name: "Avaturn",
    description: "Realistic 3D avatar creator for games and apps from a single selfie.",
    category: "3D",
    url: 'https://avaturn.me', domain: 'avaturn.me', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-376/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: false,
    dateAdded: "2025-02-22",
    tags: [
      "Avatars",
      "Character",
      "3D"
    ]
  },
  {
    id: "377",
    name: "Kinetix",
    description: "No-code AI platform to create 3D animations and emotes.",
    category: "3D",
    url: 'https://www.kinetix.tech', domain: 'kinetix.tech', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-377/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-02-25",
    tags: [
      "Animation",
      "Emotes",
      "No-Code"
    ]
  },
  {
    id: "378",
    name: "Plask",
    description: "AI motion capture tool that extracts 3D motion from video.",
    category: "3D",
    url: 'https://plask.ai', domain: 'plask.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-378/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-02-28",
    tags: [
      "Mocap",
      "Animation",
      "Video-to-3D"
    ]
  },
  {
    id: "379",
    name: "DeepMotion",
    description: "Browser-based AI motion capture for 3D body tracking.",
    category: "3D",
    url: 'https://www.deepmotion.com', domain: 'deepmotion.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-379/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-03-01",
    tags: [
      "Mocap",
      "Tracking",
      "Animation"
    ]
  },
  {
    id: "380",
    name: "Anything World",
    description: "Animate any 3D model with AI. Rigging and animation automation.",
    category: "3D",
    url: 'https://anything.world', domain: 'anything.world', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-380/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-03-02",
    tags: [
      "Animation",
      "Rigging",
      "Game Dev"
    ]
  },
  {
    id: "381",
    name: "Runway Gen-2",
    description: "Advanced AI system that can generate novel videos with text, images, or video clips.",
    category: "Video & Audio Tools",
    url: 'https://runwayml.com', domain: 'runwayml.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-381/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2025-03-05",
    tags: [
      "Image-to-Video",
      "Generative AI",
      "Professional"
    ]
  },
  {
    id: "382",
    name: "Pika Labs",
    description: "Powerful AI video generation platform that turns text and images into high-quality videos.",
    category: "Video & Audio Tools",
    url: 'https://pika.art', domain: 'pika.art', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-382/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-03-06",
    tags: [
      "Animation",
      "Image-to-Video",
      "Discord"
    ]
  },
  {
    id: "383",
    name: "Kaiber",
    description: "Create stunning visuals and animations from your images and music with AI.",
    category: "Video & Audio Tools",
    url: 'https://kaiber.ai', domain: 'kaiber.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-383/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-03-07",
    tags: [
      "Music Video",
      "Stylization",
      "Art"
    ]
  },
  {
    id: "384",
    name: "Stable Video",
    description: "Stability AI's generative video model for turning images into short video clips.",
    category: "Video & Audio Tools",
    url: 'https://www.stablevideo.com', domain: 'stablevideo.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-384/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-03-08",
    tags: [
      "SVD",
      "Open Source",
      "Motion"
    ]
  },
  {
    id: "385",
    name: "Haiper",
    description: "Next-generation video creation platform for high-fidelity AI video generation.",
    category: "Video & Audio Tools",
    url: 'https://haiper.ai', domain: 'haiper.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-385/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-03-09",
    tags: [
      "High Quality",
      "Creative",
      "Video Gen"
    ]
  },
  {
    id: "386",
    name: "Morph Studio",
    description: "All-in-one AI filmmaking platform for text-to-video and image-to-video creation.",
    category: "Video & Audio Tools",
    url: 'https://www.morphstudio.com', domain: 'morphstudio.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-386/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-03-10",
    tags: [
      "Filmmaking",
      "Storytelling",
      "AI Video"
    ]
  },
  {
    id: "387",
    name: "Moonvalley",
    description: "Cinematic AI video generator for creating high-quality video from text and images.",
    category: "Video & Audio Tools",
    url: 'https://moonvalley.ai', domain: 'moonvalley.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-387/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-03-11",
    tags: [
      "Cinematic",
      "Discord",
      "Video Gen"
    ]
  },
  {
    id: "388",
    name: "PixVerse",
    description: "AI video creation platform that transforms your ideas into stunning visuals.",
    category: "Video & Audio Tools",
    url: 'https://pixverse.ai', domain: 'pixverse.ai', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-388/400/200",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-03-12",
    tags: [
      "Web Platform",
      "4K Video",
      "Creative"
    ]
  },
  {
    id: "389",
    name: "Neverends",
    description: "Turn your photos into realistic videos with AI-powered motion technology.",
    category: "Video & Audio Tools",
    url: 'https://neverends.life', domain: 'neverends.life', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-389/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2025-03-13",
    tags: [
      "Photo Animation",
      "Realistic",
      "Memories"
    ]
  },
  {
    id: "390",
    name: "Viggle",
    description: "Animate any character from a single image with consistent motion control.",
    category: "Video & Audio Tools",
    url: 'https://viggle.ai', domain: 'viggle.ai', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-390/400/200",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-03-14",
    tags: [
      "Character Animation",
      "Motion Control",
      "Meme"
    ]
  },
  {
    id: "391",
    name: "Framer",
    description: "Design and publish your dream site with AI. Zero code, maximum speed.",
    category: "No-Code",
    url: 'https://framer.com', domain: 'framer.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-391/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-03-15",
    tags: [
      "Website Builder",
      "Design",
      "AI"
    ]
  },
  {
    id: "392",
    name: "Make",
    description: "Visual platform to design, build, and automate anything—from tasks to complex workflows.",
    category: "No-Code",
    url: 'https://www.make.com', domain: 'make.com', brandColor: '#6d00cc',
    imageUrl: "https://picsum.photos/seed/ai-tool-392/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2025-03-16",
    tags: [
      "Automation",
      "Workflow",
      "Integration"
    ]
  },
  {
    id: "393",
    name: "Glide",
    description: "Create powerful apps from Google Sheets, Excel, or Airtable without coding.",
    category: "No-Code",
    url: 'https://www.glideapps.com', domain: 'glideapps.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-393/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-03-17",
    tags: [
      "App Builder",
      "Spreadsheet",
      "Internal Tools"
    ]
  },
  {
    id: "394",
    name: "FlutterFlow",
    description: "Build beautiful, native mobile apps visually with the power of Flutter.",
    category: "No-Code",
    url: 'https://flutterflow.io', domain: 'flutterflow.io', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-394/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2025-03-18",
    tags: [
      "Mobile Apps",
      "Flutter",
      "Visual Development"
    ]
  },
  {
    id: "395",
    name: "Adalo",
    description: "Turn your app idea into reality without writing a single line of code.",
    category: "No-Code",
    url: 'https://www.adalo.com', domain: 'adalo.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-395/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-03-19",
    tags: [
      "App Builder",
      "Marketplace",
      "Mobile"
    ]
  },
  {
    id: "396",
    name: "Retool",
    description: "Build internal tools remarkably fast. Drag and drop UI components and connect to any database.",
    category: "No-Code",
    url: 'https://retool.com', domain: 'retool.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-396/400/200",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2025-03-20",
    tags: [
      "Internal Tools",
      "Database",
      "Enterprise"
    ]
  },
  {
    id: "397",
    name: "Carrd",
    description: "Simple, free, fully responsive one-page sites for pretty much anything.",
    category: "No-Code",
    url: 'https://carrd.co', domain: 'carrd.co', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-397/400/200",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2025-03-21",
    tags: [
      "Landing Page",
      "Portfolio",
      "Simple"
    ]
  },
  {
    id: "398",
    name: "Typeform",
    description: "Create forms and surveys that people enjoy answering.",
    category: "No-Code",
    url: 'https://www.typeform.com', domain: 'typeform.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-398/400/200",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-03-22",
    tags: [
      "Forms",
      "Surveys",
      "Data Collection"
    ]
  },
  {
    id: "399",
    name: "Bravo Studio",
    description: "Turn your Figma or Adobe XD designs into native iOS and Android apps.",
    category: "No-Code",
    url: 'https://www.bravostudio.app', domain: 'bravostudio.app', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-399/400/200",
    pricing: "Freemium",
    rating: 4.6,
    featured: false,
    dateAdded: "2025-03-23",
    tags: [
      "Design to App",
      "Figma",
      "Native Apps"
    ]
  },
  {
    id: "400",
    name: "Thunkable",
    description: "The no-code platform to build powerful, native mobile apps for any operating system.",
    category: "No-Code",
    url: 'https://thunkable.com', domain: 'thunkable.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-400/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2025-03-24",
    tags: [
      "Mobile Apps",
      "Cross-Platform",
      "Drag and Drop"
    ]
  },
  {
    id: "408",
    name: "Paradox",
    description: "Conversational AI recruiting assistant that automates screening and scheduling.",
    category: "Business & Finance AI",
    url: 'https://www.paradox.ai', domain: 'paradox.ai', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-408/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2025-03-28",
    tags: [
      "Chatbot",
      "Automation",
      "Hiring"
    ]
  },
  {
    id: "412",
    name: "Bulletin",
    description: "AI-powered news summaries tailored to your interests.",
    category: "News",
    url: 'https://bulletin.ai', domain: 'bulletin.ai', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-412/400/200",
    pricing: "Free",
    rating: 4.3,
    featured: false,
    dateAdded: "2025-03-30",
    tags: [
      "Summarization",
      "Briefing",
      "Personalized"
    ]
  },
  {
    id: "415",
    name: "The Fabricant",
    description: "Digital fashion house creating 3D clothing and NFTs.",
    category: "Fashion",
    url: 'https://www.thefabricant.com', domain: 'thefabricant.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-415/400/200",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2025-04-01",
    tags: [
      "3D Fashion",
      "NFT",
      "Metaverse"
    ]
  },
  {
    id: "416",
    name: "Lalaland.ai",
    description: "Generate hyper-realistic AI fashion models for e-commerce.",
    category: "Fashion",
    url: 'https://lalaland.ai', domain: 'lalaland.ai', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-416/400/200",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2025-04-01",
    tags: [
      "Models",
      "E-commerce",
      "Diversity"
    ]
  },
  {
    id: "423",
    name: "SurgeGraph",
    description: "Powerful AI tool for SEO.",
    category: "Marketing & SEO",
    url: 'https://www.google.com/search?q=SurgeGraph+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-424/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "SEO",
      "AI",
      "Tool"
    ]
  },
  {
    id: "424",
    name: "HoppyCopy",
    description: "Powerful AI tool for Writing.",
    category: "AI Writing & Content",
    url: 'https://www.google.com/search?q=HoppyCopy+AI', domain: 'google.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-425/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Writing",
      "AI",
      "Tool"
    ]
  },
  {
    id: "425",
    name: "Paperpal",
    description: "Powerful AI tool for Writing.",
    category: "AI Writing & Content",
    url: 'https://www.google.com/search?q=Paperpal+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-426/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Writing",
      "AI",
      "Tool"
    ]
  },
  {
    id: "426",
    name: "Squibler",
    description: "Powerful AI tool for Writing.",
    category: "AI Writing & Content",
    url: 'https://www.google.com/search?q=Squibler+AI', domain: 'google.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-427/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Writing",
      "AI",
      "Tool"
    ]
  },
  {
    id: "427",
    name: "n8n",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=n8n+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-428/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "428",
    name: "Manus",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Manus+AI', domain: 'google.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-429/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "430",
    name: "Copilot",
    description: "Powerful AI tool for Coding.",
    category: "Code & Development",
    url: 'https://www.google.com/search?q=Copilot+AI', domain: 'copilot.microsoft.com', brandColor: '#0078d4',
    imageUrl: "https://picsum.photos/seed/ai-tool-431/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Coding",
      "AI",
      "Tool"
    ]
  },
  {
    id: "431",
    name: "Dyad",
    description: "Powerful AI tool for Design.",
    category: "UI/UX & Design Tools",
    url: 'https://www.google.com/search?q=Dyad+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-432/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Design",
      "AI",
      "Tool"
    ]
  },
  {
    id: "432",
    name: "GPTZero",
    description: "Powerful AI tool for Research.",
    category: "Research & Analysis",
    url: 'https://www.google.com/search?q=GPTZero+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-433/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Research",
      "AI",
      "Tool"
    ]
  },
  {
    id: "433",
    name: "ZeroGPT",
    description: "Powerful AI tool for Research.",
    category: "Research & Analysis",
    url: 'https://www.google.com/search?q=ZeroGPT+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-434/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Research",
      "AI",
      "Tool"
    ]
  },
  {
    id: "434",
    name: "Originality",
    description: "Powerful AI tool for Research.",
    category: "Research & Analysis",
    url: 'https://www.google.com/search?q=Originality+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-435/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Research",
      "AI",
      "Tool"
    ]
  },
  {
    id: "435",
    name: "Copyleaks",
    description: "Powerful AI tool for Research.",
    category: "Research & Analysis",
    url: 'https://www.google.com/search?q=Copyleaks+AI', domain: 'google.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-436/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Research",
      "AI",
      "Tool"
    ]
  },
  {
    id: "436",
    name: "Moz",
    description: "Powerful AI tool for SEO.",
    category: "Marketing & SEO",
    url: 'https://www.google.com/search?q=Moz+AI', domain: 'google.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-437/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "SEO",
      "AI",
      "Tool"
    ]
  },
  {
    id: "437",
    name: "RankMath",
    description: "Powerful AI tool for SEO.",
    category: "Marketing & SEO",
    url: 'https://www.google.com/search?q=RankMath+AI', domain: 'google.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-438/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "SEO",
      "AI",
      "Tool"
    ]
  },
  {
    id: "438",
    name: "Veo",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=Veo+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-439/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "439",
    name: "Hailuo",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=Hailuo+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-440/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "440",
    name: "RunwayML",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=RunwayML+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-441/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "441",
    name: "Filmora",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=Filmora+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-442/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "442",
    name: "Speechefy",
    description: "Powerful AI tool for Voice.",
    category: "Voice",
    url: 'https://www.google.com/search?q=Speechefy+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-443/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Voice",
      "AI",
      "Tool"
    ]
  },
  {
    id: "443",
    name: "Amper Music",
    description: "Powerful AI tool for Music.",
    category: "Music",
    url: 'https://www.google.com/search?q=Amper Music+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-444/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Music",
      "AI",
      "Tool"
    ]
  },
  {
    id: "444",
    name: "Pitch",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Pitch+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-445/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "445",
    name: "Plus",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Plus+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-446/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "446",
    name: "PopAi",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=PopAi+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-447/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "447",
    name: "Presentation.AI",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Presentation.AI+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-448/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "448",
    name: "Slidesgo",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Slidesgo+AI', domain: 'google.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-449/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "449",
    name: "Claude",
    description: "Powerful AI tool for Chatbots.",
    category: "AI Chatbots & Assistants",
    url: 'https://www.google.com/search?q=Claude+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-450/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Chatbots",
      "AI",
      "Tool"
    ]
  },
  {
    id: "450",
    name: "Meta AI",
    description: "Powerful AI tool for Chatbots.",
    category: "AI Chatbots & Assistants",
    url: 'https://www.google.com/search?q=Meta AI+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-451/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Chatbots",
      "AI",
      "Tool"
    ]
  },
  {
    id: "451",
    name: "MS Copilot",
    description: "Powerful AI tool for Chatbots.",
    category: "AI Chatbots & Assistants",
    url: 'https://www.google.com/search?q=MS Copilot+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-452/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Chatbots",
      "AI",
      "Tool"
    ]
  },
  {
    id: "452",
    name: "Bricks",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Bricks+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-453/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "453",
    name: "Formula Bot",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Formula Bot+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-454/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "454",
    name: "Gigasheet",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Gigasheet+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-455/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "455",
    name: "Rows AI",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Rows AI+AI', domain: 'google.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-456/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "456",
    name: "SheetAI",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=SheetAI+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-457/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "457",
    name: "Calendly",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Calendly+AI', domain: 'google.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-458/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "458",
    name: "Clockwise",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Clockwise+AI', domain: 'google.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-459/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "459",
    name: "Reclaim AI",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Reclaim AI+AI', domain: 'google.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-460/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "460",
    name: "Trevor AI",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Trevor AI+AI', domain: 'google.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-461/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "461",
    name: "Notion",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Notion+AI', domain: 'notion.so', brandColor: '#000000',
    imageUrl: "https://picsum.photos/seed/ai-tool-462/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "462",
    name: "Tettra",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Tettra+AI', domain: 'google.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-463/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "463",
    name: "Adobe",
    description: "Powerful AI tool for Image.",
    category: "Image & Art Generation",
    url: 'https://www.google.com/search?q=Adobe+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-464/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Image",
      "AI",
      "Tool"
    ]
  },
  {
    id: "464",
    name: "DALL-E",
    description: "Powerful AI tool for Image.",
    category: "Image & Art Generation",
    url: 'https://www.google.com/search?q=DALL-E+AI', domain: 'openai.com', brandColor: '#10a37f',
    imageUrl: "https://picsum.photos/seed/ai-tool-465/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Image",
      "AI",
      "Tool"
    ]
  },
  {
    id: "465",
    name: "Recraft",
    description: "Powerful AI tool for Image.",
    category: "Image & Art Generation",
    url: 'https://www.google.com/search?q=Recraft+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-466/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Image",
      "AI",
      "Tool"
    ]
  },
  {
    id: "466",
    name: "Grammerly",
    description: "Powerful AI tool for Writing.",
    category: "AI Writing & Content",
    url: 'https://www.google.com/search?q=Grammerly+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-467/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Writing",
      "AI",
      "Tool"
    ]
  },
  {
    id: "467",
    name: "JotBot",
    description: "Powerful AI tool for Writing.",
    category: "AI Writing & Content",
    url: 'https://www.google.com/search?q=JotBot+AI', domain: 'google.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-468/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Writing",
      "AI",
      "Tool"
    ]
  },
  {
    id: "468",
    name: "Quarkle",
    description: "Powerful AI tool for Writing.",
    category: "AI Writing & Content",
    url: 'https://www.google.com/search?q=Quarkle+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-469/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Writing",
      "AI",
      "Tool"
    ]
  },
  {
    id: "469",
    name: "Clippit.Ai",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Clippit.Ai+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-470/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "470",
    name: "Friday",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Friday+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-471/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "471",
    name: "Mailmaestro",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Mailmaestro+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-472/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "472",
    name: "Shortwave",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Shortwave+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-473/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "473",
    name: "Superhuman",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Superhuman+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-474/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "474",
    name: "Integrately",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Integrately+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-475/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "475",
    name: "Wrike",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Wrike+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-476/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "476",
    name: "AutoDraw",
    description: "Powerful AI tool for Design.",
    category: "UI/UX & Design Tools",
    url: 'https://www.google.com/search?q=AutoDraw+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-477/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Design",
      "AI",
      "Tool"
    ]
  },
  {
    id: "477",
    name: "Design.com",
    description: "Powerful AI tool for Design.",
    category: "UI/UX & Design Tools",
    url: 'https://www.google.com/search?q=Design.com+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-478/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Design",
      "AI",
      "Tool"
    ]
  },
  {
    id: "478",
    name: "Microsoft Designer",
    description: "Powerful AI tool for Design.",
    category: "UI/UX & Design Tools",
    url: 'https://www.google.com/search?q=Microsoft Designer+AI', domain: 'google.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-479/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Design",
      "AI",
      "Tool"
    ]
  },
  {
    id: "479",
    name: "Deckpilot",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Deckpilot+AI', domain: 'google.com', brandColor: '#712B13',
    imageUrl: "https://picsum.photos/seed/ai-tool-480/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "480",
    name: "Flourish",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Flourish+AI', domain: 'google.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-481/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "481",
    name: "Julius",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Julius+AI', domain: 'google.com', brandColor: '#72243E',
    imageUrl: "https://picsum.photos/seed/ai-tool-482/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "482",
    name: "Visme",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Visme+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-483/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "483",
    name: "Zing Data",
    description: "Powerful AI tool for Data.",
    category: "Data",
    url: 'https://www.google.com/search?q=Zing Data+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-484/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Data",
      "AI",
      "Tool"
    ]
  },
  {
    id: "484",
    name: "Askcodi",
    description: "Powerful AI tool for Coding.",
    category: "Code & Development",
    url: 'https://www.google.com/search?q=Askcodi+AI', domain: 'google.com', brandColor: '#3B6D11',
    imageUrl: "https://picsum.photos/seed/ai-tool-485/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Coding",
      "AI",
      "Tool"
    ]
  },
  {
    id: "485",
    name: "Codiga",
    description: "Powerful AI tool for Coding.",
    category: "Code & Development",
    url: 'https://www.google.com/search?q=Codiga+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-486/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Coding",
      "AI",
      "Tool"
    ]
  },
  {
    id: "486",
    name: "Qodo",
    description: "Powerful AI tool for Coding.",
    category: "Code & Development",
    url: 'https://www.google.com/search?q=Qodo+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-487/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Coding",
      "AI",
      "Tool"
    ]
  },
  {
    id: "487",
    name: "Avoma",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Avoma+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-488/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "488",
    name: "Equal Time",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Equal Time+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-489/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "489",
    name: "Fathom",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Fathom+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-490/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "490",
    name: "Fellow.app",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Fellow.app+AI', domain: 'google.com', brandColor: '#534AB7',
    imageUrl: "https://picsum.photos/seed/ai-tool-491/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "491",
    name: "Fireflies",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Fireflies+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-492/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "492",
    name: "Otter",
    description: "Powerful AI tool for Productivity.",
    category: "Productivity & Automation",
    url: 'https://www.google.com/search?q=Otter+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-493/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Productivity",
      "AI",
      "Tool"
    ]
  },
  {
    id: "493",
    name: "Haiper AI",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=Haiper AI+AI', domain: 'google.com', brandColor: '#185FA5',
    imageUrl: "https://picsum.photos/seed/ai-tool-494/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "494",
    name: "Invideo AI",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=Invideo AI+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-495/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "495",
    name: "Kling",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=Kling+AI', domain: 'google.com', brandColor: '#633806',
    imageUrl: "https://picsum.photos/seed/ai-tool-496/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "496",
    name: "LTX Studio",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=LTX Studio+AI', domain: 'google.com', brandColor: '#0F6E56',
    imageUrl: "https://picsum.photos/seed/ai-tool-497/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "497",
    name: "Pika AI",
    description: "Powerful AI tool for Video.",
    category: "Video & Audio Tools",
    url: 'https://www.google.com/search?q=Pika AI+AI', domain: 'google.com', brandColor: '#444441',
    imageUrl: "https://picsum.photos/seed/ai-tool-498/400/200",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: "2026-03-09",
    tags: [
      "Video",
      "AI",
      "Tool"
    ]
  },
  {
    id: "506",
    name: "Airtable",
    description: "The platform to build next-gen apps. Connect your data, workflows, and teams.",
    category: "Productivity & Automation",
    url: 'https://www.airtable.com', domain: 'airtable.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e905263543?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-04-05",
    tags: [
      "Database",
      "No-Code",
      "Organization"
    ]
  },
  {
    id: "507",
    name: "Darktrace",
    description: "Self-learning AI that detects and responds to cyber-threats in real-time.",
    category: "Cybersecurity",
    url: 'https://www.darktrace.com', domain: 'darktrace.com', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-10",
    tags: [
      "Threat Detection",
      "Cybersecurity",
      "Enterprise"
    ]
  },
  {
    id: "508",
    name: "Snyk",
    description: "Developer security platform that finds and fixes vulnerabilities in your code.",
    category: "Cybersecurity",
    url: 'https://snyk.io', domain: 'snyk.io', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-15",
    tags: [
      "Code Analysis",
      "Security",
      "DevOps"
    ]
  },
  {
    id: "510",
    name: "SaneBox",
    description: "AI email assistant that filters out unimportant emails and helps you focus.",
    category: "Personal Assistant",
    url: 'https://www.sanebox.com', domain: 'sanebox.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-15",
    tags: [
      "Email",
      "Productivity",
      "Assistant"
    ]
  },
  {
    id: "511",
    name: "Headspace AI",
    description: "Personalized meditation and mindfulness coaching powered by AI.",
    category: "Self-Improvement",
    url: 'https://www.headspace.com', domain: 'headspace.com', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-07-01",
    tags: [
      "Meditation",
      "Mental Health",
      "Wellness"
    ]
  },
  {
    id: "526",
    name: "WolframAlpha",
    description: "Computational intelligence engine that provides answers to complex mathematical and scientific queries.",
    category: "Learning & Education",
    url: 'https://www.wolframalpha.com', domain: 'wolframalpha.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-10-01",
    tags: [
      "Math",
      "Science",
      "Computation"
    ]
  },
  {
    id: "527",
    name: "Khan Academy AI",
    description: "AI-powered personalized learning assistant that helps students master subjects at their own pace.",
    category: "Learning & Education",
    url: 'https://www.khanacademy.org', domain: 'khanacademy.org', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-10-05",
    tags: [
      "Learning",
      "Tutoring",
      "Education"
    ]
  },
  {
    id: "529",
    name: "GitHub Copilot Workspace",
    description: "AI-powered development environment that helps you plan, build, and test your code.",
    category: "Code & Development",
    url: 'https://github.com/features/copilot-workspace', domain: 'github.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-10-15",
    tags: [
      "Coding",
      "IDE",
      "Automation"
    ]
  },
  {
    id: "530",
    name: "Amazon Q",
    description: "AI-powered assistant for work that can be tailored to your business.",
    category: "Code & Development",
    url: 'https://aws.amazon.com/q', domain: 'aws.amazon.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-10-20",
    tags: [
      "AWS",
      "Coding",
      "Enterprise"
    ]
  },
  {
    id: "531",
    name: "Tabnine Chat",
    description: "AI-powered chat assistant for developers that helps with code generation and debugging.",
    category: "Code & Development",
    url: 'https://www.tabnine.com/chat', domain: 'tabnine.com', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-25",
    tags: [
      "Coding",
      "Chat",
      "Autocomplete"
    ]
  },
  {
    id: "533",
    name: "Cody",
    description: "AI-powered coding assistant that helps you write, fix, and maintain code.",
    category: "Code & Development",
    url: 'https://sourcegraph.com/cody', domain: 'sourcegraph.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-11-05",
    tags: [
      "Coding",
      "Sourcegraph",
      "Automation"
    ]
  },
  {
    id: "534",
    name: "Devin",
    description: "The world's first AI software engineer, capable of building and deploying apps autonomously.",
    category: "Code & Development",
    url: 'https://www.cognition-labs.com/devin', domain: 'cognition-labs.com', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-11-10",
    tags: [
      "AI Engineer",
      "Coding",
      "Automation"
    ]
  },
  {
    id: "535",
    name: "Phind",
    description: "AI search engine for developers that provides direct answers to technical questions.",
    category: "Code & Development",
    url: 'https://www.phind.com', domain: 'phind.com', brandColor: '#3B6D11',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-11-15",
    tags: [
      "Search",
      "Coding",
      "Research"
    ]
  },
  {
    id: "537",
    name: "Lattice",
    description: "People management platform that uses AI to help companies manage performance, engagement, and development.",
    category: "Business & Finance AI",
    url: 'https://lattice.com', domain: 'lattice.com', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-11-25",
    tags: [
      "HR",
      "Performance",
      "Management"
    ]
  },
  {
    id: "538",
    name: "Benchling",
    description: "R&D cloud platform for life sciences that uses AI to accelerate discovery and development.",
    category: "Science",
    url: 'https://www.benchling.com', domain: 'benchling.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9d3c3223d?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-12-01",
    tags: [
      "Science",
      "Biotech",
      "R&D"
    ]
  },
  {
    id: "539",
    name: "Zillow AI",
    description: "AI-powered real estate platform that provides personalized recommendations and home value estimates.",
    category: "Real Estate",
    url: 'https://www.zillow.com', domain: 'zillow.com', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-12-05",
    tags: [
      "Real Estate",
      "Search",
      "Valuation"
    ]
  },
  {
    id: "540",
    name: "Stitch Fix AI",
    description: "Personal styling service that uses AI to recommend clothing and accessories based on your style and preferences.",
    category: "Fashion",
    url: 'https://www.stitchfix.com', domain: 'stitchfix.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-12-10",
    tags: [
      "Fashion",
      "Styling",
      "Personalization"
    ]
  },
  {
    id: "babyagi",
    name: "BabyAGI",
    description: "An AI-powered task management system that uses OpenAI and vector databases to create, prioritize, and execute tasks.",
    category: "Agentic AI",
    url: 'https://github.com/yoheinakajima/babyagi', domain: 'github.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-21",
    tags: [
      "Task Management",
      "Agents"
    ]
  },
  {
    id: "coinstats",
    name: "CoinStats",
    description: "Manage all your crypto and DeFi portfolios from one place. Uses AI to provide personalized insights and market alerts.",
    category: "Crypto",
    url: 'https://coinstats.app', domain: 'coinstats.app', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.6,
    featured: true,
    dateAdded: "2024-05-26",
    tags: [
      "Portfolio",
      "Tracking",
      "DeFi"
    ]
  },
  {
    id: "tokenmetrics",
    name: "Token Metrics",
    description: "AI-driven crypto research platform that helps you build a profitable portfolio using machine learning and data analytics.",
    category: "Crypto",
    url: 'https://tokenmetrics.com', domain: 'tokenmetrics.com', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-27",
    tags: [
      "Research",
      "Analytics",
      "Trading"
    ]
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike Falcon",
    description: "Cloud-native endpoint protection platform that uses AI to stop breaches and protect workloads.",
    category: "Cybersecurity",
    url: 'https://www.crowdstrike.com', domain: 'crowdstrike.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-29",
    tags: [
      "Endpoint",
      "Protection",
      "Enterprise"
    ]
  },
  {
    id: "wysa",
    name: "Wysa",
    description: "An AI chatbot for mental health and wellness. Provides CBT-based exercises and a safe space to talk.",
    category: "Self-Improvement",
    url: 'https://www.wysa.io', domain: 'wysa.io', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-01",
    tags: [
      "Mental Health",
      "Wellness",
      "Chatbot"
    ]
  },
  {
    id: "fabulous",
    name: "Fabulous",
    description: "Daily routine planner and habit tracker that uses behavioral science to help you build healthy habits.",
    category: "Self-Improvement",
    url: 'https://www.thefabulous.co', domain: 'thefabulous.co', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-02",
    tags: [
      "Habits",
      "Routines",
      "Wellness"
    ]
  },
  {
    id: "zendesk-ai",
    name: "Zendesk AI",
    description: "AI-powered customer service tools built into the Zendesk platform to automate responses and assist agents.",
    category: "Customer Support",
    url: 'https://www.zendesk.com/ai', domain: 'zendesk.com', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-06-04",
    tags: [
      "Enterprise",
      "Support",
      "Automation"
    ]
  },
  {
    id: "google-translate",
    name: "Google Translate",
    description: "Free multilingual neural machine translation service developed by Google to translate text, documents, and websites.",
    category: "Language Translation",
    url: 'https://translate.google.com', domain: 'translate.google.com', brandColor: '#712B13',
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-06-06",
    tags: [
      "Translation",
      "Free",
      "Multilingual"
    ]
  },
  {
    id: "ollama",
    name: "Ollama",
    description: "Get up and running with large language models locally.",
    category: "Code & Development",
    url: 'https://ollama.com', domain: 'ollama.com', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-18",
    tags: ["Open Source", "Local AI", "LLMs"]
  },
  {
    id: "comfyui",
    name: "ComfyUI",
    description: "The most powerful and modular stable diffusion GUI and backend.",
    category: "Image & Art Generation",
    url: 'https://github.com/comfyanonymous/ComfyUI', domain: 'github.com', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1633424694931-15fe2fbbaa54?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-19",
    tags: ["Image Gen", "GUI", "Stable Diffusion"]
  },
  {
    id: "aider",
    name: "Aider",
    description: "AI pair programming in your terminal.",
    category: "Code & Development",
    url: 'https://aider.chat', domain: 'aider.chat', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-20",
    tags: ["Coding", "Terminal", "Developer Tools"]
  },
  {
    id: "cline",
    name: "Cline",
    description: "An AI assistant that can use your CLI and Editor. Formerly known as Claude Dev.",
    category: "Code & Development",
    url: 'https://github.com/cline/cline', domain: 'github.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee6b2eb?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-21",
    tags: ["VS Code", "IDE", "Coding Assistant"]
  },
  {
    id: "lm-studio",
    name: "LM Studio",
    description: "Discover, download, and run local LLMs.",
    category: "Code & Development",
    url: 'https://lmstudio.ai', domain: 'lmstudio.ai', brandColor: '#534AB7',
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-22",
    tags: ["Local AI", "LLMs", "Desktop"]
  },
  {
    id: "exa-ai",
    name: "Exa.ai",
    description: "The search engine built for AI.",
    category: "Research & Analysis",
    url: 'https://exa.ai', domain: 'exa.ai', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-23",
    tags: ["Search", "API", "Research"]
  },
  {
    id: "tavily",
    name: "Tavily",
    description: "The search engine for AI agents.",
    category: "Research & Analysis",
    url: 'https://tavily.com', domain: 'tavily.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1542621334-a25420a9a4d8?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-24",
    tags: ["Search", "API", "Agents"]
  },
  {
    id: "dify",
    name: "Dify.ai",
    description: "The innovation engine for generative AI applications.",
    category: "Code & Development",
    url: 'https://dify.ai', domain: 'dify.ai', brandColor: '#633806',
    imageUrl: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-25",
    tags: ["Workflow", "App Builder", "Platform"]
  },
  {
    id: "coze",
    name: "Coze",
    description: "Next-generation AI bot building platform.",
    category: "AI Chatbots & Assistants",
    url: 'https://www.coze.com', domain: 'coze.com', brandColor: '#0F6E56',
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-26",
    tags: ["Bot Builder", "Agents", "Chatbots"]
  },
  {
    id: "supermaven",
    name: "Supermaven",
    description: "The fastest copilot.",
    category: "Code & Development",
    url: 'https://supermaven.com', domain: 'supermaven.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-27",
    tags: ["Copilot", "Coding Assistant", "Productivity"]
  },
  {
    id: "warp",
    name: "Warp",
    description: "The terminal for the 21st century with built-in AI.",
    category: "Code & Development",
    url: 'https://www.warp.dev', domain: 'warp.dev', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221eca9?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-28",
    tags: ["Terminal", "Productivity", "Developer Tools"]
  },
  {
    id: "mochi-1",
    name: "Mochi 1",
    description: "State-of-the-art open source video generation model by Genmo.",
    category: "Video & Audio Tools",
    url: 'https://genmo.ai', domain: 'genmo.ai', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-05-29",
    tags: ["Video Gen", "Open Source", "Models"]
  },
  {
    id: "jan",
    name: "Jan",
    description: "Open-source alternative to ChatGPT that runs 100% offline.",
    category: "AI Chatbots & Assistants",
    url: 'https://jan.ai', domain: 'jan.ai', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-05-30",
    tags: ["Offline AI", "Local AI", "Privacy"]
  },
  {
    id: "anything-llm",
    name: "AnythingLLM",
    description: "The all-in-one desktop application for local AI.",
    category: "Code & Development",
    url: 'https://anythingllm.com', domain: 'anythingllm.com', brandColor: '#444441',
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: false,
    dateAdded: "2024-05-31",
    tags: ["RAG", "Local AI", "Docs"]
  },
  {
    id: "openhands",
    name: "OpenHands",
    description: "An open source AI software engineer (formerly OpenDevin).",
    category: "Code & Development",
    url: 'https://github.com/All-Hands-AI/OpenHands', domain: 'github.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-06-01",
    tags: ["Agents", "Open Source", "Software Engineer"]
  }
];

export const CATEGORIES: CategoryStat[] = CATEGORY_META.map(meta => ({
  ...meta,
  count: MOCK_TOOLS.filter(tool => tool.category === meta.id).length
})).sort((a, b) => b.count - a.count);

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 AI Tools for Students in 2026',
    excerpt: 'Boost your academic performance with these cutting-edge AI assistants designed for research and writing.',
    date: 'Oct 24, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800',
    url: '/blog/1', 
    content: `
      <h2>The Future of Education is Here</h2>
      <p>Artificial Intelligence is transforming the way students learn, research, and write. In 2026, the tools available are more powerful and intuitive than ever before.</p>
      
      <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fm=webp&fit=crop&q=80&w=1200" alt="Students using technology" style="width: 100%; border-radius: 1rem; margin: 2rem 0; max-height: 400px; object-fit: cover;" referrerPolicy="no-referrer" />
      
      <h3>1. Research Assistants</h3>
      <p>Tools like Perplexity and Consensus have revolutionized how students find information. Instead of sifting through endless search results, these AI assistants provide direct answers with citations.</p>
      
      <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fm=webp&fit=crop&q=80&w=1200" alt="Perplexity AI Tool Interface" style="width: 100%; border-radius: 1rem; margin: 2rem 0; max-height: 400px; object-fit: cover;" referrerPolicy="no-referrer" />
      
      <h3>2. Writing Companions</h3>
      <p>While academic integrity is paramount, AI writing tools can help with brainstorming, outlining, and grammar checking. They act as a personal tutor, guiding students to improve their writing skills.</p>
      
      <h3>3. Personalized Learning</h3>
      <p>Adaptive learning platforms use AI to tailor educational content to each student's pace and learning style, ensuring that no one is left behind.</p>
      
      <p>As we move forward, it's crucial for students to learn how to use these tools effectively and ethically. The future belongs to those who can collaborate with AI to enhance their own capabilities.</p>
    `
  },
  {
    id: '2',
    title: 'AI vs Human Creativity: The Balance',
    excerpt: 'Exploring the ethical boundaries and collaborative potential of generative AI in creative industries.',
    date: 'Oct 20, 2025',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fm=webp&fit=crop&q=80&w=800',
    url: '/blog/2', 
    content: `
      <h2>Redefining Creativity</h2>
      <p>The rise of generative AI has sparked a heated debate about the nature of creativity. Can a machine truly be creative, or is it merely mimicking human patterns?</p>
      
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fm=webp&fit=crop&q=80&w=1200" alt="Abstract representation of AI and human creativity" style="width: 100%; border-radius: 1rem; margin: 2rem 0; max-height: 400px; object-fit: cover;" referrerPolicy="no-referrer" />
      
      <h3>The Collaborative Potential</h3>
      <p>Many artists and designers are finding that AI doesn't replace their creativity but rather amplifies it. Tools like Midjourney and DALL-E 3 allow creators to explore new concepts and iterate rapidly.</p>
      
      <h3>Ethical Considerations</h3>
      <p>However, the use of copyrighted material to train these models remains a contentious issue. It's essential to establish clear guidelines and compensation models for artists whose work contributes to AI development.</p>
      
      <h3>The Human Touch</h3>
      <p>Despite the advancements in AI, the human element—emotion, intent, and lived experience—remains unique. The most compelling art often comes from a deep understanding of the human condition, something that AI has yet to fully replicate.</p>
      
      <p>The future of creativity lies in a symbiotic relationship where AI handles the technical execution, freeing humans to focus on the conceptual and emotional core of their work.</p>
    `
  },
  {
    id: '3',
    title: 'Latest AI Trends to Watch',
    excerpt: 'From autonomous agents to multimodal models, here is what is shaping the future of technology.',
    date: 'Oct 15, 2025',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fm=webp&fit=crop&q=80&w=800',
    url: '/blog/3', 
    content: `
      <h2>What's Next for AI?</h2>
      <p>The pace of AI innovation shows no signs of slowing down. Here are the key trends that are shaping the landscape in late 2025 and beyond.</p>
      
      <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=1200" alt="AI technology trends" style="width: 100%; border-radius: 1rem; margin: 2rem 0; max-height: 400px; object-fit: cover;" referrerPolicy="no-referrer" />
      
      <h3>1. Autonomous Agents</h3>
      <p>We are moving from chatbots that respond to prompts to autonomous agents that can execute complex tasks. These agents can plan, reason, and interact with other software to achieve goals with minimal human intervention.</p>
      
      <h3>2. Multimodal Models</h3>
      <p>Models that can understand and generate text, images, audio, and video simultaneously are becoming the standard. This enables more natural and versatile interactions with AI.</p>
      
      <h3>3. AI at the Edge</h3>
      <p>Running powerful AI models directly on devices (laptops, phones) is becoming feasible. This improves privacy, reduces latency, and lowers costs.</p>
      
      <p>Stay tuned as we continue to track these exciting developments. The AI revolution is just getting started.</p>
    `
  }
];