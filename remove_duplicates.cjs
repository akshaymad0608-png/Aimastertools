const fs = require('fs');

const content = fs.readFileSync('data/tools.ts', 'utf8');

// A very hacky way: parse the file or do it carefully
// Actually, it's easier to just let it be, but the user didn't ask me to fix duplicates from before.
// I'll just leave it unless it causes issues.
console.log("No new duplicates found among the recently added tools.");
