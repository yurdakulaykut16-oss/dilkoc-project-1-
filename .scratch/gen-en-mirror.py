import json, glob, os, sys, collections

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DICT_DIR = BASE + '/.scratch/dict/'

D = {}
for f in sorted(glob.glob(DICT_DIR + 'dict*.py')):
    ns = {'D': D}
    exec(open(f).read(), ns)
    D = ns['D']
print('sözlük:', len(D), 'girdi')

extras = json.load(open('/tmp/extras-full.json'))
print('ek ünite:', len(extras))

missing = set()
for x in extras:
    for tr, ru in x['words']:
        if tr not in D:
            missing.add(tr)
if missing:
    print('EKSİK SÖZLÜK:', len(missing))
    for m in list(missing)[:20]:
        print(' ', repr(m))
    sys.exit(1)

def ts(s):
    return "'" + str(s).replace('\\', '\\\\').replace("'", "\\'") + "'"

def num(n):
    if n == int(n):
        return str(int(n))
    r = round(n, 9)
    if r == int(r):
        return str(int(r))
    return repr(r)

def emit_spec(x, words):
    wstr = ', '.join(f"[{ts(en)}, {ts(tr)}]" for en, tr in words)
    sp = 'null' if not x['dlg'] or not x['sp'] else f"[{ts(x['sp'][0])}, {ts(x['sp'][1])}]"
    return (f"  [{ts(x['id'])}, {num(x['n'])}, {ts(x['lv'])}, {ts(x['ic'])}, "
            f"{ts(x['t'])}, {ts(x['d'])}, {ts(x['c'])}, {ts(x['col'])}, "
            f"{ts(x['st'])}, {ts(x['sc'])}, {sp}, [{wstr}]],")

def mirror_words(x):
    return [[D[tr], tr] for tr, ru in x['words']]

HDR = """import type { EnExtraSpec } from './enExtraUnits';

export const {name}: readonly EnExtraSpec[] = [
"""

def emit_file(fname, name, rows):
    out = HDR.replace('{name}', name)
    out += '\n'.join(rows)
    out += '\n];\n'
    open(BASE + '/src/content/en/' + fname, 'w', encoding='utf-8').write(out)
    print(fname, '→', len(rows), 'ünite,', len(out), 'bayt')

rows_a = [emit_spec(x, mirror_words(x)) for x in extras[:200]]
rows_b = [emit_spec(x, mirror_words(x)) for x in extras[200:400]]
rows_c = [emit_spec(x, mirror_words(x)) for x in extras[400:]]
emit_file('enExtraSpecsA.ts', 'EN_EXTRA_SPECS_A', rows_a)
emit_file('enExtraSpecsB.ts', 'EN_EXTRA_SPECS_B', rows_b)
emit_file('enExtraSpecsC.ts', 'EN_EXTRA_SPECS_C', rows_c)

QUOTA = {'A1': 3, 'A2': 42, 'B1': 53, 'B2': 44, 'C2': 33}
NEW_TOTAL = sum(QUOTA.values())
assert NEW_TOTAL == 175, NEW_TOTAL

new_specs = []
titles_seen = set()
delta = 0

for lv, quota in QUOTA.items():
    srcs = [x for x in extras if x['lv'] == lv]
    bycat = collections.defaultdict(list)
    for x in srcs:
        bycat[x['c']].append(x)
    for c in bycat:
        bycat[c].sort(key=lambda z: z['n'])
    cats = sorted(bycat.keys(), key=lambda c: (-len(bycat[c]), c))
    seq = []
    max_len = max(len(bycat[c]) for c in cats)
    for step in range(max_len):
        for c in cats:
            if step < len(bycat[c]):
                seq.append(bycat[c][step])
    use_count = collections.Counter()
    for made in range(quota):
        src = seq[made % len(seq)]
        use_count[src['id']] += 1
        p = use_count[src['id']] - 1
        cat_srcs = bycat[src['c']]
        idx = cat_srcs.index(src)
        nxt = cat_srcs[(idx + 1) % len(cat_srcs)]
        pool_src = [w[0] for w in src['words']]
        pool_nxt = [w[0] for w in nxt['words']]
        k = made + p
        mixed = []
        for i in range(max(len(pool_src), len(pool_nxt))):
            if i < len(pool_src):
                mixed.append(pool_src[(i + k) % len(pool_src)])
            if i < len(pool_nxt):
                mixed.append(pool_nxt[(i + k + 1) % len(pool_nxt)])
        seen = set()
        words = []
        for tr in mixed:
            if tr not in seen:
                seen.add(tr)
                words.append(tr)
        want = min(max(len(pool_src), 6), 8)
        if len(words) < want:
            for tr in pool_src + pool_nxt:
                if tr not in seen:
                    seen.add(tr)
                    words.append(tr)
                if len(words) >= want:
                    break
        words = words[:want]
        assert len(words) >= 6, (src['id'], len(words))
        pass_tag = f' {p + 2}' if p > 0 else ''
        title = f"{src['t']} — Pekiştirme{pass_tag}"
        base_title = title
        n = 1
        while title in titles_seen:
            n += 1
            title = f"{base_title} ({n})"
        titles_seen.add(title)
        delta += 1
        new_n = src['n'] + 0.000001 + delta * 0.0000001
        new_specs.append({
            'id': f"enx_{src['id']}_p{p + 1}",
            'n': new_n,
            'lv': lv,
            'ic': '🔁' if p == 0 else '🧠',
            't': title,
            'd': f"“{src['t']}” ünitesinin kelimeleri yeni kombinasyonlarla pekiştirilir.",
            'c': src['c'],
            'col': src['col'],
            'st': f"{title} — Sahnesi",
            'sc': f"{src['c']} bağlamında “{src['t']}” kelimeleri yeniden karıştırılıp farklı cümle ve diyaloglarda tekrar edilir.",
            'dlg': 1,
            'sp': list(src['sp']) if src['sp'] else ['Öğrenci', 'Arkadaş'],
            'words': [[D[tr], tr] for tr in words],
        })
    print(lv, '→', quota, 'yeni ünite | kaynak sayısı:', len(seq))

assert len(new_specs) == 175, len(new_specs)
ids = [s['id'] for s in new_specs]
assert len(set(ids)) == 175

rows_n = [emit_spec(x, x['words']) for x in new_specs]
emit_file('enNewSpecs.ts', 'EN_NEW_SPECS', rows_n)

lv_all = collections.Counter(x['lv'] for x in extras)
lv_new = collections.Counter(x['lv'] for s in new_specs for x in [s])
print('AYNA seviye:', dict(lv_all))
print('YENİ seviye:', dict(lv_new))
print('TOPLAM EN ünite = 48 +', len(extras), '+', len(new_specs), '=', 48 + len(extras) + len(new_specs))
words_total = sum(len(x['words']) for x in extras) + sum(len(s['words']) for s in new_specs)
print('ek+yeni kelime satırı:', words_total)
