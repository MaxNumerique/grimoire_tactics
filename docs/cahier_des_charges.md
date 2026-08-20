# Grimoire Tactics — Cahier des charges

> Projet personnel long terme — Jeu web auto-battler PvE avec système de collection façon gacha
> Document de travail — v0.1

---

## 1. Pitch du jeu

Grimoire Tactics est un jeu web dans lequel le joueur constitue une équipe de **6 personnages maximum**, obtenus via l'ouverture de packs (système gacha), pour affronter des vagues d'ennemis en **combat automatique (auto-battle)**. Chaque personnage appartient à une **classe** qui définit ses attaques et son comportement en combat, et peut être équipé d'objets qui modifient ses statistiques ou capacités.

**Piliers du jeu :**
- Collection et progression (packs, raretés, drops)
- Composition d'équipe stratégique (classes, synergies, équipements)
- Combat automatisé mais lisible (le joueur prépare, ne micro-gère pas)
- Boucle de jeu répétable : farm → amélioration d'équipe → défis plus difficiles

---

## 2. Portée du projet

| Paramètre | Choix |
|---|---|
| Mode de jeu | Solo / PvE uniquement (pas de PvP dans un premier temps) |
| Type de combat | Auto-battle (les personnages combattent automatiquement selon leur classe) |
| Cadre | Projet personnel, développement long terme |
| Sauvegarde | Compte utilisateur avec backend + base de données dès le début |
| Style visuel | Illustrations 2D façon carte à collectionner (type Hearthstone) |
| Profondeur du MVP | Intermédiaire : classes, équipements, quelques synergies |

---

## 3. Systèmes de jeu

### 3.1 Système de collection (gacha)

- Ouverture de **packs** contenant aléatoirement : personnages, équipements, ressources/drops.
- Système de **raretés** (ex : Commun / Rare / Épique / Légendaire) avec des taux de drop associés.
- **Important — le tirage aléatoire doit être calculé côté serveur** (backend) pour garantir l'intégrité (pas de triche possible côté client, taux de drop vérifiables).
- À définir : monnaie(s) du jeu, coût des packs, sources d'obtention de monnaie (progression, quêtes, etc.), pity system (garantie après X tirages sans légendaire) ou non.

### 3.2 Personnages et classes

- Chaque personnage appartient à une **classe** (ex : Guerrier, Mage, Soigneur, Tank, Assassin...).
- La classe détermine :
  - L'attaque de base (ou un pool de compétences prédéfinies)
  - Le comportement en combat auto (ex : le Tank se place devant, le Mage cible le plus faible, le Soigneur cible l'allié le plus blessé)
- Chaque personnage a des statistiques propres (PV, attaque, défense, vitesse...) qui peuvent différer même au sein d'une même classe (variabilité par rareté/niveau).
- **Progression des personnages** à définir : montée de niveau, fusion de doublons, évolution/ascension par rareté.

### 3.3 Équipements

- Objets équipables (armes, armures, accessoires) qui modifient les statistiques ou débloquent des effets.
- À définir : nombre de slots d'équipement par personnage, si les équipements sont liés à une classe ou universels, si il y a un système de craft/amélioration d'équipement.

### 3.4 Synergies

- Bonus d'équipe activés selon la composition (ex : "3 Mages actifs = +X% dégâts magiques", "2 personnages de la même faction = effet spécial").
- À définir précisément lors de la conception détaillée du contenu (liste des classes/factions et leurs synergies).

### 3.5 Combat

- Deux boards face à face : jusqu'à **6 personnages** côté joueur contre jusqu'à **6 ennemis**.
- Combat **automatique** : une fois lancé, les personnages agissent selon leur classe/IA, sans intervention directe du joueur (le joueur agit *avant* le combat : composition, placement, équipement).
- Système de **vagues d'ennemis** : possibilité d'enchaîner plusieurs vagues dans un même combat/niveau.
- À définir : le placement des personnages sur le board a-t-il un impact tactique (lignes avant/arrière, positions) ? Vitesse/ordre d'action (initiative) ? Conditions de victoire/défaite par vague ?

### 3.6 Progression globale

- À définir : structure du contenu PvE (niveaux/chapitres, difficulté croissante, boss), système de récompenses après combat, éventuel mode "sans fin"/endless pour scorer.

---

## 4. Stack technique recommandée

### Frontend
- **React + TypeScript** — structure de l'application et composants UI
- **Zustand** (ou Redux Toolkit) — gestion d'état (collection, board, combat en cours)
- **Tailwind CSS** — styling rapide et cohérent
- **Framer Motion** — animations (ouverture de packs, attaques, dégâts, etc.)
- Rendu du board en **HTML/CSS/SVG** — suffisant pour du auto-battle tour par tour, pas besoin d'un moteur de jeu (Phaser/PixiJS) sauf si tu vises des animations de combat très poussées plus tard

### Backend
- **Node.js + TypeScript**, avec **NestJS** (structure modulaire, bien adaptée à un projet long terme avec auth/DB) ou **Express** si tu préfères rester léger
- API **REST** pour : auth, gestion de collection, ouverture de packs (RNG côté serveur), combats, progression
- Logique de combat calculée côté serveur (le client envoie la composition, le serveur simule le combat et renvoie le résultat/replay) — évite la triche et centralise les règles

### Base de données
- **PostgreSQL** — bien adapté à un modèle relationnel (utilisateurs, personnages possédés, équipements, inventaire, historique)
- **Prisma** comme ORM — migrations propres et typage partagé avec le backend TypeScript

### Authentification
- **JWT** pour les sessions, **bcrypt** pour le hash des mots de passe
- Possibilité d'utiliser **Supabase** ou **Auth.js (NextAuth)** pour accélérer la mise en place si tu ne veux pas tout coder à la main

### Hébergement (pistes)
- Frontend : **Vercel** ou **Netlify**
- Backend + DB : **Railway**, **Render**, ou **Supabase** (DB + auth intégrés)

### Alternative "tout-en-un"
- Si tu veux réduire la complexité de mise en place au départ tout en gardant un vrai backend : **Next.js** (frontend + API routes dans un seul projet) + **Supabase** (DB + auth) est une stack très efficace pour un projet solo.

---

## 5. Architecture des données (première ébauche)

Entités principales à modéliser :

- **User** (compte, monnaie, packs disponibles)
- **CharacterTemplate** (définition d'un personnage : nom, classe, rareté, stats de base, illustration)
- **OwnedCharacter** (instance possédée par un joueur : niveau, équipements, liée à un CharacterTemplate)
- **Class** (nom, comportement de combat, compétence(s) associée(s))
- **EquipmentTemplate** / **OwnedEquipment**
- **Pack** (contenu possible, taux de drop)
- **EnemyWave** / **Level** (composition des ennemis, ordre des vagues)
- **CombatLog** (résultat d'un combat, pour affichage/replay)

*(à affiner une fois les systèmes de jeu détaillés)*

---

## 6. Scope du MVP (première version jouable)

**Inclus :**
- Système de compte (inscription/connexion)
- Ouverture de packs avec RNG serveur (personnages + équipements)
- 3 à 4 classes avec comportement de combat distinct
- Équipement simple (1 à 2 slots par personnage)
- Quelques synergies de base
- Board 6v6 avec combat auto et système de vagues (2-3 vagues)
- Un mode de progression simple (suite de niveaux avec difficulté croissante)

**Hors scope MVP (versions futures) :**
- PvP
- Craft/amélioration avancée d'équipement
- Ascension/évolution de personnages
- Système social (guildes, classements)
- Mode endless / scoring compétitif

---

## 7. Points ouverts à trancher

- [ ] Nombre de classes prévues et comportement précis de chacune
- [ ] Économie du jeu : monnaie(s), coût des packs, sources de revenus in-game
- [ ] Système de rareté et taux de drop (+ pity system ou non)
- [ ] Le placement des personnages sur le board a-t-il un impact tactique ?
- [ ] Progression des personnages (niveau, fusion de doublons, évolution)
- [ ] Structure du contenu PvE (nombre de niveaux, boss, difficulté)
- [ ] Direction artistique précise (production des illustrations : dessin, commande, génération IA, assets libres)

---

## 8. Prochaines étapes suggérées

1. Définir la liste des classes et leur comportement de combat (document de design dédié)
2. Modéliser précisément la base de données (schéma Prisma)
3. Poser l'architecture du projet (repo backend/frontend, CI basique)
4. Prototyper le combat automatique en isolé (logique pure, sans UI) pour valider les règles
5. Construire l'UI de base : écran de collection, ouverture de pack, écran de board/combat