const fs = require('fs');

const newWorkflows = [
  {
    id: "wf-6",
    title: "24/7 Automated Customer Support Triage",
    description: "Use AI to read incoming support tickets, categorize them, resolve basic queries, and route complex ones to human agents.",
    category: "Customer Support",
    difficulty: "Intermediate",
    timeToImplement: "45 mins",
    tools: ["Zendesk", "OpenAI API", "Zapier"],
    rating: 4.8,
    author: "Support Bot Pro",
    steps: [
      {
        id: "s1",
        title: "Ingest Tickets",
        description: "Trigger Zapier whenever a new ticket is created in Zendesk.",
        tool: "Zendesk"
      },
      {
        id: "s2",
        title: "Analyze and Categorize",
        description: "Send the ticket content to OpenAI to determine the issue category, sentiment, and whether it can be auto-resolved.",
        tool: "OpenAI API"
      },
      {
        id: "s3",
        title: "Auto-Respond or Route",
        description: "If auto-resolvable, draft and send a reply via Zendesk. Otherwise, tag the ticket and route it to the appropriate human team.",
        tool: "Zapier"
      }
    ]
  },
  {
    id: "wf-7",
    title: "AI Video Course Generator",
    description: "Turn text scripts into fully produced training videos with AI avatars and synthetic voice.",
    category: "Video Production",
    difficulty: "Beginner",
    timeToImplement: "30 mins",
    tools: ["HeyGen", "ElevenLabs", "ChatGPT"],
    rating: 4.9,
    author: "Video AI",
    steps: [
      {
        id: "s1",
        title: "Script Writing",
        description: "Use ChatGPT to write a structured video script, including visual cues and pacing notes.",
        tool: "ChatGPT"
      },
      {
        id: "s2",
        title: "Voice Generation",
        description: "Import the script into ElevenLabs to generate a realistic voiceover.",
        tool: "ElevenLabs"
      },
      {
        id: "s3",
        title: "Avatar Video Creation",
        description: "Upload the audio and script to HeyGen to animate a photorealistic AI avatar presenting the course.",
        tool: "HeyGen"
      }
    ]
  },
  {
    id: "wf-8",
    title: "Automated Resume Screening Pipeline",
    description: "Automatically parse incoming resumes, score them against job descriptions, and notify the hiring manager.",
    category: "HR & Recruiting",
    difficulty: "Advanced",
    timeToImplement: "1.5 hours",
    tools: ["Workable", "Make.com", "Claude"],
    rating: 4.7,
    author: "HR Tech AI",
    steps: [
      {
        id: "s1",
        title: "Extract Applicant Data",
        description: "Use Make.com to trigger on a new application in Workable and extract the resume PDF.",
        tool: "Workable"
      },
      {
        id: "s2",
        title: "Parse and Score",
        description: "Send the resume text and the job description to Claude to generate a match score (0-100) and a brief summary.",
        tool: "Claude"
      },
      {
        id: "s3",
        title: "Update ATS and Notify",
        description: "Update the candidate's profile in Workable with the score and send a Slack notification to the hiring manager for top candidates.",
        tool: "Make.com"
      }
    ]
  },
  {
    id: "wf-9",
    title: "UI to Code Conversion",
    description: "Design in Figma, generate clean React code using AI, and deploy instantly.",
    category: "Design & UI/UX",
    difficulty: "Intermediate",
    timeToImplement: "40 mins",
    tools: ["Figma", "v0 by Vercel", "GitHub"],
    rating: 4.8,
    author: "Frontend Wizard",
    steps: [
      {
        id: "s1",
        title: "Design Export",
        description: "Create your UI wireframe or high-fidelity design in Figma.",
        tool: "Figma"
      },
      {
        id: "s2",
        title: "Generate Code",
        description: "Use v0 by Vercel (or similar plugins) to generate React/Tailwind code directly from the design.",
        tool: "v0 by Vercel"
      },
      {
        id: "s3",
        title: "Push and Deploy",
        description: "Push the generated code to GitHub for instant preview deployment.",
        tool: "GitHub"
      }
    ]
  },
  {
    id: "wf-10",
    title: "Automated Invoice Processing",
    description: "Extract data from incoming PDF invoices via email, validate the information, and push it to accounting software.",
    category: "Finance & Accounting",
    difficulty: "Advanced",
    timeToImplement: "2 hours",
    tools: ["Gmail", "Document AI", "QuickBooks"],
    rating: 4.6,
    author: "Finance Automator",
    steps: [
      {
        id: "s1",
        title: "Catch Invoice Emails",
        description: "Set up a rule to forward emails with invoice attachments to a specific parsing endpoint.",
        tool: "Gmail"
      },
      {
        id: "s2",
        title: "Extract Data",
        description: "Use Google Cloud Document AI to extract the vendor name, total amount, date, and line items from the PDF.",
        tool: "Document AI"
      },
      {
        id: "s3",
        title: "Log in QuickBooks",
        description: "Use an API integration to automatically create a draft bill in QuickBooks for approval.",
        tool: "QuickBooks"
      }
    ]
  }
];

let content = fs.readFileSync('data/workflows.ts', 'utf8');
content = content.replace(/export const WORKFLOWS: Workflow\[\] = \[\n/, 'export const WORKFLOWS: Workflow[] = [\n' + newWorkflows.map(wf => '  ' + JSON.stringify(wf, null, 4).replace(/\n/g, '\n  ') + ',').join('\n') + '\n');

fs.writeFileSync('data/workflows.ts', content, 'utf8');
console.log('Added 5 new workflows to workflows.ts');
