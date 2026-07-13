const fs = require('fs');

function replaceKeywords(filePath, newKeywordsStr) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Use regex to match keywords={...} block
  const keywordRegex = /keywords=\{\[([^\]]+)\]\}/;
  content = content.replace(keywordRegex, `keywords={[${newKeywordsStr}]}`);
  fs.writeFileSync(filePath, content);
}

replaceKeywords('pages/Bookmarks.tsx', `"bookmarked ai tools", "saved ai tools", "favorite ai tools", "my ai tools", "best ai tools 2026", "free ai tools list", "ai tools directory"`);
replaceKeywords('pages/FindMyTool.tsx', `"find AI tool", "AI tool recommender", "AI tool finder", "best ai tools", "free ai tools", "ai software directory", "top ai software", "chatgpt alternatives"`);
replaceKeywords('pages/BlogIndex.tsx', `"ai blog", "prompt engineering", "ai tool reviews", "artificial intelligence news", "best ai tools", "free ai tools", "generative ai updates", "ai guides"`);
replaceKeywords('pages/Prompts.tsx', `"AI prompts", "best chatgpt prompts", "midjourney prompts", "claude prompts", "prompt engineering", "free ai prompts", "best ai tools", "chatgpt alternative"`);
replaceKeywords('pages/Compare.tsx', `"compare AI tools", "AI software comparison", "best ai tools", "free ai tools list", "AI pricing comparison", "chatgpt vs claude", "top ai tools 2026"`);
// ToolDetail and BlogPost have dynamic keywords, so let's only modify them carefully if needed.
// Actually, let's leave ToolDetail and BlogPost since they incorporate dynamic categories/tags.
replaceKeywords('pages/Discover.tsx', `"discover ai tools", "latest ai tools", "trending ai tools", "new ai software", "best ai tools", "free ai tools", "ai tools directory"`);

console.log("Updated keywords on multiple pages.");
