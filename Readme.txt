# Simulateur Physique Interactif

L'application est un simulateur physique interactif faite à partir de la librairie 2-D Matter.js. Elle simule plusieurs phénomènes physique avec plusieurs simulations implantées dans leur interface web. Le back-end est pris en charge avec **Django**, tandis que l'animation est gérée par JavaScript.

## 🚀 Objectifs du projet

- Créer des simulations interactives illustrant des concepts en physique.
- Offrir aux étudiants une application web à travers laquelle ils peuvent comprendre des phénomènes physiques.
- Apprendre à travailler en équipe via GitHub et d'outils de développement.

## 🛠️ Technologies utilisées

- **HTML / CSS / JavaScript**
- **[Matter.js](https://brm.io/matter-js/)** – moteur physique 2D
- **Django** – Front-end de site en Python
- **GitHub** – Versioning et collaboration
- **VS Code** – IDE

## 🧪 Simulations disponibles

- **Pendule**
- **Collisions**
- **Lancer**
- **Gravité**
- **Friction**
- **Densité**
- **Statique (force, spring, object)**

Chaque simulation possède son interface utilisateur ainsi que son script JavaScript spécifique.

## 📦 Structure du projet

- `/static/` – Contient les fichiers JS, CSS, et image
- `/templates/` – Contient les fichiers template HTML des simulations
- `/app/` – Contient la logique de Django (vues, chemins URL)
