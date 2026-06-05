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

- [ ] Finaliser le plan du chapitre 7 (exemples, articulation avec ch. 5 et 6, lien "lost in the middle")
- [ ] Travailler le plan du chapitre 8 (Conclusion)
- [ ] **Outil de relecture et coopération** (prochaine session prioritaire) | Un outil permettant de relire le guide section par section avec l'assistant — navigation dans le texte, annotations, propositions de reformulation, validation collaborative. Format et interface à définir ensemble en session.

## Normal

- [ ] Décider si les tokens sont développés dans le chapitre 5 ou dans un encadré dédié ailleurs
- [ ] Trouver une mise en valeur adaptée pour le concept déclaratif/impératif (chapitre 6) : encadré, analogie, ou autre forme éditoriale
- [ ] Développer l'encadré technique : tokens spéciaux et génération token par token (mentionné dans le chapitre 6)
- [ ] Vérifier sur les différents assistants IA (Claude, ChatGPT, Gemini...) comment consulter et contrôler sa mémoire
- [ ] Développer l'encadré technique : la polysémie — pourquoi le langage est intrinsèquement ambigu (mentionné dans le chapitre 7)
- [ ] Explorer la possibilité de produire des présentations (slides avec images et animations) à partir du guide — format et outillage à définir
- [ ] Définir la convention "encadré technique" dans Methode.md : usage, format, place dans le guide
- [ ] **Librairie guide-parser.js** | Extraire le parsing de `Plan.md` et `GuideIA.md` de `render_html.js` vers `tools/lib/guide-parser.js`, partagée par `render_html.js` et `plan-editor.html`. Session dédiée — voir aussi TODO KB pour la règle lib/ KB vs projet.

## Low priority

- [ ] Générateur de TOC du guide (à faire une fois la rédaction du guide commencée)
- [ ] Générateur d'index à partir des balises `{{mot-clé}}` (à faire une fois la rédaction du guide commencée)
- [ ] Générateur du sommaire des sessions dans `Journal.md`
- [ ] Export du guide vers PDF, HTML, etc.

## Done

## Index

| Term | Occurrences |
|------|-------------|

## Changelog

### Version 2.0 - Mise en conformité avec la convention todo-list
**Date:** 2026-06-05
**Reason:** Mise en conformité avec `conventions/todo-list.md` — ajout Quick Start, Keywords, Index, Changelog, restructuration en sections High/Normal/Low/Done.

**Changes:**
- Ajout Quick Start, Keywords, Index, Changelog
- Contenu migré dans les sections de priorité
- Items prioritaires (suggestions prochaine session, outil de relecture) placés en High priority

---

### Version 1.0 - Création
**Date:** inconnue
**Reason:** Backlog initial du projet guideIA.
