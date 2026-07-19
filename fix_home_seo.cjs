const fs = require('fs');
let code = fs.readFileSync('pages/Home.tsx', 'utf8');
code = code.replace(/schema=\{\[\s*websiteSchema\(\),\s*organizationSchema\(\),\s*itemListSchema\(MOCK_TOOLS\.slice\(0, 20\), 'Top AI tools on AI Master Tools'\),\s*\]\}\s*\/>/, `>
        <script type="application/ld+json">{JSON.stringify(websiteSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema(MOCK_TOOLS.slice(0, 20), 'Top AI tools on AI Master Tools'))}</script>
      </SEO>`);
fs.writeFileSync('pages/Home.tsx', code);
