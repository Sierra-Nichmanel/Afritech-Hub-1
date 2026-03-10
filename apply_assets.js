const fs = require('fs');
const path = require('path');

const officialLogo = "assets/official_logo.png";
const oldLogoPlaceholder = "https://lh3.googleusercontent.com/aida-public/AB6AXuAR5UdIrNd_8ZiHIVQAonZEv2dVpezt0e-yDAw9oOK84AVRr82Ka13d0pwZZTjyANg6KoVKubUjkSyIFag73KaHXAtYfhKAO8ATKqMj4zMlhaCvqgstPTQhs3wpF2GxQL8CavBiBTvGOKmjn73dVmQ28OfF9gmZvg6dRN9TSNh00wSaWoo-ayE2QiqExxQdtHoookfIWSKMGAxxi0wk5maR34o1u8-TJcANqUkVq0VhiZ1dDBZn1G9EbwIn47ZQ3wxNzCNol1u-QF4";

const pages = [
    "index.html", "about.html", "services.html", "products.html", 
    "enterprise.html", "contact.html", "training.html", 
    "blog.html", "case-studies.html"
];

const cssLink = `<link href="animations.css" rel="stylesheet"/>`;
const faviconLink = `<link rel="icon" type="image/png" href="${officialLogo}">`;

for (const p of pages) {
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');

        // 1. Replace all old logos with the official logo
        content = content.split(oldLogoPlaceholder).join(officialLogo);

        // 2. Inject favicon if not present
        if (!content.includes('rel="icon"')) {
            content = content.replace('</head>', `    ${faviconLink}\n</head>`);
        }

        // 3. Inject animations.css if not present
        if (!content.includes('animations.css')) {
            content = content.replace('</head>', `    ${cssLink}\n</head>`);
        }

        // 4. Ensure animations.js text is present (already done manually in index but let's be sure for others)
        if (!content.includes('animations.js')) {
             content = content.replace('</body>', `    <script src="animations.js"></script>\n</body>`);
        }
        
        fs.writeFileSync(p, content, 'utf8');
        console.log("Processed " + p);
    }
}
