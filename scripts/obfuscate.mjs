#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import JavaScriptObfuscator from 'javascript-obfuscator';

const ASSETS_DIR = new URL('../dist/assets', import.meta.url).pathname;

let files = [];
try {
  files = readdirSync(ASSETS_DIR).filter(f => f.endsWith('.js'));
} catch {
  console.error('HATA: dist/assets bulunamadı — önce `npm run build` çalıştırın.');
  process.exit(2);
}
if (files.length === 0) {
  console.error('HATA: dist/assets içinde .js dosyası yok.');
  process.exit(2);
}

const OPTIONS = {
  compact: true,
  simplify: true,
  identifierNamesGenerator: 'hexadecimal',
  numbersToExpressions: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 1,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayIndexes: true,
  splitStrings: false,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
  selfDefending: false,
  debugProtection: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  renameProperties: false,
  renameGlobals: false,
  sourceMap: false,
};

let totalBefore = 0, totalAfter = 0;
for (const file of files) {
  const path = join(ASSETS_DIR, file);
  const source = readFileSync(path, 'utf8');
  const before = statSync(path).size;

  const result = JavaScriptObfuscator.obfuscate(source, {
    ...OPTIONS,
    inputFileName: file,
  });
  const code = result.getObfuscatedCode();
  writeFileSync(path, code);

  const after = Buffer.byteLength(code, 'utf8');
  totalBefore += before;
  totalAfter += after;
  console.log(`  ${file}: ${(before / 1048576).toFixed(2)} MB → ${(after / 1048576).toFixed(2)} MB`);
}

console.log(`✓ ${files.length} dosya karartıldı — toplam ${(totalBefore / 1048576).toFixed(2)} MB → ${(totalAfter / 1048576).toFixed(2)} MB`);
console.log('  Artık pakette düz metin (müfredat/AI/kelime) aranamaz; sourcemap yok.');
