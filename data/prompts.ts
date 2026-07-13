import { Prompt } from '../types';

export const PROMPT_LIBRARY: Prompt[] = [
  {
      "id": "p1",
      "title": "SEO Optimized Blog Post",
      "description": "Generates a fully structured, SEO-optimized blog post with headers and FAQs.",
      "category": "SEO & Writing",
      "platform": "ChatGPT",
      "promptText": "Write a comprehensive, SEO-optimized blog post about [TOPIC]. Include a catchy title, introduction, 3-4 H2 headings with detailed content under each, and a conclusion. Also, add 3 popular FAQs at the end. Use a conversational, authoritative tone.",
      "dateAdded": "2026-07-07T15:12:35.949Z",
      "exampleResultText": "# The Ultimate Guide to Artificial Intelligence\n\nWelcome to the future of technology...\n\n## What is AI?\nArtificial intelligence is...\n\n## FAQs\n**Q: Will AI replace my job?**\nA: AI will augment jobs rather than..."
  },
  {
      "id": "p2",
      "title": "Code Refactoring Expert",
      "description": "Ask AI to review and refactor your code for performance and readability.",
      "category": "Coding",
      "platform": "Claude",
      "promptText": "Act as a Senior Software Engineer. Please review the following [LANGUAGE] code. Refactor it to improve performance, readability, and maintainability. Explain the changes you made and why. Here is the code: [INSERT CODE]",
      "dateAdded": "2026-07-06T15:12:35.949Z",
      "exampleResultText": "```javascript\n// Refactored Code\nconst processUserData = (data) => {\n  // Improved time complexity from O(n^2) to O(n) using a Map\n  const userMap = new Map(data.map(u => [u.id, u]));\n  return userMap;\n}\n```\n**Explanation:** The original code used nested loops..."
  },
  {
      "id": "p3",
      "title": "Photorealistic Portrait",
      "description": "Generates a highly detailed, photorealistic portrait of a person.",
      "category": "Image Generation",
      "platform": "Midjourney",
      "promptText": "Photorealistic portrait photography of a [SUBJECT], dramatic lighting, 85mm lens, f/1.8, cinematic, intricate details, 8k resolution, photorealism --ar 4:5 --stylize 250",
      "dateAdded": "2026-07-05T15:12:35.949Z",
      "exampleResultImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&h=600"
  },
  {
      "id": "p4",
      "title": "Startup Pitch Deck Outline",
      "description": "Creates a structured outline for a standard startup pitch deck.",
      "category": "Business",
      "platform": "ChatGPT",
      "promptText": "Create a 10-slide pitch deck outline for a startup in the [INDUSTRY] space solving [PROBLEM]. For each slide, provide a concise title and 3 key bullet points of information that need to be presented.",
      "dateAdded": "2026-07-04T15:12:35.949Z"
  },
  {
      "id": "p5",
      "title": "Social Media Content Calendar",
      "description": "Generates a 30-day content calendar for social media platforms.",
      "category": "Marketing",
      "platform": "ChatGPT",
      "promptText": "Create a 30-day social media content calendar for a [TYPE OF BUSINESS]. Include a mix of educational, promotional, and engaging posts. Format it as a table with columns for Day, Content Theme, Post Idea, and Target Platform.",
      "dateAdded": "2026-07-03T15:12:35.949Z"
  },
  {
      "id": "p6",
      "title": "Minimalist Logo Design",
      "description": "Prompts an image generator to create a modern, minimalist logo.",
      "category": "Image Generation",
      "platform": "Midjourney",
      "promptText": "A minimalist, modern logo design for a [TYPE OF COMPANY] company, vector art, flat colors, clean lines, white background, no text --no text --v 6.0",
      "dateAdded": "2026-07-02T15:12:35.949Z"
  },
  {
      "id": "p7",
      "title": "Language Learning Partner",
      "description": "Turn the AI into an interactive language learning tutor.",
      "category": "Education",
      "platform": "ChatGPT",
      "promptText": "Act as a native [LANGUAGE] speaker and language tutor. Let us have a conversation. You will ask me a simple question, wait for my reply, correct any grammatical mistakes I make, and then continue the conversation.",
      "dateAdded": "2026-07-01T15:12:35.949Z"
  },
  {
      "id": "p8",
      "title": "UI/UX App Concept",
      "description": "Generate web/app UI design concepts.",
      "category": "Image Generation",
      "platform": "Midjourney",
      "promptText": "UI/UX design of a modern mobile app for [APP PURPOSE], clean interface, vibrant colors, dribbble winning design, high resolution, soft shadows, 3d isometric presentation --ar 16:9",
      "dateAdded": "2026-06-30T15:12:35.949Z"
  },
  {
      "id": "p9",
      "title": "Cold Outreach Email",
      "description": "Write a highly converting, personalized cold email for B2B sales.",
      "category": "Sales & Email",
      "platform": "ChatGPT",
      "promptText": "Write a concise, compelling cold outreach email to [TARGET EXACT TITLE] at [COMPANY NAME]. The goal is to get a 15-minute quick call. Highlight how our product solves [SPECIFIC PAIN POINT]. Keep it under 150 words and end with a soft call to action.",
      "dateAdded": "2026-06-29T15:12:35.949Z"
  },
  {
      "id": "p10",
      "title": "Complex Data Extraction",
      "description": "Ask AI to parse unstructured text into a clean JSON format.",
      "category": "Coding",
      "platform": "Claude",
      "promptText": "Extract all the companies, names, and fiscal numbers mentioned in the following unstructured text. Return the result strictly as a valid JSON array of objects without any markdown formatting or introductory text. \n[INSERT UNSTRUCTURED TEXT]",
      "dateAdded": "2026-06-28T15:12:35.949Z"
  },
  {
      "id": "p11",
      "title": "Product Landing Page Copy",
      "description": "Generates high-converting hero copy, features, and CTA for a SaaS landing page.",
      "category": "Marketing",
      "platform": "Claude",
      "promptText": "Write the copy for a high-converting landing page for a new SaaS product called [PRODUCT NAME] which does [WHAT IT DOES]. Include a punchy H1 hero headline, a supporting subheadline, 3 key feature/benefit bullet points, and a strong Call to Action button text. Tone should be professional and persuasive.",
      "dateAdded": "2026-06-27T15:12:35.949Z"
  },
  {
      "id": "p12",
      "title": "Vector Isometric Illustration",
      "description": "Useful for hero images or SaaS website graphics.",
      "category": "Image Generation",
      "platform": "Midjourney",
      "promptText": "A high quality 3d isometric illustration of [SUBJECT, e.g., a data server room], soft colorful gradients, vector art style, clean edges, floating elements, white background, UI/UX asset, high resolution --ar 16:9 --v 6.0",
      "dateAdded": "2026-06-26T15:12:35.949Z"
  },
  {
      "id": "p13",
      "title": "Job Interview Simulator",
      "description": "Practice interviewing for a specific role with the AI as the hiring manager.",
      "category": "Career & HR",
      "platform": "ChatGPT",
      "promptText": "Act as the hiring manager for the [JOB TITLE] position at [COMPANY/INDUSTRY]. You will conduct a job interview with me. Ask me one question at a time, wait for my response, and then ask the next question or drill down. After 5 questions, give me constructive feedback on my performance.",
      "dateAdded": "2026-06-25T15:12:35.949Z"
  },
  {
      "id": "p14",
      "title": "Python Data Analysis Script",
      "description": "Generate python code to analyze CSV data using Pandas.",
      "category": "Coding",
      "platform": "Claude",
      "promptText": "Write a Python script using pandas and matplotlib. The script needs to load a CSV file named [FILE.csv], clean the data by dropping rows with missing values in the [COLUMN_NAME] column, group the data by [COLUMN_NAME], and plot the results as a bar chart.",
      "dateAdded": "2026-06-24T15:12:35.949Z"
  },
  {
      "id": "p15",
      "title": "YouTube Script Hook & Intro",
      "description": "Generate incredibly catchy hooks for youtube videos to maximize retention.",
      "category": "Content Creation",
      "platform": "ChatGPT",
      "promptText": "Write a gripping, fast-paced 30-second intro script for a YouTube video about [TOPIC]. The hook needs to immediately capture attention within the first 3 seconds, introduce the stakes, and present an open loop/mystery that keeps the viewer watching to the end. Do not use generic greetings like \"Hey guys\".",
      "dateAdded": "2026-06-23T15:12:35.949Z"
  },
  {
      "id": "p16",
      "title": "Architectural Rendering",
      "description": "Generate photorealistic renders of building designs or interior spaces.",
      "category": "Image Generation",
      "platform": "Midjourney",
      "promptText": "Architectural photography of a [DESCRIBE BUILDING/SPACE, e.g., modern concrete home hidden in a lush tropical forest], brutalist architecture, floor to ceiling glass windows, sunset lighting, volumetric rays, photorealistic, 8k, Unreal Engine 5 render style --ar 16:9 --stylize 300",
      "dateAdded": "2026-06-22T15:12:35.949Z"
  },
  {
      "id": "pe1",
      "title": "Meta-Prompt Generator",
      "description": "Generates a highly optimized prompt based on a simple idea layout.",
      "category": "Prompt Engineering",
      "platform": "General",
      "promptText": "Act as an expert Prompt Engineer. I will provide you with a basic task or idea: [INSERT BASIC IDEA]. Your goal is to transform this into a comprehensive, highly optimized prompt. Include sections for: Role/Persona, Task Context, Specific Constraints, Formatting Requirements, and Examples (Few-Shot). Present the final prompt in a markdown code block.",
      "dateAdded": "2026-06-21T15:12:35.949Z",
      "exampleResultText": "```markdown\n**Role:** You are a Senior Expert Prompt Engineer...\n\n**Context:** The user needs a system prompt for a specialized code review bot.\n\n**Constraints:**\n- Must output JSON only\n- No conversational filler\n```"
  },
  {
      "id": "pe2",
      "title": "Chain of Thought (CoT) Validator",
      "description": "Forces the model to think step-by-step and validate its own logic before answering.",
      "category": "Prompt Engineering",
      "platform": "ChatGPT",
      "promptText": "You are a logical reasoning validation engine. I will provide a complex problem: [INSERT PROBLEM]. Do not give me the final answer immediately. Instead, break the problem down into at least 5 intermediate reasoning steps. After detailing the steps, review your own logic for potential flaws or edge cases. Only after this self-validation should you provide the final summarized answer.",
      "dateAdded": "2026-06-20T15:12:35.949Z"
  },
  {
      "id": "pe3",
      "title": "Few-Shot Pattern Setup",
      "description": "A template for creating specialized data extraction or formatting using few-shot examples.",
      "category": "Prompt Engineering",
      "platform": "Claude",
      "promptText": "You are a strict data formatting assistant. You must extract information from the user's input and match the exact JSON structure shown below. \n\nExample 1:\nInput: [Example Input 1]\nOutput: [Example JSON 1]\n\nExample 2:\nInput: [Example Input 2]\nOutput: [Example JSON 2]\n\nNow, process the following input and return ONLY the JSON, nothing else.\nInput: [YOUR ACTUAL INPUT]",
      "dateAdded": "2026-06-19T15:12:35.949Z"
  },
  {
      "id": "pe4",
      "title": "The Megaprompt Framework",
      "description": "A massive, context-heavy structure for complex, multi-agent style tasks.",
      "category": "Prompt Engineering",
      "platform": "General",
      "promptText": "CONTEXT:\n[Provide deep background details]\n\nOBJECTIVE:\n[State the exact goal]\n\nROLE:\n[Define the exact persona, e.g., Senior Data Scientist with 10 years experience]\n\nAUDIENCE:\n[Who is reading/using this output]\n\nTONE & STYLE:\n[e.g., Professional, concise, academic]\n\nCONSTRAINTS:\n1. [Constraint 1]\n2. [Constraint 2]\n\nOUTPUT FORMAT:\n[e.g., Markdown table, JSON, Bullet points]\n\nINPUT DATA:\n[Paste data here]",
      "dateAdded": "2026-06-18T15:12:35.949Z"
  },
  {
      "id": "pe5",
      "title": "Reverse Prompt Engineering",
      "description": "Extract the prompt structure used to generate a specific output.",
      "category": "Prompt Engineering",
      "platform": "ChatGPT",
      "promptText": "I will provide you with a piece of high-quality text/code: [INSERT TEXT]. I want you to perform reverse prompt engineering on it. Deduce and write the exact, highly detailed prompt that would instruct an AI to generate this precise output. Include the persona, constraints, and instructions used.",
      "dateAdded": "2026-06-17T15:12:35.949Z"
  }
];
