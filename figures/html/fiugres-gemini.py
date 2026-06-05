import os
import zipfile

# Définition des codes sources SVG pour chaque figure
figures = {
    # --- FIGURES SESSION ACTUELLE (ORCHESTRATEUR & ATTENTION) ---
    "flux-orchestrateur.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="100%" height="100%" style="background-color: #fafafa;">
  <rect x="20" y="60" width="100" height="80" rx="8" fill="#3498db" />
  <text x="70" y="105" font-family="sans-serif" font-size="12" fill="white" font-weight="bold" text-anchor="middle">Utilisateur</text>
  <rect x="190" y="40" width="120" height="120" rx="8" fill="#2ecc71" />
  <text x="250" y="105" font-family="sans-serif" font-size="14" fill="white" font-weight="bold" text-anchor="middle">Orchestrateur</text>
  <text x="250" y="125" font-family="sans-serif" font-size="10" fill="white" text-anchor="middle">(Interface &amp; Prompt)</text>
  <rect x="380" y="60" width="100" height="80" rx="8" fill="#e67e22" />
  <text x="430" y="105" font-family="sans-serif" font-size="12" fill="white" font-weight="bold" text-anchor="middle">Modèle (LLM)</text>
  <path d="M 130 85 L 180 85" fill="none" stroke="#333" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M 320 85 L 370 85" fill="none" stroke="#e67e22" stroke-width="2" stroke-dasharray="3" marker-end="url(#arrow-orange)" />
  <text x="155" y="75" font-family="sans-serif" font-size="10" fill="#333" text-anchor="middle">Question</text>
  <text x="345" y="75" font-family="sans-serif" font-size="10" fill="#e67e22" text-anchor="middle">Prompt enrichi</text>
  <path d="M 370 115 L 320 115" fill="none" stroke="#e67e22" stroke-width="2" marker-end="url(#arrow-orange)" />
  <path d="M 180 115 L 130 115" fill="none" stroke="#333" stroke-width="2" marker-end="url(#arrow)" />
  <text x="345" y="135" font-family="sans-serif" font-size="10" fill="#e67e22" text-anchor="middle">Complétion brute</text>
  <text x="155" y="135" font-family="sans-serif" font-size="10" fill="#333" text-anchor="middle">Réponse mise en forme</text>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#333" /></marker>
    <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#e67e22" /></marker>
  </defs>
</svg>""",

    "prompt-etendu-historique.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 280" width="100%" height="100%" style="background-color: #fafafa;">
  <rect x="30" y="20" width="240" height="230" rx="6" fill="none" stroke="#2ecc71" stroke-width="2" stroke-dasharray="4" />
  <text x="40" y="40" font-family="sans-serif" font-size="12" fill="#27ae60" font-weight="bold">PROMPT ÉTENDU (Invisible)</text>
  <rect x="45" y="55" width="210" height="40" rx="4" fill="#3498db" fill-opacity="0.15" stroke="#3498db" stroke-width="1"/>
  <text x="55" y="78" font-family="sans-serif" font-size="10" fill="#2c3e50">Question 1 (Historique)</text>
  <rect x="45" y="105" width="210" height="40" rx="4" fill="#e67e22" fill-opacity="0.15" stroke="#e67e22" stroke-width="1"/>
  <text x="55" y="128" font-family="sans-serif" font-size="10" fill="#2c3e50">Réponse 1 (Historique)</text>
  <rect x="45" y="155" width="210" height="40" rx="4" fill="#3498db" stroke="#3498db" stroke-width="1.5"/>
  <text x="55" y="178" font-family="sans-serif" font-size="10" fill="white" font-weight="bold">Nouvelle Question (Actuelle)</text>
  <text x="150" y="225" font-family="sans-serif" font-size="10" fill="#7f8c8d" font-weight="bold" text-anchor="middle">Envoyé d'un coup à chaque fois</text>
  <rect x="340" y="95" width="90" height="60" rx="6" fill="#e67e22" />
  <text x="385" y="125" font-family="sans-serif" font-size="12" fill="white" font-weight="bold" text-anchor="middle">LLM</text>
  <text x="385" y="140" font-family="sans-serif" font-size="9" fill="white" text-anchor="middle">Sans mémoire</text>
  <path d="M 280 125 L 330 125" fill="none" stroke="#e67e22" stroke-width="3" marker-end="url(#arrow-orange)" />
  <defs>
    <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#e67e22" /></marker>
  </defs>
</svg>""",

    "prompt-etendu-complet.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" width="100%" height="100%" style="background-color: #fafafa;">
  <rect x="20" y="15" width="460" height="290" rx="8" fill="none" stroke="#27ae60" stroke-width="2" />
  <text x="35" y="35" font-family="sans-serif" font-size="14" fill="#27ae60" font-weight="bold">Anatomie du Prompt Étendu (Contexte Global)</text>
  <g transform="translate(35, 55)">
    <rect x="0" y="0" width="200" height="50" rx="4" fill="#95a5a6" fill-opacity="0.2" stroke="#7f8c8d" />
    <text x="10" y="20" font-family="sans-serif" font-size="11" fill="#2c3e50" font-weight="bold">1. Prompt Système</text>
    <text x="10" y="38" font-family="sans-serif" font-size="9" fill="#7f8c8d">Rôle, consignes de style, limites</text>
  </g>
  <g transform="translate(255, 55)">
    <rect x="0" y="0" width="210" height="50" rx="4" fill="#95a5a6" fill-opacity="0.1" stroke="#7f8c8d" />
    <text x="10" y="20" font-family="sans-serif" font-size="11" fill="#2c3e50" font-weight="bold">2. Instructions Utilisateur</text>
    <text x="10" y="38" font-family="sans-serif" font-size="9" fill="#7f8c8d">Préférences globales ("sois neutre")</text>
  </g>
  <g transform="translate(35, 120)">
    <rect x="0" y="0" width="200" height="50" rx="4" fill="#2ecc71" fill-opacity="0.15" stroke="#27ae60" />
    <text x="10" y="20" font-family="sans-serif" font-size="11" fill="#27ae60" font-weight="bold">3. Documents &amp; Connaissances</text>
    <text x="10" y="38" font-family="sans-serif" font-size="9" fill="#7f8c8d">Fichiers joints, base Projet (RAG)</text>
  </g>
  <g transform="translate(255, 120)">
    <rect x="0" y="0" width="210" height="50" rx="4" fill="#f1c40f" fill-opacity="0.15" stroke="#f39c12" />
    <text x="10" y="20" font-family="sans-serif" font-size="11" fill="#d35400" font-weight="bold">4. Mémoire à long terme</text>
    <text x="10" y="38" font-family="sans-serif" font-size="9" fill="#7f8c8d">Notes capitalisées au fil des sessions</text>
  </g>
  <g transform="translate(35, 185)">
    <rect x="0" y="0" width="430" height="50" rx="4" fill="#e67e22" fill-opacity="0.1" stroke="#e67e22" stroke-width="1" />
    <text x="10" y="22" font-family="sans-serif" font-size="11" fill="#d35400" font-weight="bold">5. Historique de la session</text>
    <text x="10" y="40" font-family="sans-serif" font-size="9" fill="#7f8c8d">Échanges de messages précédents (mémoire artificielle à court terme)</text>
  </g>
  <g transform="translate(35, 250)">
    <rect x="0" y="0" width="430" height="40" rx="4" fill="#3498db" stroke="#2980b9" stroke-width="1.5" />
    <text x="10" y="24" font-family="sans-serif" font-size="12" fill="white" font-weight="bold">6. Question de l'utilisateur (Le Prompt Actuel)</text>
  </g>
</svg>""",

    "attention-dilution.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" width="100%" height="100%" style="background-color: #fafafa;">
  <rect x="20" y="40" width="220" height="190" rx="6" fill="none" stroke="#2ecc71" stroke-width="1.5" />
  <text x="130" y="30" font-family="sans-serif" font-size="12" fill="#27ae60" font-weight="bold" text-anchor="middle">Contexte court &amp; ciblé</text>
  <rect x="35" y="60" width="190" height="35" rx="4" fill="#2ecc71" fill-opacity="0.2" stroke="#27ae60" />
  <text x="130" y="82" font-family="sans-serif" font-size="11" fill="#27ae60" font-weight="bold" text-anchor="middle">Information Cruciale</text>
  <circle cx="130" cy="180" r="25" fill="#e67e22" />
  <text x="130" y="184" font-family="sans-serif" font-size="11" fill="white" font-weight="bold" text-anchor="middle">Attention</text>
  <path d="M 130 145 L 130 105" fill="none" stroke="#2ecc71" stroke-width="6" marker-end="url(#arrow-green)" />
  <rect x="280" y="40" width="220" height="190" rx="6" fill="none" stroke="#e74c3c" stroke-width="1.5" />
  <text x="390" y="30" font-family="sans-serif" font-size="12" fill="#c0392b" font-weight="bold" text-anchor="middle">Contexte trop lourd (Dilution)</text>
  <rect x="295" y="60" width="190" height="25" rx="4" fill="#2ecc71" fill-opacity="0.2" stroke="#27ae60" />
  <text x="390" y="76" font-family="sans-serif" font-size="10" fill="#27ae60" font-weight="bold" text-anchor="middle">Information Cruciale</text>
  <rect x="295" y="95" width="85" height="20" rx="3" fill="#95a5a6" fill-opacity="0.3" />
  <text x="337" y="108" font-family="sans-serif" font-size="8" fill="#7f8c8d" text-anchor="middle">Token inutile</text>
  <rect x="395" y="95" width="90" height="20" rx="3" fill="#95a5a6" fill-opacity="0.3" />
  <text x="440" y="108" font-family="sans-serif" font-size="8" fill="#7f8c8d" text-anchor="middle">Hors sujet</text>
  <rect x="295" y="125" width="190" height="20" rx="3" fill="#95a5a6" fill-opacity="0.3" />
  <text x="390" y="138" font-family="sans-serif" font-size="8" fill="#7f8c8d" text-anchor="middle">Blabla d'historique trop long...</text>
  <circle cx="390" cy="195" r="25" fill="#e67e22" />
  <text x="390" y="199" font-family="sans-serif" font-size="11" fill="white" font-weight="bold" text-anchor="middle">Attention</text>
  <path d="M 390 165 L 390 95" fill="none" stroke="#27ae60" stroke-width="2" marker-end="url(#arrow-green-small)" />
  <path d="M 370 180 L 335 125" fill="none" stroke="#7f8c8d" stroke-width="1.5" marker-end="url(#arrow-gray)" />
  <path d="M 410 180 L 445 125" fill="none" stroke="#7f8c8d" stroke-width="1.5" marker-end="url(#arrow-gray)" />
  <path d="M 380 175 L 360 155" fill="none" stroke="#7f8c8d" stroke-width="1.5" marker-end="url(#arrow-gray)" />
  <defs>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2ecc71" /></marker>
    <marker id="arrow-green-small" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#27ae60" /></marker>
    <marker id="arrow-gray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7f8c8d" /></marker>
  </defs>
</svg>""",

    # --- FIGURES MODULE PRÉCÉDENT (IMMOBILIER) ---
    "immo-regression.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" style="background-color: #fafafa;">
  <path d="M 50 250 L 370 250 M 50 250 L 50 30" fill="none" stroke="#333" stroke-width="1.5" />
  <text x="370" y="265" font-family="sans-serif" font-size="10" text-anchor="end">Surface (m²)</text>
  <text x="45" y="40" font-family="sans-serif" font-size="10" text-anchor="end" transform="rotate(-90 45 40)">Prix (€)</text>
  <line x1="50" y1="250" x2="350" y2="70" stroke="#e67e22" stroke-width="2" />
  <circle cx="90" cy="220" r="4" fill="#3498db" /><circle cx="130" cy="190" r="4" fill="#3498db" />
  <circle cx="180" cy="170" r="4" fill="#3498db" /><circle cx="220" cy="130" r="4" fill="#3498db" />
  <circle cx="280" cy="120" r="4" fill="#3498db" /><circle cx="330" cy="80" r="4" fill="#3498db" />
  <g stroke="#2ecc71" stroke-width="1" stroke-dasharray="3">
    <line x1="200" y1="250" x2="200" y2="160" />
    <line x1="200" y1="160" x2="50" y2="160" />
  </g>
  <circle cx="200" cy="160" r="5" fill="#2ecc71" />
  <text x="205" y="245" font-family="sans-serif" font-size="9" fill="#2ecc71">Mon bien</text>
  <text x="55" y="155" font-family="sans-serif" font-size="9" fill="#2ecc71">Estimation</text>
</svg>""",

    "immo-outliers.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" style="background-color: #fafafa;">
  <path d="M 50 250 L 370 250 M 50 250 L 50 30" fill="none" stroke="#333" stroke-width="1.5" />
  <line x1="50" y1="250" x2="350" y2="100" stroke="#7f8c8d" stroke-width="1.5" stroke-dasharray="4" />
  <line x1="50" y1="250" x2="350" y2="150" stroke="#e67e22" stroke-width="2" />
  <circle cx="90" cy="220" r="4" fill="#3498db" /><circle cx="130" cy="190" r="4" fill="#3498db" />
  <circle cx="220" cy="130" r="4" fill="#3498db" /><circle cx="330" cy="80" r="4" fill="#3498db" />
  <circle cx="100" cy="60" r="5" fill="#e74c3c" /><text x="110" y="63" font-family="sans-serif" font-size="9" fill="#e74c3c">Outlier (Luxe)</text>
  <circle cx="340" cy="230" r="5" fill="#e74c3c" /><text x="260" y="225" font-family="sans-serif" font-size="9" fill="#e74c3c">Outlier (Bradé)</text>
</svg>""",

    "immo-deux-segments.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" style="background-color: #fafafa;">
  <path d="M 50 250 L 370 250 M 50 250 L 50 30" fill="none" stroke="#333" stroke-width="1.5" />
  <line x1="170" y1="250" x2="170" y2="30" stroke="#95a5a6" stroke-width="1" stroke-dasharray="2" />
  <text x="175" y="40" font-family="sans-serif" font-size="9" fill="#7f8c8d">Seuil (ex: 40m²)</text>
  <path d="M 50 250 L 170 140 L 350 90" fill="none" stroke="#e67e22" stroke-width="2.5" />
  <circle cx="80" cy="220" r="4" fill="#3498db" /><circle cx="120" cy="180" r="4" fill="#3498db" />
  <circle cx="220" cy="120" r="4" fill="#3498db" /><circle cx="300" cy="100" r="4" fill="#3498db" />
</svg>""",

    "immo-underfitting.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" style="background-color: #fafafa;">
  <path d="M 50 250 L 370 250 M 50 250 L 50 30" fill="none" stroke="#333" stroke-width="1.5" />
  <line x1="50" y1="220" x2="350" y2="90" stroke="#e74c3c" stroke-width="2" />
  <text x="340" y="110" font-family="sans-serif" font-size="10" fill="#e74c3c" font-weight="bold" text-anchor="end">Modèle rigide</text>
  <path d="M 50 250 Q 150 230 250 140 T 350 40" fill="none" stroke="#3498db" stroke-width="1.5" stroke-opacity="0.3" />
  <circle cx="80" cy="245" r="4" fill="#3498db" /><circle cx="140" cy="235" r="4" fill="#3498db" />
  <circle cx="220" cy="170" r="4" fill="#3498db" /><circle cx="280" cy="110" r="4" fill="#3498db" />
  <circle cx="330" cy="55" r="4" fill="#3498db" />
</svg>""",

    "immo-overfitting.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" style="background-color: #fafafa;">
  <path d="M 50 250 L 370 250 M 50 250 L 50 30" fill="none" stroke="#333" stroke-width="1.5" />
  <path d="M 50 250 C 70 150 75 240 90 220 C 110 120 120 210 140 190 C 180 50 200 250 230 140 C 260 -30 290 180 320 100 C 335 40 340 90 350 80" fill="none" stroke="#e74c3c" stroke-width="2" />
  <circle cx="90" cy="220" r="4" fill="#3498db" /><circle cx="140" cy="190" r="4" fill="#3498db" />
  <circle cx="230" cy="140" r="4" fill="#3498db" /><circle cx="320" cy="100" r="4" fill="#3498db" />
  <circle cx="350" cy="80" r="4" fill="#3498db" />
</svg>""",

    "immo-interpolation-extrapolation.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" style="background-color: #fafafa;">
  <rect x="50" y="30" width="200" height="220" fill="#2ecc71" fill-opacity="0.08" />
  <rect x="250" y="30" width="120" height="220" fill="#e74c3c" fill-opacity="0.06" />
  <path d="M 50 250 L 370 250 M 50 250 L 50 30" fill="none" stroke="#333" stroke-width="1.5" />
  <path d="M 50 240 Q 150 200 250 120 L 360 40" fill="none" stroke="#e67e22" stroke-width="2" />
  <circle cx="80" cy="230" r="4" fill="#3498db" /><circle cx="150" cy="180" r="4" fill="#3498db" />
  <circle cx="230" cy="135" r="4" fill="#3498db" />
  <text x="150" y="50" font-family="sans-serif" font-size="11" fill="#27ae60" font-weight="bold" text-anchor="middle">Interpolation</text>
  <text x="150" y="65" font-family="sans-serif" font-size="9" fill="#27ae60" text-anchor="middle">(Données connues)</text>
  <text x="310" y="50" font-family="sans-serif" font-size="11" fill="#c0392b" font-weight="bold" text-anchor="middle">Extrapolation</text>
  <text x="310" y="65" font-family="sans-serif" font-size="9" fill="#c0392b" text-anchor="middle">(Inconnu / Risque)</text>
  <text x="310" y="100" font-family="sans-serif" font-size="24" fill="#c0392b" font-weight="bold" text-anchor="middle">?</text>
</svg>"""
}

# Création des fichiers et de l'archive ZIP
zip_filename = "figures_svg.zip"
print("Génération des fichiers SVG...")

with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for filename, content in figures.items():
        # Écriture du fichier individuel
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content.strip())
        # Ajout dans le ZIP
        zipf.write(filename)
        print(f" -> {filename} créé et ajouté.")

print(f"\\nSuccès ! L'archive globale '{zip_filename}' est disponible dans votre dossier.")