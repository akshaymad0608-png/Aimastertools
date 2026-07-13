const fs = require('fs');
let content = fs.readFileSync('components/ToolLogo.tsx', 'utf8');

const target = `  React.useEffect(() => { 
    if (domain) {
      // Clean domain just in case
      const cleanDomain = domain.replace(/^https?:\\/\\//, '').split('/')[0];
      setSrc(\`https://logo.clearbit.com/\${cleanDomain}\`);
      setFailed(false);
    } else {
      setSrc(null);
    }
  }, [domain]);
  const [src, setSrc] = useState<string | null>(
    domain ? \`https://logo.clearbit.com/\${domain}\` : null
  );
  const [failed, setFailed] = useState(false);`;

const replacement = `  const [src, setSrc] = useState<string | null>(
    domain ? \`https://logo.clearbit.com/\${domain}\` : null
  );
  const [failed, setFailed] = useState(false);

  React.useEffect(() => { 
    if (domain) {
      // Clean domain just in case
      const cleanDomain = domain.replace(/^https?:\\/\\//, '').split('/')[0];
      setSrc(\`https://logo.clearbit.com/\${cleanDomain}\`);
      setFailed(false);
    } else {
      setSrc(null);
    }
  }, [domain]);`;

content = content.replace(target, replacement);
fs.writeFileSync('components/ToolLogo.tsx', content);
