# Plan

## Objectif
Définir le contenu attendu du guide guideIA : chapitres et ce qu'on veut y dire.

## Sommaire
- [Méta — hors guide](#méta--hors-guide)
- [Guide de style figures](#guide-de-style-figures)
- [Chapitres](#chapitres)

## Méta — hors guide

*Cette section ne fait pas partie du guide. Elle définit les conventions éditoriales propres à GuideIA : ton, public, style. Elle est lue par l'assistant IA en début de session de rédaction.*

### Public visé

Professionnels utilisant un assistant IA au quotidien, sans formation technique. Le guide suppose une curiosité intellectuelle, pas de connaissances en informatique ou en machine learning.

### Ton

- **Pédagogique et accessible** — jamais technique pour le plaisir d'être technique
- **Paragraphes courts et aérés**
- **Analogies et exemples concrets** — privilégier les situations du quotidien pour illustrer les concepts
- **Humour bienvenu, avec mesure** — uniquement au service de la compréhension, jamais gratuit
- **Concepts importants mis en valeur** — reformulation, exemple dédié, ou encadré
- **À éviter** : jargon technique, formulations trop formelles, condescendance

### Progression et dosage

Ces règles gouvernent la façon dont les concepts et les idées sont introduits au fil du texte :

- **Ne pas anticiper** — un concept qui sera expliqué plus tard ne s'introduit pas en passant. Même une mention fugace crée du bruit pour le lecteur qui ne dispose pas encore des clés.
- **Ne pas soulever une question que le lecteur ne se pose pas** — si la réponse est "non" ou "ça ne s'applique pas ici", ne pas poser la question. Le silence est plus propre.
- **Doser les mises en garde** — une mise en garde utile se glisse discrètement dans le texte, sans en faire un point de débat. L'objectif est qu'elle s'installe chez le lecteur, pas qu'elle déclenche une polémique.
- **Introduire sans insister** — un concept peut être évoqué brièvement à son premier passage, avec la promesse implicite que son rôle s'étoffera. Pas besoin de tout dire d'un coup.

### Conventions

- **Langue** : français — y compris les labels des figures
- **Fichier source** : `GuideIA.md` — fichier unique, lisible en markdown par un humain
- **Structure** : définie par les chapitres ci-dessous
- **Balises** : système `{{def:...}}` / `{{ref:...}}` décrit dans `Methode.md`

### Philosophie du guide

**On n'utilise bien que ce que l'on comprend bien.** Cette conviction est le fil directeur du guide : expliquer le fonctionnement interne des IA n'est pas une fin en soi, c'est la condition pour en tirer le meilleur parti et éviter les pièges.

### Structure narrative

Le guide est organisé en trois parties après l'introduction :

- **Partie 1** — forme un tout autonome et suffisant pour la plupart des lecteurs. Elle s'ouvre sur les grandes limitations (ce que les gens ont entendu comme faits ou légendes urbaines), explique la mécanique qui les cause, et se conclut sur les remèdes pratiques. Le lecteur qui comprend pourquoi ces limitations existent est bien mieux armé pour les contourner.
- **Partie 2** — retours d'expérience à la première personne. Cas pratiques, méthode, exemples de conversations.
- **Partie 3** — annexes techniques pour ceux qui veulent aller plus loin sous le capot. Le guide est complet sans elle.

### Note de collaboration

Ce projet est lui-même un exemple de collaboration humain-IA. La façon dont il se déroule — les échanges, les ajustements, les erreurs, les découvertes — constitue la matière première de l'appendice final du guide. Il faut donc documenter la collaboration au fil de l'eau, pas après coup.

---

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

**Introduction** *(hors partie)*

**Partie 1 — Comprendre pour bien utiliser**
1. [Introduction](#1-introduction)
2. [Travailler avec une IA](#2-travailler-avec-une-ia)
3. [Le modèle et l'orchestrateur](#3-le-modèle-et-lorchestrat eur)
4. [C'est quoi la génération ?](#4-cest-quoi-la-génération-)
5. [Le problème du poisson rouge](#5-le-problème-du-poisson-rouge)
6. [C'est quoi le contexte ?](#6-cest-quoi-le-contexte-)
7. [Le problème de l'attention](#7-le-problème-de-lattention)
8. [Alors docteur, on fait quoi ?](#8-alors-docteur-on-fait-quoi-)

**Partie 2 — Retours d'expérience** *(à la première personne)*
9. [Cas pratiques](#9-cas-pratiques)
10. [Discours de la méthode](#10-discours-de-la-méthode)
11. [Développer sa base de connaissance](#11-développer-sa-base-de-connaissance)
12. [Exemples de conversations](#12-exemples-de-conversations)

**Partie 3 — Pour aller plus loin**
13. [Apprentissage et transformeurs](#13-apprentissage-et-transformeurs)
14. tooling

**Conclusion** *(hors partie)*

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
- LLM
- prompt

#### Figures

#### Encadrés

#### Contenu
L'Intelligence Artificielle ce n'est pas vraiment nouveau, c'est une discipline qui remonte aux années soixante, qui a connu de célèbres "hivers" et qui a progressé par sauts et changement de points de vues comme beaucoup de sciences et technologies.

J'y ai été toujours été confronté, par mes choix académiques en particulier l'optimisation et la recherche opérationelle et dans ma carrière professionelle spécialement chez ILOG. Je ne me suis jamais considéré comme un expert directement impliqué, mais les besoins de mon travail et mes interêts m'on poussé à rester solidement informé sur le sujet.

J'ai toujours eu beaucoup de respect et d'admiration pour les travaux menés dans ce vaste domaine, mais par contre un petit doute sur l'ambition, voir un soupcon d'imposture pour le nom lui même.

C'est un projet scientifique tout à fait louable, mais n'est il pas un peu naif et l'objectif difficile à définir ? A chaque avancée nous étions impressionés, puis nous reprenions nos esprits et décidions de mieux préciser ce qu'être intelligent voulait dire plutôt que de faire une concession à la machine. Quand Deep Blue a battu Gary Kasparov nous avons été choqués, puis le consensus s'est établi que bien jouer aux échecs n'était finalement pas un vrai critère de l'intelligence. Ca rappelle un peu le célèbre sophisme du vrai écossais. 

- "Un vrai écossais ne met pas de glaçons dans son whisky"
- "Ah bon, mon ami Douglas MacDonald, d'Edimburgh, il met des glaçons dans son whisky"
- "Alors ce n'est pas un vrai écossais car un vrai écossais ne met pas de glaçons dans son whisky"

Il y a aussi un souci avec l'oxymoron "Intellidence Artificielle" lui même, un peut trop accrocheur, voire raccoleur. C'est utile pour récolter des fonds mais ca attire aussi tous les pseudo-experts et manipulateurs d'opinion que les réseaux sociaux ont démultipliés. Certains se rappellent peut-être le fameux projet "cinquième génération d'ordinateurs" du gouvernement japonais à la fin du siècle dernier, je ne me rappelle même pas si je savais à l'époque quelles étaient les quatre autres. Il a fini par 
se réveler être surtout une maneuvre de propagande politique abondamment reprise par les lobbies de l'autre coté de l'océan Pacifique. C'était la courte période où, la Russie devenant un peu moins crédible et la Chine ne l'étant pas encore suffisamment, le Japon a endossé avec grande fierté le rôle très prestigieux de menace existentielle pour les Etats-Unis.

Puis il y a au le "moment ChatGPT" et l'emballement qui a suivi avec ces grands modèles de language (LLM) : OpenAI, Anthropic, Gemini, Mistral, DeepSeek, ...
Les chatbots "intelligents" ce sont répandus dans le grand public, les entreprises expérimentent, une immense vague de buzz, de craintes, d'espoirs et de bruit submerge la planète.

On peut vraiment dire, et j'en suis intimement convaincu, que là, ils ont "craqué" quelque chose. Quoi ? C'est encore dur à définir, j'espère que ce guide vous aidera à vous faire une opinion, même si ce n'est pas son sujet principal. En tous les cas on peut dire que le fameux "test de Turing", qui était un des derniers remparts qui avait le mérite d'être un peu formalisé, est clairement en train de rompre. Il est du au brillant mathématicien anglais qui a craqué les codes secrets Nazis pendant la deuxième guerre mondiale et qui est un des grands théoriciens de l'informatique, et il peut se résumer simplement: "vous ne feriez pas la différence au téléphone".

Donc je suivais l'actualité, je jouais avec la bête et avec enthousiasme, et je me tenais informé sur la technologie. Je connaissais déjà bien celle de l'apprentissage profond qui est sous-jacente. J'y avais été confronté, je travaille beaucoup dans le domaine de la planification de la chaîne d'approvisionnement (Supply Chain) où la prévision de la demande joue un rôle crucial comme il n'est pas trop dificille de s'imaginer.

Puis je me suis retrouvé, toujours enthousiaste, dans l'opportunité de réaliser un projet dans un cadre professionnel. C'etait au momement ou on commencait à applique ces modèles à l'écriture du logiciel, ce qui ne se réduit pas à aligner du code. J'ai toujours été passionné par la programmation et l'ingénierie logicielle qui combine des bases théroriques forte (programmation, algorithme), de la techonologie, de l'ingénierie (conception, architecture, ergonomie, conduite de projet, ..) avec la complication de produire pour un besoin final dans des domaines tres variés dont il faut comprendre les besoins spécifiques. Passé par la R&D et le conseil j'étais soit impliqués directement, soit en forte coopération avec les équipes concernées.

Donc je me lance, et j'essaie aussi de mieux comprendre comment ca fonctionne en pratique. Je fait partie de ceux qui ne veulent pas d'une baguette magique, qui aiment comprendre comment fonctionne l'outil pour tenir compte des forces et faiblesses. Ce que j'entend par comprendre, c'est par exemple qu'il n'est pas nécessaire de connaitre la "mécanique" au sens oú elle est enseignée à l'école Polytechnique pour comprendre en pratique comment fonctionne une automobile. C'est très utile aux ingénieurs qui la concoivent, mais ca n'apporte pas grand chose pour bien l'utiliser et ne pas se faire trop arnaquer par un garagiste. Et, paradoxalement ou pas, ca peut être très dificille d'expliquer clairement, sans jargon ni concepts compliqués. Comme a dit Blaise Pascal: "j'ai fait long car je n'ai pas eu le temps de faire court".

Je vais prendre un exemple, je suis très agacé, peut-etre injustement, par ceux que j'appelle les "docteurs du prompt" qui vous fournissent de belles formules alambiquées "Tu es un professeur de claquettes borgne, pratiquant la peinture à l'huile de façon modérée ..." Je ne nie pas que certaines de ces formules marchent, quelque fois. Mais ca ressemble à quoi? Des incantations, de la magie, faut-il aussi attendre une nuit de pleine lune? Même si ca marche, je veux savoir pourquoi, quels sont les leviers, je ne veux pas travailler comme ca! Ou est le plaisir? 

Et après cet effort de compréhension, progressif, double surprise, ma productivité augmente constamment à des niveaux et d'une manière que je n'aurais même pas révé, et surtout il y a un réel plaisir à travailler de cette manière. Et c'est celà que je veux partager.

Peut-être ais-je un profil idéal, car, je le confesse, je suis un fénéant. J'ai des idées et particulèrement sur les bonnes pratiques de travail, je vois souvent comment les améliorer, mais je n'arrive pas à être rigoureux parce que celà implique de la bureaucratie et surtout ca interrompt le "flot" concept dificille à définir, certain disent la "zone", la où le travail est fluide et créatif, et dans le flot on a souvent des idées parallèles au projet en court, soit pour d'autres projets, soit surtout pour améliorer les méthodes de travail et rendre le flot encore plus efficace. Mais là, il faudrait s'arrêter, noter, documenter, ca casse le flot... Vous connaissez surement cette situation où l'on se dit, tient ca serait mieux de faire comme cà, là on a pas le temps, il faut livrer, mais des qu'on a un peu de temps on change cà pour la prochaine fois. Et on le fait très rarement car on oublie où on a pas le temps, c'est dificille à justifier auprès du management, ou tout simplement on à la flemme. Quoique je me considère comme faisant partie des fénéants créatifs, pas ceux qui cherchent à ne rien faire, mais qui cherchent minimiser l'effort pour arriver au résultat, on a quand même l'amour du travail bien fait! 

L'idée c est de tout intégrer au flot ! 

Ce guide à trois parties: 

La première se suffit à elle même, elle commence par poser le cadre du travail avec une IA, quelle est sa force mais surtout les principales limitations que l'on va rencontrer et qui risquent de dérailler le processus. Puis on va soulever le capot pour voir comment ca marche, sans détails excessif mais suffisamment pour comprendre d'où viennent ces limitations et ces forces. Enfin on fera la revue des techniques et bonnes pratiques pour exploiter ces forces et apprivoiser ces limitations.

La deuxième partie est en ensemble d'exemple concrets basés sur mon experience personelle. On abordera la création de documents techniques, un peu de développement de logiciel, mais pas trop, et un exemple dans la gouvernance car je suis impliqué dans une association professionelle. Je vous avoue que j'avais toujours révé d'écrire un document de plus de dix pages qui ne soit pas commercial ou technique, mais j'étais trop paresseux. Le dernier exemple est donc: comment j'ai écrit ce guide avec l'aide d'une IA en étant toujours dans le flot.

La dernière partie contient des annexes techniques pour ceux qui une fois le capot ouvert on envie de démonter le moteur. On y verra expliqué le fonctionnement interne d'un LLM (spoiler: ce n'est pas indispensable pour comprendre)

Bonne lecture, dans le flot!




---
### 2. Travailler avec une IA

#### Mots-clés
- prompt
- validation
- méthode de travail
- bienveillance

#### Figures

>🖼️ **figure** `Humains, Animaux, IAs`
> Trois cercles en triangle, type diagramme de Venn : Les Humains en haut, les animaux à gauche, les IAs à droite.
> Commun aux trois : Système 1 : réponse rapide
> Animaux et Humains : Intentions, émotions
> IAs et Humains : Connaissance, information, langage
> Humains seuls : Raisonnement, conscience
#### Encadrés

#### Contenu
*Note : étoffer la section "Valider" — trop courte. Ajouter des exemples concrets : vérifier les sources citées, croiser avec le bon sens, tester les affirmations factuelles.*

*Note : la section "Documenter en même temps" est intégrée dans le guide sous "Trois bonnes nouvelles", pas comme section séparée. Le plan est aligné sur cette structure.*

**Anthropomorphisme**

ommençons par un aveu : nous sommes tous câblés pour prêter des intentions humaines à ce qui nous entoure. Un nuage qui "menace", une voiture qui "refuse de démarrer", un chat qui "boude". C'est {{def:mk:anthropomorphisme}} — la tendance naturelle à projeter des caractéristiques humaines sur ce qui n'en a pas. Ce n'est pas un défaut de raisonnement : c'est une stratégie cognitive ancienne, efficace pour naviguer dans un monde social complexe.

Avec une IA, ce réflexe est particulièrement tenace. Elle vous répond en phrases construites, elle semble comprendre vos questions, elle s'adapte à votre ton. C'est le premier outil de l'histoire avec qui on *converse*. Difficile de ne pas lui prêter une forme d'{{def:mk:intention}}.

Pourtant, une IA ne veut rien. Elle ne ressent rien. Elle n'a pas d'objectif propre, pas de bonne ou mauvaise journée, pas d'opinion sur vous. Ce point n'est pas une mise en garde morale — c'est une information utile pour travailler efficacement avec elle.


L'entropomorphisme est bien sympathique ou defoulant quand on parle a ses plantes ou insulte son ordinateur mais ça a ses limites quand on dit que la voiture ne démarre pas c'est pas parce qu'elle boude c'est parce qu'elle est en panne.

Mais chez les animaux et chez les IA, le paradigme peut avoir son efficacité si on
en connaît bien les limites.
Ça marche si on partage quelque chose.
Qu'est-ce que nous avons commun avec les animaux ? Les intentions, les émotions.
Qu'est-ce que nous avons commun avec les IA ? Le langage ou plus généralement la
capacité à extraire de l'information de differentes sources (texte, video, audio) et de la rapprocher d'informations memorisees au prealable de facon flexible, on dira conceptuelle faute de mieux.

Qu'est-ce qui reste, ce qui est spécifique aux humains ? C'est entre autre le raisonnement et la
conscience.

Qu'est-ce que nous partageons tous les trois ? C'est ce que Daniel Kahneman appelle le
système 1, la reconnaissance immédiate de formes, de patterns pour pouvoir agir immédiatement.
On verra que c'est ce socle-là qui est la principale source des limitations de l'IA, parce qu'il
ne le contrôle pas bien. Daniel Kahneman dirait qu'il n'a pas le système 2.

figure 
### Ce que notre cerveau fait tout seul


**Un collaborateur au CV hors norme**

Pour apprivoiser cette réalité, voici une image. Imaginez recruter un {{def:mk:collaborateur}} avec un CV hors norme : la section *compétences* est immense — encyclopédie vivante, maîtrise de dizaines de langues, rédaction, analyse, code, droit, médecine, cuisine, poésie. Mais les sections *motivation* et *expérience professionnelle* sont vides. Il n't a pas de parcours, pas de raisons personnelles d'être là.

Et quelques particularités supplémentaires à bien noter pour la suite : il est distrait, il a une tendance marquée à vouloir faire plaisir coûte que coûte — parfois au détriment de l'exactitude — et il lui arrive d'inventer des choses. C'est ce qu'on appelle une {{def:mk:hallucination}} : une réponse construite avec confiance, mais déconnectée de la réalité. Parfois flagrant, parfois beaucoup moins détectable.

Ce profil existe bel et bien. La bonne nouvelle : il est très gérable, si on sait comment l'aborder. C'est l'objet de ce guide.




plan par pb ? avec titre accrocheur / plutot familles de recettes
- hallucination
- pollution de contexte
- attention
- memoire
- discussion
- 
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
> Enrichir avec les données externes sur l'orchestrateur (web, fichiers...) — philosophie "complet mais juste assez" :
> montrer que l'orchestrateur peut aller chercher des données externes sans les détailler dans le texte.
> Le lecteur voit l'architecture complète dès le ch. 3 et la visite progressivement dans les chapitres suivants.

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

*Note : introduire le biais de positivité dès ce chapitre, juste après l'explication de
l'interpolation sur des textes humains. Idée : dans la base d'entraînement, il y a très
peu de "je ne sais pas". Le modèle génère ce qu'il a vu — et il a rarement vu quelqu'un
admettre son ignorance. Troisième grand problème structurel avec les hallucinations et l'attention.*

*Note (Monsieur Jourdain) : réintroduire la référence — "Sans le savoir, je viens de
construire un modèle" → "Comme Monsieur Jourdain faisait de la prose, je viens de
construire un modèle."*

**L'exemple immobilier**
Je voudrais estimer la valeur d'un appartement. Je dispose d'une liste de transactions
immobilières avec les surfaces et les prix.

Approche classique : calculer le prix moyen au m², puis multiplier par la surface.

Utiliser la figure immo-regression ici.

Sans le savoir, je viens de construire un modèle. Un modèle c'est :
- une procédure pour calculer une sortie à partir d'une entrée : multiplier par le prix au m²
- des paramètres qui changent le calcul : ici un seul, le prix au m²
- une méthode d'apprentissage pour trouver les paramètres qui reflètent le mieux les données
  d'entraînement — ici les transactions immobilières, et la méthode le calcul de la moyenne

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
Garbage in, garbage out. Un exemple typique est la présence d'outliers
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

Quand un modèle n'est pas assez puissant, on dit qu'il underfit — il ne peut pas progresser
même avec plus d'entraînement.

Utiliser la figure immo-underfitting ici.

À l'inverse, un modèle très complexe avec trop peu de données peut "apprendre par cœur"
sans généraliser — il overfit. Sa courbe colle aux données connues mais part dans des
directions improbables ailleurs.

Utiliser la figure immo-overfitting ici.

Techniquement on parle d'interpolation quand les questions sont "entre" les données
d'entraînement, d'extrapolation en dehors. Extrapoler amplifie encore plus les erreurs.

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
> Ordre de grandeur, coût (calcul GPU, donc énergie) — sans jugement de valeur, juste
> les faits qui permettent de comprendre ce que les gens entendent.
> Lien avec la fenêtre de contexte.

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

Ce message complet s'appelle tantôt "prompt", tantôt "contexte" — parce qu'il contient
à la fois la question et les éléments de contexte nécessaires pour y répondre. La note
d'humour sur la double signification de "contexte" est intégrée dans le guide de façon
naturelle — plan aligné sur la structure du guide.

**L'importance de maîtriser la longueur**
Le message envoyé au modèle a une taille limite — la fenêtre de contexte —
qui dépend du LLM. Elle est très grande, mais l'historique croît vite.
Quand on approche de la limite, l'orchestrateur peut compresser l'historique
(résumer les échanges anciens) pour faire de la place.

Tout ce texte a un coût : c'est ce qu'on appelle les tokens — voir encadré tokens.
(Inclure dans l'encadré : coût énergétique — calcul GPU, donc énergie — sans jugement
de valeur, pour raccrocher ce que les gens entendent aux bons concepts.)

Un contexte très long peut aussi créer de la confusion pour le modèle — on verra
pourquoi dans le chapitre sur l'attention.

**Conclusion pratique**
Des conversations courtes et centrées sur un sujet. Nouvelle session si le sujet change.
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
> → Déplacé vers l'annexe technique.

#### Contenu

**Définition**
Le contexte, c'est tout ce qu'on ajoute au prompt initial pour former le prompt étendu
envoyé au moteur. On en a déjà vu deux exemples : le prompt système (géré par
l'orchestrateur) et l'historique de la session. Le contexte a plusieurs rôles :
contrôler le style de la réponse, orienter les priorités de génération, et donner
de la mémoire au modèle.

*Note : la section déclaratif/impératif est à supprimer du guide (décision de session).
La supprimer aussi du plan — ne pas développer ce concept ici.*

*Note : remplacer la référence à l'encadré `tokens-speciaux` dans le guide par un renvoi
vers l'annexe technique.*

*Note : ajouter un petit exemple narratif autour de l'email — sur le modèle de l'exemple
météo du contexte dynamique. Renforce un concept important pour ceux qui n'ont pas encore
généralisé. Rapide, en "racontant une histoire".*

*Note : positionner ici le concept "boucle d'or" (Goldilocks) — niveau de détail optimal
dans un prompt. Ni trop vague (le modèle improvise), ni trop contraint (on perd la valeur
de l'IA). À placer après l'explication du contexte déclaratif, comme règle pratique issue
du fonctionnement du modèle.*

**Pourquoi "contexte" est bien choisi**
Le langage humain est par essence ambigu et dépendant du contexte.
"Tu peux me passer le sel ?" n'est pas une question sur vos capacités physiques.
C'est précisément ce mécanisme — l'attention au contexte — qui a débloqué la technologie
des LLM. On y reviendra dans le chapitre suivant.

**La limite fondamentale : tout ça reste du texte plat**
Le LLM ne se regarde pas travailler. Au final, il reçoit un grand texte à compléter
— et c'est tout. Il ne peut pas hiérarchiser mécaniquement les éléments du contexte :
on lui dit ce qui est important, et on espère qu'il comprend.
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

Exemple narratif : "Fait-il beau à Nice ?"
La date d'entraînement du modèle est passée — la météo du jour n'y figure pas.
Avec de la chance, le modèle répond honnêtement qu'il ne sait pas. Mais il peut
aussi inventer une réponse vraisemblable — c'est le biais de positivité : le prompt
système lui demande d'être serviable, et une génération qui donne une réponse est
statistiquement plus probable qu'une qui n'en donne pas. Ce biais vient aussi de
l'entraînement lui-même : y a-t-il beaucoup de textes humains qui décrivent ce
qu'on ne sait pas ?

Pourtant le modèle sait des choses utiles : que la question relève de la météo,
que la météo s'applique à un lieu, que Nice est une ville, et que le plus pratique
est de faire une recherche web. Sa réponse va donc contenir une demande : effectuer
cette recherche et lui communiquer le résultat. L'orchestrateur exécute, reconstruit
le prompt avec le résultat, et relance la génération.

Voir encadré tokens-speciaux (annexe technique) pour la mécanique sous-jacente.

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

**Self-attention et polysémie — dans les deux sens**
Le mécanisme d'attention résout la polysémie. Mais il le fait dans les deux sens : un
contexte mal structuré, traitant plusieurs sujets à la fois, peut introduire de nouvelles
ambiguïtés. Le modèle peut mélanger des fils pourtant distincts. Raison supplémentaire
pour la règle d'or : une session, un sujet.

*Note : cette section est présente dans le guide mais absente du plan — ajoutée ici.*

**Conclusion pratique** (fusionnée avec la section dilution dans le guide)
- Des prompts courts et ciblés
- Les informations importantes en tête ou en queue de contexte
- Ne pas injecter de documents entiers si seules quelques sections sont pertinentes
- Reconnaître les signes de dégradation : réponses qui ignorent des instructions,
  incohérences avec des éléments donnés plus tôt

---

### 8. Annexe technique — Apprentissage et transformeurs

#### Mots-clés
- transformer
- self-attention
- token
- génération token par token
- tokens spéciaux
- apprentissage
- RLHF
- KV cache
- espace latent
- distance sémantique

#### Figures

#### Encadrés

#### Contenu
Annexe optionnelle — le livre est complet sans elle. Pour les lecteurs qui veulent comprendre
vraiment comment ça marche sous le capot. Ton plus dense que les chapitres principaux.

Contenu :
- Transformer à haut niveau
- Self-attention (version technique du ch. 7)
- Génération token par token
- Tokens spéciaux (encadré `tokens-speciaux` déplacé depuis ch. 6)
- Apprentissage et coût de calcul
Apprentissage par renforcement
- RLHF
- KV cache (pourquoi ça compte)
- Espace latent et distance sémantique

*Note : l'encadré `tokens-speciaux` du ch. 6 est déplacé ici. Le guide ch. 6 doit
remplacer la référence par un renvoi vers cette annexe.*

---
### 9. Alors docteur, on fait quoi ?

#### Mots-clés
- hallucination
- biais de positivité
- attention
- dilution
- boucle d'or
- outillage

#### Figures

#### Encadrés

#### Contenu
Chapitre pratique — boîte à outils face aux limites identifiées dans le guide.

**Pattern Pourquoi / Comment / Quoi** (retour Régis) : allers-retours fréquents entre
niveaux d'abstraction dans le travail avec une IA. Comment naviguer entre ces niveaux.

**Trois grands problèmes structurels et leurs remèdes pratiques :**
- Hallucinations : comment les détecter, comment limiter le risque
- Biais de positivité : pourquoi l'IA dit rarement "je ne sais pas", comment le forcer
- Attention/dilution : prompts courts, information critique en tête ou en queue
- Amnesie

Ce sont des problèmes assez humains finalement. Ils sont identifiés depuis longtemps. Nous avons développé des techniques. Les psychologues et les philosophes. Systeme 1...
Parce que ce n'est que des troubles cognitif, cs nous affecte tous, tout les jours. 

Deux bonnes nouvelles:
- on peut s'en inspirer
- c'est dans les données d'entraînement

Il y a l'humour, une récompense quand on cadre le système 1.
Malheureusement ca marche pas.

Ces problemes sont structurels, on ne peut que les pallier (au vrai sens du mot, regarder le dictinnaire, bon nombre de ll et pallier à, les 3 fautes)


Effet Steisand
Interdire et Contraindre
Laissez lui les blancs
On documente tout
RTFM

definir son vocabulaire


Interdire ou contraindre ?
**L'outillage comme réponse concrète aux limites** : présenter les outils non pas en
annexe mais comme une réponse directe aux problèmes structurels. L'outillage change ce
que l'IA peut faire, pas seulement comment on lui parle.

*(à compléter au fil des chapitres)*

---
### 10. Cas pratiques

#### Mots-clés

#### Figures

#### Encadrés

#### Contenu

Cas tirés de l'expérience de l'auteur :

1. Écriture de documentation technique
2. Gouvernance
3. Codage
4. Comment nous avons écrit ce guide — Claude et moi (bouclage narratif)

Cas supplémentaires à envisager :
- Recommandations instructions / setup du système — comment bien configurer son assistant
- Gérer deux IA : une perso et une pro — séparation des contextes, des données, des usages

---

### 11. Conclusion

#### Mots-clés

#### Figures

#### Encadrés

#### Contenu

**Structure à vérifier** : bouclantes (limites structurelles, réflexes) présentes et
solides — ouvrante manquante, à ajouter.

**Paragraphe prospectif** (retour Régis) : ouvrante finale — modélisation du monde,
rythme d'innovation, Capex, mise en perspective historique (révolution industrielle,
électricité), espoirs et craintes. Se place en fin de conclusion après les bouclantes
existantes, à la place de "Bonne collaboration" qui est trop plat.

**Remerciements** : ajouter en fin de conclusion — les personnes avec qui l'auteur
a discuté, y compris les IA.

**Note données privées / RGPD** : hors périmètre du guide. Ajouter une phrase dans
l'introduction qui délimite proprement : ce guide traite du fonctionnement et de
l'utilisation, pas des aspects légaux, contractuels ou de confidentialité.

### Révision 2026-06-07
- Élément "Humains, Animaux & IA" ajouté (ch.2)
### Révision 2026-06-07
- Contenu plan ch.2 modifié
### Révision 2026-06-07
- Contenu plan ch.1 modifié
### Révision 2026-06-07
- Contenu plan ch.1 modifié
### Révision 2026-06-07
- Contenu plan ch.1 modifié
### Révision 2026-06-07
- Contenu plan ch.1 modifié
### Révision 2026-06-07
- Contenu plan ch.1 modifié
### Révision 2026-06-07
- Contenu plan ch.1 modifié
- Contenu plan ch.2 modifié
### Révision 2026-06-07
- Élément "Humains, Animaux & IA" ajouté (ch.2)
- Figure "Humains, Animaux & IA" modifié (ch.2)
### Révision 2026-06-07
- Figure "Humains, Animaux, IAs" modifié (ch.2)
- Contenu plan ch.9 modifié
### Révision 2026-06-07
- Contenu plan ch.9 modifié
### Révision 2026-06-07
- Contenu plan ch.8 modifié
### Révision 2026-06-07
- Élément "L'orchestrateur sous-estimé" ajouté (ch.3)
### Révision 2026-06-07
- Contenu plan ch.9 modifié
### Révision 2026-06-07
- Contenu plan ch.1 modifié