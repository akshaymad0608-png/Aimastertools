const fs = require('fs');
const path = require('path');

const newPrompts = [
  {
    id: 'p9',
    title: 'Cold Outreach Email',
    description: 'Write a highly converting, personalized cold email for B2B sales.',
    category: 'Sales & Email',
    platform: 'ChatGPT',
    promptText: 'Write a concise, compelling cold outreach email to [TARGET EXACT TITLE] at [COMPANY NAME]. The goal is to get a 15-minute quick call. Highlight how our product solves [SPECIFIC PAIN POINT]. Keep it under 150 words and end with a soft call to action.'
  },
  {
    id: 'p10',
    title: 'Complex Data Extraction',
    description: 'Ask AI to parse unstructured text into a clean JSON format.',
    category: 'Coding',
    platform: 'Claude',
    promptText: 'Extract all the companies, names, and fiscal numbers mentioned in the following unstructured text. Return the result strictly as a valid JSON array of objects without any markdown formatting or introductory text. \n[INSERT UNSTRUCTURED TEXT]'
  },
  {
    id: 'p11',
    title: 'Product Landing Page Copy',
    description: 'Generates high-converting hero copy, features, and CTA for a SaaS landing page.',
    category: 'Marketing',
    platform: 'Claude',
    promptText: 'Write the copy for a high-converting landing page for a new SaaS product called [PRODUCT NAME] which does [WHAT IT DOES]. Include a punchy H1 hero headline, a supporting subheadline, 3 key feature/benefit bullet points, and a strong Call to Action button text. Tone should be professional and persuasive.'
  },
  {
    id: 'p12',
    title: 'Vector Isometric Illustration',
    description: 'Useful for hero images or SaaS website graphics.',
    category: 'Image Generation',
    platform: 'Midjourney',
    promptText: 'A high quality 3d isometric illustration of [SUBJECT, e.g., a data server room], soft colorful gradients, vector art style, clean edges, floating elements, white background, UI/UX asset, high resolution --ar 16:9 --v 6.0'
  },
  {
    id: 'p13',
    title: 'Job Interview Simulator',
    description: 'Practice interviewing for a specific role with the AI as the hiring manager.',
    category: 'Career & HR',
    platform: 'ChatGPT',
    promptText: 'Act as the hiring manager for the [JOB TITLE] position at [COMPANY/INDUSTRY]. You will conduct a job interview with me. Ask me one question at a time, wait for my response, and then ask the next question or drill down. After 5 questions, give me constructive feedback on my performance.'
  },
  {
    id: 'p14',
    title: 'Python Data Analysis Script',
    description: 'Generate python code to analyze CSV data using Pandas.',
    category: 'Coding',
    platform: 'Claude',
    promptText: 'Write a Python script using pandas and matplotlib. The script needs to load a CSV file named [FILE.csv], clean the data by dropping rows with missing values in the [COLUMN_NAME] column, group the data by [COLUMN_NAME], and plot the results as a bar chart.'
  },
  {
    id: 'p15',
    title: 'YouTube Script Hook & Intro',
    description: 'Generate incredibly catchy hooks for youtube videos to maximize retention.',
    category: 'Content Creation',
    platform: 'ChatGPT',
    promptText: 'Write a gripping, fast-paced 30-second intro script for a YouTube video about [TOPIC]. The hook needs to immediately capture attention within the first 3 seconds, introduce the stakes, and present an open loop/mystery that keeps the viewer watching to the end. Do not use generic greetings like \"Hey guys\".'
  },
  {
    id: 'p16',
    title: 'Architectural Rendering',
    description: 'Generate photorealistic renders of building designs or interior spaces.',
    category: 'Image Generation',
    platform: 'Midjourney',
    promptText: 'Architectural photography of a [DESCRIBE BUILDING/SPACE, e.g., modern concrete home hidden in a lush tropical forest], brutalist architecture, floor to ceiling glass windows, sunset lighting, volumetric rays, photorealistic, 8k, Unreal Engine 5 render style --ar 16:9 --stylize 300'
  }
];


const filePath = path.join(__dirname, 'pages', 'Prompts.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const match = /const PROMPT_LIBRARY:\ Prompt\[\] = \[\s*([\s\S]*?)\];/;
const matched = match.exec(content);

if (matched) {
  const innerContent = matched[1];
  const stringifiedNewPrompts = newPrompts.map(p => {
    return `{
    id: '${p.id}',
    title: '${p.title.replace(/'/g, "\\'")}',
    description: '${p.description.replace(/'/g, "\\'")}',
    category: '${p.category.replace(/'/g, "\\'")}',
    platform: '${p.platform}',
    promptText: '${p.promptText.replace(/'/g, "\\'").replace(/\n/g, "\\n")}'
  }`;
  }).join(',\n  ');
  
  const endBracketIndex = matched.index + matched[0].lastIndexOf(']');
  content = content.substring(0, endBracketIndex) + 
            (innerContent.trim() ? ',\n  ' : '') + 
            stringifiedNewPrompts + 
            '\n' + content.substring(endBracketIndex);
            
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully appended new prompts.");
} else {
  console.log("Could not find PROMPT_LIBRARY array.");
}
