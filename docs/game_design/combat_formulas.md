# Formules Mathématiques de Combat — Grimoire Tactics

Document vivant répertoriant les équations mathématiques pures utilisées par le moteur de combat serveur.

---

## 1. Calcul des Dégâts Physiques

$$\text{Dégâts Subis} = \max\left(1, \text{Attaque} \times \left( \frac{100}{100 + \text{Défense}} \right)\right)$$

- Si l'attaque est physique, on prend la valeur d'attaque physique et d'armure physique.
- Le minimum de dégâts infligés par coup est de 1.

---

## 2. Ordre de Passage (Initiative & Vitesse)

- L'initiative est déterminée par la statistique de **Vitesse**.
- Au début de chaque tour, les personnages agissent par ordre décroissant de Vitesse.
- En cas d'égalité de vitesse, le personnage de l'équipe alliée agit en premier.
