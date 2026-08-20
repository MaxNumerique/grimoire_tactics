# Classes, Compétences et IA de Combat — Grimoire Tactics

Document vivant spécifiant les classes de personnages, leurs statistiques de base, leurs compétences et leur comportement automatique sur le plateau de combat.

---

## 1. Vue d'Ensemble des Classes MVP

Chaque personnage appartient à une **Classe** qui définit :
- Son rôle principal (Tank, Dégâts physiques, Dégâts magiques, Soin/Soutien).
- Sa portée d'attaque (Mêlée / Ligne avant vs Distance / Ligne arrière).
- La priorité de ciblage de son IA en combat automatique.

---

## 2. Fiche des Classes Principales (Ébauche)

### 2.1 Guerrier (Mêlée / Dégâts Physiques)
- **Position recommandée** : Ligne avant.
- **Cible prioritaire IA** : Ennemi le plus proche sur la ligne avant.
- **Compétence active** : *Coup Puissant* (Inflige 150% des dégâts physiques à la cible).

### 2.2 Tank (Mêlée / Défense & Provocation)
- **Position recommandée** : Ligne avant.
- **Cible prioritaire IA** : Ennemi de la ligne avant ayant la plus forte attaque.
- **Compétence active** : *Bouclier d'Acier* (Réduit les dégâts subis de 30% pendant 2 tours).

### 2.3 Mage (Distance / Dégâts Magiques Zone/Mono)
- **Position recommandée** : Ligne arrière.
- **Cible prioritaire IA** : Ennemi ayant le moins de PV max (exécuteur) ou la ligne arrière ennemie.
- **Compétence active** : *Boule de Feu* (Inflige des dégâts magiques de zone).

### 2.4 Soigneur (Distance / Soutien)
- **Position recommandée** : Ligne arrière.
- **Cible prioritaire IA** : Allié ayant le pourcentage de PV le plus bas.
- **Compétence active** : *Soin Divin* (Restaure X% des PV de l'allié le plus blessé).
