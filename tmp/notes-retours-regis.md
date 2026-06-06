# Notes — Retours Régis

Intégration progressive dans Plan.md au fil de la session.
Ch. 1 et ch. 2 (ouverture) déjà intégrés directement dans Plan.md.

---

## Ch. 2 — Travailler avec une IA

*(ouverture anthropomorphisme déjà dans Plan.md)*

- **Étoffer "Valider"** : trop court, pas à la hauteur du sujet. Ajouter des exemples concrets : vérifier les sources citées, croiser avec le bon sens, tester les affirmations factuelles.
- **Pattern Pourquoi / Comment / Quoi** : → déplacé vers le nouveau ch. "Alors docteur, on fait quoi ?" (ch. 8 provisoire, avant la conclusion).
- **Nuance sur la documentation / tokens / énergie** : → abandonné. Les tokens sont expliqués au ch. 5 (encadré) parce que tout le monde en parle — pas comme concept fondamental, et pas avant.

---

## Ch. 3 — Le modèle et l'orchestrateur

- **Figure flux-orchestrateur** : enrichir avec les données externes sur l'orchestrateur — philosophie "complet mais juste assez". Montrer que l'orchestrateur peut aller chercher des données externes (web, fichiers...) sans les détailler ni les commenter dans le texte. Le lecteur voit l'architecture complète dès le ch. 3 et la visite progressivement dans les chapitres suivants.

---

## Ch. 5 — Le problème du poisson rouge

- **Encadré tokens** : inclure le coût énergétique — expliquer pourquoi ça coûte (calcul GPU, donc énergie), sans jugement de valeur. L'objectif est de raccrocher ce que les gens entendent aux bons concepts.

---

## Ch. 4 — C'est quoi la génération ?

- **Biais de positivité** : introduire le concept dès ce chapitre, juste après l'explication de l'interpolation sur des textes humains. Idée simple et puissante : dans la base d'entraînement, il y a très peu de "je ne sais pas". Le modèle génère ce qu'il a vu — et il a rarement vu quelqu'un admettre son ignorance. Le lecteur voit immédiatement d'où vient le problème, sans attendre d'avoir tout lu. Troisième grand problème structurel avec les hallucinations et l'attention.

---

## Ch. 6 — C'est quoi le contexte ?

- **Exemple MCP concret** : ajouter un petit exemple narratif autour de l'email — sur le modèle de l'exemple météo du contexte dynamique. Redondance assumée : renforce un concept important et aide ceux qui n'ont pas encore généralisé. Rapide, en "racontant une histoire".
- **Types de mémoire / dream / compaction** : → supprimé. Trop spécialisé, trop instable.

---

## Annexe technique — "Apprentissage et transformeurs" (titre provisoire)

Annexe optionnelle — le livre est complet sans. Pour les lecteurs qui veulent comprendre
vraiment comment ça marche sous le capot. Ton plus dense que les chapitres principaux.

undefined

---

## Ch. 9 (nouveau) — Cas pratiques de bout en bout

Position : après "Alors docteur, on fait quoi ?"
Cas tirés de l'expérience de l'auteur :
1. Écriture de documentation technique
2. Gouvernance
3. Codage
4. Comment nous avons écrit ce guide — Claude et moi (bouclage narratif)

---

## Ch. 10 (nouveau) — "Alors docteur, on fait quoi ?"

Titre provisoire. Chapitre pratique avant la conclusion — boîte à outils face aux limites identifiées dans le guide.

- **Pattern Pourquoi / Comment / Quoi** (retour Régis) : allers-retours fréquents entre niveaux d'abstraction dans le travail avec une IA.
- **Trois grands problèmes structurels à traiter** : hallucinations, biais de positivité, attention/dilution — avec les remèdes pratiques pour chacun.
- *(à compléter au fil des chapitres)*

---

## Ch. 9 — Conclusion

- **Paragraphe prospectif** (retour Régis) : ouvrante finale — modélisation du monde, rythme d'innovation, Capex, mise en perspective historique (révolution industrielle, électricité), espoirs et craintes. Se place en fin de conclusion après les bouclantes existantes, à la place de "Bonne collaboration" qui est trop plat.
- **Structure à vérifier** : bouclantes (limites structurelles, réflexes) présentes et solides — ouvrante manquante, à ajouter.

---

## Sans chapitre défini

- **Espace latent / distance sémantique** : → abandonné, trop fumeux.
- **Données privées / RGPD** : hors périmètre du guide. Ajouter une phrase dans l'introduction qui délimite proprement : ce guide traite du fonctionnement et de l'utilisation, pas des aspects légaux, contractuels ou de confidentialité.

- **Cas pratiques supplémentaires** (ch. 9) :
  - Recommandations instructions / setup du système — comment bien configurer son assistant
  - Gérer deux IA : une perso et une pro — séparation des contextes, des données, des usages

- **Outillage** (ch. 10 "Alors docteur") : concept important à part entière. Présenter les outils comme une réponse concrète aux limites structurelles — pas en annexe mais intégré au chapitre. Idée : l'outillage change ce que l'IA peut faire, pas seulement comment on lui parle.

- **Appendice transformers** : ajouter cache (KV cache, pourquoi ça compte) et sémantique (espace latent, distance sémantique) — à traiter ici plutôt que dans les chapitres principaux.
