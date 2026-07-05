export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  tool: string;
  icon?: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToImplement: string;
  tools: string[];
  rating: number;
  steps: WorkflowStep[];
  videoUrl?: string;
  author: string;
}

export const WORKFLOWS: Workflow[] = [
  {
      "id": "wf-6",
      "title": "24/7 Automated Customer Support Triage",
      "description": "Use AI to read incoming support tickets, categorize them, resolve basic queries, and route complex ones to human agents.",
      "category": "Customer Support",
      "difficulty": "Intermediate",
      "timeToImplement": "45 mins",
      "tools": [
          "Zendesk",
          "OpenAI API",
          "Zapier"
      ],
      "rating": 4.8,
      "author": "Support Bot Pro",
      "steps": [
          {
              "id": "s1",
              "title": "Ingest Tickets",
              "description": "Trigger Zapier whenever a new ticket is created in Zendesk.",
              "tool": "Zendesk"
          },
          {
              "id": "s2",
              "title": "Analyze and Categorize",
              "description": "Send the ticket content to OpenAI to determine the issue category, sentiment, and whether it can be auto-resolved.",
              "tool": "OpenAI API"
          },
          {
              "id": "s3",
              "title": "Auto-Respond or Route",
              "description": "If auto-resolvable, draft and send a reply via Zendesk. Otherwise, tag the ticket and route it to the appropriate human team.",
              "tool": "Zapier"
          }
      ]
  },
  {
      "id": "wf-7",
      "title": "AI Video Course Generator",
      "description": "Turn text scripts into fully produced training videos with AI avatars and synthetic voice.",
      "category": "Video Production",
      "difficulty": "Beginner",
      "timeToImplement": "30 mins",
      "tools": [
          "HeyGen",
          "ElevenLabs",
          "ChatGPT"
      ],
      "rating": 4.9,
      "author": "Video AI",
      "steps": [
          {
              "id": "s1",
              "title": "Script Writing",
              "description": "Use ChatGPT to write a structured video script, including visual cues and pacing notes.",
              "tool": "ChatGPT"
          },
          {
              "id": "s2",
              "title": "Voice Generation",
              "description": "Import the script into ElevenLabs to generate a realistic voiceover.",
              "tool": "ElevenLabs"
          },
          {
              "id": "s3",
              "title": "Avatar Video Creation",
              "description": "Upload the audio and script to HeyGen to animate a photorealistic AI avatar presenting the course.",
              "tool": "HeyGen"
          }
      ]
  },
  {
      "id": "wf-8",
      "title": "Automated Resume Screening Pipeline",
      "description": "Automatically parse incoming resumes, score them against job descriptions, and notify the hiring manager.",
      "category": "HR & Recruiting",
      "difficulty": "Advanced",
      "timeToImplement": "1.5 hours",
      "tools": [
          "Workable",
          "Make.com",
          "Claude"
      ],
      "rating": 4.7,
      "author": "HR Tech AI",
      "steps": [
          {
              "id": "s1",
              "title": "Extract Applicant Data",
              "description": "Use Make.com to trigger on a new application in Workable and extract the resume PDF.",
              "tool": "Workable"
          },
          {
              "id": "s2",
              "title": "Parse and Score",
              "description": "Send the resume text and the job description to Claude to generate a match score (0-100) and a brief summary.",
              "tool": "Claude"
          },
          {
              "id": "s3",
              "title": "Update ATS and Notify",
              "description": "Update the candidate's profile in Workable with the score and send a Slack notification to the hiring manager for top candidates.",
              "tool": "Make.com"
          }
      ]
  },
  {
      "id": "wf-9",
      "title": "UI to Code Conversion",
      "description": "Design in Figma, generate clean React code using AI, and deploy instantly.",
      "category": "Design & UI/UX",
      "difficulty": "Intermediate",
      "timeToImplement": "40 mins",
      "tools": [
          "Figma",
          "v0 by Vercel",
          "GitHub"
      ],
      "rating": 4.8,
      "author": "Frontend Wizard",
      "steps": [
          {
              "id": "s1",
              "title": "Design Export",
              "description": "Create your UI wireframe or high-fidelity design in Figma.",
              "tool": "Figma"
          },
          {
              "id": "s2",
              "title": "Generate Code",
              "description": "Use v0 by Vercel (or similar plugins) to generate React/Tailwind code directly from the design.",
              "tool": "v0 by Vercel"
          },
          {
              "id": "s3",
              "title": "Push and Deploy",
              "description": "Push the generated code to GitHub for instant preview deployment.",
              "tool": "GitHub"
          }
      ]
  },
  {
      "id": "wf-10",
      "title": "Automated Invoice Processing",
      "description": "Extract data from incoming PDF invoices via email, validate the information, and push it to accounting software.",
      "category": "Finance & Accounting",
      "difficulty": "Advanced",
      "timeToImplement": "2 hours",
      "tools": [
          "Gmail",
          "Document AI",
          "QuickBooks"
      ],
      "rating": 4.6,
      "author": "Finance Automator",
      "steps": [
          {
              "id": "s1",
              "title": "Catch Invoice Emails",
              "description": "Set up a rule to forward emails with invoice attachments to a specific parsing endpoint.",
              "tool": "Gmail"
          },
          {
              "id": "s2",
              "title": "Extract Data",
              "description": "Use Google Cloud Document AI to extract the vendor name, total amount, date, and line items from the PDF.",
              "tool": "Document AI"
          },
          {
              "id": "s3",
              "title": "Log in QuickBooks",
              "description": "Use an API integration to automatically create a draft bill in QuickBooks for approval.",
              "tool": "QuickBooks"
          }
      ]
  },
  {
    id: "wf-1",
    title: "Automated SEO Blog Post Generation",
    description: "Connect ChatGPT, Midjourney, and WordPress to fully automate high-ranking SEO blog posts. This workflow helps you create a complete content pipeline.",
    category: "Content Creation",
    difficulty: "Intermediate",
    timeToImplement: "30 mins",
    tools: ["ChatGPT", "Midjourney", "Make.com"],
    rating: 4.9,
    author: "AI Master Team",
    steps: [
      {
        id: "s1",
        title: "Generate Content Idea and Outline",
        description: "Use ChatGPT API via Make.com to generate a weekly list of SEO-optimized blog topics and a detailed outline for the selected topic.",
        tool: "ChatGPT"
      },
      {
        id: "s2",
        title: "Draft the Full Blog Post",
        description: "Pass the outline back to ChatGPT to draft the full article, ensuring formatting in HTML or Markdown.",
        tool: "ChatGPT"
      },
      {
        id: "s3",
        title: "Generate Feature Image",
        description: "Use the Midjourney API or an equivalent image generator to create a high-quality featured image based on the article's topic.",
        tool: "Midjourney"
      },
      {
        id: "s4",
        title: "Publish to WordPress",
        description: "Use the WordPress module in Make.com to create a new draft post, insert the text, attach the featured image, and set categories.",
        tool: "Make.com"
      }
    ]
  },
  {
    id: "wf-2",
    title: "Cold Email Outreach with Personalized AI",
    description: "Use GPT-4 to analyze LinkedIn profiles and generate highly personalized cold emails that get replies.",
    category: "Sales",
    difficulty: "Advanced",
    timeToImplement: "1 hour",
    tools: ["Clay", "OpenAI API", "Apollo"],
    rating: 4.8,
    author: "Sales AI Pro",
    steps: [
      {
        id: "s1",
        title: "Enrich Leads with Clay",
        description: "Import a list of domains or people into Clay, then use its enrichments to scrape LinkedIn profiles and company news.",
        tool: "Clay"
      },
      {
        id: "s2",
        title: "Generate Personalized Openers",
        description: "Send the scraped data to the OpenAI API within Clay to write a highly specific, 2-sentence personalized opener for each lead.",
        tool: "OpenAI API"
      },
      {
        id: "s3",
        title: "Push to Apollo",
        description: "Sync the enriched data and personalized openers to Apollo.io to automatically sequence the emails.",
        tool: "Apollo"
      }
    ]
  },
  {
    id: "wf-3",
    title: "Meeting Notes to Task Auto-Assignment",
    description: "Transcribe meetings and automatically assign action items to team members in Jira or Trello.",
    category: "Productivity",
    difficulty: "Beginner",
    timeToImplement: "15 mins",
    tools: ["Fireflies.ai", "Zapier", "Jira"],
    rating: 4.9,
    author: "Productivity Nerd",
    steps: [
      {
        id: "s1",
        title: "Record and Transcribe",
        description: "Have Fireflies.ai join your Zoom or Meet calls to transcribe and summarize the conversation.",
        tool: "Fireflies.ai"
      },
      {
        id: "s2",
        title: "Extract Action Items",
        description: "Fireflies automatically extracts 'Action Items' from the transcript.",
        tool: "Fireflies.ai"
      },
      {
        id: "s3",
        title: "Create Jira Tasks",
        description: "Use Zapier to catch new action items from Fireflies and automatically create tasks in Jira, assigning them based on name mentions.",
        tool: "Zapier"
      }
    ]
  },
  {
    id: "wf-4",
    title: "Social Media Asset Generation Pipeline",
    description: "Convert a single blog post into a week of tweets, LinkedIn posts, and Instagram captions.",
    category: "Marketing",
    difficulty: "Beginner",
    timeToImplement: "20 mins",
    tools: ["Claude", "Canva", "Buffer"],
    rating: 4.7,
    author: "Marketing Bot",
    steps: [
      {
        id: "s1",
        title: "Analyze Source Content",
        description: "Input your latest blog post URL or text into Claude.",
        tool: "Claude"
      },
      {
        id: "s2",
        title: "Generate Variants",
        description: "Prompt Claude to generate 3 Tweets, 1 LinkedIn post, and 1 Instagram caption from the source text.",
        tool: "Claude"
      },
      {
        id: "s3",
        title: "Create Visuals",
        description: "Use Canva's Bulk Create feature (or an AI image generator) to create matching graphics for each post.",
        tool: "Canva"
      },
      {
        id: "s4",
        title: "Schedule Posts",
        description: "Load the text and images into Buffer to schedule them across the week.",
        tool: "Buffer"
      }
    ]
  },
  {
    id: "wf-5",
    title: "AI-Powered Code Review and Deployment",
    description: "Automate code reviews using GPT-4 and seamlessly deploy to Vercel via GitHub Actions.",
    category: "Development",
    difficulty: "Advanced",
    timeToImplement: "45 mins",
    tools: ["GitHub", "OpenAI API", "Vercel"],
    rating: 5.0,
    author: "DevOps AI",
    steps: [
      {
        id: "s1",
        title: "Create GitHub Action",
        description: "Set up a GitHub Action that triggers on every new Pull Request.",
        tool: "GitHub"
      },
      {
        id: "s2",
        title: "Run Code Review via API",
        description: "Use a custom script to send the git diff to the OpenAI API for automated feedback on security and style.",
        tool: "OpenAI API"
      },
      {
        id: "s3",
        title: "Post Review Comments",
        description: "The Action automatically posts the AI feedback as comments on the PR lines.",
        tool: "GitHub"
      },
      {
        id: "s4",
        title: "Deploy on Merge",
        description: "Once merged, trigger a Vercel deployment automatically.",
        tool: "Vercel"
      }
    ]
  }
];
