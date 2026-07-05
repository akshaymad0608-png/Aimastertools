const fs = require('fs');
let code = fs.readFileSync('data/workflows.ts', 'utf8');

const devWorkflow = `,
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
];`;

code = code.replace(/\n\];/, devWorkflow);
fs.writeFileSync('data/workflows.ts', code, 'utf8');
console.log('Added dev workflow');
