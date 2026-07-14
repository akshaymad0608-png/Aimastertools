const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const headGTM = `    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WZV4CNBG');</script>
    <!-- End Google Tag Manager -->\n`;

const bodyGTM = `    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WZV4CNBG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->\n`;

if (!content.includes('GTM-WZV4CNBG')) {
    // Add right after <head>
    content = content.replace('<head>', '<head>\n' + headGTM);
    // Add right after <body>
    content = content.replace('<body>', '<body>\n' + bodyGTM);
    fs.writeFileSync('index.html', content);
    console.log('Added Google Tag Manager to index.html');
} else {
    console.log('GTM already exists in index.html');
}
