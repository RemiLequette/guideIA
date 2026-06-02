# Plan

## Objectif
Définir le contenu attendu du guide guideIA : chapitres et ce qu'on veut y dire.

## Sommaire
- [Chapitres](#chapitres)

## Chapitres

1. Introduction
2. Travailler avec une IA
3. Le modèle et l'orchestrateur
4. C'est quoi la génération ?
5. Le problème du poisson rouge
6. C'est quoi le contexte ?
7. Le problème de l'attention
8. Conclusion

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

#### Figures

> 🖼️ **figure** `flux-orchestrateur`
> Diagramme du flux simplifié entre les deux composants :
> humain → prompt → orchestrateur → modèle → complétion → orchestrateur → humain.
> Style épuré, flèches directionnelles, les deux composants (orchestrateur, modèle)
> clairement distincts.

#### Encadrés

#### Contenu

**Les deux composants**
L'architecture d'un assistant IA repose sur deux éléments distincts.

**Le modèle de langage (LLM)**
Un modèle entraîné pour compléter des textes. Expliquer ce qu'est l'entraînement,
ce que ça signifie concrètement : le modèle prédit la suite la plus probable d'un texte.
Ce n'est pas une base de données, ce n'est pas un moteur de recherche.

**L'orchestrateur**
Le composant qui fait l'interface avec l'humain. Il reçoit le prompt, l'envoie au modèle,
récupère la réponse (une complétion de texte) et l'affiche. C'est lui qui gère
la conversation, l'historique, et les éventuels outils connectés.

**Le flux simplifié**
Utiliser la figure flux-orchestrateur ici.

---

### 4. C'est quoi la génération ?

#### Mots-clés
- génération
- complétion
- données d'entraînement
- prompt système
- interpolation

#### Figures

#### Encadrés

#### Contenu

**Compléter un texte de façon probable**
Le modèle prédit la suite la plus probable d'un texte, vis-à-vis de ses données
d'entraînement. Exemple simple : "La capitale de la France est..." → "Paris".
Illustrer que ce n'est pas toujours consensuel — avec humour
(ex : "Le meilleur langage de programmation est...").

**Le problème de l'interface**
Personne ne veut parler à une IA comme ça. D'où le besoin du prompt système,
géré par l'orchestrateur. Expliquer comment il prépare et enveloppe la question
— sans la comprendre — pour que la réponse soit utile et cohérente.

**Le prompt système**
Son influence sur le style de communication : ton, format des réponses,
gestion des relances, comportement en cas d'ambiguïté.
C'est un secret de fabrication : complexe, finement réglé, propre à chaque produit.

**Note : interpolation et hallucinations**
Introduire et expliquer la notion d'interpolation : le modèle ne récite pas, il interpole
entre les patterns appris. C'est ce qui explique les hallucinations — quand l'interpolation
produit quelque chose de plausible en apparence mais factuellement faux.

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

