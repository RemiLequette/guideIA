#!/usr/bin/env node
/**
 * render_html.js
 *
 * Renders GuideIA.md to output/GuideIA.html.
 *
 * Processing pipeline:
 *   1. Parse Plan.md  — extract declared tags (mk, fig, enc) with metadata
 *   2. Parse GuideIA.md — resolve {{def:...}} and {{ref:...}} tags
 *   3. Convert markdown to HTML (via marked, default renderer)
 *   4. Post-process HTML: inject id attributes on headings
 *   5. Extract h1 from body HTML (placed before TOC in output)
 *   6. Build TOC (chapters + index sections), figure table, keyword index, encadre table
 *   7. Write output/GuideIA.html (self-contained, CSS inline)
 *
 * Usage:
 *   node tools/render_html.js
 *
 * Dependencies:
 *   npm install marked
 *
 * Run from the project root directory.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { marked } = require('marked');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const ROOT        = path.resolve(__dirname, '..');
const PLAN_PATH   = path.join(ROOT, 'Plan.md');
const GUIDE_PATH  = path.join(ROOT, 'GuideIA.md');
const FIGURES_DIR = path.join(ROOT, 'figures', 'html');
const OUTPUT_PATH = path.join(ROOT, 'output', 'GuideIA.html');

// Reusable back-to-TOC link
const BACK_TO_TOC = ' <a href="#toc" class="back-to-toc" title="Retour à la table des matières">↑</a>';

// ---------------------------------------------------------------------------
// Plan parser — extracts declared tags per chapter
// ---------------------------------------------------------------------------

/**
 * Parses Plan.md and returns a registry of all declared tags.
 * Chapter headings in Plan.md use ### N. Title (level 3).
 */
function parsePlan(src) {
  const registry = { mk: {}, fig: {}, enc: {} };
  const lines = src.split('\n');

  let currentChapter      = null;
  let currentChapterTitle = null;
  let section             = null;
  let blockquoteLines     = [];

  const flushBlockquote = () => {
    if (!blockquoteLines.length || !section || !currentChapter) return;
    const text = blockquoteLines.join('\n');

    if (section === 'fig') {
      const m = text.match(/\*\*figure\*\*\s+`([^`]+)`/);
      if (m) {
        const id = m[1];
        const captionLines = blockquoteLines
          .slice(1)
          .map(l => l.replace(/^>\s?/, '').trim())
          .filter(Boolean);
        registry.fig[id] = { id, chapter: currentChapter, chapterTitle: currentChapterTitle, caption: captionLines.join(' ') };
      }
    } else if (section === 'enc') {
      const m = text.match(/\*\*encadr[eé]\*\*\s+`([^`]+)`/);
      if (m) {
        const id = m[1];
        const titleLines = blockquoteLines
          .slice(1)
          .map(l => l.replace(/^>\s?/, '').trim())
          .filter(Boolean);
        registry.enc[id] = { id, chapter: currentChapter, chapterTitle: currentChapterTitle, title: titleLines[0] || id };
      }
    }
    blockquoteLines = [];
  };

  for (const line of lines) {
    // Chapter headings in Plan.md: ### N. Title  (level 3)
    const chapterMatch = line.match(/^#{2,3}\s+(\d+)\.\s+(.+)/);
    if (chapterMatch) {
      flushBlockquote();
      currentChapter      = parseInt(chapterMatch[1], 10);
      currentChapterTitle = chapterMatch[2].trim();
      section = null;
      continue;
    }

    if (line.match(/^####\s+Mots-cl/))  { flushBlockquote(); section = 'mk';  continue; }
    if (line.match(/^####\s+Figures/))  { flushBlockquote(); section = 'fig'; continue; }
    if (line.match(/^####\s+Encadr/))   { flushBlockquote(); section = 'enc'; continue; }
    if (line.match(/^####\s+/))         { flushBlockquote(); section = null;  continue; }

    if (!currentChapter || !section) continue;

    if (section === 'mk') {
      const m = line.match(/^-\s+(\S+)/);
      if (m) registry.mk[m[1]] = { id: m[1], chapter: currentChapter, chapterTitle: currentChapterTitle };
    } else if (section === 'fig' || section === 'enc') {
      if (line.startsWith('>'))    blockquoteLines.push(line);
      else if (line.trim() === '') flushBlockquote();
    }
  }

  flushBlockquote();
  return registry;
}

// ---------------------------------------------------------------------------
// Figure file resolver
// ---------------------------------------------------------------------------

const SUPPORTED_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif'];

function resolveFigureFile(id) {
  for (const ext of SUPPORTED_EXTENSIONS) {
    if (fs.existsSync(path.join(FIGURES_DIR, id + ext))) return id + ext;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Tag resolver — replaces {{def/ref:type:id}} with HTML in markdown source
// ---------------------------------------------------------------------------

function resolveTags(src, registry) {
  let figCount = 0;
  let encCount = 0;
  const figNumbers = {};
  const encNumbers = {};
  const mkLabels   = {};

  // First pass: assign numbers in order of first {{def:...}} appearance
  const defPattern = /\{\{def:(mk|fig|enc):([^}]+)\}\}/g;
  let m;
  while ((m = defPattern.exec(src)) !== null) {
    const [, type, id] = m;
    if (type === 'fig' && figNumbers[id] === undefined) figNumbers[id] = ++figCount;
    if (type === 'enc' && encNumbers[id] === undefined) encNumbers[id] = ++encCount;
    if (type === 'mk'  && mkLabels[id]   === undefined) mkLabels[id]   = id.replace(/_/g, ' ');
  }

  // Second pass: replace tags with HTML
  const resolved = src.replace(
    /\{\{(def|ref):(mk|fig|enc):([^}]+)\}\}/g,
    (match, mode, type, id) => {

      if (type === 'mk') {
        const label = (mkLabels[id] || id).replace(/_/g, ' ');
        if (mode === 'def') return `<strong><em><span id="mk-${id}">${label}</span></em></strong>`;
        return `<em><a href="#mk-${id}">${label}</a></em>`;
      }

      if (type === 'fig') {
        const num     = figNumbers[id];
        const caption = registry.fig[id]?.caption || id;
        if (mode === 'def') {
          const file   = resolveFigureFile(id);
          const imgTag = file
            ? `<img src="../figures/html/${file}" alt="${escapeHtml(caption)}">`
            : `<div class="fig-missing">[figure manquante : ${escapeHtml(id)}]</div>`;
          return (
            `\n\n<figure id="fig-${id}">\n` +
            `  ${imgTag}\n` +
            `  <figcaption><strong>Figure ${num}</strong> — ${escapeHtml(caption)}</figcaption>\n` +
            `</figure>\n\n`
          );
        }
        return `<a href="#fig-${id}" class="fig-ref">voir figure ${num}</a>`;
      }

      if (type === 'enc') {
        const num = encNumbers[id];
        if (mode === 'def') {
          return (
            `<span id="enc-${id}" class="enc-anchor"></span>` +
            `<strong class="enc-label">Encadré ${num}</strong>`
          );
        }
        return `<a href="#enc-${id}" class="enc-ref">voir encadré ${num}</a>`;
      }

      return match;
    }
  );

  return { resolvedSrc: resolved, figNumbers, encNumbers, mkLabels };
}

// ---------------------------------------------------------------------------
// Post-process HTML: inject id on headings; add back-to-toc link on h2
// ---------------------------------------------------------------------------

function injectHeadingIds(html) {
  return html.replace(
    /<(h[1-3])(\s[^>]*)?>([^<]*(?:<(?!\/h[1-3]>)[^<]*)*)<\/h[1-3]>/g,
    (match, tag, attrs, inner) => {
      if (attrs && /\bid\s*=/.test(attrs)) return match;
      const plainText = inner.replace(/<[^>]+>/g, '');
      const anchor    = slugify(plainText);
      const backLink  = tag === 'h2' ? BACK_TO_TOC : '';
      return `<${tag} id="${anchor}"${attrs || ''}>${inner}${backLink}</${tag}>`;
    }
  );
}

// ---------------------------------------------------------------------------
// Extract and remove the h1 from body HTML
// ---------------------------------------------------------------------------

function extractH1(html) {
  const match = html.match(/<h1[^>]*>.*?<\/h1>/s);
  if (!match) return { h1Html: '', bodyHtml: html };
  const h1Html  = match[0];
  const bodyHtml = html.replace(h1Html, '');
  return { h1Html, bodyHtml };
}

// ---------------------------------------------------------------------------
// TOC builder — scans markdown source for headings, appends index sections
// ---------------------------------------------------------------------------

function buildTOC(src, registry, figNumbers, encNumbers) {
  const entries = [];
  const re      = /^(#{1,3})\s+(.+)/gm;
  let firstH1   = true;
  let m;

  while ((m = re.exec(src)) !== null) {
    const level = m[1].length;
    const text  = m[2].trim();
    if (level === 1) { if (firstH1) { firstH1 = false; continue; } }
    const cleanText = text.replace(/<[^>]+>/g, '').replace(/\{\{[^}]+\}\}/g, '').trim();
    entries.push({ level, text: cleanText, anchor: slugify(cleanText) });
  }

  if (!entries.length) return '';

  const items = entries.map(e => {
    const cls = e.level === 2 ? '' : e.level === 3 ? 'toc-sub' : 'toc-subsub';
    return `<li class="${cls}"><a href="#${e.anchor}">${escapeHtml(e.text)}</a></li>`;
  });

  // Append index sections if present
  const indexItems = [];
  if (Object.keys(registry.mk).length)
    indexItems.push(`<li class="toc-index"><a href="#index-mots-cles">Index des mots-clés</a></li>`);
  if (Object.keys(figNumbers).length)
    indexItems.push(`<li class="toc-index"><a href="#table-figures">Table des figures</a></li>`);
  if (Object.keys(encNumbers).length)
    indexItems.push(`<li class="toc-index"><a href="#table-encadres">Table des encadrés</a></li>`);

  const allItems = indexItems.length
    ? [...items, `<li class="toc-separator"></li>`, ...indexItems]
    : items;

  return `
<nav id="toc">
  <h2>Table des matières</h2>
  <ul>
    ${allItems.join('\n    ')}
  </ul>
</nav>`;
}

// ---------------------------------------------------------------------------
// Index builders
// ---------------------------------------------------------------------------

function buildKeywordIndex(registry, mkLabels) {
  const ids = Object.keys(registry.mk).sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
  if (!ids.length) return '';

  const rows = ids.map(id => {
    const label = (mkLabels[id] || id).replace(/_/g, ' ');
    return `<tr>` +
      `<td><a href="#mk-${id}"><strong><em>${escapeHtml(label)}</em></strong></a></td>` +
      `<td>Chapitre ${registry.mk[id].chapter} — ${escapeHtml(registry.mk[id].chapterTitle)}${BACK_TO_TOC}</td>` +
      `</tr>`;
  });

  return `
<section id="index-mots-cles" class="index-section">
  <h2 id="index-mots-cles-title">Index des mots-clés${BACK_TO_TOC}</h2>
  <table class="index-table">
    <thead><tr><th>Terme</th><th>Défini au</th></tr></thead>
    <tbody>${rows.join('\n')}</tbody>
  </table>
</section>`;
}

function buildFigureTable(registry, figNumbers) {
  const entries = Object.entries(figNumbers).sort((a, b) => a[1] - b[1]);
  if (!entries.length) return '';

  const rows = entries.map(([id, num]) => {
    const caption = registry.fig[id]?.caption || id;
    return `<tr><td>${num}</td><td><a href="#fig-${id}">${escapeHtml(caption)}</a>${BACK_TO_TOC}</td></tr>`;
  });

  return `
<section id="table-figures" class="index-section">
  <h2 id="table-figures-title">Table des figures${BACK_TO_TOC}</h2>
  <table class="index-table">
    <thead><tr><th>N°</th><th>Légende</th></tr></thead>
    <tbody>${rows.join('\n')}</tbody>
  </table>
</section>`;
}

function buildEncadreTable(registry, encNumbers) {
  const entries = Object.entries(encNumbers).sort((a, b) => a[1] - b[1]);
  if (!entries.length) return '';

  const rows = entries.map(([id, num]) => {
    const title = registry.enc[id]?.title || id;
    return `<tr><td>${num}</td><td><a href="#enc-${id}">${escapeHtml(title)}</a>${BACK_TO_TOC}</td></tr>`;
  });

  return `
<section id="table-encadres" class="index-section">
  <h2 id="table-encadres-title">Table des encadrés${BACK_TO_TOC}</h2>
  <table class="index-table">
    <thead><tr><th>N°</th><th>Titre</th></tr></thead>
    <tbody>${rows.join('\n')}</tbody>
  </table>
</section>`;
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

const CSS = `
  :root {
    --color-bg:         #ffffff;
    --color-text:       #1a1a1a;
    --color-muted:      #666666;
    --color-border:     #dddddd;
    --color-accent:     #2a6496;
    --color-enc-bg:     #f4f8fb;
    --color-enc-border: #2a6496;
    --color-fig-bg:     #f8f8f8;
    --font-body:        Georgia, 'Times New Roman', serif;
    --font-mono:        'Courier New', Courier, monospace;
    --max-width:        740px;
  }

  *, *::before, *::after { box-sizing: border-box; }

  body {
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.75;
    color: var(--color-text);
    background: var(--color-bg);
    margin: 0;
    padding: 2rem 1rem;
  }

  .page-wrapper { max-width: var(--max-width); margin: 0 auto; }

  h1 { font-size: 2rem; margin-bottom: 0.25em; }
  h2 { font-size: 1.45rem; margin-top: 2.5em; border-bottom: 1px solid var(--color-border); padding-bottom: 0.25em; }
  h3 { font-size: 1.15rem; margin-top: 1.75em; }

  a { color: var(--color-accent); text-decoration: none; }
  a:hover { text-decoration: underline; }

  p { margin: 0.9em 0; }

  code {
    font-family: var(--font-mono);
    font-size: 0.88em;
    background: #f0f0f0;
    padding: 0.1em 0.35em;
    border-radius: 3px;
  }

  pre {
    background: #f4f4f4;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 1em 1.25em;
    overflow-x: auto;
    font-size: 0.85em;
  }

  pre code { background: none; padding: 0; }

  blockquote {
    background: var(--color-enc-bg);
    border-left: 4px solid var(--color-enc-border);
    margin: 1.5em 0;
    padding: 1em 1.25em;
    border-radius: 0 4px 4px 0;
  }

  blockquote p { margin: 0.4em 0; }

  .enc-label {
    display: block;
    font-size: 0.85em;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5em;
  }

  .enc-anchor { display: block; }
  .enc-ref, .fig-ref { font-style: italic; font-size: 0.92em; }

  figure {
    margin: 2em 0;
    text-align: center;
    background: var(--color-fig-bg);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.25em;
  }

  figure img { max-width: 100%; height: auto; display: block; margin: 0 auto 0.75em; }

  .fig-missing {
    color: var(--color-muted);
    font-style: italic;
    padding: 2em;
    border: 2px dashed var(--color-border);
    border-radius: 4px;
    margin-bottom: 0.75em;
  }

  figcaption { font-size: 0.88em; color: var(--color-muted); font-style: italic; }

  #toc {
    background: #f9f9f9;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.25em 1.5em;
    margin: 2em 0;
  }

  #toc h2 {
    font-size: 1rem;
    margin: 0 0 0.75em;
    border: none;
    padding: 0;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-muted);
  }

  #toc ul { list-style: none; padding: 0; margin: 0; }
  #toc li { margin: 0.25em 0; }
  #toc li.toc-sub    { padding-left: 1.25em; }
  #toc li.toc-subsub { padding-left: 2.5em; }
  #toc li.toc-index  { font-size: 0.92em; color: var(--color-muted); }
  #toc li.toc-separator { border-top: 1px solid var(--color-border); margin: 0.6em 0; padding: 0; }

  .back-to-toc {
    font-size: 0.75em;
    font-weight: normal;
    color: var(--color-muted);
    text-decoration: none;
    margin-left: 0.5em;
    opacity: 0.5;
  }
  .back-to-toc:hover { opacity: 1; }

  .index-section { margin-top: 3em; }

  .index-table { width: 100%; border-collapse: collapse; font-size: 0.92em; }

  .index-table th {
    text-align: left;
    border-bottom: 2px solid var(--color-border);
    padding: 0.4em 0.6em;
    color: var(--color-muted);
    font-weight: normal;
    text-transform: uppercase;
    font-size: 0.85em;
    letter-spacing: 0.04em;
  }

  .index-table td { border-bottom: 1px solid #eeeeee; padding: 0.4em 0.6em; vertical-align: top; }

  hr { border: none; border-top: 1px solid var(--color-border); margin: 2.5em 0; }
`;

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------

function buildHTML(h1Html, tocHtml, bodyHtml, indexHtml, titleText) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(titleText)}</title>
  <style>${CSS}</style>
</head>
<body>
  <div class="page-wrapper">
    ${h1Html}
    ${tocHtml}
    ${bodyHtml}
    <hr>
    ${indexHtml}
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Reading Plan.md...');
  const planSrc  = fs.readFileSync(PLAN_PATH,  'utf8');

  console.log('Reading GuideIA.md...');
  const guideSrc = fs.readFileSync(GUIDE_PATH, 'utf8');

  console.log('Parsing plan registry...');
  const registry = parsePlan(planSrc);
  console.log(`  mk:  ${Object.keys(registry.mk).length} keywords`);
  console.log(`  fig: ${Object.keys(registry.fig).length} figures`);
  console.log(`  enc: ${Object.keys(registry.enc).length} encadres`);

  console.log('Resolving tags...');
  const { resolvedSrc, figNumbers, encNumbers, mkLabels } = resolveTags(guideSrc, registry);

  console.log('Building TOC...');
  const tocHtml = buildTOC(resolvedSrc, registry, figNumbers, encNumbers);

  console.log('Converting markdown to HTML...');
  const bodyHtmlRaw = marked.parse(resolvedSrc);

  console.log('Injecting heading ids...');
  const bodyHtmlWithIds = injectHeadingIds(bodyHtmlRaw);

  console.log('Extracting h1...');
  const { h1Html, bodyHtml } = extractH1(bodyHtmlWithIds);

  console.log('Building indexes...');
  const indexHtml =
    buildKeywordIndex(registry, mkLabels) +
    buildFigureTable(registry, figNumbers) +
    buildEncadreTable(registry, encNumbers);

  const titleMatch = guideSrc.match(/^#\s+(.+)/m);
  const titleText = titleMatch ? titleMatch[1].trim() : 'Guide IA';

  console.log('Assembling HTML...');
  const html = buildHTML(h1Html, tocHtml, bodyHtml, indexHtml, titleText);

  console.log(`Writing ${OUTPUT_PATH}...`);
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, html, 'utf8');

  console.log('Done.');
  console.log(`  Keywords : ${Object.keys(mkLabels).length}`);
  console.log(`  Figures  : ${Object.keys(figNumbers).length}`);
  console.log(`  Encadres : ${Object.keys(encNumbers).length}`);
}

main();
