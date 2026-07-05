const fs = require('fs');

let content = fs.readFileSync('components/ToolLogo.tsx', 'utf8');

// replace useEffect and state
content = content.replace(
  `React.useEffect(() => { setSrc(domain ? \`https://logo.clearbit.com/\${domain}\` : null); setFailed(false); }, [domain]);`,
  `React.useEffect(() => { 
    if (domain) {
      // Clean domain just in case
      const cleanDomain = domain.replace(/^https?:\\/\\//, '').split('/')[0];
      setSrc(\`https://logo.clearbit.com/\${cleanDomain}\`);
      setFailed(false);
    } else {
      setSrc(null);
    }
  }, [domain]);`
);

content = content.replace(
  `if (src?.includes("logo.clearbit.com") && domain) {`,
  `if (src?.includes("logo.clearbit.com") && domain) {
      const cleanDomain = domain.replace(/^https?:\\/\\//, '').split('/')[0];`
);

content = content.replace(
  `setSrc(\`https://www.google.com/s2/favicons?domain=\${domain}&sz=128\`);`,
  `setSrc(\`https://www.google.com/s2/favicons?domain=\${cleanDomain}&sz=128\`);`
);

fs.writeFileSync('components/ToolLogo.tsx', content, 'utf8');
console.log('Fixed ToolLogo.tsx');
