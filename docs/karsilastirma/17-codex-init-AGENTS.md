# Repository guidance

## Project

Radar is a Turkish-language, single-page tool that reads feedback CSV files locally, groups records using an approved theme dictionary, ranks themes, and downloads a Markdown report. It uses plain JavaScript ES modules and native browser APIs; there is no backend, build step, or dependency installation.

## Commands

- Run all tests: `npm test` (Node.js 18 or newer; uses `node --test`).
- Run a focused test: `node --test tests/tema.test.js` (substitute the relevant file).
- Serve locally: `python3 -m http.server`, then open `http://localhost:8000`. Opening `index.html` through `file://` is unsupported.

## Sources of truth

- Read `docs/kararlar.md` for product decisions. Later decisions supersede earlier conflicting decisions, and this document takes precedence over conflicting acceptance criteria or PRD text.
- Use `docs/kabul-kriterleri.md`, `docs/prd.md`, and `docs/plan.md` for requirements and implementation context, with that precedence in mind.
- `docs/promptlar/`, `docs/karsilastirma/`, and `docs/notlar/` contain historical prompts, proposals, and discussion; do not treat them as current instructions.
- `data/temalar.json` is the approved production dictionary. Changes to its rules affect acceptance results and require explicit product scope; do not tune it simply to make tests pass.

## Code boundaries and conventions

- `index.html` and `radar.css` define the page. `src/uygulama.js` handles file selection, dictionary loading, browser-local date, and report download; `src/pano.js` renders the dashboard.
- Other `src/` modules implement CSV parsing, validation, normalization, dictionary preparation, theme matching, scoring, quote selection, masking, and report formatting. Keep them independent of DOM, network, and the current clock; pass the dictionary and `bugun` explicitly.
- Follow existing Turkish identifiers, user-facing text, named exports, relative `.js` imports, and small modules. Preserve Turkish locale sorting and number formatting.
- Scores and averages use `{ pay, payda }` fractions. Sort using exact values and format through `src/bicim.js`, rather than ranking rounded display values.
- Keep the application dependency-free, including bundled libraries. Feedback must stay in the browser; introduce no external services, telemetry, or remote assets.
- Render user content with safe DOM APIs such as `textContent`, never `innerHTML`. Only masked quotes should reach dashboard/report results; preserve Markdown escaping and the report's personal-information warning.
- Preserve single-file replacement behavior, stale-selection protection, deterministic validation reasons, and the `red` / `bos` / `tamam` result states.

## Verification

- Run `npm test` after behavioral changes. Add or adjust meaningful tests beside the affected module using `node:test` and `node:assert/strict`; reuse `tests/yardimci.js`, fixtures, and `tests/sahte-dom.js` where appropriate.
- `tests/beklenen/hesapla.mjs` is an independent reference calculator and must not import application logic. Its checked-in output is `tests/beklenen/ornek-sonuc.json`; do not regenerate expectations merely to hide a regression.
- For UI or download changes, also serve the page and check relevant browser behavior with `data/ornek-geri-bildirim.csv`. Node tests do not establish Chrome, Safari, or Edge compatibility, network privacy, or the 5,000-row under-two-second requirement; report only checks actually performed.
