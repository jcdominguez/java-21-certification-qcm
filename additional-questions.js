// Questions additionnelles : les identifiants sont attribués après la banque initiale.
export const additionalQuestions = [];
function add(topic, memoId, prompt, code, items, reference, output) {
  additionalQuestions.push({topic, memoId, prompt, code, items, reference,
    check: output === undefined ? null : {kind:'run', body:code, output}});
}
const api = 'java.base/';
const jls = 'jls:jls-';
add('values','operateurs','Quelle valeur est affichée après les deux incrémentations ?',
 'int n = 4;\nint total = n++ + ++n;\nSystem.out.print(total + ":" + n);',
 ['+10:6 ~ n++ fournit 4 puis n devient 5 ; ++n fournit 6 : 4 + 6 = 10.','9:6 ~ Le second opérande fournit 6, pas 5.','10:5 ~ Les deux incrémentations ont été effectuées.','12:6 ~ Le premier opérande conserve la valeur 4.'],jls+'15.html#jls-15.14.2','10:6');
add('values','strings','Que produit replace sur cette chaîne ?',
 'String texte = "banane";\nString copie = texte.replace("a", "o");\nSystem.out.print(texte + ":" + copie);',
 ['+banane:bonone ~ replace renvoie une chaîne ; texte conserve sa valeur initiale.','bonone:bonone ~ La chaîne initiale est immuable.','banane:bonane ~ Toutes les occurrences littérales de a sont remplacées.','Erreur de compilation ~ Cette surcharge de replace accepte des CharSequence.'],api+'java/lang/String.html#replace(java.lang.CharSequence,java.lang.CharSequence)','banane:bonone');
add('values','durees','Combien de jours séparent ces deux dates ?',
 'var debut = LocalDate.of(2024, 2, 28);\nvar fin = LocalDate.of(2024, 3, 1);\nSystem.out.print(Period.between(debut, fin).getDays());',
 ['+2 ~ Février 2024 contient le 29 février : deux jours séparent les dates.','1 ~ Le jour bissextile est aussi traversé.','3 ~ La borne de fin n’ajoute pas un jour au calcul.','DateTimeException ~ Les deux dates sont valides.'],api+'java/time/Period.html#between(java.time.LocalDate,java.time.LocalDate)','2');
add('values','conversions','Quelle valeur résulte de ce cast ?',
 'double mesure = -3.9;\nSystem.out.print((int) mesure);',
 ['+-3 ~ La conversion vers int tronque vers zéro.','-4 ~ Le cast ne réalise pas Math.floor.','3 ~ Le signe est conservé.','ArithmeticException ~ Cette conversion primitive est autorisée.'],jls+'5.html#jls-5.1.3','-3');
add('values','stringbuilder','Que contient le builder après ces modifications ?',
 'var texte = new StringBuilder("cert");\ntexte.insert(0, "O").setCharAt(2, \'E\');\nSystem.out.print(texte);',
 ['+OcErt ~ Après insertion, Ocert a le caractère e à l’indice 2 ; il devient E.','OCErt ~ Le c à l’indice 1 n’est pas modifié.','cErtO ~ insert(0, ...) insère au début.','Erreur de compilation ~ insert renvoie le builder ; setCharAt est ensuite appelé normalement.'],api+'java/lang/StringBuilder.html','OcErt');
add('flow','boucles','Quel total cette boucle à étiquette calcule-t-elle ?',
 'int total = 0;\nouter: for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (j == 1) continue outer;\n        total++;\n    }\n}\nSystem.out.print(total);',
 ['+3 ~ Pour chaque valeur de i, seul j = 0 incrémente total avant continue outer.','1 ~ continue outer poursuit la boucle externe ; il ne la termine pas.','6 ~ j = 2 n’est jamais atteint.','9 ~ L’étiquette change la cible du continue.'],jls+'14.html#jls-14.16','3');
add('flow','switch','Quelle valeur est produite par ce switch à groupes classiques ?',
 'int valeur = switch (1) {\n    case 1:\n    case 2: yield 9;\n    default: yield 0;\n};\nSystem.out.print(valeur);',
 ['+9 ~ case 1 poursuit dans le groupe qui fournit 9 avec yield.','0 ~ Le sélecteur correspond déjà à case 1.','19 ~ yield fournit une seule valeur.','Erreur de compilation ~ Une expression switch peut employer des groupes avec deux-points.'],jls+'15.html#jls-15.28','9');
add('flow','switch-patterns','Quelle branche est choisie pour cette chaîne courte ?',
 'Object valeur = "ab";\nString resultat = switch (valeur) {\n    case String s when s.length() > 3 -> "longue";\n    case String s -> "courte";\n    default -> "autre";\n};\nSystem.out.print(resultat);',
 ['+courte ~ Le premier pattern correspond au type, mais sa garde est fausse ; le suivant est essayé.','longue ~ La longueur vaut 2, donc la garde échoue.','autre ~ Le second pattern String correspond.','Erreur de compilation ~ Un pattern gardé peut précéder le pattern non gardé du même type.'],jls+'14.html#jls-14.11','courte');
add('flow','conditions','Quelle branche est exécutée par ce if sans accolades ?',
 'boolean premier = true;\nboolean second = false;\nif (premier)\n    if (second) System.out.print("A");\n    else System.out.print("B");',
 ['+B ~ else est associé au if le plus proche qui n’a pas encore de else.','A ~ second vaut false.','Aucun affichage ~ Le else appartient au test de second.','Erreur de compilation ~ Les accolades ne sont pas obligatoires pour cette instruction.'],jls+'14.html#jls-14.5','B');
add('flow','boucles','Combien de passages cette boucle effectue-t-elle ?',
 'int i = 0;\nint passages = 0;\nwhile (i++ < 2) passages++;\nSystem.out.print(passages + ":" + i);',
 ['+2:3 ~ Les tests utilisent successivement 0, 1 et 2 ; même le dernier test incrémente i.','2:2 ~ Le test final incrémente aussi i.','3:3 ~ Le test effectué avec 2 est faux, sans troisième passage.','Boucle infinie ~ i augmente à chaque évaluation du test.'],jls+'14.html#jls-14.12','2:3');
add('objects','records','Quelle valeur conserve ce record après normalisation ?',
 'record Etiquette(String valeur) {\n    Etiquette { valeur = valeur.strip(); }\n}\nSystem.out.print(new Etiquette("  Java  ").valeur());',
 ['+Java ~ Le paramètre normalisé est affecté implicitement au composant à la fin du constructeur compact.','  Java   ~ Le constructeur ne conserve pas les espaces supprimés.','null ~ Le champ reçoit le paramètre après le corps compact.','Erreur de compilation ~ Réaffecter le paramètre est permis dans un constructeur compact.'],jls+'8.html#jls-8.10.4.2','Java');
add('objects','polymorphisme','Quelles valeurs proviennent du champ et de la méthode ?',
 'class Parent { int n = 5; int lire() { return n; } }\nclass Enfant extends Parent { int n = 8; int lire() { return n; } }\nParent objet = new Enfant();\nSystem.out.print(objet.n + ":" + objet.lire());',
 ['+5:8 ~ Le champ suit le type de référence Parent ; la méthode redéfinie suit le type réel Enfant.','8:8 ~ L’accès au champ ne réalise pas de dispatch polymorphe.','5:5 ~ lire est redéfinie et appelée sur un Enfant.','Erreur de compilation ~ Un champ peut être masqué et une méthode redéfinie.'],jls+'15.html#jls-15.11','5:8');
add('objects','initialisation','Dans quel ordre les initialiseurs et le constructeur s’exécutent-ils ?',
 'class Trace {\n    static { System.out.print("S"); }\n    { System.out.print("I"); }\n    Trace() { System.out.print("C"); }\n}\nnew Trace();\nnew Trace();',
 ['+SICIC ~ L’initialisation statique a lieu une fois, puis I et C pour chaque instance.','SICSIC ~ Le bloc statique n’est pas rejoué pour la seconde instance.','SCIIC ~ Le bloc d’instance précède le corps du constructeur.','ICICS ~ La classe est initialisée avant sa première instance.'],jls+'12.html#jls-12.4','SICIC');
add('objects','interfaces','Que renvoie l’appel explicite à la méthode default ?',
 'interface Salutation { default String texte() { return "Bonjour"; } }\nclass Accueil implements Salutation {\n    public String texte() { return Salutation.super.texte() + " !"; }\n}\nSystem.out.print(new Accueil().texte());',
 ['+Bonjour ! ~ Interface.super permet d’appeler la méthode default du supertype direct.','Bonjour ~ La concaténation ajoute un espace et un point d’exclamation.','StackOverflowError ~ L’appel qualifié ne rappelle pas la méthode d’Accueil.','Erreur de compilation ~ Cette qualification est valide pour l’interface directement implémentée.'],jls+'15.html#jls-15.12','Bonjour !');
add('objects','egalite','Que distingue equals de == pour ces records ?',
 'record Code(int valeur) {}\nvar a = new Code(7);\nvar b = new Code(7);\nSystem.out.print((a == b) + ":" + a.equals(b));',
 ['+false:true ~ Les deux instances sont distinctes, mais leurs composants sont égaux.','true:true ~ new crée deux objets distincts.','false:false ~ Le record génère un equals fondé sur ses composants.','Erreur de compilation ~ == et equals peuvent comparer ces références.'],jls+'8.html#jls-8.10','false:true');
add('exceptions','exceptions-controle','Que contient la valeur de retour malgré le finally ?',
 'class Calcul {\n    static int valeur() {\n        int n = 1;\n        try { return n; }\n        finally { n = 2; }\n    }\n}\nSystem.out.print(Calcul.valeur());',
 ['+1 ~ L’expression du return est évaluée avant finally ; réaffecter n ne remplace pas cette valeur.','2 ~ finally ne contient pas de nouveau return.','0 ~ n a été initialisé à 1.','Erreur de compilation ~ Le finally peut modifier cette variable locale.'],jls+'14.html#jls-14.20.2','1');
add('exceptions','ressources','Dans quel ordre ces deux ressources sont-elles fermées ?',
 'class Ressource implements AutoCloseable {\n    private final String nom;\n    Ressource(String nom) { this.nom = nom; }\n    public void close() { System.out.print(nom); }\n}\ntry (var a = new Ressource("A"); var b = new Ressource("B")) {\n    System.out.print("T");\n}',
 ['+TBA ~ Le corps s’exécute, puis les ressources se ferment en ordre inverse de déclaration.','TAB ~ La fermeture commence par la dernière ressource initialisée.','BAT ~ Le corps précède la fermeture automatique.','Erreur de compilation ~ AutoCloseable convient à try-with-resources.'],jls+'14.html#jls-14.20.3','TBA');
add('exceptions','ressources','Quelle exception reste principale lors de cette fermeture ?',
 'class Ressource implements AutoCloseable {\n    public void close() { throw new IllegalStateException("fermeture"); }\n}\ntry (var r = new Ressource()) {\n    throw new IllegalArgumentException("corps");\n} catch (Exception e) {\n    System.out.print(e.getMessage() + ":" + e.getSuppressed().length);\n}',
 ['+corps:1 ~ L’exception du corps reste principale ; celle de close est supprimée et attachée.','fermeture:0 ~ try-with-resources préserve l’exception principale du corps.','corps:0 ~ L’échec de fermeture n’est pas perdu.','Erreur de compilation ~ Les deux exceptions sont unchecked et la ressource est AutoCloseable.'],jls+'14.html#jls-14.20.3','corps:1');
add('exceptions','exceptions-hierarchie','Quel catch traite NumberFormatException ?',
 'try {\n    Integer.parseInt("douze");\n} catch (IllegalArgumentException e) {\n    System.out.print("argument");\n} catch (RuntimeException e) {\n    System.out.print("runtime");\n}',
 ['+argument ~ NumberFormatException hérite de IllegalArgumentException ; le premier catch compatible est choisi.','runtime ~ Le premier catch compatible traite déjà l’exception.','argumentruntime ~ Un seul catch est exécuté.','Erreur de compilation ~ Le catch du sous-type précède correctement celui du supertype.'],api+'java/lang/NumberFormatException.html','argument');
add('exceptions','exceptions-controle','Quel affichage subsiste quand finally remplace le retour ?',
 'class Choix {\n    static String lire() {\n        try { return "essai"; }\n        finally { return "fin"; }\n    }\n}\nSystem.out.print(Choix.lire());',
 ['+fin ~ Le return du finally remplace le retour en attente du try ; cette pratique masque le flux initial.','essai ~ Le finally se termine ici par un autre return.','essaifin ~ Les deux chaînes ne sont pas concaténées.','Erreur de compilation ~ Ce code est légal, même si un return dans finally est à éviter.'],jls+'14.html#jls-14.20.2','fin');
add('collections','listes','Que supprime cet appel à remove ?',
 'var nombres = new ArrayList<>(List.of(10, 20, 10));\nnombres.remove(Integer.valueOf(10));\nSystem.out.print(nombres);',
 ['+[20, 10] ~ L’argument Integer choisit remove(Object), qui retire la première valeur égale à 10.','[10, 20] ~ Ce serait la suppression du dernier élément, pas de la première occurrence.','[] ~ Une seule occurrence est retirée.','IndexOutOfBoundsException ~ L’argument n’est pas utilisé comme indice int.'],api+'java/util/List.html#remove(java.lang.Object)','[20, 10]');
add('collections','collections-sequencees','Quel effet la vue inversée a-t-elle sur la liste initiale ?',
 'var lettres = new ArrayList<>(List.of("A", "B"));\nlettres.reversed().addFirst("C");\nSystem.out.print(lettres);',
 ['+[A, B, C] ~ Le début de la vue inversée correspond à la fin de la liste initiale.','[C, A, B] ~ Ce serait addFirst sur la liste initiale.','[A, B] ~ reversed fournit une vue liée à la liste, pas une copie indépendante.','UnsupportedOperationException ~ Cette ArrayList est modifiable.'],api+'java/util/SequencedCollection.html','[A, B, C]');
add('collections','maps','Quelle valeur merge enregistre-t-il pour une clé présente ?',
 'var scores = new HashMap<String, Integer>();\nscores.put("Java", 3);\nscores.merge("Java", 2, Integer::sum);\nSystem.out.print(scores.get("Java"));',
 ['+5 ~ La fonction reçoit la valeur existante 3 et la valeur fournie 2.','2 ~ Une valeur existante non nulle déclenche la fonction de combinaison.','3 ~ merge met à jour l’association.','NullPointerException ~ Aucune valeur ni fonction n’est nulle.'],api+'java/util/Map.html#merge(K,V,java.util.function.BiFunction)','5');
add('collections','sets','Combien d’éléments restent dans ce TreeSet ?',
 'var mots = new TreeSet<String>(Comparator.comparingInt(String::length));\nmots.add("un");\nmots.add("de");\nmots.add("trois");\nSystem.out.print(mots.size());',
 ['+2 ~ Le comparateur considère un et de comme équivalents car leurs longueurs sont égales.','3 ~ TreeSet utilise le comparateur pour déterminer les doublons.','1 ~ trois a une longueur différente.','Erreur de compilation ~ Un comparateur de longueur peut être fourni au constructeur.'],api+'java/util/TreeSet.html','2');
add('collections','generiques','Que peut-on lire et ajouter avec ce wildcard supérieur ?',
 'List<? extends Number> valeurs = List.of(6, 9);\nNumber premiere = valeurs.get(0);\nSystem.out.print(premiere);',
 ['+6 ~ Un élément lu est utilisable comme Number ; le type concret capturé reste inconnu.','9 ~ get(0) lit le premier élément.','Erreur de compilation ~ La lecture vers Number est permise ; ajouter un Integer serait un autre problème.','ClassCastException ~ Le premier élément est bien un Number.'],jls+'4.html#jls-4.5.1','6');
add('streams','stream-operations','Quel résultat produit flatMap sur ces deux listes ?',
 'System.out.print(Stream.of(List.of(1, 2), List.of(3))\n    .flatMap(List::stream).map(n -> n * 2).toList());',
 ['+[2, 4, 6] ~ flatMap aplatit les listes, puis map double chaque entier.','[[2, 4], [6]] ~ flatMap supprime le niveau de listes.','[1, 2, 3] ~ map transforme ensuite les nombres.','Erreur de compilation ~ List::stream fournit les streams attendus par flatMap.'],api+'java/util/stream/Stream.html#flatMap(java.util.function.Function)','[2, 4, 6]');
add('streams','optional','Que retourne cette recherche sur un stream vide ?',
 'System.out.print(Stream.<String>empty().findFirst().orElse("absent"));',
 ['+absent ~ findFirst renvoie un Optional vide ; orElse fournit la valeur de repli.','null ~ La valeur de repli explicite est utilisée.','NoSuchElementException ~ orElse ne demande pas get() sur l’Optional vide.','Erreur de compilation ~ Le type String est indiqué pour le stream vide.'],api+'java/util/Optional.html#orElse(T)','absent');
add('streams','reduction','Quelle somme est calculée par cette réduction ?',
 'System.out.print(IntStream.rangeClosed(2, 4).reduce(0, Integer::sum));',
 ['+9 ~ rangeClosed inclut 2, 3 et 4, dont la somme vaut 9.','5 ~ La borne finale de rangeClosed est incluse.','0 ~ L’identité initialise la réduction sans remplacer les éléments.','24 ~ L’accumulateur effectue une addition, pas un produit.'],api+'java/util/stream/IntStream.html#reduce(int,java.util.function.IntBinaryOperator)','9');
add('streams','stream-limites','Quels éléments dropWhile conserve-t-il après le premier échec du prédicat ?',
 'System.out.print(Stream.of(1, 4, 2, 5).dropWhile(n -> n < 3).toList());',
 ['+[4, 2, 5] ~ Seul le préfixe 1 est retiré ; une fois 4 rencontré, le reste est conservé.','[4, 5] ~ Ce serait un filtrage global ; dropWhile ne retire pas le 2 ultérieur.','[1, 2] ~ Ce n’est pas un filter sur n < 3.','[] ~ Le premier échec arrête la suppression du préfixe.'],api+'java/util/stream/Stream.html#dropWhile(java.util.function.Predicate)','[4, 2, 5]');
add('streams','groupement','Combien de mots appartiennent au groupe de longueur 2 ?',
 'var groupes = Stream.of("un", "de", "trois")\n    .collect(Collectors.groupingBy(String::length, Collectors.counting()));\nSystem.out.print(groupes.get(2));',
 ['+2 ~ Les mots un et de sont tous deux classés sous la clé 2.','3 ~ trois appartient à la clé 5.','1 ~ counting compte tous les éléments du groupe.','Erreur de compilation ~ groupingBy accepte counting comme collecteur aval.'],api+'java/util/stream/Collectors.html#groupingBy(java.util.function.Function,java.util.stream.Collector)','2');
add('modules','modules-descripteur','Que déclare ce descripteur pour la dépendance java.logging ?',
 'module application {\n    requires static java.logging;\n}',
 ['+Une dépendance obligatoire à la compilation, mais non obligatoire à l’exécution ~ requires static distingue ces deux phases.','Une dépendance uniquement à l’exécution ~ La présence est requise à la compilation.','Un export de java.logging ~ requires déclare une dépendance, pas un export.','Une dépendance transitive pour tous les consommateurs ~ Le modificateur transitive n’est pas présent.'],jls+'7.html#jls-7.7.1');
add('modules','modules-acces','Quels modules reçoivent cet export qualifié ?',
 'module bibliotheque {\n    exports exemple.api to client;\n}',
 ['+client, sous réserve de lisibilité et des règles d’accès Java ~ L’export cible explicitement ce module.','Tous les modules nommés ~ La clause to restreint les destinataires.','Uniquement bibliotheque ~ L’export vise un module extérieur nommé client.','client, y compris les membres private de exemple.api ~ Un export ne supprime pas les règles d’accès aux membres.'],jls+'7.html#jls-7.7.2');
add('modules','modules-services','Quel type suit uses dans le descripteur du consommateur ?',
 'module client {\n    requires contrat;\n    uses exemple.api.Service;\n}',
 ['+Le type du service à découvrir ~ uses désigne le contrat de service, accessible au consommateur.','Le nom du module fournisseur ~ La directive attend un nom de type.','Le nom du fichier JAR du fournisseur ~ Les archives ne sont pas nommées dans uses.','Obligatoirement la classe concrète choisie à la compilation ~ La découverte peut sélectionner des fournisseurs sans coder leur classe ici.'],jls+'7.html#jls-7.7.3');
add('modules','modules-migration','Où placer un JAR dépourvu de module-info.class pour en faire un module automatique ?',
 '',
 ['+Sur le module path ~ ModuleFinder peut y dériver un module automatique.','Uniquement sur le classpath ~ Il y appartient au module non nommé de son chargeur.','Dans un package appelé automatic ~ Un nom de package ne crée pas un module.','Dans java.base ~ Ajouter un JAR ne l’intègre pas à ce module de plateforme.'],api+'java/lang/module/ModuleFinder.html');
add('modules','modules-descripteur','Quelle dépendance tout module nommé possède-t-il implicitement ?',
 '',
 ['+java.base ~ Le descripteur n’a pas besoin de répéter requires java.base.','java.sql ~ JDBC n’est pas une dépendance implicite universelle.','java.logging ~ Cette dépendance doit être déclarée si elle est nécessaire.','Toutes les autres applications du module path ~ Le module path ne rend pas tout module lisible implicitement.'],jls+'7.html#jls-7.7.1');
add('concurrency','verrous','Quel compteur d’acquisitions ce verrou réentrant affiche-t-il ?',
 'var verrou = new java.util.concurrent.locks.ReentrantLock();\nverrou.lock();\ntry {\n    verrou.lock();\n    try { System.out.print(verrou.getHoldCount()); }\n    finally { verrou.unlock(); }\n} finally { verrou.unlock(); }',
 ['+2 ~ Le même thread acquiert le même verrou deux fois ; chaque acquisition exige une libération.','1 ~ La réentrance augmente le nombre d’acquisitions détenues.','Interblocage certain ~ Le propriétaire peut réacquérir ce verrou réentrant.','IllegalMonitorStateException ~ Les libérations sont effectuées par le propriétaire, après acquisition.'],api+'java/util/concurrent/locks/ReentrantLock.html#getHoldCount()','2');
add('concurrency','visibilite','Quelle valeur renvoie getAndAdd, et quelle valeur reste stockée ?',
 'var compteur = new AtomicInteger(10);\nint ancien = compteur.getAndAdd(3);\nSystem.out.print(ancien + ":" + compteur.get());',
 ['+10:13 ~ getAndAdd renvoie l’ancienne valeur, puis le compteur contient la somme.','13:13 ~ addAndGet renverrait la nouvelle valeur.','10:10 ~ L’opération modifie aussi le compteur.','Erreur de compilation ~ AtomicInteger fournit cette méthode.'],api+'java/util/concurrent/atomic/AtomicInteger.html#getAndAdd(int)','10:13');
add('concurrency','executeurs','Quel résultat ce Callable transmet-il à son Future ?',
 'try (var pool = Executors.newSingleThreadExecutor()) {\n    Future<Integer> resultat = pool.submit(() -> 6 * 7);\n    System.out.print(resultat.get());\n}',
 ['+42 ~ La lambda retourne une valeur ; submit la traite comme un Callable<Integer>.','null ~ Le résultat du Callable est conservé dans le Future.','6 ~ Le calcul est exécuté entièrement par la tâche.','Erreur de compilation ~ ExecutorService est AutoCloseable en Java 21.'],api+'java/util/concurrent/ExecutorService.html#submit(java.util.concurrent.Callable)','42');
add('concurrency','threads','Quel affichage join permet-il de garantir ici ?',
 'var texte = new StringBuilder();\nThread t = new Thread(() -> texte.append("A"));\nt.start();\nt.join();\nSystem.out.print(texte);',
 ['+A ~ join attend la terminaison et rend les actions du thread terminé visibles au thread qui attend.','Une chaîne vide est aussi possible après join ~ L’écriture est terminée avant que join revienne normalement.','AA ~ Le corps du thread n’est exécuté qu’une fois.','Erreur de compilation ~ La référence texte est effectivement finale et peut être capturée.'],api+'java/lang/Thread.html#join()','A');
add('concurrency','maps-concurrentes','Quelle valeur compute met-il à jour atomiquement dans cette map ?',
 'var comptes = new ConcurrentHashMap<String, Integer>();\ncomptes.put("Java", 4);\ncomptes.compute("Java", (cle, valeur) -> valeur + 1);\nSystem.out.print(comptes.get("Java"));',
 ['+5 ~ compute recalcule atomiquement l’association de la clé à partir de sa valeur existante.','4 ~ La nouvelle valeur est enregistrée.','1 ~ Le paramètre valeur vaut ici 4.','Erreur de compilation ~ ConcurrentHashMap accepte cette fonction de recalcul.'],api+'java/util/concurrent/ConcurrentHashMap.html#compute(K,java.util.function.BiFunction)','5');
add('io','path','Que renvoie getFileName pour ce chemin relatif ?',
 'Path chemin = Path.of("cours", "java", "memo.txt");\nSystem.out.print(chemin.getFileName());',
 ['+memo.txt ~ getFileName renvoie le dernier élément du chemin.','java ~ Il s’agit du nom du répertoire parent.','cours ~ Il s’agit du premier élément.','null ~ Ce chemin possède un dernier élément.'],api+'java/nio/file/Path.html#getFileName()','memo.txt');
add('io','flux','Que renvoie read lorsque ce flux d’octets est épuisé ?',
 'var flux = new java.io.ByteArrayInputStream(new byte[] {65});\nSystem.out.print(flux.read() + ":" + flux.read());',
 ['+65:-1 ~ Le premier read lit l’octet ; -1 signale la fin du flux.','A:null ~ read renvoie un int, pas une chaîne ou null.','65:0 ~ La fin de flux est signalée par -1.','IOException ~ Atteindre la fin de ce flux est un cas normal.'],api+'java/io/ByteArrayInputStream.html#read()','65:-1');
add('io','flux','Quels caractères read(char[]) a-t-il lus dans ce tableau ?',
 'var lecteur = new java.io.StringReader("Java");\nchar[] tampon = new char[2];\nint lus = lecteur.read(tampon);\nSystem.out.print(lus + ":" + new String(tampon));',
 ['+2:Ja ~ Deux caractères remplissent les deux emplacements du tampon.','4:Java ~ Le tableau ne peut recevoir que deux caractères par cet appel.','2:va ~ La lecture commence au début de la chaîne.','-1:Ja ~ -1 signalerait qu’aucun caractère ne reste à lire.'],api+'java/io/StringReader.html#read(char[],int,int)','2:Ja');
add('io','path','Comment resolve traite-t-il ce nom relatif ?',
 'Path dossier = Path.of("cours");\nPath fichier = dossier.resolve("memo.txt");\nSystem.out.print(fichier.getParent().equals(dossier));',
 ['+true ~ Le nom relatif est résolu sous cours ; son parent est ce dossier.','false ~ resolve ne remplace pas le dossier avec un nom relatif.','NoSuchFileException ~ Ces opérations manipulent des chemins sans consulter l’existence du fichier.','Erreur de compilation ~ Path peut être comparé avec equals.'],api+'java/nio/file/Path.html#resolve(java.lang.String)','true');
add('io','flux','Quelle taille ce flux en mémoire possède-t-il après deux écritures ?',
 'var sortie = new java.io.ByteArrayOutputStream();\nsortie.write(65);\nsortie.write(66);\nSystem.out.print(sortie.size());',
 ['+2 ~ Chaque appel à write(int) écrit un seul octet.','131 ~ size compte les octets, pas la somme de leurs valeurs.','0 ~ Les écritures sont conservées dans le tampon mémoire.','IOException ~ Ces écritures dans un ByteArrayOutputStream sont permises.'],api+'java/io/ByteArrayOutputStream.html#size()','2');
add('locale','locales','Quel code pays cette Locale contient-elle ?',
 'var locale = Locale.forLanguageTag("pt-BR");\nSystem.out.print(locale.getCountry());',
 ['+BR ~ La région BR représente le Brésil dans cette balise.','pt ~ C’est le code langue, renvoyé par getLanguage.','pt-BR ~ C’est la balise complète.','Brazil ~ getCountry renvoie un code, pas un nom affichable traduit.'],api+'java/util/Locale.html#getCountry()','BR');
add('locale','format-nombres','Quelle partie de ce texte NumberFormat parse-t-il avec Locale.US ?',
 'var format = NumberFormat.getNumberInstance(Locale.US);\nSystem.out.print(format.parse("1,250").intValue());',
 ['+1250 ~ La virgule est le séparateur de groupement de ce format américain.','1 ~ Le séparateur de groupement est reconnu.','125 ~ Aucun zéro final n’est supprimé de la valeur entière.','ParseException ~ Le texte est valide pour le format choisi.'],api+'java/text/NumberFormat.html#parse(java.lang.String)','1250');
add('locale','format-dates','Quelle date ce format explicite affiche-t-il ?',
 'var date = LocalDate.of(2025, 12, 3);\nvar format = DateTimeFormatter.ofPattern("dd.MM.uuuu", Locale.FRANCE);\nSystem.out.print(date.format(format));',
 ['+03.12.2025 ~ dd affiche le jour sur deux positions, MM le mois, uuuu l’année.','2025-12-03 ~ Ce serait l’affichage ISO par défaut de LocalDate.toString.','12.03.2025 ~ Le motif place le jour avant le mois.','DateTimeException ~ Une LocalDate fournit les champs nécessaires.'],api+'java/time/format/DateTimeFormatter.html','03.12.2025');
add('locale','messages','Comment MessageFormat associe-t-il les arguments aux indices ?',
 'var format = new MessageFormat("{1} / {0}", Locale.FRANCE);\nSystem.out.print(format.format(new Object[] {"Java", "21"}));',
 ['+21 / Java ~ L’indice 1 désigne le second argument et l’indice 0 le premier.','Java / 21 ~ Les indices explicites déterminent l’ordre d’affichage.','{1} / {0} ~ Les accolades sont interprétées comme des emplacements.','Erreur de compilation ~ MessageFormat accepte un tableau d’objets.'],api+'java/text/MessageFormat.html','21 / Java');
add('locale','format-nombres','Quel pourcentage correspond à cette fraction avec Locale.US ?',
 'var format = NumberFormat.getPercentInstance(Locale.US);\nSystem.out.print(format.format(0.075));',
 ['+8% ~ Le format pourcentage par défaut n’affiche pas de décimale ; 7,5 % est arrondi à 8 %.','0.075% ~ Le format applique un facteur 100 à l’affichage.','7.5% ~ Le nombre maximal de décimales du format pourcentage par défaut vaut zéro.','75% ~ 0.075 correspond à 7,5 %, pas 75 %.'],api+'java/text/NumberFormat.html#getPercentInstance(java.util.Locale)','8%');
