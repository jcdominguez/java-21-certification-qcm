# Atelier certification · Java SE 21

Application statique en français de préparation à la certification **1Z0-830**, avec **150 questions originales** et références officielles Java 21.

- Entraînement par thème, séries de 10, 20 ou 50 questions (limitées au nombre disponible), corrigé immédiat et révision des erreurs.
- Examen blanc : 50 questions distinctes, 120 minutes, 34 réponses entièrement exactes pour atteindre 68 %. Répartition pédagogique entre tous les thèmes, sans prétendre reproduire les pondérations Oracle.
- Navigation libre, questions à revoir, correction complète et bilan par thème.
- Session et 30 derniers résultats conservés en `localStorage`, sans serveur ni synchronisation. Le chronomètre continue pendant l’absence.

Questions indépendantes de l’examen officiel, sans affiliation Oracle. Une réussite ici ne garantit pas la certification. Pas de fonctionnalités Java preview. Les imports et le contexte nécessaires aux fragments sont supposés présents sauf indication contraire. Les questions dépendantes d’un système Unix le précisent.

## Utilisation et hébergement

Servir ce dossier avec un serveur HTTP statique ou GitHub Pages. Aucun bundler ni dépendance de production. Tous les fichiers de l’interface sont locaux. JavaScript est nécessaire. L’application ne télécharge ni n’exécute le code Java présenté.

GitHub Pages : publier la racine de la branche `main`. Le fichier `.nojekyll` désactive le traitement Jekyll. Les chemins relatifs permettent le déploiement dans un sous-chemin de dépôt.

## Validation

Node.js 22 et JDK 21 :

```sh
npm test
npm run check:java
```

Les tests Java compilent les fragments marqués `check` dans un dossier temporaire et vérifient résultats, exceptions ou refus de compilation. Les autres questions conceptuelles citent les spécifications et API officielles. Aucune dépendance npm à installer pour ces contrôles.

## Structure

`bank.js` : contenu pédagogique et métadonnées de vérification. `core.js` : tirage, score, état. `app.js` : interface et stockage. `style.css` : présentation responsive. `tests/` : validations.

Le corrigé fait partie des fichiers publics : cette application sert à l’autoévaluation, pas à un examen surveillé. La suppression des données du navigateur efface la progression. Le stockage est propre à l’origine GitHub Pages et à l’appareil utilisé, avec une clé dédiée à l’application.
