import fs from 'fs';

const constantsContent = fs.readFileSync('constants.tsx', 'utf8');

// The file was corrupted by appending to the end. Let's fix it.
// First, find the start of BLOG_POSTS
const blogPostsIndex = constantsContent.indexOf('export const BLOG_POSTS: BlogPost[] = [');

if (blogPostsIndex !== -1) {
  // We need to extract the original content before the corruption
  // The corruption started after the last valid BLOG_POSTS item.
  // Actually, I can just use git checkout if it's a git repo, but let's just fix it manually.
  
  // Let's read the file and split by lines
  const lines = constantsContent.split('\n');
  
  // Find where the corruption starts (line 5342 is `,`)
  let corruptionStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("id: '423',") && lines[i+1].includes("name: 'SurgeGraph',") && lines[i+2].includes("description: 'Powerful AI tool for SEO.',")) {
      corruptionStart = i - 2; // The `{` before it, and the `,` before that
      break;
    }
  }
  
  if (corruptionStart !== -1) {
    console.log(`Found corruption at line ${corruptionStart + 1}`);
    
    // The valid content ends at corruptionStart
    // We need to add `];` to close BLOG_POSTS
    const validLines = lines.slice(0, corruptionStart);
    validLines.push('];');
    
    // Now we have the original file content restored.
    let restoredContent = validLines.join('\n');
    
    // Now let's inject the new tools into MOCK_TOOLS
    // Find the end of MOCK_TOOLS
    const mockToolsEndIndex = restoredContent.indexOf('export const BLOG_POSTS: BlogPost[] = [');
    
    if (mockToolsEndIndex !== -1) {
      // Find the `];` just before `export const BLOG_POSTS`
      const beforeBlogPosts = restoredContent.substring(0, mockToolsEndIndex);
      const lastBracketIndex = beforeBlogPosts.lastIndexOf('];');
      
      if (lastBracketIndex !== -1) {
        // Extract the tools string from the corrupted part
        const toolsString = lines.slice(corruptionStart + 1, lines.length - 2).join('\n'); // skip `, {` and `];`
        
        // Insert the tools into MOCK_TOOLS
        const newContent = restoredContent.substring(0, lastBracketIndex) + 
                           ',\n' + toolsString + '\n' + 
                           restoredContent.substring(lastBracketIndex);
                           
        fs.writeFileSync('constants.tsx', newContent);
        console.log('Successfully fixed and inserted tools into MOCK_TOOLS.');
      }
    }
  } else {
    console.log('Could not find corruption start.');
  }
}
