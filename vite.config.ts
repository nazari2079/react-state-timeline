import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { readdirSync, existsSync, statSync } from 'fs';
import { resolve, sep } from 'node:path';

import { name, peerDependencies } from './package.json';

const libDir = resolve(__dirname, './lib');

const findEntries = (dir: string) => {
  const entries: Record<string, string> = {};
  readdirSync(dir).forEach((item) => {
    const itemPath = resolve(dir, item);
    if (statSync(itemPath).isDirectory()) {
      let indexPath = resolve(itemPath, 'index.tsx');
      if (!existsSync(indexPath)) {
        indexPath = resolve(itemPath, 'index.ts');
      }
      if (existsSync(indexPath)) {
        const fileName = itemPath.replace(`${libDir}${sep}`, '');
        entries[fileName] = indexPath;
      }
      Object.assign(entries, findEntries(itemPath));
    }
  });

  return entries;
};

const entries = findEntries(libDir);

const mainIndexRoute = resolve(libDir, 'index.ts');
if (existsSync(mainIndexRoute)) {
  entries['index'] = mainIndexRoute;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'lib',
      tsconfigPath: './tsconfig.json',
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: entries,
      name,
      fileName: (format, entryName) => {
        const fileExt = format === 'es' || format === 'esm' || format === 'module' ? 'mjs' : format;
        if (entryName === 'index') return `index.${fileExt}`;
        return `${entryName}/index.${fileExt}`;
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
    },
  },
});
