import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss()],
      /*
        No `define` for the API key.

        This used to carry:

          'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
          'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)

        `define` is a compile-time text replacement into the CLIENT bundle, so
        the moment GEMINI_API_KEY had a value it would have been written into a
        public JavaScript file and served to every visitor. It was empty, so
        nothing leaked — but the trap was armed and the key was on the list of
        things to add to Vercel.

        Nothing needed it. No component, page or hook reads process.env.API_KEY;
        the only consumer is server.ts, which esbuild bundles separately with
        --platform=node and which therefore reads the real process.env at
        runtime. Vite's define never applied to it.

        Secrets belong in api/ functions and in server.ts. Anything the browser
        is allowed to see gets a VITE_ prefix and is read through import.meta.env
        — see .env.example.
      */
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        target: 'esnext',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
          output: {
            manualChunks(id) {
              /*
                The catalogue, split out of the entry chunk.

                This rule used to match 'constants.tsx' / 'constants.ts' — a
                file that no longer exists; the data moved to data/*.ts and the
                rule silently stopped matching anything. The result was that all
                of data/tools.ts (736 KB of source, 654 tools) was inlined into
                the entry chunk, so every visitor downloaded the whole catalogue
                in the same file as the app shell.

                The data is imported by Home and by several eagerly-rendered
                components, so it is genuinely part of the first load and
                splitting it does not remove a byte from a cold visit. What it
                does buy is caching: the catalogue changes when tools are added,
                the app shell changes when code is edited, and as one chunk any
                edit to either invalidated both. Separated, a data-only change
                leaves the shell cached and vice versa.

                Matched on a path separator so it cannot pick up node_modules
                packages that merely have "data" in the name.
              */
              if (id.includes('/data/') || id.includes('\\data\\')) {
                return 'data-catalogue';
              }
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                  return 'vendor-react';
                }
                if (id.includes('framer-motion')) {
                  return 'vendor-motion';
                }
                if (id.includes('lucide-react')) {
                  return 'vendor-icons';
                }
                if (id.includes('firebase')) {
                  return 'vendor-firebase';
                }
                return 'vendor';
              }
            }
          }
        }
      },
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      }
    };
});
