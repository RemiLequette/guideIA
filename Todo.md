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
- [ ] [O2] Travailler le plan des ch. 9 et 10 | Ch. 9 "Alors docteur, on fait quoi ?" et ch. 10 "Cas pratiques" — squelettes dans Plan.md à étoffer en session dédiée
- [ ] [O13] Trancher — {{def:mk:prompt}} au ch. 1 ou ch. 3 | Mention en passant au ch. 1, définition formelle au ch. 3 — décider où se trouve la {{def:...}} officielle
- [ ] [O24] Présentation de la structure dans l'introduction | Comment annoncer l'arc narratif (ancrage → mécanique → pratique) sans catalogue plat — à définir en session dédiée (voir note Plan.md ch. 1)
- [ ] [O25] Convention remerciements dans Methode.md | Définir la bonne pratique : placement (fin de conclusion vs section séparée), forme, qui citer — pour ne pas être ingrat dans le futur
- [ ] [O26] Ajouter la convention "parties" dans Methode.md | Structure technique et markdown pour les parties (niveau au-dessus des chapitres) — titre, numérotation, rendu HTML

## Normal

- [ ] [O3] Décider si les tokens sont développés dans le chapitre 5 ou dans un encadré dédié ailleurs
- [ ] [O4] Trouver une mise en valeur adaptée pour le concept déclaratif/impératif | Encadré, analogie, ou autre forme éditoriale (chapitre 6)
- [ ] [O5] Développer l'encadré technique | Tokens spéciaux et génération token par token (mentionné dans le chapitre 6)
- [ ] [O6] Vérifier sur les différents assistants IA comment consulter et contrôler sa mémoire | Claude, ChatGPT, Gemini...
- [ ] [O7] Développer l'encadré technique | La polysémie — pourquoi le langage est intrinsèquement ambigu (mentionné dans le chapitre 7)
- [ ] [O8] Explorer la possibilité de produire des présentations à partir du guide | Slides avec images et animations — format et outillage à définir
- [ ] [O9] Définir la convention "encadré technique" dans Methode.md | Usage, format, place dans le guide
- [ ] [O14] Corriger le guide ch. 1 | Introduire LLM et équivalents grand public (ChatGPT, Gemini) — absent de la version actuelle
- [ ] [O15] Étoffer "Valider" au ch. 2 | Trop court — ajouter exemples concrets : vérifier les sources citées, croiser avec le bon sens, tester les affirmations factuelles
- [ ] [O16] Supprimer déclaratif/impératif du guide ch. 6 | Décision de session — passage présent dans le guide, à retirer
- [ ] [O17] Introduire le biais de positivité au ch. 4 | Après l'explication de l'interpolation — troisième grand problème structurel avec hallucinations et attention
- [ ] [O18] Réintroduire Monsieur Jourdain au ch. 4 | "Sans le savoir, je viens de construire un modèle" → "Comme Monsieur Jourdain faisait de la prose..."
- [ ] [O19] Ajouter exemple narratif email au ch. 6 | Sur le modèle de l'exemple météo — renforce le concept de contexte dynamique
- [ ] [O20] Positionner la "boucle d'or" au ch. 6 | Niveau de détail optimal dans un prompt (Goldilocks) — après l'explication du contexte déclaratif
- [ ] [O21] Ajouter paragraphe prospectif en conclusion | Retour Régis — perspective historique, rythme d'innovation, espoirs et craintes. Remplace "Bonne collaboration"
- [ ] [O22] Ajouter remerciements en conclusion | Y compris les IA
- [ ] [O23] Ajouter phrase RGPD/données privées en introduction | Délimiter le périmètre : ce guide traite du fonctionnement et de l'utilisation, pas des aspects légaux ou de confidentialité

## Low priority

- [ ] [O10] Générateur de TOC du guide | À faire une fois la rédaction du guide commencée
- [ ] [O11] Générateur d'index à partir des balises {{mot-clé}} | À faire une fois la rédaction du guide commencée
- [ ] [O12] Générateur du sommaire des sessions dans Journal.md
- [ ] [O13] Export du guide | Vers PDF, HTML, etc.
- [ ] [W3] plan-editor — toggle HTML read-only sur les panneaux Plan et Guide | Bouton bascule dans chaque pane-head pour passer de l'éditeur texte brut à un rendu HTML du markdown. Potentiellement réutiliser render_html.js ou une lib légère (ex: marked.js). Évaluer le coût de performance avant d'implémenter. [effort: M]

## WIP

- [ ] [WIP] [W1] Outil de relecture et coopération | Un outil permettant de relire le guide section par section avec l'assistant — navigation dans le texte, annotations, propositions de reformulation, validation collaborative. Format et interface à définir ensemble en session. [effort: XL]
- [ ] [WIP] [W4] Renumérotation des chapitres avec le plan-editor | Suite à la restructuration en parties — à faire par Rémi avant les sessions suivantes
- [ ] [WIP] [W5] Convention parties dans Methode.md | Définir la convention markdown et technique pour les parties (session dédiée)
- [ ] [WIP] [W6] Injection des parties dans le guide | À partir des métas de Plan.md, après W4 et W5 (session dédiée)

## Done

- [x] [W2] plan-editor — réordonnancement D&D et insertion fluide | Trois choses liées : (1) ligne + au survol entre chapitres pour insérer à la position souhaitée, (2) D&D dans la liste pour réordonner, (3) D&D depuis la poubelle pour restaurer à une position précise. Renumérotation automatique en séquence au Save, répercutée dans Plan.md et GuideIA.md. SortableJS (cdnjs). [effort: L]
- [x] [D1] Librairie guide-parser.js | Extraire le parsing de Plan.md et GuideIA.md de render_html.js vers tools/lib/guide-parser.js, partagée par render_html.js et plan-editor.html. Session dédiée. [effort: L]

## Index

| Term | Occurrences |
|------|-------------|

## Changelog

### Version 6.0 - Consolidation notes tmp/ + nouveaux chapitres
**Date:** 2026-06-06
**Reason:** Intégration des notes tmp/notes-alignement-plan-guide.md et tmp/notes-retours-regis.md.
Renumérotation des chapitres suite à l'ajout de ch. 9 "Alors docteur" et ch. 10 "Cas pratiques".

**Changes:**
- High priority : O2 mis à jour (ch. 8 Conclusion → ch. 9 et 10 nouveaux) ; O13 ajouté (trancher {{def:mk:prompt}})
- Normal : O14 à O23 ajoutés (corrections guide ch. 1/2/4/6, boucle d'or, biais de positivité, conclusion)

---

### Version 5.0 - W3 ajouté + batch thème/démarrage
**Date:** 2026-06-05
**Reason:** Session plan-editor — batch de corrections : thème todo-tool appliqué, sélection automatique ch.1 au démarrage/refresh. W3 toggle HTML read-only ajouté en Low priority.

**Changes:**
- W3 ajouté en Low priority

---

### Version 4.0 - W2 Done
**Date:** 2026-06-05
**Reason:** W2 terminé — déplacé de WIP vers Done.

**Changes:**
- W2 déplacé en Done avec description mise à jour

---

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
