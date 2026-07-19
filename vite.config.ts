import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        about: resolve(__dirname, 'about.html'),
        coffee: resolve(__dirname, 'coffee.html'),
        breakfast: resolve(__dirname, 'breakfast.html'),
        drinks: resolve(__dirname, 'drinks.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog: resolve(__dirname, 'blog.html'),
        'specialty-coffee-guide': resolve(__dirname, 'specialty-coffee-guide.html'),
        'bondi-breakfast-guide': resolve(__dirname, 'bondi-breakfast-guide.html'),
        'cafe-culture-bondi-beach': resolve(__dirname, 'cafe-culture-bondi-beach.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
});
