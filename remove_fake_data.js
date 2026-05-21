const fs = require('fs');

async function removeFakeData() {
  let content = fs.readFileSync('constants.tsx', 'utf8');
  
  // We want to remove objects that look like:
  //   {
  //     id: "1", ...
  //   },
  // We can use a script to find and replace.
  // Because it's hard to parse TS with regex perfectly, let's use a robust approach:
  // Split the file into MOCK_TOOLS and the rest.
  
  const startIndex = content.indexOf('export const MOCK_TOOLS: Tool[] = [');
  const endIndex = content.indexOf('export const CATEGORIES:', startIndex);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find boundaries.");
    return;
  }
  
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex);
  
  let mockToolsStr = content.substring(startIndex, endIndex);
  
  // A regex to match an object from { to },
  // But wait, there are nested arrays (like tags: [...] ). Nested objects? Probably no nested objects.
  // Let's use a regex to match:
  // \s*{\s*id:\s*"\d+".*?(?:},\n|}\n\];\n)
  // Actually, we can just split by "  },\n  {" and filter out the ones that contain `id: "\d+"`
  const lines = mockToolsStr.split('\n');
  
  let newLines = [];
  let currentObject = [];
  let inObject = false;
  let isFake = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim() === '{' && !inObject && lines[i+1] && lines[i+1].includes('id:')) {
      inObject = true;
      currentObject = [line];
      isFake = false;
    } else if (inObject) {
      currentObject.push(line);
      // matching id: "1" or similar
      const idMatch = line.match(/^\s*id:\s*["'](\d+)["']/);
      if (idMatch) {
         isFake = true;
      }
      
      // End of object
      if (line.trim() === '},' || line.trim() === '}' || (line.trim() === '];' && lines[i-1].trim() === '}')) {
         if (line.trim() === '];') {
             // Handle the "];" being on the same line or next line
             if (lines[i-1].trim() === '}') {
                 currentObject.pop(); // remove ];
                 if (!isFake) {
                    newLines.push(...currentObject);
                 }
                 newLines.push(line); 
             } else {
                 newLines.push(line);
             }
             inObject = false;
         } else {
             if (!isFake) {
                 newLines.push(...currentObject);
             } else {
                 if (line.trim() === '}' && i === lines.length - 3) {
                     // Last object, wait need to handle properly. 
                     // Actually, if we filter out fake objects, we need to ensure the last valid object doesn't have a trailing comma, or just let TS/JS handle trailing commas.
                 }
             }
             inObject = false;
             currentObject = [];
         }
      }
    } else {
      newLines.push(line);
    }
  }
  
  // Fix trailing comma of the last item before ];
  let finalStr = newLines.join('\n');
  finalStr = finalStr.replace(/},\n\];/g, '}\n];');
  
  fs.writeFileSync('constants.tsx', before + finalStr + after);
  console.log("Done");
}

removeFakeData();
