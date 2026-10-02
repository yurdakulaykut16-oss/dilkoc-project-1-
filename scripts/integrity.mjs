#!/usr/bin/env node
/**
 * DilKoç © 2026 — Dosya Bütünlük ve Sahiplik Doğrulama Sistemi
 * ------------------------------------------------------------
 * Proje klasöründeki TÜM izlenen dosyaların (kaynak kod, müfredat verileri,
 * görseller, sesler) kriptografik parmak izlerini (SHA-256) kaydeder ve
 * sonradan doğrular:
 *
 *   node scripts/integrity.mjs manifest   → integrity.manifest.json üretir
 *   node scripts/integrity.mjs check      → dosyaları doğrular (başarısızsa kod 1)
 *
 * GÜÇLÜ KULLANIM (önerilen):
 *  manifest'i bir ANAHTARLA imzalayın — anahtar elinizde kalınca başkası
 *   dosyaları değiştirdikten sonra manifest'i yeniden üretemez:
 *
 *   DILKOC_INTEGRITY_KEY="gizli-anahtariniz" npm run integrity:manifest
 *   DILKOC_INTEGRITY_KEY="gizli-anahtariniz" npm run integrity:check
 *
 *   Anahtar asla depoya commit edilmez; sadece kendi bilgisayarınızda tutulur
 *   (örn. ~/.dilkoc_key dosyasında).
 *
 * SAHİPLİK KANITI: manifest, commit geçmişine gömülür. Git commit'lerinin
 * tarih + SHA kayıtları, dosyaların o tarihlerde sizde olduğunu noter gibi
 * kanıtlar. Çalınan içerik tespit edilirse bu kayıt + LICENSE, DMCA/ihtar
 * sürecinde birinci sınıf delildir.
 *
 * Not: Her meşru değişiklikten sonra `npm run integrity:manifest` çalıştırıp
 * manifest'i değişiklikle birlikte commit edin.
 */
import { createHash, createHmac } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MANIFEST_PATH = new URL('../integrity.manifest.json', import.meta.url).pathname;
const ROOT = new URL('..', import.meta.url).pathname;
const KEY = process.env.DILKOC_INTEGRITY_KEY || '';

function listTrackedFiles() {
  // git ls-files: .gitignore kurallarına saygılı, yalnız depoya dahil dosyalar.
  let out;
  try {
    out = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, maxBuffer: 1 << 28 });
  } catch {
    console.error('HATA: git bulunamadı veya bu bir git deposu değil.');
    process.exit(2);
  }
  return out.toString('utf8').split('\0').filter(Boolean).filter(f => f !== 'integrity.manifest.json');
}

function digestFile(relPath) {
  const buf = readFileSync(join(ROOT, relPath));
  if (KEY) return createHmac('sha256', KEY).update(buf).digest('hex');
  return createHash('sha256').update(buf).digest('hex');
}

function buildManifest() {
  const files = listTrackedFiles().sort();
  const entries = {};
  for (const f of files) entries[f] = digestFile(f);
  return {
    tool: 'dilkoc-integrity/1',
    algo: KEY ? 'hmac-sha256' : 'sha256',
    generatedAt: new Date().toISOString(),
    fileCount: files.length,
    files: entries,
  };
}

function cmdManifest() {
  const m = buildManifest();
  writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2) + '\n');
  console.log(`✓ ${m.fileCount} dosyanın parmak izi kaydedildi → integrity.manifest.json`);
  console.log(`  algoritma: ${m.algo}${KEY ? ' (anahtarlı — manifest anahtarsız üretilip değiştirilemez)' : ' (anahtarsız — en güçlü koruma için DILKOC_INTEGRITY_KEY kullanın)'}`);
  console.log('  Unutmayın: manifest\'i commit\'e dahil edin.');
}

function cmdCheck() {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    console.error('HATA: integrity.manifest.json okunamadı. Önce: npm run integrity:manifest');
    process.exit(2);
  }
  if (KEY && manifest.algo !== 'hmac-sha256') {
    console.error('HATA: manifest anahtarsız (sha256) üretilmiş ama anahtarla doğruluyorsunuz.');
    console.error('Aynı modda üretip doğrulayın: DILKOC_INTEGRITY_KEY=... npm run integrity:manifest');
    process.exit(2);
  }
  if (!KEY && manifest.algo === 'hmac-sha256') {
    console.error('HATA: manifest anahtarlı (hmac-sha256) üretilmiş. Doğrulamak için DILKOC_INTEGRITY_KEY gerekli.');
    process.exit(2);
  }

  const onDisk = new Set(listTrackedFiles());
  const recorded = new Set(Object.keys(manifest.files));
  const changed = [], removed = [], added = [];

  for (const f of [...recorded].sort()) {
    if (!onDisk.has(f)) { removed.push(f); continue; }
    if (digestFile(f) !== manifest.files[f]) changed.push(f);
  }
  for (const f of [...onDisk].sort()) {
    if (!recorded.has(f)) added.push(f);
  }

  const ok = changed.length === 0 && removed.length === 0 && added.length === 0;
  if (ok) {
    console.log(`✓ BÜTÜNLÜK DOĞRULANDI — ${recorded.size} dosyanın tamamı manifest ile birebir aynı.`);
    console.log(`  (${manifest.algo} · üretilme: ${manifest.generatedAt})`);
    return;
  }
  console.error('✗ BÜTÜNLÜK İHLALİ TESPİT EDİLDİ:');
  const show = (title, list) => {
    if (!list.length) return;
    console.error(`\n  ${title} (${list.length}):`);
    for (const f of list.slice(0, 25)) console.error(`    • ${f}`);
    if (list.length > 25) console.error(`    … ve ${list.length - 25} dosya daha`);
  };
  show('DEĞİŞTİRİLMİŞ', changed);
  show('SİLİNMİŞ', removed);
  show('MANİFESTTE OLMAYAN YENİ DOSYA', added);
  console.error('\n  Bu değişiklikler sizin değilse dosyalar ele geçirilmiş/bozulmuş olabilir.');
  console.error('  Değişiklikler sizinse güncel kayıt için: npm run integrity:manifest');
  process.exit(1);
}

const cmd = process.argv[2];
if (cmd === 'manifest') cmdManifest();
else if (cmd === 'check') cmdCheck();
else {
  console.log('Kullanım:\n  node scripts/integrity.mjs manifest   # parmak izlerini kaydet\n  node scripts/integrity.mjs check      # doğrula');
  process.exit(2);
}
