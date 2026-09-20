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
                /*
                  Match on the package directory, not on a bare substring.

                  The previous rule tested id.includes('react'), which is true
                  for every path under lucide-react, react-markdown,
                  react-hot-toast, react-helmet-async, react-fast-compare and
                  react-refresh. They all landed in vendor-react, the
                  lucide-react rule below could never fire, and rollup reported
                  a circular chunk because vendor and vendor-react each ended up
                  holding part of the same dependency graph.

                  pkg() pulls out the real package name so each rule matches
                  exactly what it names. Scoped packages keep their @scope/ so
                  e.g. @firebase/app is still recognised as firebase.
                */
                const pkg = (() => {
                  const m = id.split('node_modules/').pop() || '';
                  const parts = m.split('/');
                  return parts[0].startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
                })();

                if (pkg === 'react' || pkg === 'react-dom' || pkg === 'scheduler') {
                  return 'vendor-react';
                }
                if (pkg === 'react-router' || pkg === 'react-router-dom') {
                  return 'vendor-router';
                }
                if (pkg === 'framer-motion' || pkg === 'motion-dom' || pkg === 'motion-utils') {
                  return 'vendor-motion';
                }
                if (pkg === 'lucide-react') {
                  return 'vendor-icons';
                }
                if (pkg === 'firebase' || pkg.startsWith('@firebase')) {
                  return 'vendor-firebase';
                }
                /*
                  html2canvas (~400 KB) and react-markdown are each reached from
                  exactly one place — the share modal's Download button and the
                  blog post renderer. Returning undefined leaves them to rollup,
                  which keeps them with the dynamic import or route chunk that
                  actually pulls them in instead of hoisting them into the
                  shared vendor chunk that every page loads.
                */
                if (pkg === 'html2canvas' || pkg === 'react-markdown') {
                  return undefined;
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
