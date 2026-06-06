# Notes — Alignement Plan / Guide

Relecture chapitre par chapitre : écarts entre le contenu du Plan et ce qui est rédigé dans GuideIA.md.
À intégrer dans Plan.md en fin de session.

---

## Ch. 1 — Introduction

### Écarts constatés

- **Anthropomorphisme comme stratégie** : le guide l'introduit déjà comme stratégie cognitive ("ce n'est pas un défaut de raisonnement : c'est une stratégie cognitive ancienne, efficace"). Le plan ne le formulait pas ainsi — déjà corrigé dans Plan.md.
- **LLM non introduit** : le guide dit "Ce profil existe bel et bien" sans nommer le LLM ni citer ChatGPT/Gemini. À corriger dans le guide (note déjà dans Plan.md).
- **"Prompt" introduit au ch. 2** : le guide introduit `{{def:mk:prompt}}` au ch. 2 ("Un prompt flou..."), pas au ch. 1. Cohérent avec la décision de session : glisser le mot en passant au ch. 1, définition formelle au ch. 3. À vérifier lors de la rédaction du ch. 1.
- **Métaphore du CV** : bien présente et développée, conforme au plan.
- **Hallucination** : introduite via `{{def:mk:hallucination}}`, conforme au plan.

---

## Ch. 2 — Travailler avec une IA

### Écarts constatés

- **Ouverture anthropomorphisme** : absente du guide — à ajouter lors de la rédaction (note déjà dans Plan.md).
- **Mot-clé "validation"** : utilisé dans le guide (`{{def:mk:validation}}`) mais absent de la liste des mots-clés du plan. À ajouter au plan.
- **"La documentation suit naturellement"** : dans le guide, c'est intégré à "Trois bonnes nouvelles", pas une section séparée comme le plan le suggère. Écart mineur — harmoniser le plan vers ce que fait le guide.
- **Contenu globalement conforme** : les points "Être clair", "Valider", "Trois bonnes nouvelles" sont bien présents et développés.

---

## Ch. 3 — Le modèle et l'orchestrateur

### Écarts constatés

- **Définition de `prompt`** : `{{def:mk:prompt}}` apparaît dans le guide au ch. 3 ("...le rôle du prompt"), mais "prompt" a été ajouté aux mots-clés du ch. 1 lors de cette session. À trancher : où se trouve la `{{def:...}}` officielle — ch. 1 (mention en passant) ou ch. 3 (contexte naturel de la définition formelle) ?
- **Figure données externes** : absente pour l'instant — à traiter lors de la session figures (note Régis).
- **Contenu globalement conforme** : deux composants, flux, prompt système, exemple, mise en garde pseudo-gourous — tout est présent.

---

## Ch. 4 — C'est quoi la génération ?

### Écarts constatés

- **"Monsieur Jourdain"** : présent dans le plan, absent du guide — remplacé par "Sans le savoir, je viens de construire un modèle." L'humour de la référence est perdu. À décider : réintroduire ou garder la formulation du guide.
- **Ordre figures underfitting/overfitting** : le guide décrit les deux concepts puis place les deux figures ensemble, au lieu de les intercaler au fil du texte comme le plan le suggère. Écart mineur.
- **Contenu globalement conforme** : tous les éléments du plan sont présents.

---

## Ch. 5 — Le problème du poisson rouge

### Écarts constatés

- **"Comment nommer ce message ?"** : le plan en fait un point distinct avec l'humour sur "contexte dans le contexte". Le guide l'intègre fluidement dans le paragraphe sur la solution de l'orchestrateur — plus naturel. Réaligner le plan sur cette structure.
- **Encadré tokens** : déclaré dans le plan, mentionné en une phrase dans le guide. Pas encore rédigé — cohérent, travail à venir. Ajouter le coût énergétique à l'encadré (note Régis).
- **Lien vers ch. 7** : présent dans le guide ("Un contexte très long peut créer de la confusion — on verra pourquoi dans le chapitre sur l'attention"), absent du plan. À ajouter.

---

## Ch. 6 — C'est quoi le contexte ?

### Écarts constatés

- **Déclaratif/impératif** : présent dans le guide ("Point crucial : le contexte est toujours déclaratif, jamais impératif..."). Décision de session : à supprimer du guide également.
- **Encadré `tokens-speciaux`** : référencé dans le guide (`Voir encadré {{ref:enc:tokens-speciaux}}`). À remplacer par un renvoi vers l'annexe technique.
- **Biais de positivité** : mentionné dans l'exemple météo mais non nommé — sera introduit au ch. 4 (note prise).
- **TODO mémoire [O6]** : toujours présent dans le guide en commentaire — à garder ouvert.

---

## Ch. 7 — Le problème de l'attention

### Écarts constatés

- **Section "self-attention et polysémie"** : présente dans le guide, absente du plan. Idée : l'attention résout la polysémie, mais un contexte mal structuré traitant plusieurs sujets à la fois peut en introduire de nouvelles. À ajouter au plan.
- **Conclusion pratique** : dans le guide, fusionnée avec la section "fenêtre de contexte et dilution" sous forme de liste. Le plan la présente comme section séparée — écart mineur, réaligner le plan sur la structure du guide.
- **Contenu globalement conforme** : tous les éléments clés présents.

---

## Annexe technique — "Apprentissage et transformeurs" (titre provisoire)

### À créer

- Annexe optionnelle, hors numérotation des chapitres — livre complet sans elle
- Ton plus dense, pour lecteurs curieux du "sous le capot"
- Contenu : transformer à haut niveau, self-attention (version technique du ch. 7), génération token par token, tokens spéciaux (encadré `tokens-speciaux` déplacé depuis ch. 6), apprentissage et coût de calcul, RLHF
- Impact ch. 6 : supprimer l'encadré `tokens-speciaux` du plan ch. 6, remplacé par un renvoi vers l'annexe

---

## Ch. 11 — Conclusion

- **Remerciements** : ajouter en fin de conclusion — les personnes avec qui l'auteur a discuté, y compris les IA.
- **Ouvrante manquante** : paragraphe prospectif (retour Régis) — perspective historique, rythme d'innovation, espoirs et craintes. Remplace "Bonne collaboration".
- **Contenu bouclant conforme** : "pas de magie", limites structurelles, réflexes suffisent, outil qui évolue — tout est là.

*(à remplir)*

- **Boucle d'or** : introduire le concept au ch. 6 (contexte). Niveau de détail optimal dans un prompt — ni trop vague (le modèle improvise), ni trop contraint (on perd la valeur de l'IA). Le juste milieu. Nom retenu : "boucle d'or" (référence Goldilocks). À positionner après l'explication du contexte déclaratif, comme règle pratique issue du fonctionnement du modèle.
