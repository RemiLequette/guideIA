# Méthode

## Objectif
Décrire la méthode de travail du projet guideIA : organisation des sessions, gestion des documents, et collaboration entre l'utilisateur et l'assistant IA.

**Objectif secondaire, mais prioritaire dans l'attention quotidienne :** ce projet est lui-même un exemple de collaboration humain-IA. La façon dont il se déroule — les échanges, les ajustements, les erreurs, les découvertes — constitue la matière première de l'appendice final du guide. Il faut donc documenter la collaboration au fil de l'eau, pas après coup.

## Sommaire
- [Fichiers du projet](#fichiers-du-projet)
- [Organisation des sessions](#organisation-des-sessions)
- [Workflow de collaboration](#workflow-de-collaboration)
- [Todo](#todo)
- [Snapshots de session](#snapshots-de-session)
- [Conventions du guide final](#conventions-du-guide-final)
- [Structure technique du guide](#structure-technique-du-guide)
- [Guide de style](#guide-de-style)
- [Balises](#balises)
- [Outillage](#outillage)
- [Journal](#journal)

## Fichiers du projet

| Fichier | Rôle |
|---|---|
| `Methode.md` | Méthode de travail et conventions du projet |
| `Plan.md` | Contenu attendu du guide : chapitres et ce qu'on veut y dire |
| `Todo.md` | Tâches en attente, idées, et suggestions de l'assistant |
| `GuideIA.md` | Le guide final (document livrable) |
| `Journal.md` | Journal de bord du projet |
| `exemples-sessions/` | Snapshots de sessions sélectionnées pour l'appendice |
| `figures/` | Figures du guide (générées ou trouvées), référencées par identifiant |

Chaque fichier de travail (`Methode.md`, `Plan.md`) doit maintenir une TOC simple juste après son objectif : une liste des sections avec une référence (ancre markdown).

## Organisation des sessions

Chaque session commence par le chargement de `Methode.md` et `Plan.md`. Le guide (`GuideIA.md`) et le journal (`Journal.md`) sont chargés uniquement si la session le nécessite.

Les sessions doivent être **focalisées** : un sujet par session, clairement défini au départ. Si la conversation dérive vers un autre sujet, l'assistant le signale et propose de traiter la digression dans une session séparée.

En fin de session, le journal est mis à jour avec une entrée courte : date, décisions prises, et moments notables de la collaboration.

## Workflow de collaboration

1. L'utilisateur indique le sujet de travail
2. L'assistant propose un contenu, sous forme de discussion
3. L'utilisateur valide ou ajuste
4. L'assistant écrit le fichier concerné
5. **Noter dans le journal** tout moment remarquable de la session :
   - Identifier les moments clés — ils peuvent porter sur la méthode de travail autant que sur le contenu (plan, rédaction du guide) : reformulation utile, erreur corrigée, échange ayant amélioré le contenu, limite rencontrée
   - Capturer aussi les moments amusants ou ironiques — particulièrement quand la méthode est mise en défaut ou illustrée de façon inattendue : ce sont souvent les plus parlants pour l'appendice
   - Proposer si pertinent un extrait de la session illustrant le moment clé
   - Valider avec l'utilisateur le contenu de chaque moment clé avant de l'écrire
   - Garder un nombre limité de moments clés — en avoir trop est un signal que la session a dérapé

## Todo

Fichier : `Todo.md`

La todo centralise tout ce qui n'est pas traité dans la session en cours : tâches à faire, idées sur le contenu ou la méthode, outils à développer. Elle sert aussi à l'assistant pour noter ses suggestions de sujets à traiter lors des prochaines sessions.

**Gestion :** n'importe lequel des deux peut proposer un ajout. L'assistant formule, l'utilisateur valide, l'assistant écrit.

**Contexte :** certaines entrées incluent une note de contexte en langage naturel pour préciser quand elles deviennent pertinentes (ex : "à faire une fois la rédaction du guide commencée").

**Aperçu :** à la demande, l'assistant fait un aperçu rapide de la todo. Les sessions dédiées permettent de la passer en revue et de filtrer selon l'avancement du projet.

## Snapshots de session

L'utilisateur peut demander à tout moment un snapshot de la session en cours, destiné à l'appendice du guide.

- L'assistant génère un résumé fidèle de la session en markdown
- Le fichier est sauvegardé dans `exemples-sessions/` avec le même nommage que l'entrée de journal correspondante : `YYYY-MM-DD-[sujet].md`
- L'assistant ajoute une référence au snapshot dans l'entrée de journal de la session

## Conventions du guide final

- Fichier unique : `GuideIA.md`
- Langue : français
- Structure définie dans `Plan.md`

## Structure technique du guide

### Titres
- `#` — titre principal du document
- `##` — chapitres
- `###` — sous-sections

*À enrichir au fil du projet.*

## Guide de style

- **Ton** : pédagogique et accessible, pas technique
- **Paragraphes** : courts, aérés
- **Analogies et exemples** : privilégier les situations concrètes pour illustrer les concepts
- **Humour** : bienvenu, avec mesure, uniquement au service de la compréhension
- **Concepts importants** : mis en valeur explicitement (reformulation, exemple dédié, ou encadré)
- **À éviter** : jargon technique, formulations trop formelles

## Balises

Les balises permettent de déclarer dans le plan des éléments nommés (mots-clés, figures, encadrés), puis de les définir et référencer dans le guide. Les outils lisent conjointement `Plan.md` et `GuideIA.md` pour vérifier la cohérence et produire le document final.

### Principe général

Chaque balise a :
- un **type** (`mk`, `fig`, `enc`)
- un **identifiant** unique dans l'ensemble du document
- une **description** dans le plan (texte libre)
- une **définition** dans le guide (une occurrence exactement) — `{{def:type:id}}`
- zéro ou plusieurs **références** dans le guide — `{{ref:type:id}}`

### Déclaration dans le plan

Les balises sont déclarées dans des sous-sections dédiées de chaque chapitre : `#### Mots-clés`, `#### Figures`, `#### Encadrés`. Le texte du plan mentionne les balises de façon libre ("utiliser la figure X ici", "voir encadré Y").

**Mots-clés** — liste simple, un identifiant par ligne :
```
#### Mots-clés
- anthropomorphisme
- hallucination
```

**Figures** — bloc descriptif, aussi détaillé que nécessaire pour guider la création ou la recherche :
```
#### Figures

> 🖼️ **figure** `flux-orchestrateur`
> Diagramme du flux simplifié : l'humain envoie un prompt,
> l'orchestrateur le transmet au modèle, le modèle retourne
> une complétion, l'orchestrateur affiche la réponse à l'humain.
```

**Encadrés** — bloc descriptif du contenu à rédiger dans le guide :
```
#### Encadrés

> 📦 **encadré** `polysemie`
> Explication de la polysémie : pourquoi le langage est intrinsèquement
> ambigu, avec exemples concrets (tour, sel...).
```

### Balises dans le guide

**Définition** — là où l'élément est introduit (une seule fois, dans le bon chapitre) :
```
{{def:mk:hallucination}}
{{def:fig:flux-orchestrateur}}
{{def:enc:polysemie}}
```

**Référence** — renvoi depuis n'importe quel autre endroit du texte :
```
{{ref:mk:hallucination}}
{{ref:fig:flux-orchestrateur}}
{{ref:enc:polysemie}}
```

Les outils de rendu remplacent `{{def:...}}` et `{{ref:...}}` par les formes appropriées (terme mis en valeur, numéro de figure, renvoi "voir encadré X") et génèrent les index en fin de document.

### Fichiers des figures

Les figures sont stockées dans `figures/`, nommées par leur identifiant (ex : `flux-orchestrateur.png`). Elles sont produites soit par recherche, soit par génération avec un outil dédié, lors d'une session consacrée à cet effet.

### Outils de check

Les outils de check vérifient la cohérence entre `Plan.md` et `GuideIA.md`. Ils doivent être exécutés avant tout rendu.

**Règles vérifiées :**

1. **Unicité des identifiants dans le plan** — un identifiant de balise apparaît dans les sous-sections d'un seul chapitre. Un identifiant présent dans deux chapitres est une erreur.

2. **Définition unique dans le guide** — chaque identifiant déclaré dans le plan a exactement une balise `{{def:...}}` dans le guide. Zéro définition (balise manquante) ou plus d'une (doublon) sont des erreurs.

3. **Définition dans le bon chapitre** — la balise `{{def:...}}` d'un identifiant se trouve dans le chapitre du guide correspondant au chapitre du plan où il est déclaré.

4. **Références valides** — toute balise `{{ref:...}}` dans le guide pointe vers un identifiant déclaré dans le plan. Une référence vers un identifiant inexistant est une erreur.

5. **Cohérence du type** — le type utilisé dans `{{def:...}}` et `{{ref:...}}` correspond au type déclaré dans le plan (`mk`, `fig`, `enc`).

### Outils de rendu

Les outils de rendu produisent le document final à partir de `Plan.md`, `GuideIA.md` et `figures/`. Ils supposent que le check a été exécuté sans erreur.

**Transformations appliquées :**

- `{{def:mk:id}}` → terme mis en valeur typographiquement (ex : gras ou italique selon le style)
- `{{ref:mk:id}}` → renvoi vers la définition avec numéro de page ou ancre
- `{{def:fig:id}}` → insertion de la figure depuis `figures/id.*`, avec légende et numéro
- `{{ref:fig:id}}` → "voir figure N"
- `{{def:enc:id}}` → insertion du bloc encadré tel que rédigé dans le guide, avec numéro
- `{{ref:enc:id}}` → "voir encadré N"

**Index générés en fin de document :**
- Index des mots-clés (alphabétique, avec numéro de page de la définition)
- Table des figures (numéro, légende, page)
- Table des encadrés (numéro, titre, page)

## Outillage

Le guide `GuideIA.md` doit rester lisible en markdown par un humain.
L'objectif final est de produire des versions PDF, HTML ou autres via des scripts.

Les conventions de balisage doivent être sans ambiguïté pour éviter les erreurs dans ces scripts.
Elles ne doivent pas entrer en conflit avec la syntaxe markdown standard.

Des outils seront développés pour automatiser les tâches mécaniques :
- **Check** : vérification de la cohérence entre `Plan.md` et `GuideIA.md` (voir section Balises)
- **Rendu** : transformation des balises et génération des index (voir section Balises)
- Génération de la TOC du guide
- Génération du sommaire des sessions dans `Journal.md`
- Export vers PDF, HTML, etc.

Le LLM se concentre sur le contenu sémantique ; les tâches structurelles sont déléguées aux outils.

> **Chantier à explorer** : préparer également des présentations à partir du guide — slides avec images et animations. Format et outillage à définir.

## Journal

Fichier : `Journal.md`  
Format d'une entrée :
```
## Session YYYY-MM-DD — [sujet court]

### Décisions
- ...

### Collaboration
- ...
```

Le fichier commence par un sommaire des sessions avec liens vers chaque entrée. Ce sommaire est destiné à être généré automatiquement par un outil.

Chaque entrée doit couvrir deux dimensions :
- **Décisions** : ce qui a été produit ou arrêté durant la session
- **Collaboration** : moments notables de l'échange humain-IA (reformulation qui a débloqué quelque chose, direction corrigée, limite de l'IA constatée, approche qui a bien fonctionné), avec extraits si pertinent

Ces notes alimenteront directement l'appendice du guide.


---
