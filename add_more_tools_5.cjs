const fs = require('fs');
const path = require('path');

const newTools = [
  {
    "id": "intercom-fin",
    "name": "Intercom Fin",
    "description": "A breakthrough AI customer service bot that resolves issues instantly using your existing support content.",
    "longDescription": "Comprehensive review of Intercom Fin. It drastically reduces support volume by answering complex customer questions using your exact knowledge base.",
    "category": "Customer Support",
    "url": "https://intercom.com/fin",
    "domain": "intercom.com",
    "brandColor": "#005EF0",
    "imageUrl": "https://img.logo.dev/intercom.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Customer Service", "Bot", "Knowledge Base"],
    "useCases": ["Instant ticket resolution", "24/7 global support availability"],
    "launchYear": 2023
  },
  {
    "id": "zendesk-ai",
    "name": "Zendesk AI",
    "description": "Intelligent customer routing and agent assistance directly built into the world's most popular ticketing system.",
    "longDescription": "Comprehensive review of Zendesk AI. Seamlessly integrated AI features that understand customer sentiment and provide agents with suggested replies.",
    "category": "Customer Support",
    "url": "https://zendesk.com/ai",
    "domain": "zendesk.com",
    "brandColor": "#03363D",
    "imageUrl": "https://img.logo.dev/zendesk.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Ticketing", "Agent Assist", "Sentiment Analysis"],
    "useCases": ["Helpdesk automation", "Agent productivity enhancement"],
    "launchYear": 2023
  },
  {
    "id": "paradox-ai",
    "name": "Paradox",
    "description": "Conversational recruiting software featuring Olivia, an AI assistant who screens and schedules candidates.",
    "longDescription": "Comprehensive review of Paradox AI. Helps leading brands automate the recruiting process from application to interview scheduling seamlessly.",
    "category": "HR & Recruiting",
    "url": "https://paradox.ai",
    "domain": "paradox.ai",
    "brandColor": "#00A1E0",
    "imageUrl": "https://img.logo.dev/paradox.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Recruiting", "Screening", "Interviews"],
    "useCases": ["High-volume hiring", "Automated candidate screening"],
    "launchYear": 2016
  },
  {
    "id": "eightfold-ai",
    "name": "Eightfold AI",
    "description": "Powerful talent intelligence platform using deep learning to match candidates with internal and external roles.",
    "longDescription": "Comprehensive review of Eightfold AI. Delivers AI-driven talent acquisition and management, mitigating bias and revealing candidate potential.",
    "category": "HR & Recruiting",
    "url": "https://eightfold.ai",
    "domain": "eightfold.ai",
    "brandColor": "#0C2340",
    "imageUrl": "https://img.logo.dev/eightfold.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Talent Management", "Diversity", "Internal Mobility"],
    "useCases": ["Enterprise talent mapping", "Skills-based hiring"],
    "launchYear": 2016
  },
  {
    "id": "corti",
    "name": "Corti",
    "description": "AI co-pilot for healthcare professionals, offering real-time guidance during patient consultations.",
    "longDescription": "Comprehensive review of Corti. Assures high-quality patient encounters by listening to conversations and suggesting diagnoses and workflows.",
    "category": "AI Healthcare Tools",
    "url": "https://corti.ai",
    "domain": "corti.ai",
    "brandColor": "#151B26",
    "imageUrl": "https://img.logo.dev/corti.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Voice Analysis", "Diagnosis", "Co-pilot"],
    "useCases": ["Emergency dispatch guidance", "Clinical consultation transcription"],
    "launchYear": 2016
  },
  {
    "id": "butterfly-network",
    "name": "Butterfly Network",
    "description": "Handheld ultrasound technology empowered by sophisticated AI analytics for rapid, portable medical imaging.",
    "longDescription": "Comprehensive review of Butterfly iQ+. Uses AI to guide users to better ultrasound images, democratizing medical imaging globally.",
    "category": "AI Healthcare Tools",
    "url": "https://butterflynetwork.com",
    "domain": "butterflynetwork.com",
    "brandColor": "#000000",
    "imageUrl": "https://img.logo.dev/butterflynetwork.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString(),
    "tags": ["Imaging", "Ultrasound", "Diagnostics"],
    "useCases": ["Point-of-care ultrasound", "Remote healthcare clinics"],
    "launchYear": 2011
  },
  {
    "id": "alpha-sense",
    "name": "AlphaSense",
    "description": "Market intelligence and search platform designed specifically for finance professionals to uncover data insights.",
    "longDescription": "Comprehensive review of AlphaSense. Indexes billions of financial documents, applying AI to extract critical signals hidden within earnings calls and filings.",
    "category": "Business & Finance AI",
    "url": "https://alpha-sense.com",
    "domain": "alpha-sense.com",
    "brandColor": "#0A253F",
    "imageUrl": "https://img.logo.dev/alpha-sense.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Market Research", "Financial Data", "Search Engine"],
    "useCases": ["Equity research analysis", "Competitive market intelligence"],
    "launchYear": 2011
  },
  {
    "id": "highradius",
    "name": "HighRadius",
    "description": "AI-driven order-to-cash and treasury management software for enterprise finance and accounting teams.",
    "longDescription": "Comprehensive review of HighRadius. Automates heavily manual financial processes like cash application, credit management, and billing using predictive AI.",
    "category": "Business & Finance AI",
    "url": "https://highradius.com",
    "domain": "highradius.com",
    "brandColor": "#00539B",
    "imageUrl": "https://img.logo.dev/highradius.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.6,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Accounting", "Treasury", "Invoice Management"],
    "useCases": ["B2B payment automation", "Cash flow forecasting"],
    "launchYear": 2006
  },
  {
    "id": "harvey-ai",
    "name": "Harvey",
    "description": "Custom LLM designed exclusively for elite law firms to assist in contract analysis, due diligence, and litigation.",
    "longDescription": "Comprehensive review of Harvey. Provides generative AI for the legal domain, strictly maintaining compliance, confidentiality, and deep legal logic.",
    "category": "Legal & Compliance",
    "url": "https://harvey.ai",
    "domain": "harvey.ai",
    "brandColor": "#1A1A1A",
    "imageUrl": "https://img.logo.dev/harvey.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString(),
    "tags": ["Lawyer Copilot", "Contract Review", "Due Diligence"],
    "useCases": ["Mass contract abstraction", "Drafting legal memos"],
    "launchYear": 2022
  },
  {
    "id": "luminance",
    "name": "Luminance",
    "description": "Pioneering AI for the legal processing of documents, automatically reading, understanding, and highlighting risks.",
    "longDescription": "Comprehensive review of Luminance. Enhances human lawyer workflow by instantly pinpointing anomalies across thousands of uploaded corporate documents.",
    "category": "Legal & Compliance",
    "url": "https://luminance.com",
    "domain": "luminance.com",
    "brandColor": "#E30613",
    "imageUrl": "https://img.logo.dev/luminance.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["eDiscovery", "Compliance Audits", "Document Analysis"],
    "useCases": ["M&A due diligence", "Real estate lease abstraction"],
    "launchYear": 2015
  }
];

const filePath = path.join(__dirname, 'data', 'tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the end of the MOCK_TOOLS array
const match = /export const MOCK_TOOLS: Tool\[\] = \[\s*([\s\S]*?)\];/g;
let lastMatch;
let m;
while ((m = match.exec(content)) !== null) {
  lastMatch = m;
}

if (lastMatch) {
  const innerContent = lastMatch[1];
  const stringifiedNewTools = newTools.map(t => JSON.stringify(t, null, 2)).join(',\n  ');
  
  const endBracketIndex = lastMatch.index + lastMatch[0].lastIndexOf(']');
  
  content = content.substring(0, endBracketIndex) + 
            (innerContent.trim() ? ',\n  ' : '') + 
            stringifiedNewTools + 
            '\n' + content.substring(endBracketIndex);
            
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully appended new tools.");
} else {
  console.log("Could not find MOCK_TOOLS array.");
}
