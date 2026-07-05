const fs = require('fs');
let code = fs.readFileSync('components/Footer.tsx', 'utf8');

const resourcesBlock = `<ul className="space-y-4 text-[15px] text-[var(--color-text-secondary)]">
              <li><Link to="/prompts" className="hover:text-[var(--color-primary)] transition-colors">Prompt Library</Link></li>
              <li><Link to="/compare" className="hover:text-[var(--color-primary)] transition-colors">Compare AI</Link></li>
              <li><Link to="/find" className="hover:text-[var(--color-primary)] transition-colors">Find My Tool</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--color-primary)] transition-colors">AI Blog</Link></li>
            </ul>`;
            
const newResourcesBlock = `<ul className="space-y-4 text-[15px] text-[var(--color-text-secondary)]">
              <li><Link to="/collections" className="hover:text-[var(--color-primary)] transition-colors">Collections</Link></li>
              <li><Link to="/prompts" className="hover:text-[var(--color-primary)] transition-colors">Prompts</Link></li>
              <li><Link to="/compare" className="hover:text-[var(--color-primary)] transition-colors">Compare Tools</Link></li>
              <li><Link to="/find" className="hover:text-[var(--color-primary)] transition-colors">AI Tool Finder</Link></li>
              <li><a href="mailto:submit@aimastertools.com" className="hover:text-[var(--color-primary)] transition-colors">Submit Tool</a></li>
            </ul>`;

if (code.includes(resourcesBlock)) {
  code = code.replace(resourcesBlock, newResourcesBlock);
  fs.writeFileSync('components/Footer.tsx', code, 'utf8');
  console.log('Footer.tsx updated');
} else {
  console.log('Could not find resources block in Footer.tsx');
}
