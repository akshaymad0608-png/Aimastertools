const fs = require('fs');
const path = require('path');

const constantsFile = 'constants.tsx';
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

let code = fs.readFileSync(constantsFile, 'utf8');

// We need to parse AST or just regex the blocks.
// Because it's 10,000 lines, regex is faster, let's use string manipulation based on known patterns.

const catMetaMatch = code.indexOf('export const CATEGORY_META = [');
const mockToolsMatch = code.indexOf('export const MOCK_TOOLS: Tool[] = [');
const categoriesMatch = code.indexOf('export const CATEGORIES: CategoryStat[]');
const blogPostsMatch = code.indexOf('export const BLOG_POSTS: BlogPost[]');

if (catMetaMatch === -1 || mockToolsMatch === -1 || categoriesMatch === -1 || blogPostsMatch === -1) {
  console.log("Could not find all exports");
  process.exit(1);
}

const toolTypeImport = `import { Tool, CategoryStat, BlogPost } from '../types';\n\n`;

// 1. tools.ts
const mockToolsBlock = code.substring(mockToolsMatch, categoriesMatch);
fs.writeFileSync(path.join(dataDir, 'tools.ts'), toolTypeImport + mockToolsBlock);

// 2. categories.ts
// It needs CATEGORY_META, CATEGORIES, and it needs MOCK_TOOLS to calculate stats...
// Wait, the CATEGORIES calculation depends on MOCK_TOOLS.
// Let's grab both CATEGORY_META and CATEGORIES, and replace the calculation or import MOCK_TOOLS.
const catMetaBlock = code.substring(catMetaMatch, mockToolsMatch);
const categoriesBlock = code.substring(categoriesMatch, blogPostsMatch);
let categoriesOutput = `import { CategoryStat } from '../types';\nimport { MOCK_TOOLS } from './tools';\n\n`;
categoriesOutput += catMetaBlock;
categoriesOutput += categoriesBlock;
fs.writeFileSync(path.join(dataDir, 'categories.ts'), categoriesOutput);

// 3. blogs.ts
const blogPostsBlock = code.substring(blogPostsMatch);
fs.writeFileSync(path.join(dataDir, 'blogs.ts'), `import { BlogPost } from '../types';\n\n` + blogPostsBlock);

// 4. comparisons.ts
fs.writeFileSync(path.join(dataDir, 'comparisons.ts'), `export const COMPARISONS = [];\n`);

console.log("Split successful");
