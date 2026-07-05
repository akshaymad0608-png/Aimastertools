const fs = require('fs');
let code = fs.readFileSync('components/ToolLogo.tsx', 'utf8');

code = code.replace(
  'const [src, setSrc] = useState<string | null>(',
  'React.useEffect(() => { setSrc(domain ? `https://logo.clearbit.com/${domain}` : null); setFailed(false); }, [domain]);\n  const [src, setSrc] = useState<string | null>('
);

fs.writeFileSync('components/ToolLogo.tsx', code, 'utf8');
console.log('Fixed ToolLogo effect');
