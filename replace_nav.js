const fs = require('fs');
const path = require('path');

const svgExpand = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
const svgMenu = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;

const navHtml = `<!-- NAVBAR -->
<nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
    <div class="flex items-center gap-3">
        <a href="index.html" class="flex items-center gap-3">
            <img alt="Africentric Logo" class="h-12 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR5UdIrNd_8ZiHIVQAonZEv2dVpezt0e-yDAw9oOK84AVRr82Ka13d0pwZZTjyANg6KoVKubUjkSyIFag73KaHXAtYfhKAO8ATKqMj4zMlhaCvqgstPTQhs3wpF2GxQL8CavBiBTvGOKmjn73dVmQ28OfF9gmZvg6dRN9TSNh00wSaWoo-ayE2QiqExxQdtHoookfIWSKMGAxxi0wk5maR34o1u8-TJcANqUkVq0VhiZ1dDBZn1G9EbwIn47ZQ3wxNzCNol1u-QF4"/>
            <div class="hidden md:block">
                <span class="block text-xl font-display font-extrabold leading-none text-slate-900 dark:text-white">africentric</span>
                <span class="block text-[9px] tracking-[0.25em] font-bold text-[#E11D48] uppercase">Technology Hub</span>
            </div>
        </a>
    </div>

    <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
        <a class="hover:text-[#E11D48] transition-colors text-slate-700 dark:text-slate-200" href="index.html">Home</a>
        <a class="hover:text-[#E11D48] transition-colors text-slate-700 dark:text-slate-200" href="about.html">About</a>
        
        <!-- Services Dropdown (CSS Only) -->
        <div class="relative group">
            <a class="hover:text-[#E11D48] transition-colors text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer" href="services.html">
                Services ${svgExpand}
            </a>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                <div class="py-2">
                    <a href="enterprise.html" class="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#E11D48]">Enterprise</a>
                    <a href="products.html" class="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#E11D48]">Products</a>
                    <a href="training.html" class="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#E11D48]">Training</a>
                </div>
            </div>
        </div>

        <!-- Blog Dropdown (CSS Only) -->
        <div class="relative group">
            <a class="hover:text-[#E11D48] transition-colors text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer" href="blog.html">
                Blog ${svgExpand}
            </a>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                <div class="py-2">
                    <a href="case-studies.html" class="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#E11D48]">Case Studies</a>
                    <a href="blog.html" class="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#E11D48]">Insights</a>
                </div>
            </div>
        </div>

        <!-- Contact Button -->
        <a href="contact.html" class="bg-[#E11D48] text-white hover:bg-white hover:text-[#E11D48] border border-transparent hover:border-[#E11D48] px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)]">
            Contact
        </a>
    </div>

    <!-- Mobile Menu Toggle Button -->
    <button class="md:hidden text-slate-900 dark:text-white focus:outline-none" onclick="document.getElementById('mobile-menu').classList.toggle('hidden');">
        ${svgMenu}
    </button>
</div>

<!-- Mobile Menu Dropdown -->
<div id="mobile-menu" class="hidden md:hidden absolute w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-2xl">
    <div class="px-4 py-4 space-y-2">
        <a class="block py-2 font-medium text-slate-700 dark:text-slate-200 hover:text-[#E11D48]" href="index.html">Home</a>
        <a class="block py-2 font-medium text-slate-700 dark:text-slate-200 hover:text-[#E11D48]" href="about.html">About</a>
        <div class="py-2 border-t border-slate-100 dark:border-slate-800/50">
            <a href="services.html" class="block font-medium text-slate-700 dark:text-slate-200 mb-2 hover:text-[#E11D48]">Services</a>
            <div class="pl-4 space-y-2 border-l-2 border-slate-100 dark:border-slate-800">
                <a class="block py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-[#E11D48]" href="enterprise.html">Enterprise</a>
                <a class="block py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-[#E11D48]" href="products.html">Products</a>
                <a class="block py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-[#E11D48]" href="training.html">Training</a>
            </div>
        </div>
        <div class="py-2 border-t border-slate-100 dark:border-slate-800/50">
            <a href="blog.html" class="block font-medium text-slate-700 dark:text-slate-200 mb-2 hover:text-[#E11D48]">Blog</a>
            <div class="pl-4 space-y-2 border-l-2 border-slate-100 dark:border-slate-800">
                <a class="block py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-[#E11D48]" href="case-studies.html">Case Studies</a>
                <a class="block py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-[#E11D48]" href="blog.html">Insights</a>
            </div>
        </div>
        <a class="block py-2 font-medium text-slate-700 dark:text-slate-200 hover:text-[#E11D48] border-t border-slate-100 dark:border-slate-800/50" href="contact.html">Contact</a>
    </div>
</div>
</nav>`;

const pages = [
    "index.html", "about.html", "services.html", "products.html", 
    "enterprise.html", "contact.html", "training.html", 
    "blog.html", "case-studies.html"
];

for (const p of pages) {
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        // Remove trailing mobile menu div before replacing nav
        content = content.replace(/<\/nav>\s*<div id="mobile-menu"[\s\S]*?<\/div>/, '</nav>');
        
        // Replace main nav block
        content = content.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/, navHtml);
        
        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated " + p);
    }
}
