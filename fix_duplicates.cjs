const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

// We have duplicates, we should parse the objects or use regex to replace later duplicate occurrences. 
// But constants is a TS file. It's safer to just change the IDs of the duplicates to make them unique.
const duplicates = ['copy-ai', 'zendesk-ai', 'synthesia', 'leonardo-ai', 'tome', 'gamma'];

for (const dup of duplicates) {
    let index = content.indexOf(`id: "${dup}"`);
    if (index === -1) index = content.indexOf(`id: '${dup}'`);
    if (index !== -1) {
        // Find the second occurrence
        let secondIndex = content.indexOf(`id: "${dup}"`, index + 1);
        if (secondIndex === -1) secondIndex = content.indexOf(`id: '${dup}'`, index + 1);
        
        if (secondIndex !== -1) {
            // Replace the second occurrence ID
            content = content.substring(0, secondIndex) + `id: "${dup}-2"` + content.substring(secondIndex + `id: "${dup}"`.length);
            console.log(`Replaced duplicate id for ${dup}`);
        }
    }
}

fs.writeFileSync('constants.tsx', content);
console.log("Deduplication complete.");
