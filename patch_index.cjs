const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The user has both GTM and GA4 installed which can cause conflicts and Tag Assistant issues.
// Let's remove the extra gtag if we are using GTM.
const gtagBlock = `    <!-- Google tag (gtag.js) -->
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VV4GFEC1ZS"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VV4GFEC1ZS');
    </script>`;

content = content.replace(gtagBlock, '');
fs.writeFileSync('index.html', content);
console.log('Removed duplicate gtag');
