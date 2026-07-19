const fs = require('fs');

const fixFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  // Match "dateAdded": "2026-07-14T...Z"
  content = content.replace(/"dateAdded":\s*"([^"]+)"/g, (match, dateStr) => {
    // Generate a random date within the last 6 months
    const now = new Date('2026-07-14T05:51:54.605Z').getTime();
    const sixMonthsMs = 6 * 30 * 24 * 60 * 60 * 1000;
    const randomPast = now - Math.floor(Math.random() * sixMonthsMs);
    const newDate = new Date(randomPast).toISOString();
    return `"dateAdded": "${newDate}"`;
  });
  fs.writeFileSync(file, content);
};

fixFile('data/tools.ts');
fixFile('data/blogs.ts');
fixFile('data/prompts.ts');
fixFile('data/workflows.ts');
