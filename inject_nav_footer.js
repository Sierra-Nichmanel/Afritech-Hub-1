const fs = require('fs');

const aboutContent = fs.readFileSync('about.html', 'utf8');

// Extract the nav
const navMatch = aboutContent.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/);
const navHtml = navMatch ? navMatch[0] : '';

// Extract the footer
const footerMatch = aboutContent.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/);
const footerHtml = footerMatch ? footerMatch[0] : '';

let careersContent = fs.readFileSync('careers.html', 'utf8');
careersContent = careersContent.replace('<nav id="main-nav"></nav>', navHtml);
careersContent = careersContent.replace('<footer id="main-footer"></footer>', footerHtml);

fs.writeFileSync('careers.html', careersContent);
console.log('Successfully injected nav and footer into careers.html');
