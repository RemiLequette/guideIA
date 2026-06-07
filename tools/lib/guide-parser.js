/**
 * guide-parser.js
 *
 * Librairie partagée de parsing pour Plan.md et GuideIA.md.
 * Utilisée par render_html.js (Node.js) et plan-editor.html (navigateur).
 *
 * API publique :
 *   parsePlan(text)   → tableau de chapitres
 *   parseGuide(text)  → dictionnaire { num: chapitre }
 *
 * Références :
 *   - tools/guide-parser.md  — spec du format Plan.md et GuideIA.md, et de l'API
 *   - Methode.md             — convention des niveaux de titres (source de vérité)
 *
 * Niveaux de titres :
 *   Plan.md    : chapitres en ### N. (trois dièses)
 *   GuideIA.md : chapitres en ## N.  (deux dièses)
 */

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = factory();
  } else {
    // Navigateur — expose sur window.GuideParser
    root.GuideParser = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Interne — isole la zone contenu de Plan.md (après le délimiteur CONTENU)
  // ---------------------------------------------------------------------------

  function extractPlanContent(text) {
    const m = text.match(/<!--[^\n]*CONTENU[^\n]*-->/i);
    return m ? text.slice(text.indexOf(m[0]) + m[0].length) : text;
  }

  // ---------------------------------------------------------------------------
  // Interne — extrait les blocs figure d'une section #### Figures
  // ---------------------------------------------------------------------------

  function parseFigBlocks(text) {
    const lines = text.split('\n');
    const out = [];
    let current = null;
    for (const line of lines) {
      const mHead = line.match(/>\s*🖼️\s*\*\*figure\*\*\s*`([^`]+)`/);
      if (mHead) {
        if (current) out.push(current);
        current = { id: mHead[1].trim(), captionLines: [] };
        continue;
      }
      if (current && line.match(/^>/)) {
        const content = line.replace(/^>\s?/, '').trim();
        if (content) current.captionLines.push(content);
      } else if (current && line.trim() === '') {
        // ligne vide — on continue (légende peut avoir des paragraphes)
      } else if (current) {
        out.push(current);
        current = null;
      }
    }
    if (current) out.push(current);

    return out.map(b => ({
      id:      b.id,
      caption: b.captionLines.join('\n'),
    }));
  }

  // ---------------------------------------------------------------------------
  // Interne — extrait les blocs encadré d'une section #### Encadrés
  // ---------------------------------------------------------------------------

  function parseEncBlocks(text) {
    const lines = text.split('\n');
    const out = [];
    let current = null;
    for (const line of lines) {
      const mHead = line.match(/>\s*📦\s*\*\*encadré\*\*\s*`([^`]+)`/);
      if (mHead) {
        if (current) out.push(current);
        current = { id: mHead[1].trim(), descLines: [] };
        continue;
      }
      if (current && line.match(/^>/)) {
        const content = line.replace(/^>\s?/, '').trim();
        if (content) current.descLines.push(content);
      } else if (current && line.trim() === '') {
        // continue
      } else if (current) {
        out.push(current);
        current = null;
      }
    }
    if (current) out.push(current);

    return out.map(b => ({
      id:    b.id,
      title: b.descLines[0] || '',
      desc:  b.descLines.join('\n'),
    }));
  }

  // ---------------------------------------------------------------------------
  // Interne — découpe un bloc chapitre en ses quatre sous-sections
  // ---------------------------------------------------------------------------

  function parseChapterBlock(block) {
    // Repères des sous-sections ####
    const sectionRe = /^#### (.+)$/gm;
    const positions = [];
    let m;
    while ((m = sectionRe.exec(block)) !== null) {
      positions.push({ name: m[1].trim(), pos: m.index, end: 0 });
    }
    // Calculer les fins
    for (let i = 0; i < positions.length; i++) {
      positions[i].end = i + 1 < positions.length ? positions[i + 1].pos : block.length;
    }

    const sections = {};
    for (const p of positions) {
      // Corps = tout après la ligne de titre de la sous-section
      const titleEnd = block.indexOf('\n', p.pos);
      sections[p.name] = titleEnd >= 0 ? block.slice(titleEnd + 1, p.end).trim() : '';
    }

    const keywords = [];
    if (sections['Mots-clés']) {
      for (const line of sections['Mots-clés'].split('\n')) {
        const kw = line.replace(/^-\s*/, '').trim();
        if (kw) keywords.push(kw);
      }
    }

    return {
      planContent: sections['Contenu']  || '',
      keywords,
      figures:     parseFigBlocks(sections['Figures']  || ''),
      encadres:    parseEncBlocks(sections['Encadrés'] || ''),
    };
  }

  // ---------------------------------------------------------------------------
  // PUBLIC — parsePlan(text)
  // Chapitres en ### N. (trois dièses) dans Plan.md
  // ---------------------------------------------------------------------------

  function parsePlan(text) {
    const src = extractPlanContent(text);
    const chapterRe = /^### +(\d+)[.\-\s]+(.+)$/gm;
    const positions = [];
    let m;
    while ((m = chapterRe.exec(src)) !== null) {
      positions.push({ num: m[1], title: m[2].trim(), pos: m.index });
    }

    return positions.map(({ num, title, pos }, i) => {
      const end   = i + 1 < positions.length ? positions[i + 1].pos : src.length;
      const block = src.slice(pos, end);
      const parsed = parseChapterBlock(block);
      return { num, title, ...parsed };
    });
  }

  // ---------------------------------------------------------------------------
  // PUBLIC — parseGuide(text)
  // Chapitres en ## N. (deux dièses) dans GuideIA.md
  // ---------------------------------------------------------------------------

  function parseGuide(text) {
    const map = {};
    const chapterRe = /^## +(\d+)[.\-\s]+(.+)$/gm;
    const positions = [];
    let m;
    while ((m = chapterRe.exec(text)) !== null) {
      positions.push({ num: m[1], pos: m.index });
    }

    for (let i = 0; i < positions.length; i++) {
      const { num, pos } = positions[i];
      const end     = i + 1 < positions.length ? positions[i + 1].pos : text.length;
      const block   = text.slice(pos, end);
      // Corps = tout après la ligne de titre
      const titleEnd = block.indexOf('\n');
      const content  = titleEnd >= 0 ? block.slice(titleEnd + 1).trim() : '';

      const defs = [];
      const refs = [];
      const defRe = /\{\{def:(?:mk|fig|enc):([^}]+)\}\}/g;
      const refRe = /\{\{ref:(?:mk|fig|enc):([^}]+)\}\}/g;
      let d, r;
      while ((d = defRe.exec(content)) !== null) defs.push(d[1]);
      while ((r = refRe.exec(content)) !== null) refs.push(r[1]);

      map[num] = { content, defs, refs };
    }

    return map;
  }

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  return { parsePlan, parseGuide };
}));
