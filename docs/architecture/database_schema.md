# Schéma de Base de Données (Prisma / PostgreSQL) — Grimoire Tactics

Document vivant répertoriant les entités de données du jeu.

---

## 1. Entités Principales

- **`User`** : Compte joueur (email, hash mot de passe, solde d'or, solde de gemmes).
- **`CharacterTemplate`** : Modèle de personnage (nom, classe, rareté, stats de base, illustration).
- **`OwnedCharacter`** : Instance d'un personnage possédé par un joueur (niveau, expérience, équipements équipés).
- **`EquipmentTemplate`** : Modèle d'équipement (nom, bonus de stats, emplacement).
- **`OwnedEquipment`** : Instance d'un équipement possédé par un joueur.
- **`PackTemplate`** : Type de pack disponible en boutique (coût, table des taux de drop).
