# Atelier certification · Java SE 21

Application statique en français de préparation à la certification **1Z0-830**, avec **200 questions originales** et références officielles Java 21.

- Entraînement par thème, séries de 10, 20 ou 50 questions (limitées aux questions non traitées disponibles), corrigé immédiat et révision volontaire des erreurs. Une question devient traitée après validation ou remise d’une réponse en fin de session ; une simple consultation ne suffit pas.
- Examen blanc : 50 questions distinctes, 120 minutes, 34 réponses entièrement exactes pour atteindre 68 %. Priorité aux questions non traitées dans chaque thème ; si un quota ne peut être rempli, confirmation du nombre de questions déjà traitées avant le lancement. Répartition pédagogique entre tous les thèmes, sans prétendre reproduire les pondérations Oracle.
- Navigation libre, questions à revoir, correction complète et bilan par thème.
- Fiches mémo : 79 fiches en français, sommaire selon les dix thèmes officiels et les compétences complémentaires. Chaque question pointe vers sa fiche de référence, partagée entre questions si nécessaire.
- Lecture des fiches dans un nouvel onglet avant et après réponse en entraînement, et dans le corrigé après l’examen. Les liens sont masqués pendant l’examen blanc.
- Session, trente derniers résultats et suivi des questions traitées conservés en `localStorage`, sans serveur ni synchronisation. Le suivi survit à la sortie d’un bilan de l’historique. Les sauvegardes antérieures récupèrent les questions identifiables dans les bilans restants, la session et les erreurs ; les anciens bilans déjà supprimés ne sont pas récupérables. Quand les thèmes sélectionnés sont épuisés, une confirmation permet de recommencer un cycle pour ces thèmes en conservant les bilans et les erreurs. Effacer la progression supprime également ce suivi. Le chronomètre continue pendant l’absence.

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

Vérifier aussi les exemples des fiches avec le JDK 21 :

```sh
npm run check:memos:java
```

Ce contrôle compile et exécute les 74 fragments affichés, compile les quatre descripteurs avec leurs fichiers de contexte, puis exécute les deux suites de commandes du JDK dans un dossier temporaire. Il crée notamment une petite image d’exécution avec `jlink`. Les imports communs des fragments sont consultables dans chaque fiche.

Le sommaire est accessible par `memo.html` ; une fiche est partageable via `memo.html?id=generiques`, par exemple. Les fiches sont statiques et ne modifient pas la progression. Elles suivent l’ordre : règle essentielle, méthode de raisonnement, exemple commenté, pièges, sources officielles.

Les tests automatiques contrôlent la couverture des questions, les liens entre fiches et les règles d’accès aux mémos. Le contenu suit le programme Oracle 1Z0-830 ; les génériques, annotations et bases du logging sont classés parmi les compétences complémentaires explicitement attendues. Une fiche peut couvrir une notion du programme sans question dédiée dans la banque actuelle.

## Structure

`bank.js` et `additional-questions.js` : contenu pédagogique et métadonnées de vérification. `progress.js` : suivi des questions traitées et reprise des anciennes sauvegardes. `core.js` : tirage, score, état. `app.js` : interface et stockage. `style.css` : présentation responsive. `tests/` : validations.

`memos.js` : fiches, thèmes officiels et correspondances par identifiant de question. `memo.html` et `memo-page.js` : sommaire et lecture. `memo-link.js` : visibilité et lien depuis les questions. Pour ajouter une fiche, compléter le catalogue et ses vérifications d’exemple ; pour relier une question, compléter `questionMemoIds`. Les renvois entre notions réutilisent les fiches au lieu de les dupliquer.

Le corrigé fait partie des fichiers publics : cette application sert à l’autoévaluation, pas à un examen surveillé. La suppression des données du navigateur efface la progression. Le stockage est propre à l’origine GitHub Pages et à l’appareil utilisé, avec une clé dédiée à l’application.
