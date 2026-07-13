const fs = require('fs');
let content = fs.readFileSync('data/prompts.ts', 'utf8');

const match = content.match(/export const PROMPT_LIBRARY: Prompt\[\] = (\[[\s\S]*\]);/);
if (match) {
  let prompts = eval(match[1]);
  const date = new Date().toISOString();
  
  prompts = prompts.map((p, i) => {
    // Add date descending
    const pDate = new Date();
    pDate.setDate(pDate.getDate() - i);
    p.dateAdded = pDate.toISOString();
    
    if (p.id === 'p1') {
      p.exampleResultText = "# The Ultimate Guide to Artificial Intelligence\n\nWelcome to the future of technology...\n\n## What is AI?\nArtificial intelligence is...\n\n## FAQs\n**Q: Will AI replace my job?**\nA: AI will augment jobs rather than...";
    }
    if (p.id === 'p2') {
      p.exampleResultText = "```javascript\n// Refactored Code\nconst processUserData = (data) => {\n  // Improved time complexity from O(n^2) to O(n) using a Map\n  const userMap = new Map(data.map(u => [u.id, u]));\n  return userMap;\n}\n```\n**Explanation:** The original code used nested loops...";
    }
    if (p.id === 'p3') {
      p.exampleResultImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&h=600";
    }
    if (p.id === 'pe1') {
      p.exampleResultText = "```markdown\n**Role:** You are a Senior Expert Prompt Engineer...\n\n**Context:** The user needs a system prompt for a specialized code review bot.\n\n**Constraints:**\n- Must output JSON only\n- No conversational filler\n```";
    }
    
    return p;
  });

  const promptsStr = 'export const PROMPT_LIBRARY: Prompt[] = [\n' + prompts.map(t => '  ' + JSON.stringify(t, null, 4).replace(/\n/g, '\n  ')).join(',\n') + '\n];';
  
  content = content.replace(/export const PROMPT_LIBRARY: Prompt\[\] = \[[\s\S]*\];/, promptsStr);
  fs.writeFileSync('data/prompts.ts', content, 'utf8');
  console.log('Fixed prompts.ts');
} else {
  console.log('Match not found');
}
