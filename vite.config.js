import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        products: resolve(__dirname, 'products.html'),
        enterprise: resolve(__dirname, 'enterprise.html'),
        training: resolve(__dirname, 'training.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog: resolve(__dirname, 'blog.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
        careers: resolve(__dirname, 'careers.html'),
      },
    },
  },
});
