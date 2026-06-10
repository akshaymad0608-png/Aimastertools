const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'prompts.ts');
let content = fs.readFileSync(filePath, 'utf8');

const pePrompts = [
  {
    "id": "pe1",
    "title": "Meta-Prompt Generator",
    "description": "Generates a highly optimized prompt based on a simple idea layout.",
    "category": "Prompt Engineering",
    "platform": "General",
    "promptText": "Act as an expert Prompt Engineer. I will provide you with a basic task or idea: [INSERT BASIC IDEA]. Your goal is to transform this into a comprehensive, highly optimized prompt. Include sections for: Role/Persona, Task Context, Specific Constraints, Formatting Requirements, and Examples (Few-Shot). Present the final prompt in a markdown code block."
  },
  {
    "id": "pe2",
    "title": "Chain of Thought (CoT) Validator",
    "description": "Forces the model to think step-by-step and validate its own logic before answering.",
    "category": "Prompt Engineering",
    "platform": "ChatGPT",
    "promptText": "You are a logical reasoning validation engine. I will provide a complex problem: [INSERT PROBLEM]. Do not give me the final answer immediately. Instead, break the problem down into at least 5 intermediate reasoning steps. After detailing the steps, review your own logic for potential flaws or edge cases. Only after this self-validation should you provide the final summarized answer."
  },
  {
    "id": "pe3",
    "title": "Few-Shot Pattern Setup",
    "description": "A template for creating specialized data extraction or formatting using few-shot examples.",
    "category": "Prompt Engineering",
    "platform": "Claude",
    "promptText": "You are a strict data formatting assistant. You must extract information from the user's input and match the exact JSON structure shown below. \n\nExample 1:\nInput: [Example Input 1]\nOutput: [Example JSON 1]\n\nExample 2:\nInput: [Example Input 2]\nOutput: [Example JSON 2]\n\nNow, process the following input and return ONLY the JSON, nothing else.\nInput: [YOUR ACTUAL INPUT]"
  },
  {
    "id": "pe4",
    "title": "The Megaprompt Framework",
    "description": "A massive, context-heavy structure for complex, multi-agent style tasks.",
    "category": "Prompt Engineering",
    "platform": "General",
    "promptText": "CONTEXT:\n[Provide deep background details]\n\nOBJECTIVE:\n[State the exact goal]\n\nROLE:\n[Define the exact persona, e.g., Senior Data Scientist with 10 years experience]\n\nAUDIENCE:\n[Who is reading/using this output]\n\nTONE & STYLE:\n[e.g., Professional, concise, academic]\n\nCONSTRAINTS:\n1. [Constraint 1]\n2. [Constraint 2]\n\nOUTPUT FORMAT:\n[e.g., Markdown table, JSON, Bullet points]\n\nINPUT DATA:\n[Paste data here]"
  },
  {
    "id": "pe5",
    "title": "Reverse Prompt Engineering",
    "description": "Extract the prompt structure used to generate a specific output.",
    "category": "Prompt Engineering",
    "platform": "ChatGPT",
    "promptText": "I will provide you with a piece of high-quality text/code: [INSERT TEXT]. I want you to perform reverse prompt engineering on it. Deduce and write the exact, highly detailed prompt that would instruct an AI to generate this precise output. Include the persona, constraints, and instructions used."
  }
];

const stringified = pePrompts.map(p => JSON.stringify(p, null, 2)).join(',\n  ');

content = content.replace(
  /}\n\];/g,
  '},\n  ' + stringified + '\n];'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("PE Prompts added!");
