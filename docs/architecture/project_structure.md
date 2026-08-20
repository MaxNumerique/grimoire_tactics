# Structure de Projet & Conventions Techniques — Grimoire Tactics

Document vivant détaillant l'organisation des dossiers et les règles d'architecture.

---

## 1. Arborescence Principale

```
grimoire_tactics/
├── docs/                       # Documentation du projet (Game Design, Architecture, Cahier des charges)
├── public/                     # Assets statiques (illustrations, sons, icônes)
├── src/
│   ├── app/                    # Next.js App Router (Pages & Route Handlers API)
│   ├── components/             # Composants React UI ultra-focalisés (petits fichiers)
│   ├── lib/                    # Logique métier pure, moteur de combat serveur & helpers
│   ├── stores/                 # Stores d'état Zustand (sans suffixe _store dans les noms)
│   └── types/                  # Types TypeScript stricts du domaine
├── tests/                      # Dossier centralisé des tests
│   ├── unit/                   # Tests unitaires du moteur de combat
│   ├── integration/            # Tests d'intégration API & Prisma
│   └── e2e/                    # Tests de bout en bout UI
├── package.json
└── tsconfig.json
```

---

## 2. Principes d'Ingénierie
- **Modularité & Petits Fichiers** : Préférer un nombre élevé de fichiers courts et ciblés.
- **Fail Fast** : Erreurs explicites, pas de fallbacks masqués ou de gardes ultra-défensifs inutiles.
- **Outillage** : `oxlint` pour le linting (exécuté avec `npm run lint`).
