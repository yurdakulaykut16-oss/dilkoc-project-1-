#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const RUNTIME = join(ROOT, '.runtime');
const VOICESTUDIO_DIR = join(RUNTIME, 'VoiceStudio');
const VS_REPO = 'https://github.com/debpalash/VoiceStudio.git';
const configuredPort = Number(process.env.VOICESTUDIO_PORT || 3900);
const VS_PORT = Number.isInteger(configuredPort) && configuredPort > 0 && configuredPort < 65_536 ? configuredPort : 3900;
const MODEL_REPO = process.env.VOICESTUDIO_MODEL_REPO || 'k2-fsa/OmniVoice';
const AUTO_MODEL = process.env.DILKOC_AUTO_INSTALL_VOICESTUDIO_MODEL !== 'false';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const commandName = (name) => process.platform === 'win32' && name === 'npm' ? 'npm.cmd' : name;

function spawnCommand(command, args = [], options = {}) {
  const safeArgs = args
    .filter(arg => arg !== undefined && arg !== null && String(arg).trim() !== '')
    .map(String);

  return spawn(commandName(command), safeArgs, {
    ...options,
    shell: process.platform === 'win32',
  });
}

function log(message) {
  console.log(`[DilKoç] ${message}`);
}

function voiceStudioEnvironment() {
  const env = { ...process.env, PYTHONUNBUFFERED: '1', HF_HUB_DISABLE_XET: '1' };
  if (!env.SSL_CERT_FILE && !env.REQUESTS_CA_BUNDLE) {
    const candidates = process.platform === 'win32'
      ? [join(process.env.SYSTEMROOT || 'C:\\Windows', 'System32', 'curl-ca-bundle.crt')]
      : ['/etc/ssl/certs/ca-certificates.crt', '/etc/pki/tls/certs/ca-bundle.crt'];
    const systemBundle = candidates.find(path => existsSync(path));
    if (systemBundle) {
      env.SSL_CERT_FILE = systemBundle;
      env.REQUESTS_CA_BUNDLE = systemBundle;
      env.CURL_CA_BUNDLE = systemBundle;
    }
  }
  return env;
}

function warn(message) {
  console.warn(`[DilKoç] ⚠ ${message}`);
}

async function run(command, args, options = {}) {
  const result = await new Promise((resolve, reject) => {
    const child = spawnCommand(command, args, {
      cwd: options.cwd || ROOT,
      env: options.env || process.env,
      stdio: options.stdio || 'inherit',
    });
    child.on('error', reject);
    child.on('close', code => resolve(code ?? 1));
  });
  if (options.allowFailure || result === 0) return result;
  throw new Error(`${command} ${args.join(' ')} başarısız oldu (kod ${result})`);
}

async function canRun(command, args = ['--version']) {
  try {
    await execFileAsync(commandName(command), args, { timeout: 15_000, windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

async function findPython() {
  for (const candidate of process.platform === 'win32' ? ['py', 'python', 'python3'] : ['python3', 'python']) {
    if (await canRun(candidate, ['--version'])) return candidate;
  }
  return null;
}

function uvCandidates() {
  const uvName = process.platform === 'win32' ? 'uv.exe' : 'uv';
  const candidates = [
    process.env.UV_BINARY,
    join(RUNTIME, 'uv-venv', process.platform === 'win32' ? 'Scripts' : 'bin', uvName),
    join(RUNTIME, 'bin', uvName),
    join(homedir(), '.local', 'bin', uvName),
    join(homedir(), '.cargo', 'bin', uvName),
  ].filter(Boolean);
  if (process.platform === 'win32') {
    candidates.push(join(process.env.LOCALAPPDATA || '', 'uv', 'uv.exe'));
    candidates.push(join(process.env.APPDATA || '', 'uv', 'uv.exe'));
  }
  return candidates;
}

async function findUv() {
  for (const candidate of ['uv', ...uvCandidates()]) {
    if (candidate && (candidate === 'uv' || existsSync(candidate)) && await canRun(candidate, ['--version'])) return candidate;
  }
  return null;
}

async function ensureUv() {
  const existing = await findUv();
  if (existing) return existing;
  const python = await findPython();
  if (!python) throw new Error('Python bulunamadı; VoiceStudio kurulumu için Python 3.11+ gerekiyor.');

  log('uv bulunamadı; proje içindeki izole Python ortamına otomatik kuruluyor…');
  const uvVenv = join(RUNTIME, 'uv-venv');
  if (!existsSync(join(uvVenv, process.platform === 'win32' ? 'Scripts' : 'bin'))) {
    mkdirSync(RUNTIME, { recursive: true });
    const venvCode = await run(python, ['-m', 'venv', uvVenv], { allowFailure: true });
    if (venvCode !== 0) throw new Error('Python venv oluşturulamadı; Python 3.11+ ve venv desteği gerekli.');
  }
  const venvPython = process.platform === 'win32'
    ? join(uvVenv, 'Scripts', 'python.exe')
    : join(uvVenv, 'bin', 'python');
  const pipCode = await run(venvPython, ['-m', 'pip', 'install', '--upgrade', 'uv'], { allowFailure: true });
  if (pipCode !== 0) throw new Error('uv proje ortamına otomatik kurulamadı.');
  const installed = await findUv();
  if (!installed) throw new Error('uv otomatik kurulamadı.');
  return installed;
}

async function voiceStudioHealth() {
  for (const path of ['/system/info', '/health']) {
    try {
      const response = await fetch(`http://127.0.0.1:${VS_PORT}${path}`, { signal: AbortSignal.timeout(1500) });
      if (response.ok) return true;
    } catch {
    }
  }
  return false;
}

async function waitForVoiceStudio(timeoutMs = 180_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await voiceStudioHealth()) return true;
    await sleep(1500);
  }
  return false;
}

async function ensureSource() {
  mkdirSync(RUNTIME, { recursive: true });
  if (existsSync(join(VOICESTUDIO_DIR, '.git'))) {
    return;
  }
  if (!(await canRun('git', ['--version']))) throw new Error('Git bulunamadı; VoiceStudio kaynağı indirilemiyor.');
  if (existsSync(VOICESTUDIO_DIR)) rmSync(VOICESTUDIO_DIR, { recursive: true, force: true });
  log('VoiceStudio GitHub projesi .runtime/VoiceStudio içine indiriliyor…');
  await run('git', ['clone', '--depth', '1', VS_REPO, VOICESTUDIO_DIR]);
}

function patchVoiceStudioForBootstrap() {
  const pyprojectPath = join(VOICESTUDIO_DIR, 'pyproject.toml');
  if (!existsSync(pyprojectPath)) throw new Error('VoiceStudio pyproject.toml bulunamadı.');

  let source = readFileSync(pyprojectPath, 'utf8');
  const before = source;

  source = source.replace(/\r\n?/g, '\n');

  source = source.replace(/^\s*"kittentts @ https:\/\/github\.com\/KittenML\/KittenTTS\/releases\/download\/[^\n]+",\r?\n/m, '');
  source = source.replace(/^\s*"en-core-web-sm @ https:\/\/github\.com\/explosion\/spacy-models\/releases\/download\/[^\n]+",\r?\n/m, '');

  const sourceStart = source.indexOf('\n[tool.uv.sources]\n');
  const sourceEnd = sourceStart === -1 ? -1 : source.indexOf('\n[tool.uv]\n', sourceStart);
  if (sourceStart !== -1 && sourceEnd !== -1) {
    source = source.slice(0, sourceStart + 1) + source.slice(sourceEnd + 1);
  }

  if (source !== before) writeFileSync(pyprojectPath, source);
}

async function prepareDependencies(uv) {
  const marker = join(VOICESTUDIO_DIR, '.dilkoc-api-ready');
  if (existsSync(marker) && existsSync(join(VOICESTUDIO_DIR, '.venv'))) return;
  log('VoiceStudio Python bağımlılıkları otomatik hazırlanıyor (ilk açılış uzun sürebilir)…');
  patchVoiceStudioForBootstrap();
  await run(uv, ['lock', '--system-certs'], { cwd: VOICESTUDIO_DIR });
  await run(uv, ['sync', '--system-certs'], { cwd: VOICESTUDIO_DIR });
  await run(uv, ['run', '--system-certs', 'python', 'scripts/setup.py'], { cwd: VOICESTUDIO_DIR });
  writeFileSync(marker, new Date().toISOString());
}

async function installVoiceModel() {
  if (!AUTO_MODEL) return;
  try {
    const catalogueResponse = await fetch(`http://127.0.0.1:${VS_PORT}/models`);
    if (!catalogueResponse.ok) return;
    const catalogue = await catalogueResponse.json();
    const model = (catalogue.models || []).find(item => item.repo_id === MODEL_REPO);
    if (model?.installed) {
      log('VoiceStudio OmniVoice modeli hazır.');
      return;
    }
    log(`${MODEL_REPO} modeli eksik; VoiceStudio model indiricisi otomatik başlatılıyor…`);
    const install = await fetch(`http://127.0.0.1:${VS_PORT}/models/install`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo_id: MODEL_REPO, target: 'local' }),
    });
    if (!install.ok && install.status !== 409 && install.status !== 429) {
      throw new Error(`model indirme başlatılamadı (${install.status})`);
    }
    const started = Date.now();
    let lastProgress = '';
    while (Date.now() - started < 45 * 60 * 1000) {
      await sleep(4000);
      const statusResponse = await fetch(`http://127.0.0.1:${VS_PORT}/models/install/status`);
      if (!statusResponse.ok) continue;
      const status = await statusResponse.json();
      const job = (status.jobs || []).find(item => item.repo_id === MODEL_REPO);
      if (job?.state === 'failed') throw new Error(job.error || 'model indirme başarısız');
      if (job) {
        const progress = Number(job.pct ?? job.progress ?? 0);
        const label = `${Math.round(progress)}%`;
        if (label !== lastProgress) { log(`VoiceStudio model indiriliyor: ${label}`); lastProgress = label; }
      } else {
        const checkResponse = await fetch(`http://127.0.0.1:${VS_PORT}/models`);
        const check = checkResponse.ok ? await checkResponse.json() : { models: [] };
        if ((check.models || []).some(item => item.repo_id === MODEL_REPO && item.installed)) {
          log('VoiceStudio modeli otomatik olarak hazırlandı.');
          return;
        }
      }
    }
    warn('Model indirme arka planda devam ediyor olabilir; DilKoç yine de açılıyor.');
  } catch (error) {
    warn(`VoiceStudio modeli otomatik kurulamadı: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function startBackend(uv) {
  if (await voiceStudioHealth()) {
    log('VoiceStudio zaten çalışıyor; mevcut backend kullanılacak.');
    return { child: null, owned: false };
  }
  const child = spawnCommand(uv, ['run', 'uvicorn', 'main:app', '--app-dir', 'backend', '--host', '127.0.0.1', '--port', String(VS_PORT)], {
    cwd: VOICESTUDIO_DIR,
    env: voiceStudioEnvironment(),
    stdio: 'inherit',
  });
  child.once('error', error => warn(`VoiceStudio backend başlatılamadı: ${error.message}`));
  const ready = await waitForVoiceStudio();
  if (!ready) {
    try { child.kill('SIGTERM'); } catch {}
    throw new Error('VoiceStudio backend 180 saniye içinde hazır olmadı.');
  }
  return { child, owned: true };
}

async function bootstrapVoiceStudio() {
  if (process.env.DILKOC_SKIP_VOICESTUDIO === 'true') return { child: null, owned: false };
  if (await voiceStudioHealth()) {
    const backend = await startBackend(null);
    void installVoiceModel();
    return backend;
  }
  await ensureSource();
  const uv = await ensureUv();
  await prepareDependencies(uv);
  const backend = await startBackend(uv);
  void installVoiceModel();
  return backend;
}

function terminate(child) {
  if (!child || child.killed) return;
  try { child.kill('SIGTERM'); } catch {}
}

async function main() {
  let backend = { child: null, owned: false };
  let shuttingDown = false;

  const frontend = spawnCommand('npm', ['run', 'dev:vite', '--', '--host', '0.0.0.0'], {
    cwd: ROOT,
    env: { ...process.env },
    stdio: 'inherit',
  });

  const shutdown = (code = 0) => {
    if (shuttingDown) return;
    shuttingDown = true;
    terminate(frontend);
    if (backend.owned) terminate(backend.child);
    setTimeout(() => process.exit(code), 250);
  };
  process.once('SIGINT', () => shutdown(0));
  process.once('SIGTERM', () => shutdown(0));
  frontend.once('error', error => { warn(`DilKoç Vite başlatılamadı: ${error.message}`); shutdown(1); });
  frontend.once('exit', (code, signal) => shutdown(code ?? (signal ? 1 : 0)));

  try {
    backend = await bootstrapVoiceStudio();
    if (shuttingDown && backend.owned) terminate(backend.child);
  } catch (error) {
    warn(`VoiceStudio otomatik kurulumu başarısız: ${error instanceof Error ? error.message : String(error)}`);
    warn('DilKoç yine de açılıyor; VoiceStudio bağlantı durumunu Ses Stüdyosu panelinden görebilirsin.');
  }

  if (backend.child) backend.child.once('exit', () => {
    if (!shuttingDown) warn('VoiceStudio backend kapandı; DilKoç açık kalıyor.');
  });
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
