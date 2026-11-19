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

// Deuxième extension : renforcer les notions peu représentées du programme.
function reject(topic, memoId, prompt, code, items, reference) {
  add(topic, memoId, prompt, code, items, reference);
  additionalQuestions.at(-1).check = {kind:'fail', body:code};
}
add('values','wrappers','Deux wrappers de types différents sont-ils égaux avec equals ?',
 'Integer entier = 5;\nLong longEntier = 5L;\nSystem.out.print(entier.equals(longEntier));',
 ['+false ~ Integer.equals exige un autre Integer portant la même valeur ; un Long ne convient pas.','true ~ equals ne réalise pas de promotion numérique entre wrappers.','Erreur de compilation ~ equals accepte un argument Object.','ClassCastException ~ Integer.equals vérifie le type et renvoie false.'],api+'java/lang/Integer.html#equals(java.lang.Object)','false');
add('values','math','Quel quotient floorDiv renvoie-t-il pour ces entiers négatifs ?',
 'System.out.print(Math.floorDiv(-7, 2));',
 ['+-4 ~ floorDiv arrondit le quotient vers moins l’infini.','-3 ~ La division entière / tronquerait vers zéro.','4 ~ Le signe du quotient reste négatif.','ArithmeticException ~ Le diviseur 2 n’est pas nul et le résultat est représentable.'],api+'java/lang/Math.html#floorDiv(int,int)','-4');
add('values','textblocks','Combien de lignes ce text block contient-il ?',
 'String texte = """\n    Java\n    21\n    """;\nSystem.out.print(texte.lines().count());',
 ['+2 ~ Le contenu comporte Java et 21 ; le saut final ne crée pas de ligne vide supplémentaire pour lines().','3 ~ String.lines ne crée pas de ligne supplémentaire après le dernier terminateur.','1 ~ Le saut de ligne entre Java et 21 est conservé.','Erreur de compilation ~ Le délimiteur ouvrant est bien suivi d’un saut de ligne.'],api+'java/lang/String.html#lines()','2');
add('values','fuseaux','Quelle heure locale suit l’ajout de 24 heures écoulées lors du passage à l’heure d’été ?',
 'var depart = ZonedDateTime.of(2024, 3, 30, 12, 0, 0, 0,\n    ZoneId.of("Europe/Paris"));\nSystem.out.print(depart.plusHours(24).getHour());',
 ['+13 ~ Les 24 heures s’ajoutent sur la ligne du temps ; le saut d’heure avance l’heure locale à 13 h.','12 ~ plusDays(1) conserverait midi, mais plusHours(24) ajoute une durée écoulée.','11 ~ Le passage à l’heure d’été avance l’horloge locale.','DateTimeException ~ L’instant obtenu correspond à une heure locale valide.'],api+'java/time/ZonedDateTime.html#plusHours(long)','13');
add('values','dates','Comment LocalTime traite-t-il le passage de minuit ?',
 'var heure = LocalTime.of(23, 50);\nSystem.out.print(heure.plusMinutes(20));',
 ['+00:10 ~ LocalTime reboucle sur la journée ; il ne contient pas de date à incrémenter.','24:10 ~ Les heures de LocalTime restent comprises entre 0 et 23.','23:50 ~ Le résultat renvoyé est affiché, même si heure reste immuable.','DateTimeException ~ Dépasser minuit par addition est autorisé.'],api+'java/time/LocalTime.html#plusMinutes(long)','00:10');
add('values','conversions','Quel type d’opération est effectué entre ce char et cet int ?',
 'char lettre = \'A\';\nSystem.out.print(lettre + 1);',
 ['+66 ~ Le char A possède la valeur 65 et est promu en int pour l’addition.','A1 ~ Aucun opérande String ne déclenche une concaténation.','B ~ Le résultat numérique n’est pas reconverti implicitement en char pour print.','Erreur de compilation ~ La promotion numérique de char vers int est autorisée.'],jls+'5.html#jls-5.6','66');
add('flow','switch-patterns','Comment ce switch traite-t-il explicitement null ?',
 'Object valeur = null;\nString resultat = switch (valeur) {\n    case null -> "vide";\n    case String s -> s;\n    default -> "autre";\n};\nSystem.out.print(resultat);',
 ['+vide ~ Le case null explicite traite ici la valeur du sélecteur.','autre ~ default n’est pas choisi à la place du case null.','NullPointerException ~ Un case null est présent et correspond.','Erreur de compilation ~ case null est standard en Java 21 dans ce switch.'],jls+'14.html#jls-14.11','vide');
add('flow','switch','Cette constante locale peut-elle servir d’étiquette case ?',
 'final int seuil = 2;\nswitch (2) {\n    case seuil -> System.out.print("OK");\n    default -> System.out.print("NON");\n}',
 ['+OK ~ seuil est une variable constante : final, de type primitif et initialisée par une expression constante.','NON ~ La constante seuil vaut 2 et correspond au sélecteur.','Erreur de compilation ~ Une variable constante int peut être employée dans case.','Aucun affichage ~ Le case correspondant exécute son instruction.'],jls+'14.html#jls-14.11','OK');
add('flow','boucles','Une boucle for-each peut-elle modifier les objets du tableau ?',
 'StringBuilder[] mots = {new StringBuilder("A"), new StringBuilder("B")};\nfor (StringBuilder mot : mots) mot.append("!");\nSystem.out.print(mots[0] + ":" + mots[1]);',
 ['+A!:B! ~ La variable de boucle contient une copie de référence vers chaque objet ; append modifie ces objets partagés.','A:B ~ Réaffecter la variable et modifier l’objet qu’elle désigne sont deux opérations différentes.','!:! ~ append ajoute sans effacer le contenu initial.','Erreur de compilation ~ Appeler une méthode sur la référence de boucle est autorisé.'],jls+'14.html#jls-14.14.2','A!:B!');
add('objects','membres','Quelle valeur ce champ static partage-t-il entre les instances ?',
 'class Compteur {\n    static int creations;\n    Compteur() { creations++; }\n}\nnew Compteur();\nnew Compteur();\nSystem.out.print(Compteur.creations);',
 ['+2 ~ Le même champ de classe est incrémenté par les deux constructeurs.','1 ~ Un champ static n’est pas recréé pour chaque instance.','0 ~ Les constructeurs effectuent les deux incrémentations.','Erreur de compilation ~ Une classe locale peut déclarer ce membre static en Java 21.'],jls+'8.html#jls-8.3.1.1','2');
reject('objects','var-portee','Peut-on affecter ensuite un double à cette variable inférée ?',
 'var nombre = 1;\nnombre = 2.5;\nSystem.out.print(nombre);',
 ['+Erreur de compilation ~ L’initialiseur donne à nombre le type int ; var ne rend pas le type dynamique.','2.5 ~ L’affectation double vers int n’est pas implicite.','2 ~ Il faudrait écrire un cast explicite pour tronquer.','ClassCastException ~ Il s’agit d’une incompatibilité de types primitifs détectée à la compilation.'],jls+'14.html#jls-14.4');
add('objects','surcharge','Un tableau explicite peut-il être fourni à un paramètre varargs ?',
 'class Somme {\n    static int calculer(int... valeurs) {\n        int total = 0;\n        for (int valeur : valeurs) total += valeur;\n        return total;\n    }\n}\nSystem.out.print(Somme.calculer(new int[] {2, 4}));',
 ['+6 ~ Un paramètre int... peut recevoir directement un tableau int[].','2 ~ Tous les éléments du tableau sont parcourus.','0 ~ Le tableau fourni n’est pas vide.','Erreur de compilation ~ Un tableau explicite est compatible avec ce paramètre varargs.'],jls+'8.html#jls-8.4.1','6');
reject('objects','classes-imbriquees','Pourquoi cette classe locale ne peut-elle pas capturer limite ?',
 'int limite = 3;\nclass Lecture { int lire() { return limite; } }\nlimite++;\nSystem.out.print(new Lecture().lire());',
 ['+Erreur de compilation ~ limite est modifiée après son initialisation ; elle n’est pas effectivement finale.','3 ~ Le compilateur ne capture pas silencieusement la première valeur d’une variable mutable.','4 ~ La classe locale ne peut pas lire cette variable locale réaffectée.','IllegalStateException ~ L’erreur est détectée avant l’exécution.'],jls+'8.html#jls-8.1.3');
add('objects','immuabilite','Quelle liste le record conserve-t-il après la copie défensive ?',
 'record Groupe(List<String> noms) {\n    Groupe { noms = List.copyOf(noms); }\n}\nvar origine = new ArrayList<>(List.of("Ada"));\nvar groupe = new Groupe(origine);\norigine.add("Linus");\nSystem.out.print(groupe.noms());',
 ['+[Ada] ~ List.copyOf crée une liste non modifiable indépendante des modifications ultérieures de cette ArrayList.','[Ada, Linus] ~ Le record ne conserve pas directement l’ArrayList fournie.','[] ~ La copie contient les éléments présents au moment de sa création.','UnsupportedOperationException ~ L’ajout porte sur l’ArrayList origine, qui reste modifiable.'],api+'java/util/List.html#copyOf(java.util.Collection)','[Ada]');
add('objects','enums','Quelle valeur le constructeur d’enum associe-t-il à cette constante ?',
 'enum Niveau {\n    BAS(1), HAUT(3);\n    private final int code;\n    Niveau(int code) { this.code = code; }\n    int code() { return code; }\n}\nSystem.out.print(Niveau.HAUT.code());',
 ['+3 ~ La constante HAUT est construite avec l’argument 3.','1 ~ Il s’agit du code de BAS ; le code n’est pas l’ordinal.','0 ~ Le constructeur initialise le champ code.','Erreur de compilation ~ Un enum peut déclarer un champ, un constructeur et une méthode.'],jls+'8.html#jls-8.9','3');
add('objects','heritage','Quelles règles s’appliquent à une classe sealed et à ses sous-classes directes ordinaires ?',
 '',
 ['+Les sous-classes directes doivent être autorisées par la déclaration sealed ~ Elles sont indiquées ou inférées selon les règles de permits.','+Une sous-classe directe ordinaire doit être final, sealed ou non-sealed ~ Elle doit indiquer comment sa branche peut se poursuivre.','Une sous-classe non-sealed est forcément immuable ~ Le modificateur concerne l’héritage, pas l’état.','Une classe sealed interdit tout héritage, même aux classes permises ~ Elle autorise précisément une liste restreinte de sous-types directs.'],jls+'8.html#jls-8.1.6');
add('objects','surcharge','Quelle surcharge est la plus spécifique pour l’argument null ?',
 'class Choix {\n    static String lire(Object valeur) { return "objet"; }\n    static String lire(String valeur) { return "chaine"; }\n}\nSystem.out.print(Choix.lire(null));',
 ['+chaine ~ null est compatible avec les deux types, et String est plus spécifique qu’Object.','objet ~ La surcharge Object n’est pas la plus spécifique.','Erreur de compilation ~ Ces deux signatures ne rendent pas l’appel ambigu car String est un sous-type d’Object.','NullPointerException ~ Aucune méthode ne déréférence l’argument null.'],jls+'15.html#jls-15.12.2','chaine');
add('objects','objets','Après ces affectations, quelle référence garde le premier objet accessible ?',
 'Object a = new Object(); // premier objet\nObject b = a;\na = new Object(); // second objet\n// On utilise ensuite b.',
 ['+b désigne toujours le premier objet ~ Réaffecter a ne modifie pas la valeur de référence déjà copiée dans b.','a et b désignent forcément le second objet ~ L’affectation à a ne réaffecte pas b.','Le premier objet est nécessairement collecté dès la nouvelle affectation ~ Il reste accessible via b.','L’affectation à a déclenche immédiatement une collecte ~ Java ne garantit pas de collecte à cet instant.'],jls+'4.html#jls-4.3.1');
reject('objects','annotations','Cette interface peut-elle porter @FunctionalInterface ?',
 '@FunctionalInterface\ninterface DoubleAction {\n    void ouvrir();\n    void fermer();\n}',
 ['+Erreur de compilation ~ Deux méthodes abstraites indépendantes empêchent cette interface d’être fonctionnelle.','Compilation réussie : l’annotation fusionne les deux méthodes ~ L’annotation vérifie le contrat ; elle ne transforme pas les méthodes.','Compilation réussie : toute interface est fonctionnelle ~ Une seule méthode abstraite fonctionnelle est requise.','Exception au chargement de la classe ~ Le problème est signalé à la compilation.'],api+'java/lang/FunctionalInterface.html');
reject('exceptions','exceptions-types','Pourquoi ce lancement d’exception personnalisée ne compile-t-il pas ?',
 'class Incident extends Exception {}\nclass Service {\n    static void executer() { throw new Incident(); }\n}',
 ['+Incident est checked et executer ne l’intercepte ni ne la déclare ~ Étendre Exception directement crée ici une exception checked.','Toute exception personnalisée doit étendre RuntimeException ~ Une exception personnalisée peut être checked.','Une méthode static ne peut pas lancer d’exception ~ static ne supprime pas cette possibilité.','Il manque forcément un constructeur avec message ~ Le constructeur sans argument implicite suffit à new Incident().'],jls+'11.html#jls-11.2');
reject('exceptions','exceptions-redefinition','Cette redéfinition peut-elle élargir l’exception checked déclarée ?',
 'class Parent { void lire() throws java.io.IOException {} }\nclass Enfant extends Parent {\n    @Override void lire() throws Exception {}\n}',
 ['+Erreur de compilation ~ Exception est plus générale que IOException et élargit le contrat checked de la méthode héritée.','Compilation réussie car Exception est un supertype ~ Cette généralisation est précisément interdite pour une redéfinition.','Compilation réussie car le corps ne lance rien ~ La déclaration throws doit elle aussi respecter le contrat.','IOException lors de la création d’Enfant ~ Il n’y a pas d’exécution car la déclaration est invalide.'],jls+'8.html#jls-8.4.8.3');
reject('exceptions','exceptions-controle','Peut-on réaffecter le paramètre de ce multi-catch ?',
 'try {\n    throw new IllegalArgumentException();\n} catch (IllegalArgumentException | IllegalStateException e) {\n    e = null;\n}',
 ['+Erreur de compilation ~ Le paramètre d’un multi-catch est implicitement final.','Compilation réussie car e est une variable locale ordinaire ~ Le multi-catch impose une restriction supplémentaire.','NullPointerException ~ Affecter null ne déréférence pas e ; ici la compilation échoue d’abord.','IllegalArgumentException non interceptée ~ Le type correspond au catch, mais le corps ne compile pas.'],jls+'14.html#jls-14.20');
add('exceptions','exceptions-types','Quel message getCause permet-il de retrouver ?',
 'var panne = new RuntimeException("traitement", new java.io.IOException("disque"));\nSystem.out.print(panne.getCause().getMessage());',
 ['+disque ~ La cause est l’IOException fournie au constructeur.','traitement ~ C’est le message de panne elle-même, obtenu par panne.getMessage().','null ~ Une cause explicite est fournie au constructeur.','Erreur de compilation ~ Une RuntimeException peut encapsuler une exception checked comme cause.'],api+'java/lang/Throwable.html#getCause()','disque');
add('collections','tri-recherche','Quel point d’insertion ce résultat de recherche binaire encode-t-il ?',
 'var nombres = List.of(2, 4, 8);\nSystem.out.print(Collections.binarySearch(nombres, 6));',
 ['+-3 ~ 6 s’insérerait à l’indice 2 ; le résultat vaut -(2)-1.','2 ~ Un indice non négatif indiquerait un élément trouvé.','-2 ~ Cette valeur encoderait le point d’insertion 1.','3 ~ 6 n’appartient pas à la liste et ne reçoit donc pas un indice trouvé.'],api+'java/util/Collections.html#binarySearch(java.util.List,T)','-3');
add('collections','maps','Que fait merge si sa fonction renvoie null pour une clé existante ?',
 'var valeurs = new HashMap<String, Integer>();\nvaleurs.put("A", 2);\nvaleurs.merge("A", 3, (ancien, nouveau) -> null);\nSystem.out.print(valeurs.containsKey("A"));',
 ['+false ~ Un résultat null de la fonction de combinaison supprime l’association existante.','true ~ La fonction ne conserve pas ici l’ancienne valeur.','NullPointerException ~ Le résultat null de cette fonction est autorisé et possède un sens précis.','Erreur de compilation ~ La fonction peut renvoyer null pour son résultat Integer.'],api+'java/util/Map.html#merge(K,V,java.util.function.BiFunction)','false');
add('collections','deque','Dans quel ordre cette utilisation en file retire-t-elle les éléments ?',
 'Deque<Integer> file = new ArrayDeque<>();\nfile.offer(4);\nfile.offer(5);\nSystem.out.print(file.remove() + ":" + file.remove());',
 ['+4:5 ~ offer ajoute en queue et remove retire en tête : premier entré, premier sorti.','5:4 ~ Ce serait un usage en pile avec push/pop.','4:4 ~ Le premier remove retire effectivement l’élément 4.','NoSuchElementException ~ Deux éléments sont disponibles pour les deux retraits.'],api+'java/util/Deque.html','4:5');
add('collections','tableaux','Les lignes de ce tableau doivent-elles avoir la même longueur ?',
 'int[][] matrice = {{1, 2, 3}, {4}};\nSystem.out.print(matrice.length + ":" + matrice[1].length);',
 ['+2:1 ~ Le tableau extérieur contient deux références ; sa seconde ligne contient un entier.','3:1 ~ La longueur extérieure est le nombre de lignes, pas la largeur de la première.','2:3 ~ Chaque ligne possède sa propre longueur.','Erreur de compilation ~ Les tableaux de tableaux peuvent être irréguliers.'],jls+'10.html#jls-10.1','2:1');
reject('collections','generiques','Quel type de lecture ce wildcard inférieur garantit-il ?',
 'List<? super Integer> valeurs = new ArrayList<Number>();\nvaleurs.add(3);\nInteger nombre = valeurs.get(0);',
 ['+Erreur de compilation ~ La lecture n’est garantie qu’en Object ; le type capturé pourrait aussi accueillir d’autres valeurs.','nombre vaut 3 ~ La valeur présente à l’exécution ne change pas le type statique de get.','L’appel add est interdit ~ Un Integer peut être ajouté avec ? super Integer.','ClassCastException ~ L’affectation est refusée à la compilation avant tout cast implicite vers Integer.'],jls+'4.html#jls-4.5.1');
add('collections','collections-sequencees','Que fait addFirst lorsqu’un LinkedHashSet contient déjà l’élément ?',
 'var lettres = new LinkedHashSet<>(List.of("A", "B", "C"));\nlettres.addFirst("B");\nSystem.out.print(lettres);',
 ['+[B, A, C] ~ L’élément déjà présent est repositionné au début sans créer de doublon.','[A, B, C] ~ addFirst impose ici une nouvelle position d’ordre de rencontre.','[B, A, B, C] ~ Un Set ne conserve pas de doublon égal.','UnsupportedOperationException ~ LinkedHashSet prend en charge cette opération en Java 21.'],api+'java/util/LinkedHashSet.html#addFirst(E)','[B, A, C]');
add('streams','concatenation','Quel ordre et quels doublons Stream.concat conserve-t-il ?',
 'var gauche = Stream.of("A", "B");\nvar droite = Stream.of("B", "C");\nSystem.out.print(Stream.concat(gauche, droite).toList());',
 ['+[A, B, B, C] ~ Les éléments ordonnés du premier stream précèdent ceux du second ; concat ne déduplique pas.','[A, B, C] ~ Il faudrait aussi distinct pour supprimer le doublon.','[B, C, A, B] ~ Les deux sources ne sont pas inversées.','Erreur de compilation ~ concat accepte deux streams de String.'],api+'java/util/stream/Stream.html#concat(java.util.stream.Stream,java.util.stream.Stream)','[A, B, B, C]');
add('streams','stream-sources','Quel résultat average fournit-il pour ce stream primitif ?',
 'System.out.print(IntStream.of(2, 4, 6).average().orElse(-1));',
 ['+4.0 ~ La moyenne des trois entiers est un double, contenu dans un OptionalDouble présent.','4 ~ print reçoit ici un double, affiché 4.0.','-1.0 ~ Le stream n’est pas vide, donc la valeur de repli n’est pas utilisée.','Erreur de compilation ~ average sur IntStream renvoie un OptionalDouble.'],api+'java/util/stream/IntStream.html#average()','4.0');
add('streams','groupement','Combien de partitions et d’éléments pairs ce collecteur produit-il ?',
 'var groupes = Stream.of(1, 3, 5).collect(Collectors.partitioningBy(n -> n % 2 == 0));\nSystem.out.print(groupes.size() + ":" + groupes.get(true).size());',
 ['+2:0 ~ partitioningBy conserve les clés true et false, même si la partition true est vide.','1:0 ~ La partition vide reste représentée dans la map.','2:3 ~ Les trois valeurs sont impaires et appartiennent à false.','NullPointerException ~ La clé true possède une liste vide, pas une valeur absente.'],api+'java/util/stream/Collectors.html#partitioningBy(java.util.function.Predicate)','2:0');
add('streams','pipeline','Quelles affirmations sont garanties pour ce pipeline sans opération terminale ?',
 'var compteur = new AtomicInteger();\nvar stream = Stream.of("A", "B").peek(s -> compteur.incrementAndGet());',
 ['+peek n’est pas exécuté à ce stade ~ Les opérations intermédiaires sont paresseuses.','+compteur.get() vaut encore 0 juste après ces déclarations ~ Aucun parcours terminal n’a été lancé.','La création du stream exécute peek deux fois ~ La description du pipeline n’est pas son exécution.','peek est une opération terminale ~ peek est une opération intermédiaire et renvoie un stream.'],api+'java/util/stream/Stream.html#peek(java.util.function.Consumer)');
add('streams','lambdas','Quel argument fournit l’objet receveur à cette référence de méthode non liée ?',
 'java.util.function.BiFunction<String, Integer, String> suffixe = String::substring;\nSystem.out.print(suffixe.apply("certification", 4));',
 ['+ification ~ Le premier argument devient le receveur String et le second l’indice de substring(int).','cert ~ substring conserve le suffixe à partir de l’indice 4.','ification4 ~ Aucun argument n’est concaténé au résultat.','Erreur de compilation ~ Une méthode d’instance peut être référencée via son type, le receveur devenant le premier argument.'],jls+'15.html#jls-15.13','ification');
add('streams','optional','Le fournisseur de repli est-il exécuté pour cet Optional présent ?',
 'var appels = new AtomicInteger();\nString resultat = Optional.of("présent").orElseGet(() -> {\n    appels.incrementAndGet();\n    return "repli";\n});\nSystem.out.print(resultat + ":" + appels.get());',
 ['+présent:0 ~ orElseGet n’appelle son fournisseur que si l’Optional est vide.','présent:1 ~ Le fournisseur n’est pas évalué pour cette valeur présente.','repli:1 ~ La valeur présente est conservée.','Erreur de compilation ~ La lambda renvoie le String attendu par le fournisseur.'],api+'java/util/Optional.html#orElseGet(java.util.function.Supplier)','présent:0');
add('modules','modules-acces','Que permet un open module, sans directive exports supplémentaire ?',
 'open module bibliotheque {\n    requires java.logging;\n}',
 ['+Ses packages sont ouverts à la réflexion profonde des autres modules ~ open module ouvre tous les packages du module.','+Les accès ordinaires au code source restent soumis aux exports et aux autres règles d’accès ~ Une ouverture ne remplace pas un export.','Tous les types publics sont automatiquement importables dans le code source de n’importe quel module ~ L’ouverture seule ne les exporte pas.','Le module ne peut plus déclarer de dépendance requires ~ open ne supprime pas les dépendances.'],jls+'7.html#jls-7.7');
add('modules','modules-compilation','Quelle commande compile Main.java en ciblant les règles et API de Java 21 ?',
 '',
 ['+javac --release 21 -d out Main.java ~ --release fixe la version cible et -d le dossier des classes produites.','java --release 21 Main.java ~ Le lanceur java ne possède pas cette option de compilation.','jar --release 21 Main.java ~ L’outil jar n’est pas le compilateur des sources Java.','javac -d 21 --release out Main.java ~ Les valeurs du dossier et de la version sont inversées.'],'https://docs.oracle.com/en/java/javase/21/docs/specs/man/javac.html');
add('modules','modules-compilation','Quel est l’effet de « jar --create --file application.jar -C classes . » si classes contient les fichiers compilés ?',
 '',
 ['+Le contenu de classes est archivé à la racine du JAR ~ -C change le dossier pris comme base pour les éléments suivants.','Les sources Java présentes sont aussi compilées ~ jar archive des fichiers ; il ne remplace pas javac.','Une image runtime incluant la JVM est créée ~ C’est le rôle de jlink.','Le JAR devient nécessairement modulaire explicite ~ Un descripteur module-info.class valide est nécessaire à ce statut.'],'https://docs.oracle.com/en/java/javase/21/docs/specs/man/jar.html');
add('concurrency','threads-virtuels','Quel statut daemon un thread virtuel Java 21 possède-t-il ?',
 'Thread t = Thread.ofVirtual().unstarted(() -> {});\nSystem.out.print(t.isDaemon());',
 ['+true ~ Les threads virtuels sont toujours des threads daemon.','false ~ Le statut daemon d’un thread virtuel n’est pas celui d’un thread de plateforme ordinaire par défaut.','null ~ isDaemon renvoie un boolean.','IllegalThreadStateException ~ Lire ce statut ne nécessite pas de démarrer le thread.'],api+'java/lang/Thread.html#isDaemon()','true');
add('concurrency','verrous','Quelle valeur deux threads obtiennent-ils en partageant ce même compteur synchronisé ?',
 'class Compteur {\n    private int valeur;\n    synchronized void incrementer() { valeur++; }\n    synchronized int lire() { return valeur; }\n}\nvar compteur = new Compteur();\nRunnable travail = () -> {\n    for (int i = 0; i < 100; i++) compteur.incrementer();\n};\nThread a = new Thread(travail);\nThread b = new Thread(travail);\na.start();\nb.start();\na.join();\nb.join();\nSystem.out.print(compteur.lire());',
 ['+200 ~ Les deux threads utilisent le même moniteur d’instance et les deux join attendent les 200 incrémentations.','100 ~ Les deux threads effectuent chacun 100 appels.','Une valeur de 100 à 200 selon l’ordonnancement ~ La synchronisation évite ici les incrémentations perdues.','Erreur de compilation ~ Une instance partagée peut être capturée par les deux tâches.'],jls+'8.html#jls-8.4.3.6','200');
add('concurrency','executeurs','Que signalent les indicateurs d’une FutureTask annulée avant démarrage ?',
 'var tache = new FutureTask<Integer>(() -> 7);\ntache.cancel(false);\nSystem.out.print(tache.isCancelled() + ":" + tache.isDone());',
 ['+true:true ~ Une annulation réussie termine logiquement le Future, sans exécuter le calcul.','true:false ~ isDone vaut aussi true après annulation.','false:true ~ L’annulation avant démarrage peut réussir.','Erreur de compilation ~ FutureTask implémente les opérations de Future.'],api+'java/util/concurrent/FutureTask.html','true:true');
add('concurrency','streams-paralleles','Quelle somme cette réduction parallèle sans état partagé calcule-t-elle ?',
 'System.out.print(IntStream.rangeClosed(1, 100).parallel().sum());',
 ['+5050 ~ sum combine les sommes partielles ; tous les entiers de 1 à 100 sont inclus.','Une valeur variable selon l’ordonnancement ~ Cette réduction ne dépend pas d’une collection mutable partagée par l’application.','100 ~ sum n’est pas count.','Erreur de compilation ~ Un IntStream peut être traité en parallèle.'],api+'java/util/stream/IntStream.html#sum()','5050');
add('concurrency','verrous','Que se passe-t-il si le thread courant appelle wait sans posséder le moniteur ?',
 'Object verrou = new Object();\nverrou.wait(1);',
 ['+IllegalMonitorStateException ~ wait exige que le thread courant possède le moniteur de l’objet.','Le thread attend normalement une milliseconde ~ Le timeout ne dispense pas de posséder le moniteur.','Erreur de compilation ~ Dans une méthode déclarant throws Exception, la contrainte d’InterruptedException est satisfaite.','Le verrou est automatiquement acquis avant l’attente ~ wait ne réalise pas cette acquisition initiale.'],api+'java/lang/Object.html#wait(long)');
additionalQuestions.at(-1).check={kind:'throws',body:additionalQuestions.at(-1).code,exception:'IllegalMonitorStateException'};
add('io','fichiers-ressources','Quel contenu reste après deux écritures sans option particulière ?',
 'Path fichier = Files.createTempFile("qcm-", ".txt");\ntry {\n    Files.writeString(fichier, "ancien");\n    Files.writeString(fichier, "neuf");\n    System.out.print(Files.readString(fichier));\n} finally {\n    Files.deleteIfExists(fichier);\n}',
 ['+neuf ~ Par défaut, writeString tronque le fichier existant avant d’écrire le nouveau contenu.','ancienneuf ~ APPEND devrait être demandé pour ajouter à la suite.','neufien ~ Le contenu précédent est tronqué ; il ne reste pas de suffixe.','FileAlreadyExistsException ~ Un fichier existant est accepté avec les options par défaut de writeString.'],api+'java/nio/file/Files.html#writeString(java.nio.file.Path,java.lang.CharSequence,java.nio.file.OpenOption...)','neuf');
add('io','fichiers','Quel parcours ce Files.list effectue-t-il dans un répertoire initialement vide ?',
 'Path dossier = Files.createTempDirectory("qcm-");\nPath fichier = dossier.resolve("memo.txt");\ntry {\n    Files.createFile(fichier);\n    try (var chemins = Files.list(dossier)) {\n        System.out.print(chemins.count());\n    }\n} finally {\n    Files.deleteIfExists(fichier);\n    Files.deleteIfExists(dossier);\n}',
 ['+1 ~ list expose les entrées immédiates ; seul memo.txt est présent, et le stream est fermé par try-with-resources.','2 ~ Le répertoire dossier lui-même n’est pas une entrée de sa propre liste.','0 ~ Le fichier a été créé avant le parcours.','Erreur de compilation ~ Le Stream<Path> obtenu est AutoCloseable.'],api+'java/nio/file/Files.html#list(java.nio.file.Path)','1');
add('io','serialisation','Quelle valeur retrouve ce champ transient après la désérialisation standard ?',
 'class Donnee implements java.io.Serializable {\n    int nombre = 7;\n    transient int cache = 9;\n}\nvar tampon = new java.io.ByteArrayOutputStream();\ntry (var sortie = new java.io.ObjectOutputStream(tampon)) {\n    sortie.writeObject(new Donnee());\n}\ntry (var entree = new java.io.ObjectInputStream(\n        new java.io.ByteArrayInputStream(tampon.toByteArray()))) {\n    Donnee copie = (Donnee) entree.readObject();\n    System.out.print(copie.nombre + ":" + copie.cache);\n}',
 ['+7:0 ~ nombre est restauré ; cache est transient et conserve la valeur par défaut de int, sans réexécuter son initialiseur.','7:9 ~ L’initialiseur du champ de cette classe Serializable ordinaire n’est pas rejoué à la désérialisation.','0:0 ~ Le champ nombre non transient est bien sauvegardé.','NotSerializableException ~ La classe implémente Serializable et ne contient que des champs primitifs.'],api+'java/io/Serializable.html','7:0');
add('io','flux','Quelles précautions sont nécessaires avec System.console() ?',
 '',
 ['+Vérifier que le résultat n’est pas null avant de l’utiliser ~ Certains environnements ne fournissent aucune console à la JVM.','+readPassword renvoie un tableau char[] ~ Ce n’est pas une méthode renvoyant directement une String.','System.console renvoie toujours un objet Console dans un IDE ~ La disponibilité dépend de l’environnement d’exécution.','readLine renvoie un InputStream ~ Cette méthode lit une ligne et renvoie une String, ou null à la fin du flux.'],api+'java/io/Console.html');
add('io','logging','Le fournisseur de message est-il évalué quand le logger est sur OFF ?',
 'var logger = java.util.logging.Logger.getAnonymousLogger();\nlogger.setLevel(java.util.logging.Level.OFF);\nvar constructions = new AtomicInteger();\nlogger.info(() -> {\n    constructions.incrementAndGet();\n    return "message";\n});\nSystem.out.print(constructions.get());',
 ['+0 ~ Le niveau INFO est refusé par ce logger ; le Supplier n’a pas à construire le message.','1 ~ La surcharge Supplier diffère la construction jusqu’à l’acceptation du niveau.','OFF ~ Le programme affiche le compteur, pas le niveau du logger.','Erreur de compilation ~ Logger.info possède une surcharge acceptant Supplier<String>.'],'java.logging/java/util/logging/Logger.html#info(java.util.function.Supplier)','0');
add('locale','bundles','Une clé absente du bundle enfant peut-elle être retrouvée dans son parent ?',
 'class Parent extends ListResourceBundle {\n    protected Object[][] getContents() {\n        return new Object[][] {{"salutation", "Bonjour"}};\n    }\n}\nclass Enfant extends ListResourceBundle {\n    Enfant() { setParent(new Parent()); }\n    protected Object[][] getContents() { return new Object[0][]; }\n}\nSystem.out.print(new Enfant().getString("salutation"));',
 ['+Bonjour ~ getString cherche aussi dans la chaîne des parents quand la clé est absente du bundle courant.','null ~ La clé est présente chez le parent explicitement associé.','MissingResourceException ~ La recherche trouve ici une traduction héritée.','Erreur de compilation ~ Une sous-classe peut établir son parent via setParent.'],api+'java/util/ResourceBundle.html#getString(java.lang.String)','Bonjour');
add('locale','messages','Comment MessageFormat interprète-t-il cette apostrophe doublée ?',
 'var format = new MessageFormat("L\'\'examen : {0}", Locale.FRANCE);\nSystem.out.print(format.format(new Object[] {"Java"}));',
 ['+L\'examen : Java ~ Deux apostrophes dans le motif représentent une apostrophe littérale ; {0} reste un emplacement.','L\'\'examen : Java ~ L’apostrophe doublée n’est pas reproduite deux fois dans le résultat.','Lexamen : {0} ~ Les deux apostrophes ne démarrent pas une zone de texte échappée.','Erreur de compilation ~ Les apostrophes sont autorisées dans une chaîne délimitée par des guillemets doubles.'],api+'java/text/MessageFormat.html',"L'examen : Java");
