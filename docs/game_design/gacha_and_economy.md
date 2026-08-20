# Gacha, Raretés et Économie du Jeu — Grimoire Tactics

Document vivant spécifiant le système de tirage (Gacha), la gestion de la RNG côté serveur, les taux de drop et l'économie in-game.

---

## 1. Niveaux de Rareté & Taux de Drop (Proposés)

| Rareté | Couleur | Taux de Drop de Base | Pity Guarantee |
|---|---|---|---|
| **Commun** | Gris / Blanc | 70 % | — |
| **Rare** | Bleu | 20 % | — |
| **Épique** | Violet | 8 % | Garanti tous les 10 tirages |
| **Légendaire** | Doré | 2 % | Garanti tous les 50 tirages |

---

## 2. Intégrité de la RNG Côté Serveur
- L'ouverture d'un pack est calculée exclusivement sur l'API backend (Next.js Route Handler / Server Action).
- Le tirage utilise un générateur pseudo-aléatoire cryptographiquement sûr (`crypto.getRandomValues`).
- Le client ne reçoit que le résultat final du tirage.

---

## 3. Monnaies du Jeu
- **Or** : Monnaie courante gagnée en combat (utilisée pour monter de niveau et acheter du contenu basique).
- **Gemmes / Cristaux** : Monnaie premium/rare gagnée par les réussites de niveaux ou quêtes (utilisée pour ouvrir des packs).
