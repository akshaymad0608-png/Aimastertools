const fs = require('fs');
const content = fs.readFileSync('constants.tsx', 'utf8');
const lines = content.split('\n');
const counts = {};
lines.forEach(line => {
    if (line.includes('category: ') || line.includes('"category": ')) {
        const match = line.match(/(category": |category: )['"]([^'"]+)["']/);
        if (match) {
            counts[match[2]] = (counts[match[2]] || 0) + 1;
        }
    }
});
console.log(Object.fromEntries(Object.entries(counts).sort((a,b) => b[1] - a[1])));
