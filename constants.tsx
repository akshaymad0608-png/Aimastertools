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
  { id: 'LLM Providers & APIs',      name: 'LLM Providers & APIs',      icon: 'ti-server',         bg: '#EAF3DE', color: '#3B6D11' },
];

export const MOCK_TOOLS: Tool[] = [
{
  "id": "openrouter",
  "name": "OpenRouter",
  "description": "A unified API for accessing dozens of LLMs (like GPT-4, Claude 3, Llama 3) through a single interface with competitive pricing.",
  "category": "LLM Providers & APIs",
  "pricing": "Usage Based",
  "imageUrl": "https://img.logo.dev/openrouter.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://openrouter.ai",
  "domain": "openrouter.ai",
  "brandColor": "#2B2B2B",
  "featured": true,
  "rating": 4.8,
  "dateAdded": "2026-05-10T05:57:40.975Z",
  "tags": [
    "LLM",
    "API",
    "Developer Tools"
  ]
},
{
  "id": "flowise",
  "name": "Flowise",
  "description": "Open source drag-and-drop UI to build your customized LLM flows using Langchain.",
  "category": "AI Agents & Automation",
  "pricing": "Open Source",
  "imageUrl": "https://img.logo.dev/flowiseai.com?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://flowiseai.com",
  "domain": "flowiseai.com",
  "brandColor": "#2BB0E2",
  "featured": false,
  "rating": 4.7,
  "dateAdded": "2026-05-10T05:57:40.976Z",
  "tags": [
    "No Code",
    "Langchain",
    "Agents"
  ]
},
{
  "id": "langflow",
  "name": "Langflow",
  "description": "Langflow is a dynamic graph for LangChain. It allows you to experiment with and prototype LLM apps effortlessly.",
  "category": "AI Agents & Automation",
  "pricing": "Open Source",
  "imageUrl": "https://img.logo.dev/langflow.org?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.langflow.org",
  "domain": "langflow.org",
  "brandColor": "#E65100",
  "featured": false,
  "rating": 4.6,
  "dateAdded": "2026-05-10T05:57:40.976Z",
  "tags": [
    "No Code",
    "Graph",
    "Langchain"
  ]
},
{
  "id": "modelcontextprotocol",
  "name": "Model Context Protocol (MCP)",
  "description": "An open standard that enables AI models to fetch contextual data from tools and systems effortlessly.",
  "category": "Code & Development",
  "pricing": "Open Source",
  "imageUrl": "https://img.logo.dev/modelcontextprotocol.io?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://modelcontextprotocol.io/",
  "domain": "modelcontextprotocol.io",
  "brandColor": "#000000",
  "featured": true,
  "rating": 4.9,
  "dateAdded": "2026-05-10T05:57:40.976Z",
  "tags": [
    "Standard",
    "Context",
    "Data",
    "Agents"
  ]
},
{
  "id": "ideogram",
  "name": "Ideogram",
  "description": "State-of-the-art AI image generator that actually understands text and typography.",
  "category": "Image & Art Generation",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/ideogram.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://ideogram.ai",
  "domain": "ideogram.ai",
  "brandColor": "#000000",
  "featured": true,
  "rating": 4.8,
  "dateAdded": "2026-05-10T05:57:40.976Z",
  "tags": [
    "Text to Image",
    "Typography",
    "Design"
  ]
},
{
  "id": "gauth",
  "name": "Gauth",
  "description": "AI homework helper and math solver app that provides step-by-step solutions.",
  "category": "Learning & Education",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/gauthmath.com?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.gauthmath.com/",
  "domain": "gauthmath.com",
  "brandColor": "#5B4EB5",
  "featured": false,
  "rating": 4.7,
  "dateAdded": "2026-05-10T05:57:40.976Z",
  "tags": [
    "Math",
    "Homework",
    "Education",
    "Students"
  ]
},

{
  "id": "agentgpt",
  "name": "AgentGPT",
  "description": "Assemble, configure, and deploy autonomous AI agents in your browser. Give it a goal, and watch it think, learn, and take action.",
  "category": "AI Agents & Automation",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/agentgpt.reworkd.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://agentgpt.reworkd.ai/",
  "domain": "agentgpt.reworkd.ai",
  "brandColor": "#2B2B2B",
  "featured": false,
  "rating": 4.6,
  "dateAdded": "2026-05-10T05:53:07.183Z",
  "tags": [
    "Agents",
    "Automation",
    "Autonomous"
  ]
},
{
  "id": "lindy-ai",
  "name": "Lindy",
  "description": "Build AI employees in minutes. Your personal AI assistant that can help with emails, calendar management, and custom automations.",
  "category": "AI Agents & Automation",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/lindy.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.lindy.ai",
  "domain": "lindy.ai",
  "brandColor": "#FF5E5E",
  "featured": true,
  "rating": 4.8,
  "dateAdded": "2026-05-10T05:53:07.183Z",
  "tags": [
    "Assistant",
    "Agents",
    "Workflows",
    "Productivity"
  ]
},
{
  "id": "crewai",
  "name": "CrewAI",
  "description": "Cutting-edge framework for orchestrating role-playing, autonomous AI agents. Foster collaborative intelligence for complex tasks.",
  "category": "AI Agents & Automation",
  "pricing": "Open Source",
  "imageUrl": "https://img.logo.dev/crewai.com?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.crewai.com",
  "domain": "crewai.com",
  "brandColor": "#F56A49",
  "featured": false,
  "rating": 4.7,
  "dateAdded": "2026-05-10T05:53:07.183Z",
  "tags": [
    "Agents",
    "Multi-Agent",
    "Framework"
  ]
},
{
  "id": "multion",
  "name": "MultiOn",
  "description": "Build autonomous AI agents for the web. Supercharge your applications with AI agents that can browse, click, and interact with web pages.",
  "category": "AI Agents & Automation",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/multion.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.multion.ai",
  "domain": "multion.ai",
  "brandColor": "#1A1A1A",
  "featured": false,
  "rating": 4.8,
  "dateAdded": "2026-05-10T05:53:07.183Z",
  "tags": [
    "Web Agent",
    "Browser Automation"
  ]
},
{
  "id": "cognition-devin",
  "name": "Devin",
  "description": "The first autonomous AI software engineer. Devin can plan, execute, and collaborate on complex software engineering tasks.",
  "category": "AI Agents & Automation",
  "pricing": "Paid",
  "imageUrl": "https://img.logo.dev/cognition.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.cognition.ai",
  "domain": "cognition.ai",
  "brandColor": "#000000",
  "featured": true,
  "rating": 4.9,
  "dateAdded": "2026-05-10T05:53:07.183Z",
  "tags": [
    "Software Engineering",
    "Autonomous",
    "Coding"
  ]
},
{
  "id": "autogpt",
  "name": "AutoGPT",
  "description": "An experimental open-source attempt to make GPT-4 fully autonomous. AutoGPT strings together LLM thoughts to autonomously achieve whatever goal you set.",
  "category": "AI Agents & Automation",
  "pricing": "Open Source",
  "imageUrl": "https://img.logo.dev/autogpt.net?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://autogpt.net",
  "domain": "autogpt.net",
  "brandColor": "#2B2B2B",
  "featured": false,
  "rating": 4.5,
  "dateAdded": "2026-05-10T05:53:07.183Z",
  "tags": [
    "Autonomous",
    "Agents",
    "Open Source"
  ]
},

{
  "id": "photoresizer",
  "name": "PhotoResizer",
  "description": "Quickly resize, crop, and optimize photos using an easy-to-use interface.",
  "category": "Image & Art Generation",
  "pricing": "Free",
  "imageUrl": "https://img.logo.dev/photoresizer.click?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://photoresizer.click",
  "domain": "photoresizer.click",
  "brandColor": "#3B82F6",
  "featured": false,
  "rating": 4.6,
  "dateAdded": "2026-05-10T05:50:32.819Z",
  "tags": [
    "Image",
    "Resize",
    "Design",
    "Optimization"
  ]
},
{
  "id": "quickresume",
  "name": "QuickResume",
  "description": "Create professional, ATS-friendly resumes quickly and optimize them for your next job application.",
  "category": "AI Writing & Content",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/quickresume.business?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://quickresume.business",
  "domain": "quickresume.business",
  "brandColor": "#10B981",
  "featured": false,
  "rating": 4.7,
  "dateAdded": "2026-05-10T05:50:32.819Z",
  "tags": [
    "Resume",
    "Career",
    "ATS",
    "Job Search"
  ]
},

{
  "id": "rezi",
  "name": "Rezi",
  "description": "AI resume builder that helps you create ATS-compliant resumes with smart content generation.",
  "category": "AI Writing & Content",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/rezi.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.rezi.ai",
  "domain": "rezi.ai",
  "brandColor": "#000000",
  "featured": false,
  "rating": 4.8,
  "dateAdded": "2026-05-10T05:48:19.595Z",
  "tags": [
    "Resume",
    "ATS",
    "Career",
    "Writing"
  ]
},
{
  "id": "teal",
  "name": "Teal",
  "description": "AI resume builder and job tracker to optimize your resume for specific job descriptions.",
  "category": "Productivity & Automation",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/tealhq.com?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.tealhq.com",
  "domain": "tealhq.com",
  "brandColor": "#055C4A",
  "featured": true,
  "rating": 4.9,
  "dateAdded": "2026-05-10T05:48:19.595Z",
  "tags": [
    "Resume",
    "Job Search",
    "Career",
    "ATS"
  ]
},
{
  "id": "kickresume",
  "name": "Kickresume",
  "description": "AI resume and cover letter builder that helps you land jobs faster with professional templates.",
  "category": "AI Writing & Content",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/kickresume.com?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.kickresume.com",
  "domain": "kickresume.com",
  "brandColor": "#0066FF",
  "featured": false,
  "rating": 4.7,
  "dateAdded": "2026-05-10T05:48:19.595Z",
  "tags": [
    "Resume",
    "Cover Letter",
    "Career"
  ]
},
{
  "id": "yoodli",
  "name": "Yoodli",
  "description": "AI speech coaching and interview prep tool that provides real-time feedback on your communication skills.",
  "category": "Learning & Education",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/yoodli.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://yoodli.ai",
  "domain": "yoodli.ai",
  "brandColor": "#6142E0",
  "featured": true,
  "rating": 4.8,
  "dateAdded": "2026-05-10T05:48:19.595Z",
  "tags": [
    "Interview Prep",
    "Speech Coaching",
    "Communication"
  ]
},
{
  "id": "interview-warmup",
  "name": "Interview Warmup",
  "description": "Google's AI tool to practice answering interview questions and get insights on your responses.",
  "category": "Learning & Education",
  "pricing": "Free",
  "imageUrl": "https://img.logo.dev/grow.google?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://grow.google/certificates/interview-warmup/",
  "domain": "grow.google",
  "brandColor": "#4285F4",
  "featured": false,
  "rating": 4.7,
  "dateAdded": "2026-05-10T05:48:19.595Z",
  "tags": [
    "Interview Prep",
    "Google",
    "Career"
  ]
},
{
  "id": "huru",
  "name": "Huru",
  "description": "AI-powered job interview preparation app to practice interviews with simulated questions and feedback.",
  "category": "Learning & Education",
  "pricing": "Freemium",
  "imageUrl": "https://img.logo.dev/huru.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
  "url": "https://www.huru.ai/",
  "domain": "huru.ai",
  "brandColor": "#FF5E5E",
  "featured": false,
  "rating": 4.6,
  "dateAdded": "2026-05-10T05:48:19.595Z",
  "tags": [
    "Interview Prep",
    "Career"
  ]
},

  {
    "id": "vapi",
    "name": "Vapi",
    "description": "Build, test, and deploy advanced voice AI agents in minutes. Make voice AI simple and accessible for developers.",
    "category": "Voice Creator Tools",
    "pricing": "Paid",
    "imageUrl": "https://img.logo.dev/vapi.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://vapi.ai",
    "domain": "vapi.ai",
    "brandColor": "#000000",
    "featured": false,
    "rating": 4.8,
    "dateAdded": new Date().toISOString(),
    "tags": ["Voice AI", "Agents", "Developer Tools", "API"]
  },
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
  },
  {
    id: "grok-2",
    name: "Grok 2",
    description: "The latest AI model by xAI with real-time access to information via the X platform.",
    category: "AI Chatbots & Assistants",
    url: 'https://grok.com', domain: 'grok.com', brandColor: '#000000',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.6,
    featured: true,
    dateAdded: "2024-08-15",
    tags: ["Chatbot", "Real-time", "xAI"]
  },
  {
    id: "recraft-v3",
    name: "Recraft V3",
    description: "An AI graphic design tool specializing in vector art and 3D illustrations.",
    category: "Image & Art Generation",
    url: 'https://recraft.ai', domain: 'recraft.ai', brandColor: '#185FA5',
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: "2024-10-01",
    tags: ["Vector", "Design", "Graphics"]
  },
  {
    id: "v0-by-vercel",
    name: "v0.dev",
    description: "Generative UI system by Vercel to generate UI components using text prompts and Tailwind CSS.",
    category: "Code & Development",
    url: 'https://v0.dev', domain: 'v0.dev', brandColor: '#000000',
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2023-11-01",
    tags: ["React", "TailwindCSS", "UI"]
  },
  {
    id: "suno-ai-v3",
    name: "Suno AI",
    description: "Create amazing songs from simple text prompts in seconds.",
    category: "Video & Audio Tools",
    url: 'https://suno.com', domain: 'suno.com', brandColor: '#72243E',
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-12-01",
    tags: ["Music", "Audio", "Generative"]
  },
  {
    id: "perplexity-pro",
    name: "Perplexity Pro",
    description: "Advanced AI-powered search engine that answers complex questions with cited sources.",
    category: "Research & Analysis",
    url: 'https://perplexity.ai', domain: 'perplexity.ai', brandColor: '#00A6A6',
    imageUrl: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-09-01",
    tags: ["Search", "Research", "Citations"]
  },
  {
    id: "ginkgo-bioworks",
    name: "Ginkgo Bioworks",
    description: "AI-driven platform for cell programming and synthetic biology.",
    category: "Science",
    url: 'https://ginkgobioworks.com', domain: 'ginkgobioworks.com', brandColor: '#28a745',
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.5,
    featured: false,
    dateAdded: "2024-01-20",
    tags: ["Biology", "Synthetic", "Health"]
  },
  {
    id: "github-copilot-workspace",
    name: "GitHub Copilot Workspace",
    description: "An AI-native developer environment that helps you build, test, and run code entirely in your browser.",
    category: "Code & Development",
    url: 'https://copilot-workspace.githubnext.com', domain: 'githubnext.com', brandColor: '#24292e',
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-15",
    tags: ["GitHub", "IDE", "AI Developer"]
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's fastest and most capable model yet, featuring advanced reasoning and coding capabilities.",
    category: "AI Chatbots & Assistants",
    url: 'https://claude.ai', domain: 'claude.ai', brandColor: '#D13500',
    imageUrl: "https://images.unsplash.com/photo-1678382158826-2c9bb58b29df?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-06-20",
    tags: ["Chatbot", "Assistant", "Anthropic"]
  },
  {
    id: "huggingface-spaces",
    name: "Hugging Face Spaces",
    description: "Discover, explore, and deploy machine learning applications created by the community.",
    category: "LLM Providers & APIs",
    url: 'https://huggingface.co/spaces', domain: 'huggingface.co', brandColor: '#FFD21E',
    imageUrl: "https://images.unsplash.com/photo-1633532454641-fc8a0907a9b0?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-02-10",
    tags: ["ML", "Open Source", "Platform"]
  },
  {
    id: "runway-gen3-alpha",
    name: "Gen-3 Alpha",
    description: "High-fidelity, consistent text-to-video generation by Runway.",
    category: "Video & Audio Tools",
    url: 'https://runwayml.com', domain: 'runwayml.com', brandColor: '#000000',
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-07-01",
    tags: ["Video", "Generative", "Runway"]
  },
  {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    description: "An open-source library for building AI-powered user interfaces with React, Svelte, and Vue.",
    category: "Code & Development",
    url: 'https://sdk.vercel.ai', domain: 'vercel.ai', brandColor: '#000000',
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-08-15",
    tags: ["SDK", "Vercel", "Open Source"]
  },
  {
    id: "replicate",
    name: "Replicate",
    description: "Run machine learning models with a cloud API, without having to understand the intricacies of ML.",
    category: "LLM Providers & APIs",
    url: 'https://replicate.com', domain: 'replicate.com', brandColor: '#000000',
    imageUrl: "https://images.unsplash.com/photo-1633532454641-fc8a0907a9b0?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: true,
    dateAdded: "2023-01-10",
    tags: ["API", "Models", "Cloud"]
  },
  {
    id: "modal-labs",
    name: "Modal",
    description: "Run code in the cloud, fast. Modal is built for data, ML, and AI workloads.",
    category: "Code & Development",
    url: 'https://modal.com', domain: 'modal.com', brandColor: '#4f5b66',
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: false,
    dateAdded: "2023-05-20",
    tags: ["Cloud", "Deployment", "Infrastructure"]
  },
  {
    id: "langchain",
    name: "LangChain",
    description: "A framework for developing applications powered by language models.",
    category: "AI Agents & Automation",
    url: 'https://langchain.com', domain: 'langchain.com', brandColor: '#1AAB9B',
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.9,
    featured: true,
    dateAdded: "2023-02-15",
    tags: ["Agents", "Framework", "Open Source"]
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    description: "Data framework for your LLM applications. Provides tools to augment LLMs with your private data.",
    category: "Code & Development",
    url: 'https://llamaindex.ai', domain: 'llamaindex.ai', brandColor: '#4A5568',
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-03-10",
    tags: ["Data", "RAG", "Framework"]
  },
  {
    id: "together-ai",
    name: "Together AI",
    description: "Cloud platform to build and run generative AI models faster and cheaper.",
    category: "LLM Providers & APIs",
    url: 'https://together.ai', domain: 'together.ai', brandColor: '#1740ED',
    imageUrl: "https://images.unsplash.com/photo-1633532454641-fc8a0907a9b0?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2023-11-25",
    tags: ["API", "Models", "Cloud"]
  },
  {
    id: "groq",
    name: "Groq",
    description: "The LPU Inference Engine. Delivering fast AI inference speeds.",
    category: "LLM Providers & APIs",
    url: 'https://groq.com', domain: 'groq.com', brandColor: '#F56565',
    imageUrl: "https://images.unsplash.com/photo-1531297184462-187515a8db16?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-02-20",
    tags: ["Inference", "Fast", "Hardware"]
  },
  {
    id: "anthropic-console",
    name: "Anthropic Console",
    description: "Build, evaluate, and scale applications powered by Claude models.",
    category: "LLM Providers & APIs",
    url: 'https://console.anthropic.com', domain: 'anthropic.com', brandColor: '#D13500',
    imageUrl: "https://images.unsplash.com/photo-1678382158826-2c9bb58b29df?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2023-09-15",
    tags: ["Claude", "API", "Platform"]
  },
  {
    id: "fireworks-ai",
    name: "Fireworks AI",
    description: "Fast and reliable API for open-source AI models.",
    category: "LLM Providers & APIs",
    url: 'https://fireworks.ai', domain: 'fireworks.ai', brandColor: '#D69E2E',
    imageUrl: "https://images.unsplash.com/photo-1633532454641-fc8a0907a9b0?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2023-12-10",
    tags: ["API", "Open Source", "Inference"]
  },
  {
    id: "pinecone",
    name: "Pinecone",
    description: "The vector database for building AI apps. Easily handle long-term memory for your models.",
    category: "Data",
    url: 'https://pinecone.io', domain: 'pinecone.io', brandColor: '#3182CE',
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2022-06-15",
    tags: ["Vector DB", "Database", "RAG"]
  },
  {
    id: "chatgpt-advanced",
    name: "ChatGPT Advanced",
    description: "OpenAI's most capable conversational AI with advanced reasoning, data analysis, and voice mode.",
    category: "AI Chatbots & Assistants",
    url: 'https://chatgpt.com', domain: 'chatgpt.com', brandColor: '#10A37F',
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-05-13",
    tags: ["Conversational", "Assistant", "OpenAI"]
  },
  {
    id: "claude-3-5-opus",
    name: "Claude 3.5 Opus",
    description: "Anthropic's most powerful AI for highly complex tasks, advanced reasoning, and long-form content generation.",
    category: "AI Chatbots & Assistants",
    url: 'https://claude.ai', domain: 'claude.ai', brandColor: '#D13500',
    imageUrl: "https://images.unsplash.com/photo-1678382158826-2c9bb58b29df?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2024-08-01",
    tags: ["Conversational", "Reasoning", "Anthropic"]
  },
  {
    id: "gemini-advanced",
    name: "Gemini Advanced",
    description: "Google's most capable AI model, natively multimodal and integrated into the Google Workspace.",
    category: "AI Chatbots & Assistants",
    url: 'https://gemini.google.com', domain: 'gemini.google.com', brandColor: '#1A73E8',
    imageUrl: "https://images.unsplash.com/photo-1707227155606-2580c8eb4bbf?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-02-08",
    tags: ["Conversational", "Google", "Multimodal"]
  },
  {
    id: "meta-ai-assistant",
    name: "Meta AI",
    description: "Meta's intelligent assistant powered by Llama 3, built directly into WhatsApp, Instagram, and Messenger.",
    category: "AI Chatbots & Assistants",
    url: 'https://meta.ai', domain: 'meta.ai', brandColor: '#0668E1',
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.6,
    featured: false,
    dateAdded: "2024-04-18",
    tags: ["Conversational", "Meta", "Social"]
  },
  {
    id: "pi-personal-ai",
    name: "Pi: Personal AI",
    description: "A supportive and empathetic conversational AI designed to be your personal companion.",
    category: "AI Chatbots & Assistants",
    url: 'https://pi.ai', domain: 'pi.ai', brandColor: '#0E4949',
    imageUrl: "https://images.unsplash.com/photo-1543269664-7bfb7a1515dc?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Free",
    rating: 4.7,
    featured: true,
    dateAdded: "2023-05-02",
    tags: ["Companion", "Empathetic", "Chatbot"]
  },
  {
    id: "microsoft-copilot-pro",
    name: "Microsoft Copilot Pro",
    description: "Your everyday AI companion from Microsoft, offering priority access to GPT-4o and integration with Office apps.",
    category: "AI Chatbots & Assistants",
    url: 'https://copilot.microsoft.com', domain: 'copilot.microsoft.com', brandColor: '#107C41',
    imageUrl: "https://images.unsplash.com/photo-1681412335198-d703138fb3ea?auto=format&fm=webp&fit=crop&q=80&w=800",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2024-01-15",
    tags: ["Conversational", "Microsoft", "Productivity"]
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
