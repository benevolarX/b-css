

Il y a quelques années, j'ai re-découvert le web à travers 
l'évolution du front-end.

Je n'avais jusqu'alors connu que le Server Side Rendering 
et les possibilités offertes par le js moderne m'ont 

Au delà de js, j'ai aussi pu découvrir les nouveautés css 
que sont flex et grid puis les débuts des variables css.

Quand je repense au nombre d'heures passés à chercher 
commencer centrer une div, je suis heureux de voir 
que mon problème a pu finalement trouver une solution 
après la dépréciation de <center></center>

Pour mettre en pratique ces nouveautés, j'ai souhaité 
créé mon propre framework css mais j'ai commis plusieurs 
erreurs que j'aimerai corriger dans la nouvelle  version.

1) Je n'avais aucun but précis
2) Je ne maîtrisai pas totalement ce que j'écrivais
3) Je me suis perdu en cours de route sans savoir si je devai enlever 
ou ajouter des éléments à mon projet

Afin de remédier à ces problèmes je souhaite dans un premier temps

1) Définir clairement mes objectifs vis à vis de ce projet 
2) Ne jamais écrire de ligne que je ne comprends pas 
3) Ne pas continuer de coder si jamais je me perd dans mon code ou 
si je perds de vu l'objectif fixé.

## C'est quoi b-css v1.0 ?

b-css est un micro-framework css (pas de js) ayant 
pour but d'être une boîte à outils sans pour autant 
imposer un style (coloré) par défaut. 

Je m'explique : 

Même si certains framework sont créé uniquement 
dans le but de donner une esthétique par défaut 
(sans classe css); la plupart des framework css 
sont multi-tâches, ils servent dans des projets 
très divers et sont souvent compatible avec 
les web components.

Il y a donc toujours un compromis entre : 
- légèreté (peu de k.o. de code) 
- la polyvalence (responsive)
- l'esthétique 

Les micro-framework sans classe visent l'esthétique et 
la légèreté au détriment de la polyvalence.

Les framework complet optent pour l'esthétique et 
la polyvalence au détriment de la légèreté. 
(même si tailwind a son outil pour virer le css inutilisé)

Je souhaite créé un micro-framework basé sur la 
légèreté et la polyvalence au détriment de l'esthétique.

## QUOI? Un framework pour créer des sites moches ?

Exactement. Eu... non ! Pas tout à fait. 
Je souhaite garder l'utilisation des variables css 
mais sans leur donner de valeur par défaut ni 
de valeur de base tout court. 

Imaginons que vous utilisiez une balise avec une classe .primary
Cette classe aura un css associé pour sa couleur de font et 
sa couleur de texte.

.primary {
	color: var(--color-primary);
	background-color: var(--bg-primary);
}

Les variables associés seront présentées dans la 
doc ainsi que leur utilisation dans le code 
afin de savoir ce qui est affecté par cette variable.
Cependant elle ne sera jamais défini.
C'est vous qui choisissez de définir cette variable ou non.

Le but c'est de pouvoir manipuler le css à sa guise 
sans confondre son css avec celui de base du framework.

De plus, il est pour moi inutile d'alourdir le code avec 
des valeurs par défaut si c'est pour les modifier après.

Cependant, je mettrais à disposition un fichier de variable 
initialisé pour que les utilisateurs puissent avoir une vision 
d'ensemble des variables disponible. (Je ne garanti toujours 
pas l'esthétique du résultat c'est une simple démo technique)

Concernant la découpe non pas en aspect-ration 16/9 mais en 
13/8 c'est un choix personnel parce que j'aime les multiples de 12.
à la base c'était du 1248/768 mais après calcul de PGCD, 
écrire 13/8 était plus court pour un framework léger.
Il en va de même pour certaines couleurs données en hexa à 3 valeurs 


Pour le responsive, je découperai mon projet de tel sorte que 
je puisse créé un build mobile first ET un build desktop first.

Ainsi que quelques classes utilitaires fort sympatique concernant 
la gestion des flex et des grid avec des préfix sm, md, lg et xl.

(pas de xs ni de xxl de prévu pour le moment, je vois mal les 
nouveaux modèles de téléphones descendre sous la barre des 2" 
ni l'utilité d'un écran plus large qu'un bureau.

Donc je résume : 

- classes responsives préfixés sm, md, lg et xl pour flex et grid uniquement.
- variables utilisées mais non initialisés décrit dans la doc 
- code léger avec un style non défini mais un moyen de styliser "opinionated" 
via des variables css 







