const store: Record<string, string> = { dilkoc_target_lang: 'ru' };
(globalThis as any).localStorage = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => { store[k] = String(v); },
  removeItem: (k: string) => { delete store[k]; },
};
async function main() {
  const cd = await import('../src/curriculumData');
  const u = cd.UNITS_DATA;
  const extras = u.filter((m: any) => !m.id.startsWith('mod_') && !m.id.startsWith('en_mod_'));
  const fs = await import('node:fs');
  fs.writeFileSync('/tmp/extras-full.json', JSON.stringify(extras.map((m: any) => ({
    id: m.id, n: m.unitNumber, lv: m.levelGroup, t: m.title, d: m.description,
    c: m.category, ic: m.icon, col: m.color ?? '',
    st: m.sceneTitle ?? '', sc: m.sceneContext ?? '',
    dlg: (m.dialogue?.length ?? 0) > 0 ? 1 : 0,
    sp: (m.dialogue?.length ?? 0) > 0 ? [m.dialogue[0].speaker, m.dialogue[1].speaker] : null,
    words: m.words.map((w: any) => [w.tr, w.ru]),
  }))));
  console.log('extras:', extras.length, '→ /tmp/extras-full.json');
}
main();
