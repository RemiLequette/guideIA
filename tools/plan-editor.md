# Plan Editor

Spec de l'outil de visualisation et d'édition du plan et du guide guideIA.

*Language: French — this document targets a French-speaking project.*

## Quick Start

Spec de l'outil `tools/plan-editor.html` — outil HTML standalone pour naviguer, éditer et vérifier la cohérence entre `Plan.md` et `GuideIA.md`.
Couvre le pourquoi de l'outil, le modèle conceptuel (vues, entités, cycle de vie des révisions), et l'architecture technique (stack, parsing, local server, save).
Charger avant toute modification de l'outil ou de son comportement.
Ne couvre pas le contenu éditorial du guide — voir `Plan.md` et `Methode.md`.

## Keywords
plan-editor, outil, HTML, local-server, révision, plan, guide, cohérence, balises, chapitres, éléments-nommés

## Table of Contents

1. [Why](#why)
2. [What](#what)
3. [How](#how)
4. [Index](#index)

## Why
[up](#table-of-contents)

Travailler sur `Plan.md` et `GuideIA.md` avec l'IA est efficace pour la valeur ajoutée — générer du contenu, reformuler, explorer des idées. C'est moins adapté pour naviguer dans la structure, comparer deux fichiers en parallèle, ou faire des modifications directes et précises sur le texte.

Un outil dédié prend en charge ce que l'IA fait mal :

**Navigation dans la structure** — visualiser les deux fichiers côte à côte par chapitre, sans scroller dans des fichiers longs. Voir d'un coup d'œil l'état d'un chapitre : ce qui est déclaré dans le plan, ce qui est rédigé dans le guide.

**Synchronisation plan / guide** — la synchronisation entre `Plan.md` et `GuideIA.md` est le cœur du travail éditorial : vérifier qu'un chapitre est bien développé dans le guide par rapport à ce qui était prévu dans le plan, ajuster l'un en regardant l'autre. Cette comparaison est impossible à faire mentalement sur des fichiers longs — elle nécessite une vue simultanée des deux. Les onglets forcent à basculer et à se souvenir de ce qu'on vient de lire. La vue côte à côte supprime ce coût cognitif.

**Cohérence structurelle** — les balises `{{def:...}}` et `{{ref:...}}` peuvent dériver sans qu'on s'en aperçoive. L'outil détecte en continu les incohérences entre les deux fichiers : balises manquantes, doublons, références invalides, chapitres désynchronisés.

**Modification directe de la structure** — ajouter, retirer, réordonner des chapitres dans les deux fichiers simultanément, sans risquer de casser la cohérence.

**Gestion des éléments nommés** — ajouter, renommer, supprimer des mots-clés, figures et encadrés déclarés dans le plan.

**Édition du texte** — modifier le contenu d'un chapitre dans le plan ou dans le guide directement depuis l'interface, sans ouvrir l'éditeur.

**Modèle de révision explicite** — travailler directement sur les fichiers sources sans filet expose à des pertes en cas de fermeture accidentelle. Par ailleurs, un save immédiat à chaque modification ne donne aucun contrôle sur ce qui est écrit dans le Changelog. L'outil introduit un modèle de révision : les modifications s'accumulent dans une révision locale, clairement visibles, et ne sont appliquées aux fichiers sources qu'au moment d'un Save explicite.

## What
[up](#table-of-contents)

### Entités

**Chapitre** — unité de base, identifié par son numéro et titre. Existe dans le plan ET dans le guide, ou seulement l'un des deux (état désynchronisé).

**Élément nommé** — mots-clés, figures, encadrés. Déclaré dans le plan, défini dans le guide (`{{def:...}}`), référencé dans le guide (`{{ref:...}}`). Trois états possibles : déclaré seulement / défini / référencé.

**Section de texte** — contenu rédigé d'un chapitre : section `#### Contenu` dans le plan, corps du chapitre dans le guide.

**Révision en cours** — ensemble des modifications accumulées depuis le dernier Save. Persistée automatiquement dans `tmp/plan-editor-draft.json`. Rechargée au démarrage si elle existe. Chaque élément modifié est clairement marqué comme tel dans toutes les vues.

### Vues

**Vue Navigateur** — panneau permanent affichant la structure commune des chapitres. Indique les incohérences : chapitre présent dans un seul fichier, ordre différent entre plan et guide. Permet d'ajouter et supprimer un chapitre. La sélection d'un chapitre pilote les deux éditeurs et la vue éléments.

**Vue Plan du chapitre** — panneau supérieur gauche, permanent. Affiche et permet d'éditer le texte de la section `#### Contenu` du chapitre sélectionné dans `Plan.md`.

**Vue Guide du chapitre** — panneau supérieur droit, permanent. Affiche et permet d'éditer le texte du chapitre sélectionné dans `GuideIA.md`.

**Vue Éléments du chapitre** — panneau inférieur, permanent. Gestion des mots-clés, figures et encadrés du chapitre sélectionné. Pour chaque élément : statut (déclaré / défini / référencé), actions ajouter / renommer / supprimer.

### Cycle de vie de la révision

- **Démarrage** — charge les fichiers sources et la révision en cours si elle existe
- **Modification** — toute modification est ajoutée à la révision et persistée localement au fil de l'eau
- **Save** — la révision est appliquée aux fichiers sources, le Changelog est mis à jour (après validation par l'utilisateur), la révision locale est effacée
- **Abandon** — la révision peut être annulée explicitement, restaurant l'état des fichiers sources

### Contraintes

**Accès concurrent non géré** — l'outil ne détecte pas les modifications externes sur `Plan.md` et `GuideIA.md` pendant une révision en cours. L'utilisateur s'engage à ne pas modifier ces fichiers (via l'éditeur ou l'IA) tant qu'une révision est ouverte. Cette contrainte pourra être levée dans une version ultérieure (détection par timestamp ou hash).

## How
[up](#table-of-contents)

### Stack

Fichier unique `tools/plan-editor.html` — HTML + CSS + JS inline, aucune dépendance externe.
Accès aux fichiers via `local-server.js` — lecture et écriture de `Plan.md`, `GuideIA.md`, et du fichier de révision.

### Fichiers accédés

| Fichier | Accès | Rôle |
|---------|-------|------|
| `Plan.md` | lecture / écriture au Save | Source plan |
| `GuideIA.md` | lecture / écriture au Save | Source guide |
| `tmp/plan-editor-draft.json` | lecture / écriture au fil de l'eau | Révision en cours |

### Bootstrap

Fichier d'entrée `tools/plan-editor-bootstrap.html`, ouvert via `file://` :
1. Vérifie la disponibilité du local server via `GET /ping`
2. Si disponible : redirige vers `http://localhost:3000/<chemin absolu>/tools/plan-editor.html`
3. Si indisponible : affiche "Démarrez le local server avant d'ouvrir cet outil"

### Démarrage de l'outil

1. Charge `Plan.md` et `GuideIA.md` via `GET /file`
2. Parse les deux fichiers (chapitres, éléments nommés, balises)
3. Charge `tmp/plan-editor-draft.json` si il existe — applique la révision en cours à l'état en mémoire
4. Affiche l'indicateur de connexion et l'état de révision

### Parsing

- **Chapitres** : sections `### N. Titre` dans chaque fichier
- **Éléments nommés** : sous-sections `#### Mots-clés`, `#### Figures`, `#### Encadrés` dans `Plan.md`
- **Balises** : `{{def:type:id}}` et `{{ref:type:id}}` dans `GuideIA.md`
- **Incohérences** : chapitres manquants d'un côté, ordre divergent, éléments déclarés sans définition

### Format de la révision

`tmp/plan-editor-draft.json` contient une liste d'opérations typées :

| Opération | Données |
|-----------|---------|
| `edit-plan-content` | `{ chapter, content }` |
| `edit-guide-content` | `{ chapter, content }` |
| `add-chapter` | `{ number, title, position }` |
| `remove-chapter` | `{ chapter }` |
| `reorder-chapters` | `{ order }` |
| `add-element` | `{ chapter, type, id, description }` |
| `remove-element` | `{ chapter, type, id }` |
| `rename-element` | `{ chapter, type, id, newId }` |

### Save

1. Applique la révision aux deux fichiers sources en mémoire
2. Génère une entrée Changelog (date + résumé des opérations) — présentée à l'utilisateur pour validation
3. Écrit `Plan.md` et `GuideIA.md` via `POST /file`
4. Supprime `tmp/plan-editor-draft.json` via `DELETE /file`

### Layout

- Trois zones : Navigateur (fixe, gauche) | Zone chapitre (flex, reste de l'écran)
- Zone chapitre — rangée haute : deux panneaux éditables côte à côte, Plan (gauche) et Guide (droite), hauteur égale
- Zone chapitre — rangée basse : panneau Éléments, hauteur fixe, scrollable
- Aucun onglet — les trois panneaux de détail sont toujours visibles simultanément
- Indicateur de connexion (vert/orange/rouge) et badge "révision en cours" toujours visibles dans la topbar

## Index

| Terme | Occurrences |
|-------|-------------|

## Changelog

### Version 1.2 - Parsing délégué à guide-parser.js
**Date:** 2026-06-05
**Raison:** Les parsers de `Plan.md` et `GuideIA.md` étaient dupliqués dans `plan-editor.html` et `render_html.js` et avaient silencieusement divergé. Extraction dans `tools/lib/guide-parser.js` — librairie partagée, wrapper UMD.

**Modifications :**
- How / Stack : dépendance ajoutée — `tools/lib/guide-parser.js` chargé via `<script>` avant le script principal
- How / Parsing : note ajoutée — parsing délégué à `guide-parser.js`, voir `tools/guide-parser.md` pour le format de référence
- Implémentation : fonctions `parsePlan()`, `parseGuide()`, `parseFigBlocks()`, `parseEncBlocks()` supprimées de `plan-editor.html` ; remplacées par `const { parsePlan, parseGuide } = GuideParser`

---

### Version 1.1 - Vue côte à côte Plan / Guide
**Date:** 2026-06-05
**Raison:** Les onglets empêchent la comparaison simultanée plan/guide, qui est le cœur du travail éditorial.

**Modifications :**
- Why : ajout du paragraphe **Synchronisation plan / guide** — coût cognitif des onglets, valeur de la vue côte à côte
- What / Vues : Vue Navigateur mise à jour (pilote deux éditeurs + éléments) ; Vue Plan et Vue Guide deviennent des panneaux permanents simultanés ; Vue Éléments passe en panneau inférieur permanent
- How / Layout : remplacement des trois onglets par un split vertical (rangée haute Plan+Guide, rangée basse Éléments)

---

### Version 1.0 - Création
**Date:** 2026-06-05
**Raison:** Spec initiale de l'outil plan-editor — rédigée en session guideIA après chargement des conventions documentation, documentation-style, tools et local-server.

**Contenu initial :**
- Why : limites du travail IA seul, valeur de l'outil, modèle de révision explicite
- What : entités (chapitre, élément nommé, section de texte, révision), vues (navigateur, plan, guide, éléments), cycle de vie, contraintes
- How : stack, fichiers, bootstrap, parsing, format révision, save, layout
