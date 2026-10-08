```json
[
  {
    "file": "src/maske.js",
    "line": 23,
    "summary": "The phone-masking window search keeps the leftmost valid window for the right-most digit group. When a spaced phone number is followed by a number of 3 or more digits, the chosen window can start in the middle of the phone, so the phone's leading group is never masked.",
    "failure_scenario": "Text 'Telefonum 0532 555 12 34 150 TL iade' gives the candidate groups [0532,555,12,34,150]. For j=150, i=0 has 14 digits and fails. i=1 ('555 12 34 150', 10 digits, starts with 5) is accepted and masked. j then becomes 0, and '0532' alone fails. The output is 'Telefonum 0532 *** ** ** *50 TL': the operator prefix leaks and the number's real last two digits are lost. This breaks K15 (every digit except the last two becomes *) on the dashboard, in the report and in the MCP quotes. '+90 532 555 12 34 150 TL' leaks '+90 532' the same way."
  },
  {
    "file": "araclar/hooks/koruma.mjs",
    "line": 16,
    "summary": "Protected paths are resolved relative to the hook input's `cwd` (the session's current directory), not the project root, and matched with case-sensitive regexes. A session working in a subdirectory, or a differently cased path on macOS's case-insensitive filesystem, gets past the guard.",
    "failure_scenario": "After the agent runs `cd src` (cwd persists in the main session), an Edit/Write to /…/radar/data/temalar.json arrives with cwd=/…/radar/src. relative() gives '../data/temalar.json', which does not match ^data\\/temalar\\.json$, so the hook exits 0. Likewise file_path 'data/Temalar.json' or 'tests/beklenen/Ornek-sonuc.json' writes the same file on APFS without matching. The fix is to resolve against CLAUDE_PROJECT_DIR / git toplevel and compare case-insensitively (or by realpath)."
  },
  {
    "file": "araclar/mcp/radar-mcp.mjs",
    "line": 41,
    "summary": "The MCP server hands customer feedback quotes from any project CSV to the cloud LLM agent. Only phone and email are masked; names stay in the text (K15). Codex auto-approves the call (`default_tools_approval_mode = \"approve\"`). This contradicts the AGENTS.md privacy rule and K3.",
    "failure_scenario": "AGENTS.md says 'Geri bildirim tarayıcıdan çıkmaz: dış servis, telemetri, uzak kaynak, paketlenmiş kütüphane eklenmez.' (feedback never leaves the browser). K3 says 'Dosya tarayıcıdan hiçbir yere gönderilmez' (the file is sent nowhere from the browser). If a real export is dropped into the repo and Codex calls radar_alinti without an approval prompt, unmasked customer names and complaint text are sent to the model provider. K42 says data-controller approval is still pending."
  },
  {
    "file": "evals/run.mjs",
    "line": 40,
    "summary": "`JSON.parse(r.stdout)` from kapsama.mjs is unguarded. If a model emits a json block that parses but does not have the K48 shape, the whole eval run crashes and no ozet.json/ozet.md is written. `kos` (line 84) also has no 'error' handler on spawn.",
    "failure_scenario": "A model output for feedback-clustering contains ```json {\"temalar\":\"...\"}```. kapsama.mjs throws on `sozluk.temalar.map`, stdout is empty, and JSON.parse('') throws inside a havuz worker. Promise.all rejects, so the in-flight runs are lost, no summary or gate is produced, and the temp file in tmpdir is never deleted. Likewise, an unset RADAR_CODEX/missing `codex` binary emits an unhandled 'error' (ENOENT) and kills the process."
  },
  {
    "file": "evals/run.mjs",
    "line": 157,
    "summary": "The gate ratio is computed only over the result files that exist (missing ones are skipped with `continue`, and `--arac`/`--skill` subsets count too). The gate can report GEÇTİ (passed) even though gate.json says every fixture must pass in both tools.",
    "failure_scenario": "`node evals/run.mjs --puanla evals/results/2026-10-08T1959` (it holds only the 3 Claude request-analysis outputs) scores 3/3 PASS, prints 'Gate (her fixture iki araçta PASS): GEÇTİ' (gate: every fixture PASS in both tools) and exits 0, even though 13 fixture×tool pairs were never run. The baseline diff (line 131) also ignores rows that are missing compared with the baseline."
  },
  {
    "file": "src/csv.js",
    "line": 5,
    "summary": "Only one trailing empty line is removed. Any extra blank lines (at the end or in the middle of the file) are counted as read rows and skipped with reason 'eksik alan' (missing field).",
    "failure_scenario": "A CSV ending in '\\r\\n\\r\\n' (common after hand editing or concatenation) shows 'Okunan: N+1, atlanan: 1' and 'eksik alan: 1' on the dashboard, although no record is broken. The unused src/satir-say.js counts the same file as N because it skips blank lines, so the repo holds two conflicting definitions of 'okunan' (rows read, K23)."
  },
  {
    "file": "src/uygulama.js",
    "line": 25,
    "summary": "The Blob URL is revoked with setTimeout 0 right after the synthetic click. Safari, a target browser under K18, can start the download asynchronously and fail or save an empty file once the URL is revoked.",
    "failure_scenario": "In Safari, clicking 'Raporu indir' (download report): the a.click() download is queued, revokeObjectURL runs on the next tick, and the download fails or comes out empty ('Failed to load resource'). Node tests with a fake DOM cannot catch this. A delay of seconds (FileSaver-style ~40 s) or revoking on the next user action avoids it."
  },
  {
    "file": ".agents/skills/feedback-clustering/scripts/kapsama.mjs",
    "line": 15,
    "summary": "The coverage script's normalize differs from the app's src/normalize.js. It does no NFC, does not map â/î/û, and does not collapse whitespace, and it does not skip invalid or duplicate rows. Its coverage table can therefore disagree with what the app actually matches.",
    "failure_scenario": "A record 'iptal  ücreti' (double space), 'mekân' or a decomposed 'ü' (u+U+0308) matches a rule in the app but lands in 'diğer' (other) in kapsama.mjs, or the reverse. Duplicate or future-dated rows that the app drops are still counted. The 'birebir' (exact match) check between the proposed sözlük and the app breaks on such data, and the eval scorer, which uses this script, scores dictionaries against different semantics. kapsama.mjs also re-normalizes every keyword for every record (line 40) instead of once."
  },
  {
    "file": "araclar/mcp/radar-mcp.mjs",
    "line": 39,
    "summary": "`cagir` treats any tool name other than 'radar_ozet' as radar_alinti. An unknown tool returns a normal 'Tema yok: undefined' (no such theme) result instead of a JSON-RPC/tool error. For 'bos' (no usable rows) results only {durum, neden:''} is returned, without the skip reasons.",
    "failure_scenario": "tools/call with name 'radar_ozet2' (typo) or any future tool runs the full analysis and replies {hata:'Tema yok: undefined', temalar:[...]} as a success. A file whose rows are all skipped returns neden '' with no okunan/atlanan/nedenler (rows read / skipped / reasons), so the agent cannot say why. radar_ozet also calls analizEtAlintili and masks quotes it then discards (analizEt would do)."
  },
  {
    "file": "tests/mcp.test.js",
    "line": 8,
    "summary": "New test names do not cite a KK or K number, which AGENTS.md (imported by CLAUDE.md) requires.",
    "failure_scenario": "AGENTS.md: 'Test adları KK ya da K numarasını anar.' (test names cite a KK or K number). Violations: 'MCP: initialize ve tools/list iki aracı tanıtır' (mcp.test.js:8), plus every test in tests/mcp.test.js, tests/eval-puanlayici.test.js and tests/ajanlar.test.js, and most of tests/hooks.test.js (e.g. 'koruma: sıradan kaynak dosya geçer'). Separately, the commits after AGENTS.md (e.g. 96726fe 'MCP: …; npm test', aff8196 'Eval: …') do not follow the required '<Adım> (<Araç>, <Model>): <özet>; npm test X/Y' format."
  }
]
```
