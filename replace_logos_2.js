const fs = require('fs');
const glob = require('path');
const pages = [
    "index.html", "about.html", "services.html", "products.html", 
    "enterprise.html", "contact.html", "training.html", 
    "careers.html", "blog.html", "case-studies.html"
];

for (const p of pages) {
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        // This regex matches <img ... src="https://lh3.googleusercontent.com/aida-public/..." />
        // Only if it's the logo.
        // But since the only lh3.googleusercontent.com images that are *Africentric logos* are the ones in my grep
        // Products 222: src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd..."
        // Services 281: src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH..."
        // Training 263: src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp..."
        
        // Let's replace the EXACT URL strings found in the grep from step 238
        content = content.replace("https://lh3.googleusercontent.com/aida-public/AB6AXuAdKhAAieSGNuKUmPM62yKVQYTtMjCFbGOs_TvD3iZp90FdOT0KpP18XLrv3CrOjbA97R6krkf8S_bK1nr9mNu2gGap-soffqZQ0EDC-0CcL7GJnsacFM51Gi3IWbJwfkRiJYu_7ukGJZN6UD6nlBeqsGuMGEESS5g4FnJJ9CXrlFx6cpDxFXKZXAGwtroA-ftXEPH-avds9ACMC7P2YGjkR4GvAedfCRIsfm1voc-EFMaNs2jMfpWvYyjjWJpUfg7Z2zeMLWVXYDQ", "assets/official_logo.png");
        
        content = content.replace("https://lh3.googleusercontent.com/aida-public/AB6AXuCHKPgXkZDlYgP1BAFo-OkprTNR63CwWMKojvxw3fDIWXiwbK3yGYvF3nSpu-LoSD013tJBlX0Tf4K_EAtR9SK42I5pDa2xMP-WJr0jkOURlX7pMbF5J6CEwvSBV9WRWfIGjSuPFT_Z8JP4swBwYcCv-kxlTizbb2louE7Yk2Owi2uIfzUF246z--2V-LEXOljFNt65AeSyFTEnQblQfR9VjW1k8Xg--dMZTUo4iWkJxKZYaRIHYba-cZ3JFf7koYqysadaMtrCvGE", "assets/official_logo.png");
        
        content = content.replace("https://lh3.googleusercontent.com/aida-public/AB6AXuCpMgHXHFvpBBfUKFnP-tiK7PFlAaQNLRxD4gcgXL03lbd6yRquFFPHQh9pPs2Fu_RbWTKqo5OjvdEij7mNAkrEdG_gNL2LkefN2z1PSjWwsfxKgb3upsNnAqCQcDm7xGgcEBGQAkHzA8zQ9i8eJifsQxSEYAbjZahY3LF4fiZ7_Fiaa-gf40JrmfY5uKOq1kA7u8mQNyCT4mQe_vTgXUqIExOH3IzS0s-bfnpTtYVbJGNHMOORh8lI_0htXfDQ8_aIMZpUoEFLhuc", "assets/official_logo.png");
        
        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated " + p);
    }
}
