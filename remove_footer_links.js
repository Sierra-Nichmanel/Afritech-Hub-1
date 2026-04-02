const fs = require('fs');
const path = require('path');

const pages = [
    "index.html", "about.html", "services.html", "products.html", 
    "enterprise.html", "contact.html", "training.html", 
    "blog.html", "case-studies.html"
];

for (const p of pages) {
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        // Remove case studies link from footer
        content = content.replace(/<li><a class="hover:text-primary" href="case-studies\.html">Case Studies<\/a><\/li>\n?\s*/g, '');
        // Remove blog link from footer
        content = content.replace(/<li><a class="hover:text-primary" href="blog\.html">Blog<\/a><\/li>\n?\s*/g, '');
        // Remove insights link from footer
        content = content.replace(/<li><a class="hover:text-primary" href="blog\.html">Insights<\/a><\/li>\n?\s*/g, '');
        
        // there are also some links in other pages like careers, services body, etc.
        // Let's remove specific "case-studies" lines inside lists for footers:
        
        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated " + p);
    }
}
