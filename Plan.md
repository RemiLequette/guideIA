# Plan

## Objectif
Définir le contenu attendu du guide guideIA : chapitres et ce qu'on veut y dire.

## Sommaire
- [Guide de style figures](#guide-de-style-figures)
- [Chapitres](#chapitres)

## Guide de style figures

*Voir section "Rendu final du document" dans `Methode.md` pour les contraintes par cible de rendu.*

### Style général

- **Dimensions** : 700×420px, `viewBox="0 0 700 420"`
- **Fond** : blanc `#ffffff`
- **Typographie** : `font-family="sans-serif"` — labels 12-13px, titres/annotations 14-15px
- **Langue** : français pour tous les labels visibles

### Palette commune

| Rôle | Couleur |
|---|---|
| Humain | `#6b7280` (gris) |
| Orchestrateur / éléments structurels | `#0d9488` (teal) |
| Modèle / LLM | `#7c3aed` (violet) |
| Données / points | `#3b82f6` (bleu) |
| Outliers / alerte | `#f97316` (orange) |
| Inadéquation (underfitting) | `#ef4444` (rouge) |
| Surajustement (overfitting) | `#7c3aed` (violet) |
| Zone interpolation | fond `#d1fae5`, contour `#10b981` (vert) |
| Zone extrapolation | fond `#fee2e2`, contour `#ef4444` (rouge) |

---

### Groupe `prompt` — diagrammes de flux et de structure

Figures : `flux-orchestrateur`, `prompt-etendu-historique`, `prompt-etendu-complet`

**Nœuds (flux-orchestrateur)**
- Rectangles à coins arrondis (`rx="8"`), largeur fixe 140px, hauteur 48px
- Couleurs selon palette : humain gris, orchestrateur teal, modèle violet
- Label centré, blanc, 14px

**Flèches**
- Directionnelles, épaisseur 2px, couleur `#6b7280`
- Label court au-dessus (flux aller), en-dessous (flux retour), 12px, `#374151`

**Blocs de structure (`prompt-etendu-*`)**
- Empilement vertical, chaque couche rectangle plein, hauteur uniforme par type
- Couleurs par type de couche : prompt système teal `#0d9488`, instructions utilisateur bleu `#3b82f6`, historique gris `#9ca3af`, dernier prompt violet `#7c3aed`
- Label centré, blanc, 13px
- Indication visuelle de croissance de l'historique (hauteur variable ou annotation fléchée)

---

### Groupe `immo` — graphiques cartésiens

Figures : `immo-regression`, `immo-outliers`, `immo-deux-segments`, `immo-underfitting`, `immo-overfitting`, `immo-interpolation-extrapolation`

**Axes**
- x = surface (m²), y = prix (€)
- Labels courts, sans valeurs numériques précises (figures pédagogiques)
- Couleur axes : `#374151`, épaisseur 1.5px
- Graduation légère : tirets fins `#e5e7eb`

**Jeu de données**
- ~15 points, **même distribution dans toutes les figures du groupe**
- Cercles bleus `#3b82f6`, rayon 5px, `fill-opacity="0.75"`

**Éléments spécifiques par figure**
- `immo-regression` : droite teal `#0d9488`, épaisseur 2px ; lignes de lecture tiretées `#6b7280` pour un bien exemple
- `immo-outliers` : 2-3 outliers orange `#f97316`, contour distinct, rayon 6px
- `immo-deux-segments` : deux segments de droite, teal et violet, avec point de coupure visible
- `immo-underfitting` : droite rouge `#ef4444` qui ne suit pas la tendance ; annotation "modèle trop simple"
- `immo-overfitting` : courbe violette `#7c3aed` qui passe par tous les points, ondulée, trait 1.5px ; annotation "modèle trop complexe"
- `immo-interpolation-extrapolation` : zones colorées fond vert/rouge délimitant les données, labels "interpolation" / "extrapolation"

## Chapitres

1. [Introduction](#1-introduction)
2. [Travailler avec une IA](#2-travailler-avec-une-ia)
3. [Le modèle et l'orchestrateur](#3-le-modèle-et-lorchestrat eur)
4. [C'est quoi la génération ?](#4-cest-quoi-la-génération-)
5. [Le problème du poisson rouge](#5-le-problème-du-poisson-rouge)
6. [C'est quoi le contexte ?](#6-cest-quoi-le-contexte-)
7. [Le problème de l'attention](#7-le-problème-de-lattention)
8. [Conclusion](#8-conclusion)

<!-- ============================================================
     CONTENU DU GUIDE
     Tout ce qui suit appartient au guide, pas aux méta-données
     du plan. Lors d'une harmonisation plan/guide, ne modifier
     que le contenu des sections (#### Contenu, #### Figures,
     #### Encadrés, #### Mots-clés) — pas les sections
     précédentes.
     ============================================================ -->

# Guide pratique de l'assistant IA

---

### 1. Introduction

#### Mots-clés
- anthropomorphisme
- intention
- collaborateur
- hallucination

#### Figures

#### Encadrés

#### Contenu

**Anthropomorphisme**
Définir l'anthropomorphisme : la tendance naturelle à prêter des caractéristiques humaines
à ce qui n'en a pas. Pourquoi on le fait (c'est câblé dans notre cerveau, on le fait avec
les animaux, les voitures, la météo). Ses limites : principalement l'absence d'intention —
une IA ne veut rien, ne ressent rien, n'a pas d'objectif propre.

Pourquoi c'est particulièrement important avec une IA : on lui parle, elle répond de façon
cohérente, elle semble comprendre. C'est le premier outil de l'histoire avec qui on converse.
Le risque est de lui prêter des intentions qu'elle n'a pas.

**Ce qu'on attend malgré tout**
On travaille avec elle comme avec un collaborateur : on lui pose des questions,
on lui délègue des tâches. Elle est bien équipée pour cela — connaissances encyclopédiques,
maîtrise de nombreuses disciplines, capacité de rédaction, analyse, code, langues, etc.
Mais elle a des limites fondamentales que le guide va explorer.

**La métaphore du CV**
Pour apprivoiser l'anthropomorphisme : imaginer recruter un assistant avec un CV hors norme —
section compétences immense, mais sections motivation et expérience vides.
Ce que ça signifie concrètement. En plus : il est distrait, il a tendance à vouloir
faire plaisir coûte que coûte, et il lui arrive d'inventer des choses — parfois manifestement
fausses, parfois de façon moins détectable.

---

### 2. Travailler avec une IA

#### Mots-clés
- prompt
- validation
- méthode de travail
- bienveillance

#### Figures

#### Encadrés

#### Contenu

**Comment gérer ce profil**
Pas de secret : exploiter ses qualités en limitant ses défauts.
- Être clair dans les questions et les directives
- Contrôler et valider les réponses et les résultats de tâches

**C'est exigeant — mais trois bonnes nouvelles**
Travailler de façon rigoureuse peut sembler fatigant. Pourtant :

1. **Ça vous sert aussi à vous améliorer.** Pas qu'avec les IA : avant d'envoyer,
   demandez-vous "si on me disait ça, est-ce que je comprendrais sans ambiguïté ?"

2. **Il est très bienveillant** (forgiving — difficile à traduire). Il ne va pas râler
   ou se moquer de vous à la machine à café.

3. **Il peut vous aider à progresser.** Il connaît très bien ses limites — il ne se
   les applique juste pas. Donc : demandez-lui de reformuler, d'expliquer ses raisons.
   Si quelque chose ne va pas, imaginez avec son aide comment améliorer la méthode.
   On verra les outils pour faire ça. Et surtout : ne pas le croire quand il dit
   que ça ne se reproduira plus.

**Documenter en même temps**
Toujours travailler sur la méthodologie et la documenter en même temps que le projet
— et documenter le projet aussi. C'est normalement pénible. Avec une IA, si on a pris
le pli, c'est fluide.

---

### 3. Le modèle et l'orchestrateur

#### Mots-clés
- modèle de langage
- LLM
- orchestrateur
- prompt
- complétion
- prompt système

#### Figures

> 🖼️ **figure** `flux-orchestrateur`
> Diagramme du flux entre les deux composants :
> humain → prompt → orchestrateur → prompt étendu → modèle → complétion → orchestrateur → réponse → humain.
> Flux aller (prompt) et retour (réponse) distincts entre chaque composant.
> Trois nœuds : humain (gris, neutre), orchestrateur (teal), modèle/LLM (violet).
> Style épuré, flèches directionnelles, labels courts.

#### Encadrés

#### Contenu

**Les deux composants**
L'architecture d'un assistant IA repose sur deux éléments distincts.

**Le modèle de langage (LLM)**
Un modèle entraîné sur des milliers de textes pour compléter des textes inachevés.

"La capitale de la France est" — cette phrase reste suspendue, sa complétion la plus
probable est "Paris". Le consensus est fort. (Vichy reste une réponse plausible, mais
minoritaire — le modèle reflète le consensus de ses données d'entraînement.)

"La meilleure équipe de foot en France est" — c'est plus intéressant. Plusieurs
complétions sont plausibles, le consensus moins évident.

Et si on reformule : "De l'avis des principaux commentateurs sportifs, les trois
meilleures équipes de foot en France sont" — la complétion devient plus riche, plus
nuancée. C'est déjà une introduction au rôle du prompt : la façon de formuler
oriente le résultat.

**L'orchestrateur**
Le composant qui fait l'interface avec l'humain. Il reçoit le prompt, l'envoie au modèle,
récupère la complétion et l'affiche.

**Le flux simplifié**
Utiliser la figure flux-orchestrateur ici.

**Le problème de l'interface**
Personne ne veut parler directement au modèle — en lui soumettant des débuts de phrase à
compléter. C'est là que l'orchestrateur prend la main : il rajoute devant la question —
sans la comprendre — des instructions pour que la réponse soit utile et cohérente.
C'est ce qu'on appelle le prompt système. Ça ressemble à quelque chose comme :

[bloc de code]
Tu es un assistant IA qui répond à une question posée par un utilisateur. Tu dois donner
des informations claires et précises, avec une explication courte, voire plusieurs
possibilités s'il y a des ambiguïtés. Tu poses des questions de clarification si
nécessaire. Tu peux ajouter quelques informations complémentaires qui restent dans le
thème, et tu relances la conversation avec une question ouverte pour engager des demandes
d'informations complémentaires. [...]
[fin de bloc]

Avec ce prompt système, on peut espérer une complétion du style :

> La capitale de la France est Paris, sur la Seine. C'est aussi la plus grande ville du
> pays avec 2 millions d'habitants. Y a-t-il d'autres pays dont vous voudriez connaître
> la capitale ?

Cet exemple est purement imaginaire — il veut simplement mettre en évidence l'importance
du prompt système pour la qualité de la réponse : ton, format, gestion des relances,
comportement en cas d'ambiguïté. C'est un secret de fabrication : complexe, finement
réglé, propre à chaque IA. Tout n'est pas dans le modèle.

La rédaction de votre propre prompt est aussi importante. Mais si on comprend le
principe, c'est d'abord du bon sens : être clair et fournir du contexte. N'écoutez pas
trop les pseudo-gourous qui vendent des prompts soi-disant tunés — "Tu es un professeur
de danse spécialisé dans les claquettes..." — comme on le verra plus tard, ça peut être
contre-productif.

---

### 4. C'est quoi la génération ?

#### Mots-clés
- génération
- données d'entraînement
- interpolation
- extrapolation
- hallucination
- underfitting
- overfitting

#### Figures

> 🖼️ **figure** `immo-regression`
> Graphique axes surface (x) / prix (y). Points représentant les transactions.
> Droite de régression représentant le prix moyen au m². Ligne verticale rouge
> partant de la surface de l'appartement cible, ligne horizontale arrivant à son
> prix estimé. Style pédagogique, épuré.

> 🖼️ **figure** `immo-outliers`
> Mêmes données que immo-regression, avec quelques points aberrants bien exagérés
> (un bien bradé, un vendu très au-dessus du marché). Montrer comment ils dévient
> la droite de régression.

> 🖼️ **figure** `immo-deux-segments`
> Modèle à deux pentes : une pour les petites surfaces (prix/m² élevé), une pour
> les grandes (prix/m² plus faible). Illustre l'enrichissement du modèle par rapport
> à immo-regression.

> 🖼️ **figure** `immo-underfitting`
> Données avec une structure visible (courbe), modèle trop simple (droite) qui ne
> capture pas la tendance. Le modèle "n'est pas assez intelligent".

> 🖼️ **figure** `immo-overfitting`
> Même données, modèle trop complexe dont la courbe passe par tous les points mais
> part dans des directions improbables entre les données. Le modèle "apprend par
> cœur" au lieu de généraliser.

> 🖼️ **figure** `immo-interpolation-extrapolation`
> Distinction visuelle : zone entre les données d'entraînement (interpolation, en vert)
> et zones en dehors (extrapolation, en rouge). Montrer qu'extrapoler amplifie les
> erreurs du modèle.

#### Encadrés

#### Contenu

**Accroche**
Il y a quelque chose de magique dans cette génération : on comprend que la connaissance
vient des données d'entraînement, mais on se doute bien que nulle part dans la littérature
humaine il n'y a un texte aussi tarabiscoté que le verbiage d'un prompt système ! Comment
ça marche alors ?

Ça repose sur le concept d'interpolation. Je vais l'expliquer en partant d'un exemple
volontairement très simple.

**L'exemple immobilier**
Je voudrais estimer la valeur d'un appartement. Je dispose d'une liste de transactions
immobilières avec les surfaces et les prix.

Une approche que nous connaissons toutes et tous : calculer le prix moyen au m², puis
multiplier par la surface de mon appartement.

Utiliser la figure immo-regression ici.

Et bien, comme Monsieur Jourdain, j'ai fait un modèle ! Un modèle c'est :
- une procédure pour calculer une sortie à partir d'une entrée : multiplier par le prix au m²
- des paramètres qui changent le calcul : ici un seul, le prix au m²
- une méthode d'apprentissage pour trouver les paramètres qui reflètent le mieux un jeu
  de données connues (entrée, sortie) dits données d'entraînement — ici les transactions
  immobilières, et la méthode le calcul de la moyenne

Même si la surface de mon bien ne figure pas dans les transactions historiques, ou qu'il
y en a plusieurs avec la même surface et des prix différents, je trouve une valeur qui est
une bonne base de réflexion. Elle est là la magie de l'interpolation.

**Le LLM, même concept, échelle différente**

- Les entrées/sorties : des débuts de texte et leur complétion
- Les données d'entraînement : une immense base de textes, chacun découpé en plusieurs
  couples (début, complétion)
- La procédure de calcul : c'est la fameuse génération, complexe, mais pas besoin
  d'entrer dans les détails — juste que ça demande de bonnes capacités de calcul
  (les fameux GPU) mais peut se faire assez vite
- Les paramètres : plusieurs milliards, voire dizaines de milliards
- L'apprentissage : extrêmement complexe, des capacités de calcul gigantesques,
  ça ne se fait pas tous les jours

**D'où viennent les hallucinations**

On voit tout de suite que notre modèle immobilier peut halluciner et donner des
évaluations plus ou moins irréalistes. Pourquoi ? Deux raisons : la qualité des données
et la puissance du modèle.

*La qualité des données*
Comme on dit : garbage in, garbage out. Un exemple typique est la présence d'outliers
(valeurs aberrantes) — un bien bradé, un vendu très au-dessus du marché — qui vont
dérailler le calcul des paramètres.

Utiliser la figure immo-outliers ici.

Pour les LLM, on voit bien ce que ça veut dire : gros travail de préparation des données,
filtrage, nettoyage. Wikipedia c'est bien, les forums conspirationnistes c'est moins bien.

*La puissance du modèle*
Il y a peut-être plus que juste la surface : quartier, âge de l'immeuble, étage... Le
modèle pourrait inclure plus de variables. Mais même avec une seule variable, la puissance
joue. Les petites surfaces sont souvent plus chères au m² — notre modèle ne capture pas ça.

Utiliser la figure immo-deux-segments ici.

On peut l'enrichir : une surface de coupure, un prix au m² pour les petites surfaces, un
autre pour les grandes. On capture grossièrement notre connaissance du marché.

Quand un modèle n'est pas assez puissant pour donner des prévisions satisfaisantes, on dit
qu'il underfit. Il n'est pas assez intelligent pour répondre à la question — vous aurez beau
l'entraîner, il ne fera pas de progrès.

Utiliser la figure immo-underfitting ici.

Plus un modèle est complexe, plus il a de paramètres — des milliards dans un LLM. Donc plus
il faut de données, plus elles doivent être bonnes, plus la procédure d'apprentissage doit
être efficace.

Mais si on n'a pas assez de données, ou qu'elles ne sont pas bien réparties, plusieurs jeux
de paramètres différents peuvent coller aux données et donner des résultats très différents
en dehors. L'apprentissage est incapable de choisir le bon. Le modèle n'est pas robuste —
on dit qu'il overfit.

Utiliser la figure immo-overfitting ici.

Et voilà d'autres hallucinations. Techniquement on parle d'interpolation quand les questions
sont "entre" les données d'entraînement, d'extrapolation en dehors. C'est la même idée,
mais on voit bien qu'extrapoler nous amène encore plus dans le monde de la science-fiction.

Utiliser la figure immo-interpolation-extrapolation ici.

---

### 5. Le problème du poisson rouge

#### Mots-clés
- stateless
- sans état
- historique
- contexte
- fenêtre de contexte
- token

#### Figures

> 🖼️ **figure** `prompt-etendu-historique`
> Schéma de la structure du message envoyé au modèle :
> [prompt système] + [historique de la conversation] + [dernière question].
> Mettre en évidence que l'historique grossit à chaque échange.

#### Encadrés

> 📦 **encadré** `tokens`
> Définition des tokens : unité de mesure des LLM, roughly un mot ou un fragment de mot.
> Ordre de grandeur, coût, lien avec la fenêtre de contexte.
> À décider : développé ici ou dans un encadré référencé depuis plusieurs chapitres.

#### Contenu

**Les LLM n'ont aucune mémoire**
Aspect fondamental : entre deux générations, le modèle repart de zéro.
Pas de mémoire, pas d'état — stateless. Chaque génération est indépendante.
Le titre du chapitre fait référence à la réputation (humoristique) des poissons rouges
qui oublient tout — plus élégant que d'autres métaphores.

**Le problème pour l'orchestrateur**
Difficile de soutenir une conversation quand on oublie tout à chaque étape.
Solution : l'orchestrateur renvoie tout l'historique dans le texte à compléter.
Utiliser la figure prompt-etendu-historique ici.

**Comment nommer ce message ?**
Malheureusement on dira soit "prompt" soit "contexte" — parce qu'il contient
en fait le prompt original et des éléments de contexte (prompt système, historique...)
pour mieux répondre. Ce n'est pas très clair, mais on comprend en fonction du contexte.
(humour subtil assumé)

**L'importance de maîtriser la longueur**
Le message envoyé au modèle a une taille limite — la fenêtre de contexte —
qui dépend du LLM. Elle est très grande, mais l'historique croît vite.
Quand on approche de la limite, l'orchestrateur peut compresser l'historique
(résumer les échanges anciens) pour faire de la place.

Tout ce texte a un coût : c'est ce qu'on appelle les tokens — voir encadré tokens.

Intuitivement, un contexte très long peut créer de la confusion et de la distraction
pour le modèle — on expliquera pourquoi plus tard.

**Conclusion pratique**
Des conversations courtes et centrées sur un sujet.
(Si toutes les réunions étaient comme ça !)

---

### 6. C'est quoi le contexte ?

#### Mots-clés
- contexte
- prompt étendu
- instructions utilisateur
- projet
- déclaratif
- mémoire
- skill
- MCP
- contexte dynamique
- outil

#### Figures

> 🖼️ **figure** `prompt-etendu-complet`
> Schéma de la structure complète du prompt étendu avec toutes les couches :
> [prompt système] → [instructions utilisateur] → [historique de la session] → [dernier prompt].
> Variante enrichie de la figure prompt-etendu-historique.

#### Encadrés

> 📦 **encadré** `tokens-speciaux`
> Explication technique de la génération token par token et des tokens spéciaux
> qui structurent le prompt étendu : balises de rôle, de mémoire, de résultat d'outil, etc.

#### Contenu

**Définition**
Le contexte, c'est tout ce qu'on ajoute au prompt initial pour former le prompt étendu
envoyé au moteur. On en a déjà vu deux exemples : le prompt système (géré par
l'orchestrateur) et l'historique de la session. Le contexte a plusieurs rôles :
contrôler le style de la réponse, orienter les priorités de génération, et donner
de la mémoire au modèle.

**Pourquoi "contexte" est bien choisi**
Le langage humain est par essence ambigu et dépendant du contexte.
"Tu peux me passer le sel ?" n'est pas une question sur vos capacités physiques.
C'est précisément ce mécanisme — l'attention au contexte — qui a débloqué la technologie
des LLM. On y reviendra dans le chapitre suivant.

**La limite fondamentale : tout ça reste du texte plat**
Le LLM ne se regarde pas travailler. Au final, il reçoit un grand texte à compléter
— et c'est tout. Il ne peut pas hiérarchiser mécaniquement les éléments du contexte :
on lui dit, et on espère qu'il comprend.

Point crucial : le contexte est toujours **déclaratif, jamais impératif**. Quand vous
écrivez "je veux que tu répondes en trois points", comprenez : "il y a une probabilité
plus forte que la réponse contienne trois points". Ce n'est pas un ordre exécuté,
c'est une intention formulée. On reviendra sur ce point — il y a des façons de formuler
plus efficacement que d'autres.

> **TODO** : trouver une mise en valeur adaptée pour ce concept (encadré, analogie...).

**Enrichir le contexte : ce que l'orchestrateur vous offre**
L'orchestrateur propose des outils pour enrichir le contexte de façon statique.
Vous pouvez enregistrer des instructions personnelles qui seront systématiquement
insérées dans le prompt étendu. Utiliser la figure prompt-etendu-complet ici.

Certains orchestrateurs vont plus loin. Claude propose par exemple la notion de
**projet** : un contexte spécifique partagé par un groupe de sessions — des instructions,
des documents de référence, une mémoire commune.

Un projet peut aussi inclure des **fichiers de référence** — documentations, notes,
exemples — qui sont injectés dans le prompt étendu. Utile quand leur contenu est
fondamental pour la session. Mais attention : ce sont autant de tokens supplémentaires,
et un contexte qui grossit trop risque de diluer le focus de la session. On retrouve
ici le conseil du chapitre précédent : des sessions courtes et centrées.

**La mémoire**
L'orchestrateur peut gérer une mémoire — globale ou par projet. Elle est injectée dans
le prompt, clairement balisée. Le prompt système est enrichi en conséquence : il indique
au modèle que le prompt contient une mémoire, et l'invite à proposer des modifications
si la session apporte des éléments pertinents à mémoriser. En résumé : le moteur peut
prendre des notes pour les prochaines sessions. Pour la session en cours, pas besoin —
tout est déjà dans le prompt.

Avantage : une mémoire se construit entre les sessions. Inconvénient : on ne maîtrise
pas toujours bien ce qui s'y accumule, et on peut se retrouver avec des éléments qui
polluent toutes les sessions — un peu comme les cookies publicitaires.

> **TODO** : vérifier sur les différents assistants IA comment consulter et contrôler sa mémoire.

Conseil pour un usage professionnel : restreindre la mémoire au niveau projet, voire
s'en passer. La réserver aux usages plus personnels.

**Le contexte dynamique**
Jusqu'ici, le contexte était statique : défini à l'avance, injecté mécaniquement.
Il existe une approche plus subtile : laisser le LLM lui-même choisir le contexte
dont il a besoin. Concrètement, au lieu d'un seul tour de génération par prompt
utilisateur, on en fait plusieurs. Une génération peut inclure dans sa réponse des
requêtes de contexte supplémentaire, qui seront injectées dans le prompt suivant.

Exemple concret : "Fait-il beau à Nice ?"
La date d'entraînement du modèle est passée — la météo du jour n'y figure pas.
Avec de la chance, le modèle répond honnêtement qu'il ne sait pas. Mais le biais
de positivité peut l'amener à inventer une réponse vraisemblable : le prompt système
lui a demandé d'être serviable, et une génération qui donne une réponse est
statistiquement plus probable qu'une qui n'en donne pas.

Parenthèse sur ce biais : ce n'est pas seulement le prompt système qui y pousse.
C'est aussi l'entraînement lui-même — posez-vous la question : y a-t-il beaucoup
de documents dans la littérature humaine qui décrivent ce qu'on ne sait pas ?

Pourtant, le modèle sait déjà beaucoup de choses utiles sur cette question :
que "fait-il beau" relève de la météo, que la météo s'applique à des lieux,
que Nice est une ville, et que pour connaître la météo en temps réel, le plus
pratique est... de faire une recherche web. Il sait probablement quel service
appeler et comment formuler la requête.

Sa réponse va donc contenir une demande : effectuer cette recherche et lui
communiquer le résultat. L'orchestrateur exécute, récupère la page, reconstruit
le prompt avec le résultat injecté, et relance la génération. Le LLM produit
alors la réponse utile — ou demande une autre recherche si le résultat n'était
pas exploitable.

> *Note : tout l'anthropomorphisme de cet exemple est assumé pour la lisibilité —
> il n'y a bien sûr ni intention ni mémoire de la demande précédente.*

Voir encadré tokens-speciaux pour la mécanique sous-jacente.

**Skills et MCP : le contexte dynamique généralisé**
La recherche web n'est qu'un exemple. Le contexte dynamique repose sur un concept
plus général : des **outils** que le LLM peut solliciter pour obtenir du contexte.

Un **skill** est un ensemble d'instructions avec un contexte d'applicabilité, qui
ajoute une compétence à la volée. Exemple : comment lire un fichier Excel. Le LLM
reçoit le contenu brut du fichier et un ensemble d'instructions décrivant sa structure
— il peut alors l'exploiter correctement. L'orchestrateur gère une table de décision
permettant au LLM d'identifier le skill dont il a besoin et de générer la requête
de le charger dans le prochain prompt.

Le concept ultime est le **MCP** — Model Context Protocol, défini par Anthropic.
Un MCP est une description fournie à l'orchestrateur pour accéder à un service
externe. Il expose :
- une liste de commandes disponibles (recherche web, lecture de fichier, lecture
  d'emails...)
- des instructions en langage naturel décrivant dans quelles conditions utiliser
  cet outil et comment formuler chaque commande

Les formats échangés peuvent être très structurés, s'appuyant sur des standards
connus du modèle — SQL pour les bases de données, par exemple — ou soigneusement
décrits dans les instructions.

L'industrie a réagi avec enthousiasme : on trouve maintenant des centaines de MCP
permettant, en langage naturel, de lire et envoyer des emails, d'accéder à des
fichiers et au cloud, d'interroger des bases de données, de créer des factures dans
un ERP, de générer des modèles 3D...

---

### 7. Le problème de l'attention

#### Mots-clés
- attention
- self-attention
- fenêtre de contexte
- dilution
- lost in the middle
- polysémie

#### Figures

> 🖼️ **figure** `attention-dilution`
> Illustration du mécanisme de dilution de l'attention : un contexte court où
> l'attention est concentrée sur les éléments pertinents, vs un contexte long
> où elle se disperse sur de nombreux éléments peu pertinents.

#### Encadrés

> 📦 **encadré** `polysemie`
> Explication de la polysémie : pourquoi le langage est intrinsèquement ambigu.
> Exemples détaillés autour du mot "tour" et d'autres cas parlants.
> Lien avec le mécanisme d'attention qui résout cette ambiguïté.

#### Contenu

*Note : chapitre en cours — contenu validé en session, rédaction à compléter.*

**L'insight fondateur**
Le langage est ambigu par nature — c'est sa caractéristique fondamentale, pas un défaut.
Le sens d'un mot dépend des autres mots autour de lui. *Tour* peut être la Tour Eiffel,
le Tour de France, un tour de potier, une pièce aux échecs, un tour de chant, un tour de vis,
ou l'ordre dans une file — et on n'a même pas mentionné le donjon médiéval. "Il grimpe dans
les tours" : régime moteur ou quelqu'un qui s'énerve ?

Voir encadré polysemie ici.

C'est précisément le mécanisme qui a débloqué la technologie des LLM : l'**attention**.
Chaque mot "regarde" tous les autres et calcule à quel point ils sont pertinents pour lui.
C'est ce qui permet de résoudre l'ambiguïté — pas mot à mot, mais en pondérant l'ensemble
du contexte simultanément.

**Ce que ça coûte**
Ce mécanisme est puissant mais gourmand : son coût de calcul croît très vite avec la longueur
du contexte. Plus le contexte est long, plus le calcul est lourd — et plus la qualité peut
se dégrader.

**Le problème de la dilution**
Un contexte long ne signifie pas une meilleure compréhension. L'attention doit se répartir
sur l'ensemble du texte — et si ce texte contient beaucoup d'éléments peu pertinents,
la concentration se dilue. C'est contre-intuitif : on a l'impression qu'en donnant plus
d'informations, on aide. En réalité, on peut nuire.

Utiliser la figure attention-dilution ici.

Analogie : un jury qui doit trancher un litige. Lui soumettre 10 documents clairs est plus
efficace que 200 pièces dont 190 sont hors sujet. La pertinence prime sur le volume.

**Le "lost in the middle"**
Dans un contexte très long, les informations placées au milieu sont statistiquement moins
bien traitées que celles en début ou en fin. Implication pratique : si vous avez une
information critique, ne la noyez pas au milieu d'un long document.

**Conclusion pratique**
- Des prompts courts et ciblés
- Les informations importantes en tête ou en queue de contexte
- Ne pas injecter de documents entiers si seules quelques sections sont pertinentes
- Reconnaître les signes de dégradation : réponses qui ignorent des instructions,
  incohérences avec des éléments donnés plus tôt

---

### 8. Conclusion

#### Mots-clés

#### Figures

#### Encadrés

#### Contenu
