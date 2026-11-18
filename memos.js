import {additionalQuestions} from './additional-questions.js';
// Catalogue de révision Java SE 21. Textes et exemples originaux.
export const memoGroups = [
  {
    "id": "values",
    "name": "Handling Date, Time, Text, Numeric and Boolean Values",
    "label": "Valeurs, textes et dates"
  },
  {
    "id": "flow",
    "name": "Controlling Program Flow",
    "label": "Contrôle du flux"
  },
  {
    "id": "objects",
    "name": "Using Object-Oriented Concepts in Java",
    "label": "Programmation objet"
  },
  {
    "id": "exceptions",
    "name": "Handling Exceptions",
    "label": "Exceptions"
  },
  {
    "id": "collections",
    "name": "Working with Arrays and Collections",
    "label": "Tableaux et collections"
  },
  {
    "id": "streams",
    "name": "Working with Streams and Lambda expressions",
    "label": "Streams et lambdas"
  },
  {
    "id": "modules",
    "name": "Packaging and Deploying Java Code",
    "label": "Modules et déploiement"
  },
  {
    "id": "concurrency",
    "name": "Managing Concurrent Code Execution",
    "label": "Concurrence"
  },
  {
    "id": "io",
    "name": "Using Java I/O API",
    "label": "Entrées-sorties"
  },
  {
    "id": "locale",
    "name": "Implementing Localization",
    "label": "Localisation"
  },
  {
    "id": "extra",
    "name": "Compétences également attendues",
    "label": "Génériques, annotations et logging"
  }
];

export const memos = [
  {
    "id": "wrappers",
    "group": "values",
    "title": "Types primitifs, wrappers, boxing et unboxing",
    "rules": [
      "Un primitif contient une valeur ; son wrapper est un objet et peut être null. Le boxing transforme une valeur primitive en wrapper, et l’unboxing effectue le chemin inverse."
    ],
    "method": [
      "Identifier le type déclaré et la présence éventuelle de null.",
      "Repérer chaque opération qui exige une valeur primitive."
    ],
    "code": "Integer score = 8; // boxing\nint total = score + 4; // unboxing\nSystem.out.print(total);",
    "explanation": "Le calcul utilise la valeur int du wrapper et affiche 12.",
    "pitfalls": [
      "Déballer null provoque NullPointerException.",
      "== sur deux wrappers peut comparer les références ; utiliser equals pour une égalité de valeurs."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html"
      }
    ],
    "related": [
      "conversions"
    ],
    "check": {
      "output": "12"
    }
  },
  {
    "id": "conversions",
    "group": "values",
    "title": "Conversions, promotions numériques et casts",
    "rules": [
      "Les opérations arithmétiques sur byte, short et char produisent généralement un int. Une conversion réductrice peut perdre des bits ; ++ et les affectations composées incluent une conversion vers le type de gauche."
    ],
    "method": [
      "Déterminer le type de chaque opérande avant de calculer.",
      "Vérifier ensuite si le type du résultat peut être affecté à la variable."
    ],
    "code": "byte niveau = 12;\n// niveau = niveau + 3; // ne compile pas : résultat int\nniveau += 3; // conversion implicite vers byte\nSystem.out.print(niveau);",
    "explanation": "L’affectation composée est autorisée et affiche 15.",
    "pitfalls": [
      "Un débordement entier ne lève pas automatiquement une exception.",
      "Un cast change la représentation possible, pas la taille du type cible."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html"
      }
    ],
    "related": [
      "wrappers",
      "operateurs"
    ],
    "check": {
      "output": "15"
    }
  },
  {
    "id": "operateurs",
    "group": "values",
    "title": "Opérateurs, priorités et court-circuit booléen",
    "rules": [
      "La priorité fixe le regroupement des opérateurs. Une division entre entiers reste entière. && et || peuvent ne pas évaluer leur opérande droit."
    ],
    "method": [
      "Parenthéser mentalement les expressions selon leur priorité.",
      "Suivre les effets de bord uniquement pour les opérandes réellement évalués."
    ],
    "code": "int compteur = 6;\nboolean test = true || ++compteur > 10;\nSystem.out.print(compteur + \":\" + (9 / 4));",
    "explanation": "|| évite l’incrément ; la division entière donne 2. Le résultat est 6:2.",
    "pitfalls": [
      "& et | sur boolean évaluent les deux côtés.",
      "Une conversion flottante après une division entière ne restaure pas la fraction perdue."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html"
      }
    ],
    "related": [
      "conversions",
      "strings"
    ],
    "check": {
      "output": "6:2"
    }
  },
  {
    "id": "math",
    "group": "values",
    "title": "Math : calculs, arrondis et limites numériques",
    "rules": [
      "floor arrondit vers moins l’infini, ceil vers plus l’infini. round choisit l’entier le plus proche avec les égalités vers plus l’infini ; son type de retour dépend de la surcharge."
    ],
    "method": [
      "Vérifier si l’argument est float ou double.",
      "Pour les valeurs négatives, placer les entiers voisins sur une droite numérique."
    ],
    "code": "System.out.print(Math.floor(-2.7) + \":\" + Math.ceil(-2.7) + \":\" + Math.round(2.5));",
    "explanation": "Les trois opérations affichent -3.0:-2.0:3.",
    "pitfalls": [
      "Math.abs de la valeur minimale d’un int reste négatif.",
      "Ne pas confondre arrondi et troncature vers zéro."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html"
      }
    ],
    "related": [],
    "check": {
      "output": "-3.0:-2.0:3"
    }
  },
  {
    "id": "strings",
    "group": "values",
    "title": "String : immuabilité, comparaison et manipulation",
    "rules": [
      "String est immuable : ses méthodes ne modifient pas l’objet initial. Les bornes de substring sont début inclus, fin exclue. Avec +, la présence d’une chaîne entraîne une concaténation."
    ],
    "method": [
      "Suivre les réaffectations, pas seulement les appels de méthodes.",
      "Évaluer les concaténations de gauche à droite et compter les indices depuis zéro."
    ],
    "code": "String mot = \"module\";\nmot.replace(\"m\", \"M\"); // résultat ignoré\nSystem.out.print(mot.substring(1, 4) + \":\" + 4 + 5);",
    "explanation": "La chaîne initiale reste intacte ; le résultat est odu:45.",
    "pitfalls": [
      "equals compare le contenu ; == compare les références.",
      "Une borne finale valide peut être égale à length()."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
      }
    ],
    "related": [
      "stringbuilder",
      "textblocks"
    ],
    "check": {
      "output": "odu:45"
    }
  },
  {
    "id": "stringbuilder",
    "group": "values",
    "title": "StringBuilder : modifications et chaînage",
    "rules": [
      "StringBuilder est mutable. append, delete, insert et reverse modifient le même objet et renvoient généralement ce builder pour permettre le chaînage."
    ],
    "method": [
      "Réécrire le contenu après chaque appel.",
      "Recalculer les indices après chaque modification."
    ],
    "code": "var texte = new StringBuilder(\"abcd\");\ntexte.delete(0, 2).append(\"!\");\nSystem.out.print(texte);",
    "explanation": "delete retire a et b, puis append ajoute le point d’exclamation : cd!.",
    "pitfalls": [
      "La borne finale de delete est exclusive.",
      "Deux références vers le même builder observent ses mutations."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html"
      }
    ],
    "related": [
      "strings"
    ],
    "check": {
      "output": "cd!"
    }
  },
  {
    "id": "textblocks",
    "group": "values",
    "title": "Text blocks et séquences d’échappement",
    "rules": [
      "Un text block est un littéral String multiligne. Le délimiteur ouvrant est suivi d’un saut de ligne ; l’indentation incidente est retirée et les échappements sont interprétés."
    ],
    "method": [
      "Repérer la position du délimiteur fermant pour déterminer l’indentation et le saut de ligne final.",
      "Appliquer ensuite les échappements."
    ],
    "code": "String texte = \"\"\"\n    bonjour\n    \"\"\";\nSystem.out.print(texte.equals(\"bonjour\\n\"));",
    "explanation": "L’indentation commune est retirée, mais le saut de ligne avant le délimiteur fermant reste présent.",
    "pitfalls": [
      "Un text block reste immuable.",
      "Les séquences telles que \\n ne deviennent pas automatiquement du texte brut."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html"
      }
    ],
    "related": [
      "strings"
    ],
    "check": {
      "output": "true"
    }
  },
  {
    "id": "dates",
    "group": "values",
    "title": "Dates, heures et instants avec java.time",
    "rules": [
      "LocalDate représente une date, LocalTime une heure, LocalDateTime leur combinaison sans fuseau. Instant représente un point sur la ligne du temps. Ces objets sont immuables."
    ],
    "method": [
      "Choisir le type selon la présence d’une date, d’une heure et d’un fuseau.",
      "Conserver le résultat de plus ou minus ; vérifier les ajustements calendaires."
    ],
    "code": "var date = LocalDate.of(2025, 5, 31);\nvar suivante = date.plusMonths(1);\nSystem.out.print(suivante + \":\" + date.getMonthValue());",
    "explanation": "Juin n’a que 30 jours : le résultat est ajusté au 30 juin, et la date initiale reste en mai.",
    "pitfalls": [
      "LocalDateTime ne représente pas à lui seul un instant universel.",
      "Créer une date impossible avec of peut lever DateTimeException."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html"
      }
    ],
    "related": [
      "durees",
      "fuseaux",
      "format-dates"
    ],
    "check": {
      "output": "2025-06-30:5"
    }
  },
  {
    "id": "durees",
    "group": "values",
    "title": "Duration et Period : calculs temporels",
    "rules": [
      "Duration mesure une quantité en secondes et nanosecondes. Period représente des années, mois et jours ; ses mois ne correspondent pas à un nombre fixe de secondes."
    ],
    "method": [
      "Distinguer quantité chronométrée et quantité calendaire.",
      "Choisir un type temporel compatible avec les unités utilisées."
    ],
    "code": "var periode = Period.ofMonths(26).normalized();\nvar duree = Duration.ofMinutes(90);\nSystem.out.print(periode + \":\" + duree.toMinutes());",
    "explanation": "La période normalisée contient deux ans et deux mois ; la durée vaut 90 minutes.",
    "pitfalls": [
      "normalized ne convertit pas les mois en jours.",
      "Une durée de 24 heures et un jour calendaire ne sont pas toujours équivalents."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Period.html"
      }
    ],
    "related": [
      "dates",
      "fuseaux"
    ],
    "check": {
      "output": "P2Y2M:90"
    }
  },
  {
    "id": "fuseaux",
    "group": "values",
    "title": "Fuseaux horaires et changements d’heure",
    "rules": [
      "ZoneId porte les règles d’un fuseau. ZonedDateTime combine date, heure et fuseau. Ajouter un jour local peut représenter 23, 24 ou 25 heures autour d’un changement d’heure."
    ],
    "method": [
      "Identifier si l’ajout porte sur le calendrier ou sur une durée.",
      "Comparer les instants ou offsets avant de calculer le temps écoulé."
    ],
    "code": "var debut = ZonedDateTime.of(2024, 10, 26, 12, 0, 0, 0, ZoneId.of(\"Europe/Paris\"));\nSystem.out.print(Duration.between(debut, debut.plusDays(1)).toHours());",
    "explanation": "Le retour à l’heure d’hiver ajoute une heure au temps écoulé : 25 heures séparent les deux midis.",
    "pitfalls": [
      "Un offset fixe ne contient pas toutes les règles d’un fuseau régional.",
      "plusDays(1) ne signifie pas systématiquement plusHours(24)."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/ZonedDateTime.html"
      }
    ],
    "related": [
      "dates",
      "durees"
    ],
    "check": {
      "output": "25"
    }
  },
  {
    "id": "conditions",
    "group": "flow",
    "title": "Conditions if / else",
    "rules": [
      "if attend une expression boolean. Sans accolades, une branche ne contient qu’une instruction ; un else est associé au if admissible le plus proche."
    ],
    "method": [
      "Ajouter mentalement les accolades sans changer l’association des else.",
      "Évaluer chaque condition uniquement lorsqu’elle est atteinte."
    ],
    "code": "int note = 14;\nif (note >= 10) {\n    if (note >= 16) System.out.print(\"très bien\");\n    else System.out.print(\"validé\");\n}",
    "explanation": "Le premier test réussit et le second échoue : la sortie est validé.",
    "pitfalls": [
      "Un point-virgule après if forme une instruction vide.",
      "Un entier ne peut pas servir directement de condition."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html"
      }
    ],
    "related": [
      "operateurs"
    ],
    "check": {
      "output": "validé"
    }
  },
  {
    "id": "boucles",
    "group": "flow",
    "title": "Boucles, break, continue et étiquettes",
    "rules": [
      "while teste avant le corps, do-while après. continue passe à l’itération suivante ; dans un for classique, la mise à jour est exécutée. break quitte la boucle ciblée."
    ],
    "method": [
      "Tracer les valeurs à l’entrée, dans le corps puis à la mise à jour.",
      "Identifier la cible exacte de break ou continue, notamment avec une étiquette."
    ],
    "code": "int somme = 0;\nfor (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) continue;\n    somme += i;\n}\nSystem.out.print(somme);",
    "explanation": "Seuls les impairs sont additionnés : 1 + 3 + 5 donne 9.",
    "pitfalls": [
      "Réaffecter la variable primitive d’un for-each ne modifie pas le tableau.",
      "break sans étiquette ne quitte que la boucle ou le switch le plus proche."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html"
      }
    ],
    "related": [
      "tableaux"
    ],
    "check": {
      "output": "9"
    }
  },
  {
    "id": "switch",
    "group": "flow",
    "title": "switch : instruction, expression, yield et exhaustivité",
    "rules": [
      "Une expression switch fournit une valeur et doit être exhaustive. Une branche fléchée n’a pas de fall-through ; un groupe classique avec deux-points peut continuer dans le suivant. yield fournit la valeur d’un bloc."
    ],
    "method": [
      "Distinguer instruction et expression switch.",
      "Trouver la branche retenue et suivre ses règles de sortie."
    ],
    "code": "var taille = switch (\"court\") {\n    case \"court\" -> { yield 3 + 2; }\n    default -> 0;\n};\nSystem.out.print(taille);",
    "explanation": "Le bloc yield fournit 5 à l’expression, affecté à taille.",
    "pitfalls": [
      "break ne remplace pas yield pour fournir une valeur.",
      "Une expression switch exhaustive sur un enum ou un type sealed peut se passer de default."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html"
      }
    ],
    "related": [
      "switch-patterns"
    ],
    "check": {
      "output": "5"
    }
  },
  {
    "id": "objets",
    "group": "objects",
    "title": "Objets, références et garbage collection",
    "rules": [
      "Une variable de référence et l’objet désigné sont distincts. Réaffecter une variable ne détruit pas l’objet ; la collecte dépend de son accessibilité, sans garantie de collecte immédiate."
    ],
    "method": [
      "Dessiner les références encore accessibles après chaque affectation.",
      "Distinguer perte d’une référence et perte de toutes les références accessibles."
    ],
    "code": "var premier = new StringBuilder(\"x\");\nvar second = premier;\npremier = null;\nsecond.append(\"y\");\nSystem.out.print(second);",
    "explanation": "La seconde référence garde le builder accessible ; il peut encore être modifié.",
    "pitfalls": [
      "System.gc() ne garantit pas une collecte immédiate.",
      "Java transmet les arguments par valeur, y compris les valeurs de références."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html"
      }
    ],
    "related": [
      "immuabilite"
    ],
    "check": {
      "output": "xy"
    }
  },
  {
    "id": "membres",
    "group": "objects",
    "title": "Champs, méthodes et membres static",
    "rules": [
      "Un champ d’instance appartient à chaque objet ; un champ static appartient à la classe. Une méthode static ne dispose pas de this."
    ],
    "method": [
      "Séparer l’état partagé par la classe de l’état propre à chaque instance.",
      "Suivre le nombre d’objets créés et les écritures dans chaque champ."
    ],
    "code": "class Compteur {\n    static int total;\n    int rang = ++total;\n}\nvar a = new Compteur();\nvar b = new Compteur();\nSystem.out.print(a.rang + \":\" + b.rang + \":\" + Compteur.total);",
    "explanation": "Le compteur commun est incrémenté à chaque création : 1:2:2.",
    "pitfalls": [
      "Une méthode static peut utiliser un objet reçu en paramètre, mais pas this.",
      "Masquage d’un membre et redéfinition d’une méthode sont différents."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [
      "polymorphisme",
      "initialisation"
    ],
    "check": {
      "output": "1:2:2"
    }
  },
  {
    "id": "initialisation",
    "group": "objects",
    "title": "Constructeurs et ordre d’initialisation",
    "rules": [
      "L’initialisation de classe précède son utilisation active. Pour une instance, les initialisations de la superclasse précèdent celles de la sous-classe, puis son corps de constructeur. Sans constructeur déclaré, une classe ordinaire reçoit un constructeur par défaut."
    ],
    "method": [
      "Séparer les étapes static, exécutées une fois, des étapes d’instance.",
      "Suivre champs et blocs dans leur ordre textuel avant le corps du constructeur."
    ],
    "code": "class Etape {\n    int n = 3;\n    { n *= 2; }\n    Etape() { n += 4; }\n}\nSystem.out.print(new Etape().n);",
    "explanation": "Le champ vaut 3, le bloc le porte à 6 et le constructeur à 10.",
    "pitfalls": [
      "Déclarer un constructeur supprime la génération du constructeur par défaut.",
      "En Java 21, un appel explicite à this(...) ou super(...) commence le corps du constructeur."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html"
      }
    ],
    "related": [
      "membres"
    ],
    "check": {
      "output": "10"
    }
  },
  {
    "id": "var-portee",
    "group": "objects",
    "title": "Portée des variables et inférence var",
    "rules": [
      "var permet l’inférence du type d’une variable locale à partir de son initialiseur. Ce n’est pas un type dynamique et il ne permet pas une déclaration de champ ou de paramètre de méthode ordinaire."
    ],
    "method": [
      "Vérifier que la déclaration se situe dans un contexte autorisé.",
      "Déduire le type de l’initialiseur, puis contrôler les utilisations ultérieures."
    ],
    "code": "var nombres = new ArrayList<Integer>();\nnombres.add(7);\n// nombres = \"autre\"; // incompatible avec le type inféré\nSystem.out.print(nombres.get(0));",
    "explanation": "Le type reste ArrayList<Integer> pendant toute la portée de la variable.",
    "pitfalls": [
      "var x = null et var x sans initialiseur ne permettent pas l’inférence.",
      "Une déclaration avec var ne peut pas avoir plusieurs déclarateurs."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html"
      }
    ],
    "related": [
      "generiques"
    ],
    "check": {
      "output": "7"
    }
  },
  {
    "id": "immuabilite",
    "group": "objects",
    "title": "Encapsulation, copies défensives et immuabilité",
    "rules": [
      "Une classe immuable protège son état contre toutes les modifications observables. final interdit la réaffectation d’une référence, pas la mutation de l’objet désigné."
    ],
    "method": [
      "Chercher les alias transmis au constructeur et ceux exposés par les accesseurs.",
      "Protéger aussi les éléments si ceux-ci sont mutables."
    ],
    "code": "var source = new ArrayList<>(List.of(\"bleu\"));\nvar copie = List.copyOf(source);\nsource.add(\"vert\");\nSystem.out.print(copie);",
    "explanation": "La copie non modifiable est indépendante de l’ajout réalisé dans la liste source.",
    "pitfalls": [
      "Une copie de liste est superficielle : elle ne copie pas les objets contenus.",
      "Un getter retournant directement une collection mutable expose l’état."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [
      "listes-vues",
      "records"
    ],
    "check": {
      "output": "[bleu]"
    }
  },
  {
    "id": "surcharge",
    "group": "objects",
    "title": "Surcharge de méthodes et paramètres varargs",
    "rules": [
      "La surcharge est choisie à la compilation selon les types des arguments. La résolution examine d’abord les appels sans boxing ni varargs, puis ceux avec boxing, puis les varargs. Le paramètre varargs doit être le dernier."
    ],
    "method": [
      "Lister les signatures applicables à chaque phase.",
      "Choisir la plus spécifique dans la première phase qui fournit un résultat."
    ],
    "code": "class Choix {\n    static String f(double x) { return \"double\"; }\n    static String f(Integer x) { return \"wrapper\"; }\n}\nSystem.out.print(Choix.f(4));",
    "explanation": "L’élargissement de int vers double est possible avant la phase de boxing.",
    "pitfalls": [
      "Un paramètre T... accepte aussi un tableau T[] explicite.",
      "Une surcharge ambiguë échoue à la compilation, pas à l’exécution."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html"
      }
    ],
    "related": [
      "wrappers",
      "annotations"
    ],
    "check": {
      "output": "double"
    }
  },
  {
    "id": "heritage",
    "group": "objects",
    "title": "Héritage, classes abstraites et types sealed",
    "rules": [
      "Une classe abstraite peut déclarer un contrat à compléter. sealed restreint les sous-types directs autorisés ; une sous-classe ordinaire directe est final, sealed ou non-sealed."
    ],
    "method": [
      "Vérifier les relations extends et implements.",
      "Pour sealed, contrôler les sous-types permis et leurs modificateurs."
    ],
    "code": "abstract class Forme { abstract int surface(); }\nclass Carre extends Forme {\n    int surface() { return 16; }\n}\nForme forme = new Carre();\nSystem.out.print(forme.surface());",
    "explanation": "La classe concrète fournit la méthode abstraite, appelée sur son instance.",
    "pitfalls": [
      "Une classe ne peut étendre qu’une classe, mais peut implémenter plusieurs interfaces.",
      "sealed ne rend pas automatiquement ses champs ou objets immuables."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [
      "polymorphisme",
      "records"
    ],
    "check": {
      "output": "16"
    }
  },
  {
    "id": "polymorphisme",
    "group": "objects",
    "title": "Polymorphisme, redéfinition et masquage",
    "rules": [
      "Une méthode d’instance redéfinie est choisie selon le type réel de l’objet. Les champs et les méthodes static sont sélectionnés selon le type de référence. Une redéfinition ne réduit pas la visibilité et peut utiliser un retour covariant."
    ],
    "method": [
      "Identifier d’abord le type de la référence et celui de l’objet.",
      "Déterminer si le membre utilisé est un champ, une méthode static ou une méthode d’instance."
    ],
    "code": "class Parent { String nom() { return \"parent\"; } int n = 4; }\nclass Enfant extends Parent { String nom() { return \"enfant\"; } int n = 9; }\nParent p = new Enfant();\nSystem.out.print(p.nom() + \":\" + p.n);",
    "explanation": "La méthode est dynamique, le champ est sélectionné statiquement : enfant:4.",
    "pitfalls": [
      "Une méthode final ne peut pas être redéfinie.",
      "Les exceptions checked d’une méthode redéfinie ne peuvent pas élargir le contrat."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [
      "exceptions-redefinition",
      "egalite"
    ],
    "check": {
      "output": "enfant:4"
    }
  },
  {
    "id": "casts-patterns",
    "group": "objects",
    "title": "Casts de références et pattern matching avec instanceof",
    "rules": [
      "Un cast de référence ne transforme pas l’objet. Le compilateur contrôle sa possibilité ; l’exécution vérifie la compatibilité réelle. instanceof avec pattern teste et déclare une variable utilisable là où la correspondance est garantie."
    ],
    "method": [
      "Distinguer type statique et type réel.",
      "Pour un pattern, suivre les branches où sa réussite est certaine."
    ],
    "code": "Object objet = \"révision\";\nif (objet instanceof String texte && !texte.isEmpty()) {\n    System.out.print(texte.length());\n}",
    "explanation": "Le court-circuit garantit que texte existe avant l’appel de isEmpty ; sa longueur vaut 8.",
    "pitfalls": [
      "Un cast incompatible peut lever ClassCastException.",
      "instanceof sur null est false ; || ne garantit pas la disponibilité du pattern à droite."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html"
      }
    ],
    "related": [
      "switch-patterns"
    ],
    "check": {
      "output": "8"
    }
  },
  {
    "id": "switch-patterns",
    "group": "objects",
    "title": "switch à patterns : gardes, dominance et null",
    "rules": [
      "Un switch à patterns peut sélectionner un type et appliquer une garde when. Les branches dominées sont rejetées. Sans case null approprié, un sélecteur null provoque NullPointerException, même avec default."
    ],
    "method": [
      "Placer les cas spécifiques avant les cas généraux.",
      "Vérifier les gardes, la couverture de null et l’exhaustivité."
    ],
    "code": "Object valeur = \"\";\nString categorie = switch (valeur) {\n    case null -> \"absent\";\n    case String s when s.isEmpty() -> \"vide\";\n    case String s -> \"texte\";\n    default -> \"autre\";\n};\nSystem.out.print(categorie);",
    "explanation": "La garde de la première branche String est vraie : la sortie est vide.",
    "pitfalls": [
      "case Object avant case String peut dominer ce dernier.",
      "Une garde when true n’apporte pas une restriction supplémentaire."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html"
      }
    ],
    "related": [
      "switch",
      "casts-patterns",
      "records"
    ],
    "check": {
      "output": "vide"
    }
  },
  {
    "id": "records",
    "group": "objects",
    "title": "Records : composants, constructeurs et décomposition",
    "rules": [
      "Un record est implicitement final et définit son état par ses composants. Il fournit des accesseurs portant leur nom et des méthodes equals, hashCode et toString. Un constructeur compact peut normaliser ses paramètres avant l’affectation implicite."
    ],
    "method": [
      "Identifier les composants et les méthodes générées.",
      "Pour un record pattern, lier chaque variable au composant correspondant."
    ],
    "code": "record Mesure(int largeur, int hauteur) {\n    Mesure { largeur = Math.abs(largeur); }\n}\nObject objet = new Mesure(-4, 3);\nif (objet instanceof Mesure(int l, int h)) System.out.print(l * h);",
    "explanation": "Le constructeur normalise la largeur à 4 ; le pattern expose 4 et 3.",
    "pitfalls": [
      "Un record ne peut pas ajouter de champ d’instance hors composants.",
      "Ses références finales ne rendent pas leurs objets profondément immuables."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [
      "immuabilite",
      "egalite"
    ],
    "check": {
      "output": "12"
    }
  },
  {
    "id": "interfaces",
    "group": "objects",
    "title": "Interfaces : méthodes abstract, default, static et private",
    "rules": [
      "Une interface peut déclarer des méthodes abstraites, default, static et private. Les méthodes default fournissent une implémentation héritée ; un conflit entre defaults indépendants doit être résolu."
    ],
    "method": [
      "Séparer le contrat abstrait des méthodes avec corps.",
      "Pour chaque méthode héritée, vérifier si une classe ou une interface plus spécifique la fournit déjà."
    ],
    "code": "interface A { default String nom() { return \"A\"; } }\ninterface B { default String nom() { return \"B\"; } }\nclass C implements A, B {\n    public String nom() { return A.super.nom() + B.super.nom(); }\n}\nSystem.out.print(new C().nom());",
    "explanation": "C résout explicitement le conflit et combine les deux implémentations.",
    "pitfalls": [
      "Une méthode default doit avoir un corps.",
      "Une méthode static d’interface s’appelle via le nom de l’interface."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html"
      }
    ],
    "related": [
      "interfaces-fonctionnelles"
    ],
    "check": {
      "output": "AB"
    }
  },
  {
    "id": "interfaces-fonctionnelles",
    "group": "objects",
    "title": "Reconnaître une interface fonctionnelle",
    "rules": [
      "Une interface fonctionnelle possède un seul contrat de méthode abstraite, après application des règles d’héritage. Les méthodes publiques correspondant à Object sont exclues du comptage ; default et static ne l’augmentent pas."
    ],
    "method": [
      "Compter les méthodes abstraites pertinentes, pas toutes les déclarations.",
      "Vérifier la signature à laquelle la lambda doit correspondre."
    ],
    "code": "@FunctionalInterface\ninterface Calcul { int appliquer(int n); }\nCalcul doubler = n -> n * 2;\nSystem.out.print(doubler.appliquer(6));",
    "explanation": "La lambda fournit le seul contrat abstrait et retourne 12.",
    "pitfalls": [
      "@FunctionalInterface vérifie le contrat, sans le créer.",
      "Les paramètres et le retour de la lambda doivent être compatibles avec la méthode cible."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html"
      }
    ],
    "related": [
      "lambdas",
      "annotations"
    ],
    "check": {
      "output": "12"
    }
  },
  {
    "id": "enums",
    "group": "objects",
    "title": "Enums : constantes, constructeurs et comportements",
    "rules": [
      "Les constantes d’enum sont les instances définies par le type. Une enum peut avoir champs, méthodes et constructeurs non publics, et chaque constante peut spécialiser un comportement."
    ],
    "method": [
      "Repérer les arguments de construction de chaque constante.",
      "Distinguer le tableau retourné par values() des instances de constantes qu’il contient."
    ],
    "code": "enum Niveau {\n    BAS(1), HAUT(3);\n    final int poids;\n    Niveau(int poids) { this.poids = poids; }\n}\nSystem.out.print(Niveau.HAUT.poids);",
    "explanation": "Le constructeur associe le poids 3 à la constante HAUT.",
    "pitfalls": [
      "On ne crée pas une constante avec new dans le code client.",
      "== convient pour comparer deux constantes d’un même enum."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [],
    "check": {
      "output": "3"
    }
  },
  {
    "id": "classes-imbriquees",
    "group": "objects",
    "title": "Classes imbriquées et capture des variables locales",
    "rules": [
      "Une classe membre non static possède normalement une instance englobante. Une classe imbriquée static n’en exige pas. Les variables locales capturées par une classe locale doivent être final ou effectivement final."
    ],
    "method": [
      "Identifier la catégorie de classe imbriquée.",
      "Pour chaque variable capturée, vérifier qu’elle n’est pas réaffectée."
    ],
    "code": "int base = 5;\nclass Local { int valeur() { return base + 2; } }\nSystem.out.print(new Local().valeur());",
    "explanation": "base n’est jamais réaffectée : sa capture est autorisée et le résultat vaut 7.",
    "pitfalls": [
      "Modifier l’objet référencé ne signifie pas forcément réaffecter la variable capturée.",
      "Les anciennes interdictions générales de membres static dans les classes internes ne s’appliquent plus telles quelles en Java 21."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [
      "lambdas"
    ],
    "check": {
      "output": "7"
    }
  },
  {
    "id": "egalite",
    "group": "objects",
    "title": "Object : contrats equals et hashCode",
    "rules": [
      "Deux objets égaux selon equals doivent avoir le même hashCode. La réciproque est fausse : des collisions sont possibles. Object.equals utilise l’identité si la classe ne le redéfinit pas."
    ],
    "method": [
      "Vérifier si equals est redéfini ou généré.",
      "Contrôler que hashCode repose sur un état cohérent avec l’égalité."
    ],
    "code": "record Code(String valeur) {}\nvar premier = new Code(\"FR\");\nvar second = new Code(\"FR\");\nSystem.out.print(premier.equals(second) + \":\" + (premier.hashCode() == second.hashCode()));",
    "explanation": "Le record fournit une égalité de composants et un hashCode cohérent : true:true.",
    "pitfalls": [
      "Deux hashCode identiques ne prouvent pas equals.",
      "Modifier une clé après son insertion dans une collection de hachage peut perturber sa recherche."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html"
      }
    ],
    "related": [
      "records",
      "sets"
    ],
    "check": {
      "output": "true:true"
    }
  },
  {
    "id": "exceptions-hierarchie",
    "group": "exceptions",
    "title": "Hiérarchie des exceptions : classes principales et multi-catch",
    "rules": [
      "Throwable est la racine des objets pouvant être levés. Ses branches Error et Exception sont distinctes : Error n’est pas une sous-classe d’Exception. RuntimeException est en revanche une sous-classe d’Exception.",
      "Error et RuntimeException, ainsi que leurs sous-classes, sont unchecked : le compilateur n’impose pas de les intercepter ou de les déclarer. Les autres classes d’exceptions sont checked. La catégorie checked/unchecked dépend de l’héritage, pas du nom de la classe.",
      "Un catch intercepte le type déclaré et ses sous-types. Dans un multi-catch A | B, aucun des deux types ne peut être un sous-type de l’autre : un ancêtre et son descendant ne peuvent pas figurer dans la même liste. Deux branches distinctes peuvent partager un ancêtre commun.",
      "L’arborescence sélectionne les repères utiles aux questions sur les exceptions, les collections, la concurrence, les dates et les entrées-sorties. Chaque indentation représente un héritage direct. Les descendants héritent de la catégorie de leur branche."
    ],
    "hierarchy": "Throwable [racine des objets pouvant être levés]\n├── Error [unchecked]\n│   ├── AssertionError\n│   └── VirtualMachineError\n│       ├── OutOfMemoryError\n│       └── StackOverflowError\n└── Exception [checked, sauf sa branche RuntimeException]\n    ├── IOException [checked]\n    │   ├── FileNotFoundException\n    │   ├── EOFException\n    │   └── ObjectStreamException\n    │       └── NotSerializableException\n    ├── SQLException [checked]\n    ├── InterruptedException [checked]\n    ├── ExecutionException [checked]\n    └── RuntimeException [unchecked]\n        ├── NullPointerException\n        ├── ClassCastException\n        ├── ArithmeticException\n        ├── ArrayStoreException\n        ├── IllegalArgumentException\n        │   └── NumberFormatException\n        ├── IllegalStateException\n        ├── IndexOutOfBoundsException\n        │   ├── ArrayIndexOutOfBoundsException\n        │   └── StringIndexOutOfBoundsException\n        ├── UnsupportedOperationException\n        ├── NoSuchElementException\n        ├── MissingResourceException\n        └── DateTimeException\n            └── DateTimeParseException",
    "method": [
      "Repérer chaque type dans l’arborescence, puis remonter de sa classe vers Throwable.",
      "Pour un multi-catch, comparer chaque paire de types : si l’un apparaît sur le chemin des ancêtres de l’autre, la déclaration est interdite.",
      "Ne pas confondre ancêtre commun et relation ancêtre-descendant : deux classes de branches distinctes peuvent être réunies dans un multi-catch.",
      "Pour des catch séparés, placer les types spécifiques avant les types qui les englobent. Avec des exceptions checked, vérifier aussi que le corps du try peut les lever : une paire sans lien de sous-typage ne suffit pas à valider tout un bloc try/catch."
    ],
    "code": "try {\n    throw new ArithmeticException(\"calcul impossible\");\n} catch (ArithmeticException | IllegalStateException e) {\n    System.out.print(\"traitée\");\n}\n// Ces deux classes sont des branches distinctes de RuntimeException.\n// En revanche : catch (RuntimeException | ArithmeticException e)\n// est interdit, car RuntimeException englobe ArithmeticException.",
    "explanation": "Le multi-catch de l’exemple compile et affiche traitée : ArithmeticException et IllegalStateException n’héritent pas l’une de l’autre. Leur ancêtre commun RuntimeException ne les empêche pas de coexister dans le même multi-catch. Les deux dernières lignes illustrent en commentaire une combinaison interdite.",
    "pitfalls": [
      "Le suffixe Exception ne signifie pas checked : NumberFormatException et DateTimeParseException sont unchecked par leur héritage.",
      "catch (Exception e) couvre RuntimeException et ses descendants, mais ne couvre pas Error. catch (Throwable e) couvre les deux branches, sans être une recommandation de capture générale.",
      "Le caractère unchecked n’autorise pas un multi-catch ancêtre-descendant : la même interdiction s’applique à toute la hiérarchie.",
      "Le classement checked/unchecked indique une obligation du compilateur, pas une garantie de gravité ou de récupération possible."
    ],
    "sources": [
      {
        "title": "JLS 21 : catégories d’exceptions et vérifications du compilateur",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html"
      },
      {
        "title": "JLS 21 : catch et multi-catch",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20"
      },
      {
        "title": "Hiérarchie officielle java.lang — Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/package-tree.html"
      },
      {
        "title": "Hiérarchie officielle java.io — Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/package-tree.html"
      },
      {
        "title": "SQLException : héritage — Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/SQLException.html"
      }
    ],
    "related": [
      "exceptions-types",
      "exceptions-controle",
      "exceptions-redefinition",
      "ressources"
    ],
    "check": {
      "output": "traitée"
    }
  },
  {
    "id": "exceptions-types",
    "group": "exceptions",
    "title": "Exceptions checked, unchecked et exceptions personnalisées",
    "rules": [
      "Les sous-types de RuntimeException et Error sont unchecked. Les autres exceptions checked doivent être interceptées ou déclarées. Une exception personnalisée choisit son contrat en étendant la classe appropriée."
    ],
    "method": [
      "Examiner la hiérarchie du type levé.",
      "Vérifier si les appelants doivent traiter ou déclarer cette exception."
    ],
    "code": "class Invalide extends Exception {}\ntry {\n    throw new Invalide();\n} catch (Invalide e) {\n    System.out.print(\"traitée\");\n}",
    "explanation": "L’exception checked est interceptée par le catch compatible.",
    "pitfalls": [
      "throws déclare un contrat ; throw déclenche une exception.",
      "Une RuntimeException peut être interceptée même sans obligation de déclaration."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html"
      }
    ],
    "related": [
      "exceptions-controle",
      "exceptions-hierarchie"
    ],
    "check": {
      "output": "traitée"
    }
  },
  {
    "id": "exceptions-controle",
    "group": "exceptions",
    "title": "try / catch / finally, propagation et multi-catch",
    "rules": [
      "Les catch sont examinés dans l’ordre ; un type spécifique doit précéder un supertype qui le couvre. Les alternatives d’un multi-catch ne peuvent pas être en relation de sous-typage. finally intervient à la sortie du try/catch selon les règles du langage."
    ],
    "method": [
      "Trouver le premier catch compatible avec l’exception.",
      "Suivre ensuite finally : son propre return ou throw peut remplacer le transfert en cours."
    ],
    "code": "var trace = new StringBuilder();\ntry {\n    throw new IllegalStateException();\n} catch (RuntimeException e) {\n    trace.append(\"traitement\");\n} finally {\n    trace.append(\" puis nettoyage\");\n}\nSystem.out.print(trace);",
    "explanation": "Le catch s’exécute avant finally, puis l’exécution se poursuit normalement.",
    "pitfalls": [
      "Un return dans finally peut masquer un return ou une exception du try.",
      "Éviter les affirmations absolues : une interruption de la JVM n’est pas une sortie normale du try."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html"
      }
    ],
    "related": [
      "ressources",
      "exceptions-hierarchie"
    ],
    "check": {
      "output": "traitement puis nettoyage"
    }
  },
  {
    "id": "exceptions-redefinition",
    "group": "exceptions",
    "title": "Exceptions et redéfinition de méthodes",
    "rules": [
      "Une méthode redéfinie peut supprimer ou restreindre les exceptions checked du contrat initial. Elle ne peut pas ajouter une exception checked indépendante ou plus générale. Les exceptions unchecked n’ont pas cette restriction."
    ],
    "method": [
      "Comparer chaque exception checked déclarée avec celles de la méthode héritée.",
      "Vérifier qu’elle est couverte par un type déjà autorisé."
    ],
    "code": "class Parent { void lire() throws java.io.IOException {} }\nclass Enfant extends Parent {\n    @Override void lire() throws java.io.FileNotFoundException {}\n}\nnew Enfant().lire();\nSystem.out.print(\"contrat respecté\");",
    "explanation": "FileNotFoundException est un sous-type d’IOException : la restriction est légale.",
    "pitfalls": [
      "Une surcharge n’est pas une redéfinition.",
      "Le type de référence utilisé par l’appelant détermine le contrat checked à gérer à la compilation."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html"
      }
    ],
    "related": [
      "polymorphisme",
      "exceptions-types"
    ],
    "check": {
      "output": "contrat respecté"
    }
  },
  {
    "id": "ressources",
    "group": "exceptions",
    "title": "try-with-resources : fermeture et exceptions supprimées",
    "rules": [
      "Les ressources doivent être AutoCloseable. Elles sont fermées en ordre inverse d’initialisation. Si le corps lève une exception et la fermeture aussi, l’exception de fermeture est ajoutée aux exceptions supprimées de la principale."
    ],
    "method": [
      "Lister les ressources initialisées avec succès.",
      "Suivre le corps, puis fermer de droite à gauche en distinguant exception principale et exceptions supprimées."
    ],
    "code": "class Ressource implements AutoCloseable {\n    final String nom;\n    Ressource(String nom) { this.nom = nom; }\n    public void close() { System.out.print(nom); }\n}\ntry (var x = new Ressource(\"1\"); var y = new Ressource(\"2\")) {\n    System.out.print(\"corps:\");\n}",
    "explanation": "Le corps est exécuté, puis y et x sont fermées : corps:21.",
    "pitfalls": [
      "Une opération terminale sur Files.lines ne dispense pas de close.",
      "Le garbage collector ne remplace pas une fermeture déterministe."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html"
      }
    ],
    "related": [
      "fichiers-ressources"
    ],
    "check": {
      "output": "corps:21"
    }
  },
  {
    "id": "tableaux",
    "group": "collections",
    "title": "Tableaux : création, accès et covariance",
    "rules": [
      "Les tableaux ont une longueur fixe et leurs indices vont de zéro à length - 1. Les tableaux de références sont covariants, mais le type réel de leurs éléments est contrôlé lors des écritures."
    ],
    "method": [
      "Distinguer type déclaré du tableau et type réel créé par new.",
      "Contrôler les bornes et le type de chaque valeur écrite."
    ],
    "code": "Object[] valeurs = new String[2];\nvaleurs[0] = \"ok\";\ntry { valeurs[1] = 5; }\ncatch (ArrayStoreException e) { System.out.print(\"type refusé\"); }",
    "explanation": "La référence Object[] ne transforme pas le tableau réel String[] ; l’écriture d’un Integer est refusée.",
    "pitfalls": [
      "Les tableaux génériques et les collections génériques n’ont pas les mêmes règles de variance.",
      "Un tableau multidimensionnel est un tableau de tableaux et peut être irrégulier."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html"
      }
    ],
    "related": [
      "generiques",
      "boucles"
    ],
    "check": {
      "output": "type refusé"
    }
  },
  {
    "id": "listes",
    "group": "collections",
    "title": "List : indices, valeurs et opérations courantes",
    "rules": [
      "List conserve un ordre et peut contenir des doublons. get et set utilisent des indices. Pour List<Integer>, remove(int) enlève par indice et remove(Object) par valeur."
    ],
    "method": [
      "Lire le type exact de l’argument pour choisir la surcharge.",
      "Recalculer les indices après une suppression structurelle."
    ],
    "code": "var notes = new ArrayList<>(List.of(4, 6, 8));\nnotes.remove(Integer.valueOf(4)); // suppression par valeur\nnotes.set(0, 7);\nSystem.out.print(notes);",
    "explanation": "La valeur 4 est retirée, puis la valeur à l’indice zéro est remplacée : [7, 8].",
    "pitfalls": [
      "remove(4) serait une suppression par indice, pas par valeur.",
      "Toutes les implémentations de List ne permettent pas les modifications."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html"
      }
    ],
    "related": [
      "listes-vues",
      "collections-sequencees"
    ],
    "check": {
      "output": "[7, 8]"
    }
  },
  {
    "id": "listes-vues",
    "group": "collections",
    "title": "Listes modifiables, non modifiables et vues",
    "rules": [
      "List.of fournit une liste non modifiable sans éléments null. Arrays.asList fournit une vue de taille fixe adossée au tableau. Une copie dans ArrayList crée une liste structurellement modifiable."
    ],
    "method": [
      "Identifier la fabrique utilisée.",
      "Distinguer modification d’un élément, modification de taille et partage avec la source."
    ],
    "code": "String[] source = {\"rouge\", \"vert\"};\nvar vue = Arrays.asList(source);\nvue.set(1, \"bleu\");\nSystem.out.print(source[1]);",
    "explanation": "La vue et le tableau partagent leur stockage : la modification est visible dans source.",
    "pitfalls": [
      "Une vue non modifiable n’est pas forcément une copie indépendante.",
      "L’immuabilité des éléments n’est pas garantie par une liste non modifiable."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html"
      }
    ],
    "related": [
      "immuabilite",
      "listes"
    ],
    "check": {
      "output": "bleu"
    }
  },
  {
    "id": "sets",
    "group": "collections",
    "title": "Set : unicité, comparaison et ordre",
    "rules": [
      "Un Set conserve des éléments uniques. HashSet s’appuie sur equals et hashCode ; TreeSet utilise son ordre de comparaison pour déterminer les équivalences et trie ses éléments."
    ],
    "method": [
      "Identifier l’implémentation et son critère d’équivalence.",
      "Distinguer ordre naturel, ordre d’insertion et absence de garantie d’ordre."
    ],
    "code": "var mots = new TreeSet<String>(Comparator.comparingInt(String::length));\nmots.addAll(List.of(\"un\", \"deux\", \"six\"));\nmots.add(\"oui\"); // même longueur que six\nSystem.out.print(mots.size());",
    "explanation": "La comparaison par longueur considère six et oui comme équivalents : trois éléments restent.",
    "pitfalls": [
      "Un comparateur incohérent avec equals peut produire des surprises dans un ensemble trié.",
      "HashSet ne garantit pas l’ordre d’insertion."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeSet.html"
      }
    ],
    "related": [
      "tri-recherche",
      "egalite"
    ],
    "check": {
      "output": "3"
    }
  },
  {
    "id": "maps",
    "group": "collections",
    "title": "Map : clés, valeurs et opérations de mise à jour",
    "rules": [
      "Une Map associe au plus une valeur à chaque clé. put remplace la valeur associée. merge combine une valeur présente non null avec la valeur fournie ; compute calcule une association à partir de la clé et de sa valeur actuelle."
    ],
    "method": [
      "Suivre l’état de chaque clé après chaque opération.",
      "Lire le contrat de la fonction, notamment si son résultat est null."
    ],
    "code": "var stock = new HashMap<String, Integer>();\nstock.merge(\"livre\", 3, Integer::sum);\nstock.merge(\"livre\", 4, Integer::sum);\nSystem.out.print(stock.get(\"livre\"));",
    "explanation": "La première fusion crée l’entrée ; la seconde additionne les quantités : 7.",
    "pitfalls": [
      "Les règles d’acceptation de null dépendent de l’implémentation.",
      "Deux appels indépendants sur une Map ne deviennent pas automatiquement atomiques."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html"
      }
    ],
    "related": [
      "maps-concurrentes"
    ],
    "check": {
      "output": "7"
    }
  },
  {
    "id": "deque",
    "group": "collections",
    "title": "Deque : pile, file et comportement à vide",
    "rules": [
      "Deque permet l’accès aux deux extrémités. push/pop travaillent en tête selon une pile LIFO. Les variantes poll et peek renvoient null à vide, alors que remove et get lèvent une exception."
    ],
    "method": [
      "Dessiner la tête et la queue après chaque ajout.",
      "Distinguer consultation et retrait, puis vérifier le comportement à vide."
    ],
    "code": "Deque<String> file = new ArrayDeque<>();\nfile.addLast(\"A\");\nfile.addLast(\"B\");\nSystem.out.print(file.pollFirst() + \":\" + file.peekLast());",
    "explanation": "Le premier élément est retiré en tête et le dernier est seulement consulté : A:B.",
    "pitfalls": [
      "ArrayDeque n’accepte pas null comme élément.",
      "push/addFirst ne correspondent pas à un ajout en queue."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Deque.html"
      }
    ],
    "related": [],
    "check": {
      "output": "A:B"
    }
  },
  {
    "id": "tri-recherche",
    "group": "collections",
    "title": "Trier et rechercher : Comparable, Comparator et binarySearch",
    "rules": [
      "Comparable définit un ordre naturel ; Comparator fournit un ordre externe. Une recherche binaire exige que les données soient déjà triées selon le même ordre. Un résultat négatif encode le point d’insertion."
    ],
    "method": [
      "Identifier le comparateur effectif.",
      "Pour binarySearch, vérifier le tri puis interpréter -(pointInsertion)-1 si le résultat est négatif."
    ],
    "code": "var nombres = new ArrayList<>(List.of(9, 3, 7));\nCollections.sort(nombres);\nSystem.out.print(Collections.binarySearch(nombres, 5));",
    "explanation": "La liste triée vaut [3, 7, 9]. Le point d’insertion de 5 est 1 : la recherche renvoie -2.",
    "pitfalls": [
      "La recherche sur une liste non triée n’offre pas le résultat attendu.",
      "En présence de doublons, un indice particulier comme le premier n’est pas garanti."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html"
      }
    ],
    "related": [
      "sets"
    ],
    "check": {
      "output": "-2"
    }
  },
  {
    "id": "collections-sequencees",
    "group": "collections",
    "title": "Collections séquencées et vues inversées",
    "rules": [
      "Java 21 fournit les interfaces de collections séquencées pour les collections à ordre de rencontre défini. reversed produit une vue dans l’ordre inverse, et non une copie indépendante."
    ],
    "method": [
      "Repérer le premier et le dernier élément dans les deux vues.",
      "Vérifier que l’opération de mutation est autorisée par l’implémentation."
    ],
    "code": "var lettres = new ArrayList<>(List.of(\"p\", \"q\", \"r\"));\nlettres.reversed().set(1, \"X\");\nSystem.out.print(lettres);",
    "explanation": "La position centrale est partagée entre les deux vues : [p, X, r].",
    "pitfalls": [
      "Inverser la vue n’inverse pas physiquement la liste d’origine.",
      "Une vue inversée d’une collection non modifiable reste non modifiable."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/SequencedCollection.html"
      }
    ],
    "related": [
      "listes-vues"
    ],
    "check": {
      "output": "[p, X, r]"
    }
  },
  {
    "id": "lambdas",
    "group": "streams",
    "title": "Lambdas, références de méthodes et interfaces fonctionnelles",
    "rules": [
      "Une lambda ou une référence de méthode est typée par une interface fonctionnelle cible. Predicate teste, Function transforme, Consumer consomme et Supplier fournit sans argument."
    ],
    "method": [
      "Écrire la signature attendue : paramètres et type de retour.",
      "Vérifier le retour de chaque branche d’un bloc de lambda et les variables capturées."
    ],
    "code": "java.util.function.Predicate<String> longMot = s -> s.length() >= 4;\njava.util.function.Supplier<String> fournir = () -> \"Java\";\nSystem.out.print(longMot.test(fournir.get()));",
    "explanation": "Le Supplier fournit une chaîne de quatre caractères, acceptée par le Predicate.",
    "pitfalls": [
      "Un bloc retournant une valeur nécessite un return sur ses chemins normaux.",
      "Une variable locale capturée doit être final ou effectivement final."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Predicate.html"
      }
    ],
    "related": [
      "interfaces-fonctionnelles",
      "classes-imbriquees"
    ],
    "check": {
      "output": "true"
    }
  },
  {
    "id": "pipeline",
    "group": "streams",
    "title": "Pipeline de stream : paresse et consommation unique",
    "rules": [
      "Un pipeline contient une source, des opérations intermédiaires et une opération terminale. Les intermédiaires sont paresseux ; certaines optimisations peuvent éviter leur exécution. Un stream consommé ne se réutilise pas."
    ],
    "method": [
      "Repérer l’opération terminale et ce qu’elle exige réellement.",
      "Créer un nouveau stream pour chaque nouveau parcours."
    ],
    "code": "var flux = Stream.of(\"soleil\", \"pluie\").filter(s -> s.startsWith(\"s\"));\nSystem.out.print(flux.toList()); // déclenche le traitement",
    "explanation": "Le filtre n’a besoin d’être appliqué que lorsque la liste est demandée.",
    "pitfalls": [
      "Ne pas dépendre des effets de bord d’un map ou d’un peek.",
      "close n’est pas une opération terminale qui déclenche un parcours."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      }
    ],
    "related": [
      "stream-operations"
    ],
    "check": {
      "output": "[soleil]"
    }
  },
  {
    "id": "stream-sources",
    "group": "streams",
    "title": "Créer des streams objets et primitifs",
    "rules": [
      "Stream<T> manipule des références. IntStream, LongStream et DoubleStream fournissent des opérations spécialisées ; range exclut sa borne finale et rangeClosed l’inclut."
    ],
    "method": [
      "Déterminer le type de stream créé par la source.",
      "Vérifier les bornes et les conversions boxed, mapToInt ou mapToObj."
    ],
    "code": "System.out.print(IntStream.rangeClosed(2, 5).sum());",
    "explanation": "Les valeurs 2, 3, 4 et 5 sont additionnées : 14.",
    "pitfalls": [
      "Stream<int> n’est pas un type légal.",
      "Stream.of(unTableauPrimitif) ne produit pas automatiquement un stream de ses valeurs primitives."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/IntStream.html"
      }
    ],
    "related": [
      "stream-limites"
    ],
    "check": {
      "output": "14"
    }
  },
  {
    "id": "stream-operations",
    "group": "streams",
    "title": "Filtrer, transformer, aplatir, trier et dédupliquer",
    "rules": [
      "filter garde les éléments acceptés par un Predicate ; map transforme un élément ; flatMap transforme puis aplatit des streams. distinct supprime les doublons et sorted applique un ordre."
    ],
    "method": [
      "Noter le type des éléments après chaque étape.",
      "Suivre un petit jeu d’entrée dans l’ordre du pipeline."
    ],
    "code": "var resultat = Stream.of(List.of(\"b\", \"a\"), List.of(\"b\", \"c\"))\n    .flatMap(List::stream).distinct().sorted().toList();\nSystem.out.print(resultat);",
    "explanation": "Les listes sont aplaties, le doublon b retiré, puis les lettres triées.",
    "pitfalls": [
      "map(List::stream) créerait un stream de streams sans les aplatir.",
      "L’ordre des opérations peut changer le résultat et le travail effectué."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      }
    ],
    "related": [
      "tri-recherche"
    ],
    "check": {
      "output": "[a, b, c]"
    }
  },
  {
    "id": "stream-limites",
    "group": "streams",
    "title": "Streams infinis, limit, takeWhile et dropWhile",
    "rules": [
      "iterate et generate peuvent produire des streams infinis. limit borne le nombre d’éléments. Sur un stream ordonné, takeWhile garde le préfixe accepté et dropWhile retire ce préfixe."
    ],
    "method": [
      "Identifier si la source est finie.",
      "Simuler les premières valeurs et l’arrêt du préfixe avant d’évaluer la terminale."
    ],
    "code": "System.out.print(Stream.iterate(2, n -> n + 2)\n    .limit(5).takeWhile(n -> n < 7).toList());",
    "explanation": "La source limitée vaut 2, 4, 6, 8, 10 ; takeWhile s’arrête avant 8.",
    "pitfalls": [
      "filter et takeWhile ont des contrats différents.",
      "Une terminale qui exige toutes les valeurs peut ne jamais finir sur une source infinie."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      }
    ],
    "related": [
      "pipeline"
    ],
    "check": {
      "output": "[2, 4, 6]"
    }
  },
  {
    "id": "optional",
    "group": "streams",
    "title": "Recherche, tests et résultats Optional",
    "rules": [
      "findFirst et les réductions sans identité peuvent ne pas produire de valeur et utilisent Optional. orElse évalue son argument avant l’appel ; orElseGet appelle son Supplier seulement si nécessaire. Sur un stream vide, allMatch et noneMatch sont vrais, anyMatch est faux."
    ],
    "method": [
      "Déterminer si le stream peut être vide.",
      "Distinguer valeur présente, valeur de remplacement et moment d’évaluation du remplacement."
    ],
    "code": "var trouve = Stream.of(\"chat\", \"chien\").filter(s -> s.startsWith(\"z\")).findFirst();\nSystem.out.print(trouve.orElseGet(() -> \"absent\"));",
    "explanation": "Le filtre ne garde rien ; le Supplier fournit la valeur de remplacement.",
    "pitfalls": [
      "get sur un Optional vide lève NoSuchElementException.",
      "Optional ne représente pas une valeur présente null."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html"
      }
    ],
    "related": [
      "lambdas",
      "pipeline"
    ],
    "check": {
      "output": "absent"
    }
  },
  {
    "id": "reduction",
    "group": "streams",
    "title": "Réduction : identité, accumulateur et combinateur",
    "rules": [
      "reduce combine les éléments. Sans identité, un stream vide produit un Optional vide. Une identité doit être neutre pour une réduction parallèle correcte, avec une opération associative et un combinateur compatible."
    ],
    "method": [
      "Évaluer le cas vide et un petit cas séquentiel.",
      "Pour le parallèle, vérifier que découper puis combiner ne change pas le résultat."
    ],
    "code": "int produit = Stream.of(2, 3, 4).reduce(1, (a, b) -> a * b);\nSystem.out.print(produit);",
    "explanation": "1 est neutre pour la multiplication ; le résultat vaut 24.",
    "pitfalls": [
      "Une identité non neutre peut être comptée plusieurs fois en parallèle.",
      "La soustraction n’est pas associative."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      }
    ],
    "related": [
      "streams-paralleles"
    ],
    "check": {
      "output": "24"
    }
  },
  {
    "id": "collecte",
    "group": "streams",
    "title": "Collecter : listes, maps et chaînes",
    "rules": [
      "collect utilise un collecteur pour accumuler des résultats. toMap sans fusion rejette les clés en doublon. joining combine des chaînes. Stream.toList fournit une liste non modifiable sans garantir une classe concrète."
    ],
    "method": [
      "Identifier le type du résultat et les fonctions de clé et de valeur.",
      "Vérifier doublons et garanties de modification du résultat."
    ],
    "code": "String resultat = Stream.of(\"J\", \"D\", \"K\")\n    .collect(Collectors.joining(\"-\", \"(\", \")\"));\nSystem.out.print(resultat);",
    "explanation": "Le séparateur est placé entre les valeurs, à l’intérieur du préfixe et du suffixe.",
    "pitfalls": [
      "Collectors.toList ne garantit pas le type concret de la liste.",
      "Pour toMap, fournir une fusion si plusieurs éléments partagent une clé."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html"
      }
    ],
    "related": [
      "groupement",
      "listes-vues"
    ],
    "check": {
      "output": "(J-D-K)"
    }
  },
  {
    "id": "groupement",
    "group": "streams",
    "title": "Regrouper et partitionner",
    "rules": [
      "groupingBy classe les éléments selon une clé. partitioningBy sépare selon un Predicate et fournit les clés true et false, même si une partition est vide. Un collecteur aval transforme chaque groupe."
    ],
    "method": [
      "Distinguer classification à plusieurs clés et partition booléenne.",
      "Déterminer le type produit par le collecteur aval."
    ],
    "code": "var groupes = Stream.of(\"a\", \"bb\", \"cc\")\n    .collect(Collectors.groupingBy(String::length, Collectors.counting()));\nSystem.out.print(groupes.get(2));",
    "explanation": "Le groupe de longueur 2 contient deux mots ; counting donne 2.",
    "pitfalls": [
      "partitioningBy attend un boolean, pas une longueur numérique.",
      "L’ordre de parcours d’une Map produite n’est pas garanti sans fabrique adaptée."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html"
      }
    ],
    "related": [
      "collecte"
    ],
    "check": {
      "output": "2"
    }
  },
  {
    "id": "concatenation",
    "group": "streams",
    "title": "Concaténer des streams",
    "rules": [
      "Stream.concat combine deux streams, en conservant l’ordre du premier puis du second si les deux sont ordonnés. Le résultat est paresseux ; ses sources ne doivent pas être réutilisées."
    ],
    "method": [
      "Identifier l’ordre de rencontre des sources.",
      "Distinguer concaténation de streams et concaténation des valeurs textuelles."
    ],
    "code": "var gauche = Stream.of(\"nord\", \"sud\");\nvar droite = Stream.of(\"est\");\nSystem.out.print(Stream.concat(gauche, droite).toList());",
    "explanation": "Les valeurs de la première source précèdent celles de la seconde.",
    "pitfalls": [
      "Concat ne retire pas les doublons.",
      "La concaténation ne copie pas les éléments dans une collection immédiatement."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      }
    ],
    "related": [
      "pipeline"
    ],
    "check": {
      "output": "[nord, sud, est]"
    }
  },
  {
    "id": "modules-descripteur",
    "group": "modules",
    "title": "Descripteur de module et dépendances requires",
    "rules": [
      "module-info.java définit un module nommé. requires déclare une dépendance, requires transitive la rend lisible aux consommateurs, requires static la requiert à la compilation mais pas nécessairement à l’exécution. java.base est implicitement requis."
    ],
    "method": [
      "Dessiner le graphe de lisibilité entre modules.",
      "Distinguer une dépendance directe, transitive et optionnelle à l’exécution."
    ],
    "code": "module revision.core {\n    requires transitive java.logging;\n    requires static java.sql;\n}",
    "explanation": "Un module lisant revision.core lit aussi java.logging. java.sql reste nécessaire pour compiler ce descripteur. Exemple de fichier module-info.java.",
    "pitfalls": [
      "La lisibilité ne donne pas accès aux packages non exportés.",
      "requires static ne signifie pas que les membres du module deviennent static."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html"
      }
    ],
    "related": [
      "modules-acces"
    ],
    "check": {
      "kind": "module",
      "files": {
        "module-info.java": "module revision.core {\n    requires transitive java.logging;\n    requires static java.sql;\n}"
      }
    }
  },
  {
    "id": "modules-acces",
    "group": "modules",
    "title": "exports, opens et accès par réflexion",
    "rules": [
      "exports expose les types publics d’un package aux modules lecteurs. opens autorise l’accès réflexif profond au package, sans remplacer l’export nécessaire aux accès ordinaires dans le code source. Les deux peuvent être qualifiés avec to."
    ],
    "method": [
      "Vérifier d’abord la lisibilité, puis l’export pour un accès source.",
      "Pour un accès réflexif profond, examiner les ouvertures."
    ],
    "code": "module revision.acces {\n    exports revision.api;\n    opens revision.internal;\n}",
    "explanation": "Le package api est utilisable par les modules lecteurs ; internal est ouvert à la réflexion. Les fichiers des packages sont nécessaires pour compiler cet exemple de descripteur.",
    "pitfalls": [
      "Exporter un package n’exporte pas ses sous-packages.",
      "opens ne rend pas les membres private publics dans le langage."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html"
      }
    ],
    "related": [
      "modules-descripteur"
    ],
    "check": {
      "kind": "module",
      "files": {
        "module-info.java": "module revision.acces {\n    exports revision.api;\n    opens revision.internal;\n}",
        "revision/api/Service.java": "package revision.api; public interface Service {}",
        "revision/internal/Interne.java": "package revision.internal; public class Interne {}"
      }
    }
  },
  {
    "id": "modules-services",
    "group": "modules",
    "title": "Services : uses, provides et ServiceLoader",
    "rules": [
      "Le consommateur déclare uses avec le type du service. Le fournisseur déclare provides … with … avec son implémentation. ServiceLoader découvre les fournisseurs selon les règles des modules et du chargement."
    ],
    "method": [
      "Séparer contrat, consommateur et fournisseur.",
      "Vérifier que les directives utilisent des types et non simplement des noms de packages."
    ],
    "code": "module revision.services {\n    uses revision.api.Service;\n    provides revision.api.Service with revision.impl.Fournisseur;\n}",
    "explanation": "Ce module est à la fois consommateur et fournisseur. Le service et sa classe d’implémentation sont définis dans les packages indiqués ; le fournisseur possède ici un constructeur public sans argument.",
    "pitfalls": [
      "exports ne déclare pas un fournisseur.",
      "ServiceLoader ne compile pas une implémentation manquante."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ServiceLoader.html"
      }
    ],
    "related": [
      "modules-acces"
    ],
    "check": {
      "kind": "module",
      "files": {
        "module-info.java": "module revision.services {\n    uses revision.api.Service;\n    provides revision.api.Service with revision.impl.Fournisseur;\n}",
        "revision/api/Service.java": "package revision.api; public interface Service {}",
        "revision/impl/Fournisseur.java": "package revision.impl; public class Fournisseur implements revision.api.Service { public Fournisseur() {} }"
      }
    }
  },
  {
    "id": "modules-compilation",
    "group": "modules",
    "title": "Compiler et créer des JAR modulaires ou non modulaires",
    "rules": [
      "javac compile les sources en fichiers class. jar assemble une archive. Un JAR modulaire explicite standard porte un module-info.class à sa racine ; un JAR ordinaire n’en porte pas."
    ],
    "method": [
      "Distinguer compilation, archivage et exécution.",
      "Vérifier où sont placés les classes compilées et le descripteur dans l’archive."
    ],
    "code": "javac -d out src/Bonjour.java\njar --create --file bonjour.jar -C out .\njava -cp bonjour.jar Bonjour",
    "explanation": "Ces commandes compilent une classe Bonjour sans package, l’archivent puis l’exécutent. Elles sont à lancer depuis un dossier contenant src/Bonjour.java.",
    "pitfalls": [
      "Créer un JAR ne recompile pas les sources.",
      "Une archive avec un simple dossier modules ne devient pas modulaire."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jar.html"
      }
    ],
    "related": [
      "modules-migration"
    ],
    "language": "sh"
  },
  {
    "id": "modules-migration",
    "group": "modules",
    "title": "Classpath, module path et migration vers les modules",
    "rules": [
      "Sur le classpath, un JAR ordinaire appartient au module non nommé de son chargeur. Sur le module path, un JAR sans descripteur peut devenir automatique, avec un nom dérivé ou fourni par Automatic-Module-Name."
    ],
    "method": [
      "Repérer le chemin de chargement de chaque archive.",
      "Distinguer module explicite, automatique et non nommé avant de raisonner sur ses accès."
    ],
    "code": "System.out.print(String.class.getModule().getName() + \":\" + String.class.getModule().isNamed());",
    "explanation": "String appartient au module explicite nommé java.base. Les classes d’application lancées sur le classpath appartiennent normalement à un module non nommé.",
    "pitfalls": [
      "Un module automatique exporte ses packages et facilite la migration.",
      "Placer un JAR sur le classpath ne lui donne pas automatiquement un nom de module."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/module/ModuleFinder.html"
      }
    ],
    "related": [
      "modules-descripteur"
    ],
    "check": {
      "output": "java.base:true"
    }
  },
  {
    "id": "modules-outils",
    "group": "modules",
    "title": "jdeps et jlink : dépendances et images d’exécution",
    "rules": [
      "jdeps analyse les dépendances du bytecode. jlink assemble des modules et leurs dépendances dans une image d’exécution personnalisée. Ce sont des outils distincts de javac et jar."
    ],
    "method": [
      "Identifier si l’objectif est analyser, compiler, archiver ou assembler un runtime.",
      "Vérifier les modules racines et leurs dépendances."
    ],
    "code": "jdeps --print-module-deps bonjour.jar\njlink --add-modules java.base --output runtime-minimal",
    "explanation": "La première commande analyse une archive existante ; la seconde crée, dans un nouveau dossier, une image contenant java.base et ses dépendances requises.",
    "pitfalls": [
      "jlink ne remplace pas la compilation des sources.",
      "Un module automatique ne peut pas être lié comme un module explicite dans une image jlink."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jlink.html"
      },
      {
        "title": "Manuel officiel jdeps, Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jdeps.html"
      }
    ],
    "related": [
      "modules-compilation",
      "modules-migration"
    ],
    "language": "sh"
  },
  {
    "id": "threads",
    "group": "concurrency",
    "title": "Threads de plateforme : démarrage et cycle de vie",
    "rules": [
      "start programme une nouvelle exécution concurrente ; un appel direct à run reste dans le thread appelant. Un thread ne peut être démarré qu’une fois. join attend la terminaison de la cible et établit les garanties de visibilité associées."
    ],
    "method": [
      "Identifier quel thread exécute chaque instruction.",
      "Repérer les attentes explicites plutôt que supposer un ordre d’ordonnancement."
    ],
    "code": "var resultat = new StringBuilder();\nThread t = new Thread(() -> resultat.append(\"fini\"));\nt.start();\nt.join();\nSystem.out.print(resultat);",
    "explanation": "join termine avant la lecture du résultat ; la modification du thread est alors visible.",
    "pitfalls": [
      "sleep ne libère pas les moniteurs détenus et ne garantit pas une durée exacte.",
      "La terminaison d’un thread ne prouve pas que sa tâche a réussi sans exception."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html"
      }
    ],
    "related": [
      "threads-virtuels",
      "visibilite"
    ],
    "check": {
      "output": "fini"
    }
  },
  {
    "id": "threads-virtuels",
    "group": "concurrency",
    "title": "Threads virtuels : création et usages",
    "rules": [
      "Les threads virtuels sont standard en Java 21. Ils permettent une forte concurrence de tâches passant du temps à attendre ; ils n’augmentent pas automatiquement la capacité de calcul CPU."
    ],
    "method": [
      "Déterminer si la charge attend des entrées-sorties ou effectue du calcul.",
      "Distinguer type du thread, démarrage et attente de sa terminaison."
    ],
    "code": "Thread t = Thread.ofVirtual().start(() -> {});\nt.join();\nSystem.out.print(t.isVirtual());",
    "explanation": "Le thread lancé est virtuel ; join attend sa fin avant la vérification.",
    "pitfalls": [
      "On crée généralement un thread virtuel par tâche plutôt qu’un pool fixe de threads virtuels.",
      "Les contraintes de partage d’état existent aussi pour les threads virtuels."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html"
      }
    ],
    "related": [
      "threads",
      "executeurs"
    ],
    "check": {
      "output": "true"
    }
  },
  {
    "id": "executeurs",
    "group": "concurrency",
    "title": "Runnable, Callable, Future et ExecutorService",
    "rules": [
      "Runnable.run ne retourne pas de valeur et ne déclare pas d’exception checked. Callable.call peut faire les deux. submit produit un Future ; get attend un résultat et encapsule l’échec de la tâche dans ExecutionException."
    ],
    "method": [
      "Identifier le contrat de la tâche et la manière de récupérer son résultat.",
      "Séparer arrêt des nouvelles soumissions et attente des tâches déjà soumises."
    ],
    "code": "try (var service = Executors.newSingleThreadExecutor()) {\n    Future<Integer> resultat = service.submit(() -> 7 * 3);\n    System.out.print(resultat.get());\n}",
    "explanation": "La tâche renvoie 21. Le try-with-resources ferme l’exécuteur et attend sa terminaison.",
    "pitfalls": [
      "shutdown refuse de nouvelles tâches mais n’attend pas, à lui seul, la terminaison.",
      "Un get qui échoue ne relance pas directement l’exception checked initiale."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorService.html"
      }
    ],
    "related": [
      "ressources",
      "threads-virtuels"
    ],
    "check": {
      "output": "21"
    }
  },
  {
    "id": "verrous",
    "group": "concurrency",
    "title": "synchronized et verrous explicites",
    "rules": [
      "Une méthode synchronized d’instance utilise le moniteur de l’instance ; static synchronized utilise l’objet Class déclarant la méthode. Un ReentrantLock nécessite une libération explicite assurée par finally. Il est réentrant : le même thread peut l’acquérir plusieurs fois ; getHoldCount() indique le nombre d’acquisitions encore détenues par le thread courant et chaque acquisition exige un unlock().",
      "Quand plusieurs threads partagent une donnée modifiable, un verrou permet de protéger les opérations qui doivent rester indivisibles : c’est la section critique. Exemple : vérifier qu’une place est disponible puis la réserver. Tous les accès concurrents concernés doivent respecter le même verrou.",
      "Sans verrou, deux threads peuvent chacun lire « 1 place disponible », puis chacun confirmer sa réservation : deux réservations pour une seule place. Ce déroulement est possible, mais ne se produit pas forcément à chaque exécution.",
      "Les threads d’un même processus Java partagent des objets. Un ReentrantLock coordonne les threads qui utilisent cette même instance de verrou ; il ne coordonne pas deux programmes Java lancés dans des processus distincts.",
      "Pour une section critique simple, synchronized suffit et libère automatiquement le moniteur en sortie de bloc. Un verrou explicite permet notamment tryLock() pour essayer sans attendre, ou une acquisition avec délai maximal. Il n’est pas nécessaire de créer un ReentrantLock pour chaque accès à une variable."
    ],
    "method": [
      "Identifier le verrou exact partagé par les tâches.",
      "Vérifier que toutes les opérations sur l’invariant utilisent le même verrou.",
      "Repérer la donnée partagée et la règle à préserver : ici, une seule réservation peut réussir pour la dernière place.",
      "Placer la vérification ET la modification dans la même section critique. Protéger uniquement la lecture ou uniquement l’écriture laisserait une course entre les deux.",
      "Faire utiliser la même billetterie et son même verrou aux deux threads ; attendre leur terminaison avec join() avant de lire le bilan."
    ],
    "code": "var verrou = new java.util.concurrent.locks.ReentrantLock();\nverrou.lock();\ntry {\n    System.out.print(\"protégé\");\n} finally {\n    verrou.unlock();\n}",
    "explanation": "Le verrou est libéré même si le corps du try se termine exceptionnellement. Sortie : « protégé ».",
    "pitfalls": [
      "Deux instances différentes n’ont pas le même moniteur d’instance.",
      "Un ReentrantLock n’est pas libéré automatiquement en quittant une méthode.",
      "Créer un verrou distinct pour chaque client ne protège pas la billetterie commune : les deux threads pourraient entrer dans leur section critique en même temps.",
      "Tester une seule fois le code sans verrou et obtenir une seule réservation ne prouve pas son absence de course.",
      "Dormir avec Thread.sleep() ne remplace pas une synchronisation ; l’ordre d’exécution des clients n’est pas garanti."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html"
      },
      {
        "title": "Lock : ressource partagée, try/finally et acquisitions avec ou sans attente",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/Lock.html"
      },
      {
        "title": "JLS 21 — Instructions synchronized",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.19"
      }
    ],
    "related": [
      "visibilite"
    ],
    "check": {
      "output": "protégé"
    },
    "exampleTitle": "Acquérir et libérer un verrou",
    "additionalExamples": [
      {
        "title": "Protéger la dernière place avec deux threads",
        "code": "// Situation concrète : deux clients, une seule place.\nclass Billetterie {\n    private int places = 1;\n    private final java.util.concurrent.locks.ReentrantLock verrou\n        = new java.util.concurrent.locks.ReentrantLock();\n\n    boolean reserver() {\n        verrou.lock();\n        try {\n            // Vérifier puis modifier : une seule section critique.\n            if (places == 0) return false;\n            places--;\n            return true;\n        } finally {\n            verrou.unlock();\n        }\n    }\n}\n\nvar billetterie = new Billetterie(); // Le même objet pour les deux clients.\nboolean[] reservations = new boolean[2];\nThread clientA = new Thread(() -> reservations[0] = billetterie.reserver());\nThread clientB = new Thread(() -> reservations[1] = billetterie.reserver());\nclientA.start();\nclientB.start();\nclientA.join();\nclientB.join();\n\nint succes = (reservations[0] ? 1 : 0) + (reservations[1] ? 1 : 0);\nSystem.out.print(\"Réservations confirmées : \" + succes); // Toujours 1.\n// Variante simple : une méthode synchronized boolean reserver()\n// avec le même corps de vérification/modification, sans lock()/unlock().",
        "explanation": "Cet exemple utilise deux threads clients sur la même billetterie. Celui qui acquiert le verrou en premier réserve la place ; l’autre doit acquérir ce même verrou avant de vérifier la disponibilité et constate alors qu’il ne reste aucune place. L’identité du gagnant dépend de l’ordonnancement, mais le total est toujours une réservation. Les deux start() rendent les threads susceptibles de progresser concurremment ; ils ne garantissent pas une exécution simultanée. join() attend leur fin avant le bilan. synchronized sur la méthode d’instance protégerait ici la même opération via le moniteur de la billetterie. Sortie : « Réservations confirmées : 1 ».",
        "check": {
          "output": "Réservations confirmées : 1"
        }
      }
    ]
  },
  {
    "id": "visibilite",
    "group": "concurrency",
    "title": "Visibilité, volatile et opérations atomiques",
    "rules": [
      "volatile fournit des garanties de visibilité et d’ordre pour un champ, mais ne rend pas une opération composée telle que i++ atomique. Les classes atomiques fournissent des opérations indivisibles dédiées."
    ],
    "method": [
      "Décomposer l’opération en lectures, calculs et écritures.",
      "Choisir une opération atomique ou un verrou lorsque plusieurs étapes doivent rester inséparables."
    ],
    "code": "var nombre = new AtomicInteger(10);\nint nouveau = nombre.incrementAndGet();\nSystem.out.print(nouveau + \":\" + nombre.get());",
    "explanation": "incrementAndGet modifie atomiquement la valeur et renvoie la nouvelle : 11:11.",
    "pitfalls": [
      "getAndIncrement retourne l’ancienne valeur.",
      "Une collection de champs atomiques ne rend pas automatiquement atomique un invariant qui les relie."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html"
      },
      {
        "title": "Modèle mémoire Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html"
      }
    ],
    "related": [
      "verrous",
      "threads"
    ],
    "check": {
      "output": "11:11"
    }
  },
  {
    "id": "maps-concurrentes",
    "group": "concurrency",
    "title": "Collections concurrentes et opérations composées",
    "rules": [
      "Une collection concurrente fournit des garanties définies par son contrat. ConcurrentHashMap propose des mises à jour atomiques par clé comme compute ; enchaîner get puis put ne forme pas une opération atomique."
    ],
    "method": [
      "Identifier l’opération logique qui doit être indivisible.",
      "Chercher l’opération composée fournie par la collection."
    ],
    "code": "var frequences = new ConcurrentHashMap<String, Integer>();\nfrequences.put(\"java\", 2);\nfrequences.compute(\"java\", (cle, valeur) -> valeur + 5);\nSystem.out.print(frequences.get(\"java\"));",
    "explanation": "La nouvelle valeur de l’entrée est calculée atomiquement pour cette clé : 7.",
    "pitfalls": [
      "ConcurrentHashMap n’accepte pas les clés ou valeurs null.",
      "Le caractère thread-safe d’une méthode ne rend pas toute une séquence de méthodes atomique."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html"
      }
    ],
    "related": [
      "maps",
      "streams-paralleles"
    ],
    "check": {
      "output": "7"
    }
  },
  {
    "id": "streams-paralleles",
    "group": "concurrency",
    "title": "Streams parallèles : ordre, réduction et état partagé",
    "rules": [
      "Un stream parallèle peut répartir le traitement. Les fonctions doivent être non interférentes et généralement sans état. forEach ne garantit pas l’ordre de rencontre ; forEachOrdered le respecte pour un stream ordonné."
    ],
    "method": [
      "Repérer les mutations d’un état partagé par plusieurs tâches.",
      "Privilégier une réduction ou une collecte adaptée et contrôler l’associativité."
    ],
    "code": "int total = IntStream.rangeClosed(1, 6).parallel().sum();\nSystem.out.print(total);",
    "explanation": "La somme est une réduction associative, produisant 21 sans liste partagée.",
    "pitfalls": [
      "Remplir une ArrayList partagée depuis forEach peut provoquer des courses.",
      "Le parallélisme n’implique pas une accélération garantie."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      }
    ],
    "related": [
      "reduction",
      "maps-concurrentes",
      "verrous"
    ],
    "check": {
      "output": "21"
    }
  },
  {
    "id": "flux",
    "group": "io",
    "title": "Flux d’octets, flux de caractères et console",
    "rules": [
      "InputStream et OutputStream transportent des octets ; Reader et Writer transportent des unités de caractères. Les ponts InputStreamReader et OutputStreamWriter utilisent un charset. read renvoie -1 pour la fin normale d’un flux simple."
    ],
    "method": [
      "Identifier si les données sont binaires ou textuelles.",
      "Choisir un charset explicite lors du décodage ou de l’encodage."
    ],
    "code": "var octets = \"é\".getBytes(java.nio.charset.StandardCharsets.UTF_8);\ntry (var lecteur = new java.io.InputStreamReader(\n        new java.io.ByteArrayInputStream(octets), java.nio.charset.StandardCharsets.UTF_8)) {\n    System.out.print((char) lecteur.read());\n}",
    "explanation": "Les octets UTF-8 sont décodés vers le caractère é.",
    "pitfalls": [
      "Un octet nul n’est pas une fin de flux.",
      "System.console() peut être null, notamment dans un IDE ou avec une redirection."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Reader.html"
      }
    ],
    "related": [
      "fichiers-ressources"
    ],
    "check": {
      "output": "é"
    }
  },
  {
    "id": "fichiers-ressources",
    "group": "io",
    "title": "Lire, écrire et fermer les ressources",
    "rules": [
      "Une ressource de fichier doit être fermée selon son contrat. Files.lines retourne un Stream qui garde le fichier ouvert ; une opération terminale ne le ferme pas automatiquement."
    ],
    "method": [
      "Identifier le propriétaire de la ressource ouverte.",
      "Utiliser try-with-resources pour que tous les chemins de sortie ferment la ressource."
    ],
    "code": "Path fichier = Files.createTempFile(\"memo-\", \".txt\");\ntry {\n    Files.writeString(fichier, \"un\\ndeux\\n\");\n    try (var lignes = Files.lines(fichier)) {\n        System.out.print(lignes.count());\n    }\n} finally { Files.deleteIfExists(fichier); }",
    "explanation": "Deux lignes sont lues. Le stream est fermé avant la suppression du fichier temporaire.",
    "pitfalls": [
      "Un Stream créé depuis une collection ne retient pas nécessairement une ressource externe.",
      "Les méthodes de commodité et les méthodes ouvrant une ressource n’ont pas le même contrat de fermeture."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html"
      }
    ],
    "related": [
      "ressources",
      "flux"
    ],
    "check": {
      "output": "2"
    }
  },
  {
    "id": "serialisation",
    "group": "io",
    "title": "Sérialisation et désérialisation",
    "rules": [
      "La sérialisation par défaut d’une classe ordinaire Serializable inclut son état d’instance non transient. Les champs static n’en font pas partie. Les objets référencés dans le graphe doivent être sérialisables, sauf exclusion ou personnalisation appropriée."
    ],
    "method": [
      "Parcourir le graphe des champs d’instance concernés.",
      "Distinguer champs sauvegardés, champs ignorés et initialisation de la partie non sérialisable."
    ],
    "code": "class Etat implements java.io.Serializable {\n    int valeur = 9;\n    transient int cache = 7;\n}\nvar buffer = new java.io.ByteArrayOutputStream();\ntry (var sortie = new java.io.ObjectOutputStream(buffer)) { sortie.writeObject(new Etat()); }\ntry (var entree = new java.io.ObjectInputStream(new java.io.ByteArrayInputStream(buffer.toByteArray()))) {\n    Etat lu = (Etat) entree.readObject();\n    System.out.print(lu.valeur + \":\" + lu.cache);\n}",
    "explanation": "La valeur persistée est restaurée ; le champ transient reprend sa valeur par défaut : 9:0.",
    "pitfalls": [
      "Un champ private n’est pas exclu automatiquement.",
      "Pour une classe ordinaire Serializable, le constructeur sans argument de la première superclasse non sérialisable intervient ; les records suivent des règles spécifiques."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Serializable.html"
      }
    ],
    "related": [
      "objets"
    ],
    "check": {
      "output": "9:0"
    }
  },
  {
    "id": "path",
    "group": "io",
    "title": "Path : construction, résolution et normalisation",
    "rules": [
      "Path représente un chemin sans créer ni ouvrir un fichier. normalize simplifie lexicalement les segments ; toAbsolutePath rend absolu sans imposer l’existence ; toRealPath consulte le système de fichiers et résout normalement les liens."
    ],
    "method": [
      "Distinguer opérations lexicales et opérations nécessitant un accès disque.",
      "Pour resolve, vérifier si le second chemin est absolu."
    ],
    "code": "Path chemin = Path.of(\"dossier\", \"sous\", \"..\", \"note.txt\");\nSystem.out.print(chemin.normalize().getFileName());",
    "explanation": "Le segment sous/.. disparaît et getFileName renvoie note.txt.",
    "pitfalls": [
      "La syntaxe des racines et séparateurs dépend du système.",
      "Un argument absolu passé à resolve remplace normalement la base."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Path.html"
      }
    ],
    "related": [
      "fichiers"
    ],
    "check": {
      "output": "note.txt"
    }
  },
  {
    "id": "fichiers",
    "group": "io",
    "title": "Files : parcours, attributs et opérations sur les fichiers",
    "rules": [
      "Files réalise les opérations réelles : création, lecture, copie, déplacement et parcours. Les streams de list, walk ou find doivent être fermés. Un remplacement ou une atomicité de déplacement dépend des options et du système de fichiers."
    ],
    "method": [
      "Identifier l’état initial : existence, type et droits du chemin.",
      "Vérifier les options et les ressources ouvertes par l’opération."
    ],
    "code": "Path repertoire = Files.createTempDirectory(\"memo-files-\");\nPath source = repertoire.resolve(\"a.txt\");\nPath cible = repertoire.resolve(\"b.txt\");\ntry {\n    Files.writeString(source, \"contenu\");\n    Files.move(source, cible);\n    System.out.print(Files.isRegularFile(cible));\n} finally {\n    Files.deleteIfExists(source); Files.deleteIfExists(cible); Files.deleteIfExists(repertoire);\n}",
    "explanation": "Le fichier est créé puis déplacé ; isRegularFile confirme sa présence sous le nouveau nom.",
    "pitfalls": [
      "Sans REPLACE_EXISTING, une cible distincte existante empêche normalement le déplacement.",
      "ATOMIC_MOVE peut ne pas être supporté ; ne pas supposer une atomicité universelle."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html"
      }
    ],
    "related": [
      "path",
      "fichiers-ressources"
    ],
    "check": {
      "output": "true"
    }
  },
  {
    "id": "locales",
    "group": "locale",
    "title": "Locale : langues, régions et paramètres par défaut",
    "rules": [
      "Locale décrit des conventions linguistiques et régionales, pas une traduction automatique. forLanguageTag utilise une balise comme fr-BE ; getLanguage et getCountry extraient des composants distincts."
    ],
    "method": [
      "Distinguer langue, région et représentation complète de la balise.",
      "Préférer une locale explicite pour un résultat reproductible."
    ],
    "code": "var locale = Locale.forLanguageTag(\"en-GB\");\nSystem.out.print(locale.getLanguage() + \":\" + locale.getCountry());",
    "explanation": "La langue est en et la région GB.",
    "pitfalls": [
      "La locale par défaut dépend de l’environnement.",
      "Changer la locale ne traduit pas les chaînes écrites directement dans le code."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Locale.html"
      }
    ],
    "related": [
      "bundles",
      "format-nombres"
    ],
    "check": {
      "output": "en:GB"
    }
  },
  {
    "id": "bundles",
    "group": "locale",
    "title": "ResourceBundle : recherche des traductions et repli",
    "rules": [
      "ResourceBundle charge une famille de ressources selon un nom de base et une locale. Les candidats standards vont du plus spécifique vers des variantes moins spécifiques ; la locale par défaut peut aussi intervenir. Une clé absente de toute la chaîne de parents provoque MissingResourceException."
    ],
    "method": [
      "Lister les variantes disponibles et la locale demandée.",
      "Distinguer choix du bundle et recherche d’une clé dans ses parents."
    ],
    "code": "String contenu = \"bonjour=Salut\\n\";\nvar bundle = new PropertyResourceBundle(new java.io.StringReader(contenu));\nSystem.out.print(bundle.getString(\"bonjour\"));",
    "explanation": "Le bundle de propriétés associe la clé bonjour à Salut. Dans une famille nommée Messages, Messages_fr_BE.properties est plus spécifique que Messages_fr.properties pour fr_BE.",
    "pitfalls": [
      "L’ordre du suffixe est langue puis région, pas l’inverse.",
      "Une clé manquante n’est pas automatiquement remplacée par son propre nom."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ResourceBundle.html"
      }
    ],
    "related": [
      "locales",
      "messages"
    ],
    "check": {
      "output": "Salut"
    }
  },
  {
    "id": "format-nombres",
    "group": "locale",
    "title": "Nombres, devises et pourcentages : formatage et parsing",
    "rules": [
      "NumberFormat applique les conventions d’une locale. Le format pourcentage affiche une fraction multipliée par 100. Un format monétaire présente une valeur dans une devise, sans calculer un taux de change.",
      "Le format pourcentage standard de Locale.US n’affiche par défaut aucune décimale. L’affichage est donc arrondi selon les paramètres du format ; NumberFormat utilise par défaut RoundingMode.HALF_EVEN pour les arrondis : à égalité exacte, le dernier chiffre conservé est pair. Les bornes de décimales se consultent avec getMinimumFractionDigits() et getMaximumFractionDigits() et peuvent être configurées."
    ],
    "method": [
      "Identifier la locale et le type de format demandé.",
      "Distinguer valeur numérique, représentation affichée et résultat de parse.",
      "Vérifier les décimales affichées et la règle d’arrondi avant de déduire le texte d’un pourcentage non entier."
    ],
    "code": "var format = NumberFormat.getPercentInstance(Locale.US);\nSystem.out.print(format.format(0.4) + \":\" + format.parse(\"40%\").doubleValue());",
    "explanation": "La fraction 0.4 s’affiche 40% ; le parsing du pourcentage retrouve 0.4.",
    "pitfalls": [
      "NumberFormat n’est généralement pas synchronisé : isoler les instances ou protéger leur accès.",
      "parse peut accepter un préfixe seulement ; contrôler la consommation si le texte entier doit être validé."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/NumberFormat.html"
      }
    ],
    "related": [
      "locales",
      "format-dates"
    ],
    "check": {
      "output": "40%:0.4"
    }
  },
  {
    "id": "format-dates",
    "group": "locale",
    "title": "DateTimeFormatter : motifs, formatage et parsing",
    "rules": [
      "DateTimeFormatter est immuable et thread-safe. Les lettres de motifs sont sensibles à la casse : u pour l’année proleptique, M pour le mois, d pour le jour du mois ; m désigne les minutes et Y l’année basée sur les semaines.",
      "Le formatter passé à LocalDate.parse sert à interpréter le texte, pas à fixer son affichage ultérieur. Un LocalDate représente une date et ne conserve pas le motif du texte d’entrée. Son affichage direct passe par toString(), au format ISO uuuu-MM-dd. Pour choisir le format de sortie, appeler explicitement date.format(formatter)."
    ],
    "method": [
      "Vérifier que chaque champ du motif existe dans le type temporel utilisé.",
      "Distinguer formatage vers du texte et parsing vers un objet temporel.",
      "Identifier séparément le motif de lecture et le mécanisme de sortie : print(date) utilise toString(), tandis que print(date.format(format)) utilise le motif fourni."
    ],
    "code": "var format = DateTimeFormatter.ofPattern(\"dd-MM-uuuu\");\nvar date = LocalDate.parse(\"19-06-2025\", format);\n\nSystem.out.println(date); // affichage direct : 2025-06-19\nSystem.out.print(date.format(format)); // format explicite : 19-06-2025",
    "explanation": "Le motif dd-MM-uuuu lit le jour 19, le mois 06 et l’année 2025. Le résultat est un objet LocalDate, pas une chaîne conservant ce motif. Le premier affichage utilise toString() et produit 2025-06-19. Le second appelle format(format) et produit 19-06-2025. Le motif de lecture ne devient donc pas automatiquement le motif de sortie.",
    "pitfalls": [
      "YYYY-mm-DD n’est pas équivalent à uuuu-MM-dd.",
      "Le style de résolution influence la validation des dates limites.",
      "Ne pas déduire le format affiché du seul motif passé à parse : lire un texte et produire un texte sont deux opérations distinctes."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html"
      },
      {
        "title": "LocalDate.parse et LocalDate.toString — Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html"
      },
      {
        "title": "PrintStream.print(Object) — Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/PrintStream.html#print(java.lang.Object)"
      }
    ],
    "related": [
      "dates",
      "format-nombres"
    ],
    "check": {
      "output": "2025-06-19\n19-06-2025"
    }
  },
  {
    "id": "messages",
    "group": "locale",
    "title": "Messages localisés avec MessageFormat",
    "rules": [
      "MessageFormat insère des arguments numérotés dans un modèle de message. La locale sert aux sous-formats numériques et temporels ; les traductions du texte doivent être fournies, par exemple par ResourceBundle."
    ],
    "method": [
      "Associer chaque indice d’argument à sa valeur.",
      "Vérifier la locale et les sous-formats spécifiés dans le modèle."
    ],
    "code": "var format = new MessageFormat(\"{0} : {1,number,integer} essais\", Locale.FRANCE);\nSystem.out.print(format.format(new Object[]{\"Alice\", 3}));",
    "explanation": "Le premier argument est du texte et le second un nombre formaté comme entier.",
    "pitfalls": [
      "L’apostrophe a un rôle de citation dans les motifs ; la doubler pour une apostrophe littérale.",
      "Le modèle ne change pas automatiquement de langue avec la locale."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/MessageFormat.html"
      }
    ],
    "related": [
      "bundles",
      "format-nombres"
    ],
    "check": {
      "output": "Alice : 3 essais"
    }
  },
  {
    "id": "generiques",
    "group": "extra",
    "title": "Génériques : paramètres de type, invariance et wildcards",
    "cheatsheet": {
      "title": "Anti-sèche : wildcards",
      "head": [
        "Ce que fait ma méthode",
        "Paramètre"
      ],
      "rows": [
        [
          "Je prends un T dans la liste",
          "List<? extends T>"
        ],
        [
          "Je dépose un T dans la liste",
          "List<? super T>"
        ],
        [
          "Je prends et je dépose des T dans la même liste",
          "List<T>"
        ]
      ],
      "legend": "✓ indique les types X pour lesquels je peux passer une List<X> à la méthode.",
      "diagram": "JE PRENDS UN Number           JE DÉPOSE UN Number\nList<? extends Number>        List<? super Number>\n\nObject                        Object ✓\n└── Number ✓                  └── Number ✓\n    ├── Integer ✓                 ├── Integer\n    └── Double  ✓                 └── Double",
      "notes": [
        "extends ↓ Depuis Number, je descends. Dans une List<Integer> ou une List<Double>, tout élément peut être lu comme un Number.",
        "super ↑ Depuis Number, je remonte. Une List<Number> ou une List<Object> peut recevoir aussi bien 42 que 3.14."
      ]
    },
    "rules": [
      "List<Integer> n’est pas un sous-type de List<Number>. Avec ? extends Number, la lecture garantit Number, mais pas l’ajout d’un nombre arbitraire. Avec ? super Integer, on peut ajouter Integer, mais une lecture ne garantit que Object."
    ],
    "method": [
      "Identifier la borne et le type exact potentiellement caché par le wildcard.",
      "Vérifier séparément lecture et écriture : producteur extends, consommateur super."
    ],
    "code": "List<? extends Number> source = List.of(5, 8);\nList<? super Integer> cible = new ArrayList<Number>();\ncible.add(12);\nNumber lu = source.get(0);\nSystem.out.print(lu + \":\" + cible.get(0));",
    "explanation": "La lecture de source est sûre comme Number ; l’ajout d’un Integer dans cible est autorisé.",
    "pitfalls": [
      "Les arguments de type sont des références, pas des primitifs.",
      "Un wildcard extends peut accepter null, mais pas une valeur numérique non nulle arbitraire."
    ],
    "sources": [
      {
        "title": "Spécification du langage Java SE 21",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html"
      }
    ],
    "related": [
      "wrappers",
      "listes",
      "annotations"
    ],
    "check": {
      "output": "5:12"
    }
  },
  {
    "id": "annotations",
    "group": "extra",
    "title": "Annotations : Override, FunctionalInterface, Deprecated, SuppressWarnings et SafeVarargs",
    "rules": [
      "Override vérifie une redéfinition ; FunctionalInterface vérifie un contrat fonctionnel ; Deprecated signale un usage déconseillé ; SuppressWarnings masque des avertissements ciblés. SafeVarargs atteste un usage sûr d’un varargs de type non réifiable, sans changer le comportement à l’exécution."
    ],
    "method": [
      "Identifier l’élément annoté et la vérification ou information apportée.",
      "Contrôler que la cible et les modificateurs autorisent l’annotation."
    ],
    "code": "class Etiquette {\n    @Override public String toString() { return \"mémo\"; }\n}\nSystem.out.print(new Etiquette());",
    "explanation": "Override fait vérifier la signature de toString par le compilateur ; println/print utilise ensuite cette méthode.",
    "pitfalls": [
      "SafeVarargs est permis sur les constructeurs et méthodes varargs static, final ou private, pas toute méthode redéfinissable.",
      "SuppressWarnings ne transforme pas un code incorrect en code valide."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/SafeVarargs.html"
      },
      {
        "title": "Annotation Override — Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Override.html"
      },
      {
        "title": "Annotation FunctionalInterface — Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/FunctionalInterface.html"
      },
      {
        "title": "Annotation Deprecated — Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Deprecated.html"
      },
      {
        "title": "Annotation SuppressWarnings — Java 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/SuppressWarnings.html"
      }
    ],
    "related": [
      "interfaces-fonctionnelles",
      "surcharge",
      "generiques"
    ],
    "check": {
      "output": "mémo"
    }
  },
  {
    "id": "logging",
    "group": "extra",
    "title": "Java Logging API : loggers, niveaux, handlers et messages",
    "rules": [
      "java.util.logging appartient au module java.logging. Les niveaux du logger puis des handlers participent au filtrage. Les surcharges avec Supplier peuvent différer la construction du message jusqu’à l’acceptation du niveau par le logger."
    ],
    "method": [
      "Identifier les niveaux effectifs du logger et des handlers.",
      "Distinguer acceptation par le logger, construction du message et publication par un handler."
    ],
    "code": "var logger = java.util.logging.Logger.getLogger(\"revision.memo\");\nlogger.setLevel(java.util.logging.Level.OFF);\nvar appels = new AtomicInteger();\nlogger.info(() -> \"message \" + appels.incrementAndGet());\nSystem.out.print(appels.get());",
    "explanation": "Le logger refuse le niveau ; le Supplier n’est pas évalué et le compteur reste à zéro.",
    "pitfalls": [
      "severe n’arrête pas la JVM.",
      "Un message accepté par le logger peut encore être filtré par les handlers."
    ],
    "sources": [
      {
        "title": "Documentation officielle Java SE 21",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.logging/java/util/logging/Logger.html"
      }
    ],
    "related": [
      "lambdas",
      "modules-descripteur"
    ],
    "check": {
      "output": "0"
    }
  }
];

export const questionMemoIds = {
  "values-01": "conversions",
  "values-02": "conversions",
  "values-03": "operateurs",
  "values-04": "operateurs",
  "values-05": "strings",
  "values-06": "strings",
  "values-07": "stringbuilder",
  "values-08": "wrappers",
  "values-09": "textblocks",
  "values-10": "dates",
  "values-11": "durees",
  "values-12": "durees",
  "values-13": "fuseaux",
  "values-14": "math",
  "values-15": "strings",
  "flow-01": "switch",
  "flow-02": "switch",
  "flow-03": "boucles",
  "flow-04": "boucles",
  "flow-05": "boucles",
  "flow-06": "switch-patterns",
  "flow-07": "switch",
  "flow-08": "casts-patterns",
  "flow-09": "switch",
  "flow-10": "boucles",
  "objects-01": "records",
  "objects-02": "records",
  "objects-03": "records",
  "objects-04": "records",
  "objects-05": "heritage",
  "objects-06": "polymorphisme",
  "objects-07": "polymorphisme",
  "objects-08": "polymorphisme",
  "objects-09": "interfaces",
  "objects-10": "interfaces",
  "objects-11": "interfaces-fonctionnelles",
  "objects-12": "surcharge",
  "objects-13": "var-portee",
  "objects-14": "casts-patterns",
  "objects-15": "casts-patterns",
  "objects-16": "records",
  "objects-17": "switch-patterns",
  "objects-18": "enums",
  "objects-19": "enums",
  "objects-20": "classes-imbriquees",
  "objects-21": "classes-imbriquees",
  "objects-22": "objets",
  "objects-23": "immuabilite",
  "objects-24": "initialisation",
  "objects-25": "initialisation",
  "objects-26": "surcharge",
  "objects-27": "egalite",
  "objects-28": "annotations",
  "objects-29": "annotations",
  "objects-30": "polymorphisme",
  "exceptions-01": "exceptions-types",
  "exceptions-02": "exceptions-controle",
  "exceptions-03": "exceptions-hierarchie",
  "exceptions-04": "exceptions-controle",
  "exceptions-05": "ressources",
  "exceptions-06": "ressources",
  "exceptions-07": "ressources",
  "exceptions-08": "exceptions-controle",
  "exceptions-09": "exceptions-redefinition",
  "exceptions-10": "ressources",
  "collections-01": "listes",
  "collections-02": "listes",
  "collections-03": "listes-vues",
  "collections-04": "listes-vues",
  "collections-05": "sets",
  "collections-06": "maps",
  "collections-07": "deque",
  "collections-08": "deque",
  "collections-09": "generiques",
  "collections-10": "generiques",
  "collections-11": "generiques",
  "collections-12": "listes-vues",
  "collections-13": "tableaux",
  "collections-14": "collections-sequencees",
  "collections-15": "tri-recherche",
  "streams-01": "stream-operations",
  "streams-02": "pipeline",
  "streams-03": "stream-operations",
  "streams-04": "stream-sources",
  "streams-05": "reduction",
  "streams-06": "reduction",
  "streams-07": "reduction",
  "streams-08": "pipeline",
  "streams-09": "stream-operations",
  "streams-10": "collecte",
  "streams-11": "groupement",
  "streams-12": "groupement",
  "streams-13": "collecte",
  "streams-14": "collecte",
  "streams-15": "optional",
  "streams-16": "optional",
  "streams-17": "lambdas",
  "streams-18": "lambdas",
  "streams-19": "streams-paralleles",
  "streams-20": "stream-limites",
  "modules-01": "modules-descripteur",
  "modules-02": "modules-acces",
  "modules-03": "modules-descripteur",
  "modules-04": "modules-descripteur",
  "modules-05": "modules-descripteur",
  "modules-06": "modules-acces",
  "modules-07": "modules-services",
  "modules-08": "modules-services",
  "modules-09": "modules-migration",
  "modules-10": "modules-migration",
  "modules-11": "modules-migration",
  "modules-12": "modules-outils",
  "modules-13": "modules-outils",
  "modules-14": "modules-compilation",
  "modules-15": "modules-acces",
  "concurrency-01": "threads",
  "concurrency-02": "threads-virtuels",
  "concurrency-03": "threads-virtuels",
  "concurrency-04": "executeurs",
  "concurrency-05": "executeurs",
  "concurrency-06": "executeurs",
  "concurrency-07": "verrous",
  "concurrency-08": "visibilite",
  "concurrency-09": "visibilite",
  "concurrency-10": "verrous",
  "concurrency-11": "maps-concurrentes",
  "concurrency-12": "maps-concurrentes",
  "concurrency-13": "threads",
  "concurrency-14": "threads",
  "concurrency-15": "streams-paralleles",
  "io-01": "path",
  "io-02": "path",
  "io-03": "path",
  "io-04": "path",
  "io-05": "fichiers-ressources",
  "io-06": "flux",
  "io-07": "flux",
  "io-08": "serialisation",
  "io-09": "serialisation",
  "io-10": "serialisation",
  "io-11": "fichiers",
  "io-12": "logging",
  "locale-01": "locales",
  "locale-02": "locales",
  "locale-03": "bundles",
  "locale-04": "bundles",
  "locale-05": "format-nombres",
  "locale-06": "format-dates",
  "locale-07": "format-dates",
  "locale-08": "format-nombres"
};

// Affectation explicite de la fiche de chaque nouvelle question.
for (const topic of new Set(additionalQuestions.map(q => q.topic))) {
  const existing = Object.keys(questionMemoIds).filter(id => id.startsWith(topic + "-")).length;
  additionalQuestions.filter(q => q.topic === topic).forEach((q, i) => {
    questionMemoIds[`${topic}-${String(existing + i + 1).padStart(2, "0")}`] = q.memoId;
  });
}
