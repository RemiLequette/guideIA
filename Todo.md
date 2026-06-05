# TODO

Backlog du projet guideIA — tâches, idées de contenu, idées sur la méthode, et outils à développer.

*Language: French — this document targets a French-speaking project.*

## Quick Start

Backlog léger du projet guideIA.
Contient les tâches en attente, idées de contenu, idées sur la méthode, et outils à développer.
Sert aussi à noter les suggestions de l'assistant pour les prochaines sessions.
Charger en début de session pour prendre connaissance des tâches en attente.

## Keywords
todo, backlog, guideIA, tâches, idées, contenu, méthode, outillage

## High priority

- [ ] [O1] Finaliser le plan du chapitre 7 | Exemples, articulation avec ch. 5 et 6, lien "lost in the middle"
- [ ] [O2] Travailler le plan du chapitre 8 | Conclusion

## Normal

- [ ] [O3] Décider si les tokens sont développés dans le chapitre 5 ou dans un encadré dédié ailleurs
- [ ] [O4] Trouver une mise en valeur adaptée pour le concept déclaratif/impératif | Encadré, analogie, ou autre forme éditoriale (chapitre 6)
- [ ] [O5] Développer l'encadré technique | Tokens spéciaux et génération token par token (mentionné dans le chapitre 6)
- [ ] [O6] Vérifier sur les différents assistants IA comment consulter et contrôler sa mémoire | Claude, ChatGPT, Gemini...
- [ ] [O7] Développer l'encadré technique | La polysémie — pourquoi le langage est intrinsèquement ambigu (mentionné dans le chapitre 7)
- [ ] [O8] Explorer la possibilité de produire des présentations à partir du guide | Slides avec images et animations — format et outillage à définir
- [ ] [O9] Définir la convention "encadré technique" dans Methode.md | Usage, format, place dans le guide

## Low priority

- [ ] [O10] Générateur de TOC du guide | À faire une fois la rédaction du guide commencée
- [ ] [O11] Générateur d'index à partir des balises {{mot-clé}} | À faire une fois la rédaction du guide commencée
- [ ] [O12] Générateur du sommaire des sessions dans Journal.md
- [ ] [O13] Export du guide | Vers PDF, HTML, etc.

## WIP

- [ ] [WIP] [W1] Outil de relecture et coopération | Un outil permettant de relire le guide section par section avec l'assistant — navigation dans le texte, annotations, propositions de reformulation, validation collaborative. Format et interface à définir ensemble en session. [effort: XL]

## Done

- [x] [D1] Librairie guide-parser.js | Extraire le parsing de Plan.md et GuideIA.md de render_html.js vers tools/lib/guide-parser.js, partagée par render_html.js et plan-editor.html. Session dédiée. [effort: L]

## Index

| Term | Occurrences |
|------|-------------|

## Changelog

### Version 3.0 - Reformatage pour todo-tool
**Date:** 2026-06-05
**Reason:** Installation du todo-tool — items reformatés avec séparateur titre | description, gras retiré des titres.

**Changes:**
- Items avec titre en gras convertis au format `Titre | Description`
- Items sans titre structurés avec un titre court séparé par ` | `
- Fichier précédent sauvegardé sous TODO-old.md

---

### Version 2.0 - Mise en conformité avec la convention todo-list
**Date:** 2026-06-05
**Reason:** Mise en conformité avec `conventions/todo-list.md` — ajout Quick Start, Keywords, Index, Changelog, restructuration en sections High/Normal/Low/Done.

**Changes:**
- Ajout Quick Start, Keywords, Index, Changelog
- Contenu migré dans les sections de priorité
- Items prioritaires placés en High priority

---

### Version 1.0 - Création
**Date:** inconnue
**Reason:** Backlog initial du projet guideIA.
