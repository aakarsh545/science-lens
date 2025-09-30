#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'ALL_CODE.md');

const IGNORE = [
  'node_modules',
  'dist',
  '.git',
  'build',
  'coverage',
  'node_modules',
  'package-lock.json',
  'yarn.lock',
];

function isBinary(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    for (let i = 0; i < Math.min(buf.length, 512); i++) {
      if (buf[i] === 0) return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}

function explain(filePath) {
  const p = filePath.replace(root + path.sep, '');
  if (p === 'index.html') return 'Root HTML file that mounts the React app.';
  if (p === 'package.json') return 'npm/Yarn package manifest and scripts.';
  if (p.startsWith('src/pages/')) return 'React page component used by the router.';
  if (p.startsWith('src/components/ui/')) return 'UI primitive component (shared low-level UI).' ;
  if (p.startsWith('src/components/')) return 'Reusable React UI component.';
  if (p.startsWith('src/hooks/')) return 'Custom React hook.';
  if (p.startsWith('src/services/') || p.startsWith('server/') || p.startsWith('scripts/')) return 'Service or helper script.';
  if (p.startsWith('src/lib/')) return 'Library helper utilities.';
  if (p.startsWith('supabase/functions/')) return 'Supabase Edge Function handler.';
  if (p.startsWith('public/')) return 'Static public asset.';
  if (p.endsWith('.md')) return 'Documentation or README.';
  if (p.endsWith('.ts') || p.endsWith('.tsx') || p.endsWith('.js') || p.endsWith('.jsx')) return 'Source code file.';
  return 'Repository file.';
}

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORE.some(i => e.name === i)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function extForFence(filePath) {
  const ext = path.extname(filePath).slice(1);
  if (!ext) return '';
  if (ext === 'ts' || ext === 'tsx') return 'ts';
  if (ext === 'js' || ext === 'jsx') return 'js';
  if (ext === 'json') return 'json';
  if (ext === 'css' || ext === 'scss') return 'css';
  if (ext === 'html') return 'html';
  return ext;
}

const allFiles = walk(root).filter(f => !f.includes('ALL_CODE.md'));

let md = '# ALL_CODE.md\n\n';
md += 'This file was generated automatically by scripts/generate_all_code_md.cjs.\n';
md += 'It contains repository files, a short explanation, and full contents for text files.\n\n';

for (const filePath of allFiles) {
  const relative = path.relative(root, filePath).replace(/\\/g, '/');
  md += `## ${relative}\n\n`;
  md += `**Explanation:** ${explain(filePath)}\n\n`;
  if (isBinary(filePath)) {
    md += `**Note:** binary file or non-text asset omitted from inline content. Path: ${relative}\n\n`;
    continue;
  }
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    md += `**Error reading file:** ${e.message}\n\n`;
    continue;
  }
  const fenceLang = extForFence(filePath);
  md += '```' + fenceLang + '\n' + content + '\n```\n\n';
}

fs.writeFileSync(outPath, md, 'utf8');
console.log('Wrote', outPath);
