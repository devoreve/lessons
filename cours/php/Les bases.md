# Les bases de PHP

## Variables

Les variables permettent de stocker des informations.

### Syntaxe

Pour déclarer une variable, on utilise le caractère "$".

```php
<?php

// Déclaration de variables
$maVariable = 'Contenu de la variable';
$texte = 'Hello world';
$nombre = 42;
$booleen = true;
```

Pour modifier ou accéder à une variable, on réutilise le caractère "$" + le nom de la variable

```php
<?php

// Modification de variables
$maVariable = 'Nouveau contenu de la variable';
$nombre = 666;
$booleen = false;

// Affichage du contenu de la variable $maVariable
echo $maVariable;
```

## Types
Comme en JavaScript, les données vont être d'un certain type. Liste non exhaustive des types :

* string (chaînes de caractères)
* int (entiers)
* float (nombres à virgule)
* boolean (booléens)
* array (tableaux)
* null (absence de donnée)

### Les chaînes de caractères (string)
Une chaîne de caractère est délimitée par des guillemets (ou apostrophes).

```php
<?php

$message = 'Lorem ipsum';
$text = "Hello world";

// Pour éviter que les guillemets ou apostrophes ne soient interprétés comme le délimiteur de la chaîne
// on utilise le caractère \
$title = 'Je m\'appelle Toto';
$quote = "Un grand sage a dit : \"Le gras c'est la vie\".";
```

#### Concaténation
Contrairement au JavaScript, la concaténation en PHP se fait avec le caractère "." au lieu du "+".

```php
<?php

$name = "Toto";

echo "Bonjour " . $name;
```

#### Différence entre "" et ''

```php
<?php

$name = "Toto";

echo 'Bonjour $name';   // Affiche Bonjour $name (pas d'interprétation de la variable)
echo "Bonjour $name";   // Affiche Bonjour Toto (interprétation de la variable)
```

### Les nombres (int, float)
Pour créer un nombre, pas besoin de mettre de guillemets. Les nombres à virgule utilisent un point pour séparer les décimales.

```php
<?php

$int = 42;
$float = 3.14;
```

#### Opérations arithmétiques

Les opérations sont les mêmes que d'habitude (+, -, *, /). Les raccourcis pour les modifications de variable sont les mêmes qu'en JS.

```php
<?php

// Addition
$number = 42 + 3;
$number = $number + 3;      // Peut également s'écrire $number += 3
$number += 1;               // Peut également s'écrire $number++           

// Multiplication
$number = 5 * 2;
$number = $number * 3;      // Peut également s'écrire $number *= 3

// Soustraction
$number = 5 - 2;
$number = $number - 2;      // Peut également s'écrire $number -= 2
$number -= 1;               // Peut également s'écrire $number--

// Division
$number = 4 / 2;
$number = $number / 2;      // Peut également s'écrire $number /= 2

// Modulo (reste de la division entière)
$modulo = 10 % 3;           // Résultat : 1 (10 / 3 = 3 et il reste 1)
$modulo = 4 % 2;            // Résultat : 0 (4 / 2 = 2 et il reste 0)
```

*NB : Les raccourcis "++" et "--" permettent respectivement d'augmenter de 1 et de retrancher de 1. Il n'existe pas de tels raccourcis pour les autres opérations.*

### Les tableaux (array)
Comme en JavaScript et dans d'autres langages, on déclare les tableaux comme ceci en PHP : 

```php
<?php

// Déclaration d'un tableau vide
$array = [];

// Déclaration d'un tableau avec divers éléments
$fruits = ['Banana', 'Orange', 'Apple'];

// Ancienne syntaxe (que l'on n'utilisera plus mais que vous pouvez rencontrer sur des vieux projets ou dans la doc officielle)
$array = array();
$fruits = array('Banana', 'Orange', 'Apple');
```

Un tableau est constitué de deux choses : la clé (ou l'index) et la valeur.
La clé représente l'identifiant de la case du tableau.
La valeur représente le contenu de la case du tableau.

Règle générale : nom du tableau[clé] = valeur

#### Affichage du contenu d'un tableau

```php
<?php

$fruits = ['Banana', 'Orange', 'Apple'];

echo $fruits[1];    // Affiche Orange

echo $fruits;       // Erreur : "Array to string conversion"

// /!\ echo n'affiche que des chaînes de caractères ou des nombres

print_r($fruits);   // Affichage du tableau simple
var_dump($fruits);  // Affichage de tout le détail (type, nombre d'éléments...) du tableau
```

#### Ajout des données dans un tableau

```php
<?php

$fruits = ['Banana', 'Orange', 'Apple'];

// Syntaxe à privilégier lorsque vous ajoutez un seul élément
$fruits[] = 'Strawberry';               // Ajoute Strawberry au tableau $fruits

array_push($fruits, 'Cherryberry');     // Ajoute Cherryberry au tableau $fruits
array_push($fruits, 'Pineapple', 'Blueberry', 'Raspberry');
```

#### Tableaux associatifs

Tableau avec des clés qui ne sont pas forcément numériques et qui sont spécifiées à la déclaration.

Exemple:
```php
<?php

// Tableau dont les clés sont respectivement "firstname", "lastname" et "age"
$user = [
    'firstname' => 'John',
    'lastname' => 'Doe',
    'age' => 42
];
```

## Structures de contrôle

### Conditions

Les conditions permettent de réaliser une ou plusieurs actions en fonction d'une condition.

#### If

```php
<?php

$age = 18;

if ($age >= 18) {
    // Code
} else {
    // Code
}

if ($age == 20) {
    // Code
} elseif ($age == 30) {
    // Code
} elseif ($age == 40) {
    // Code
} elseif ($age == 50) {
    // Code
} else {
    // Code
}
```

### Switch

```php
switch ($age) {
    case 20:
        // Code
        break;
    case 30:
        // Code
        break;
    case 40:
        // Code
        break;
    case 50:
        // Code
        break;
    default:
        // Code
}
```

### Boucles

Les boucles vont permettre de répéter des instructions tant qu'une condition sera vraie.

#### While

```php
<?php

$counter = 1;

while ($counter <= 10) {
    echo $counter;
    
    $counter++;
}
```

### Do... while

```php
<?php

$counter = 1;

do {
    echo $counter;
    
    $counter++;
} while ($counter <= 10);
```

#### For

```php
<?php

for ($counter = 1; $counter <= 10; $counter++) {
    echo $counter;
}

$fruits = ['Banana', 'Orange', 'Apple'];

// On stocke le nombre total d'éléments dans une variable
// pour ne pas avoir à le recalculer à chaque tour de boucle
$totalFruits = count($fruits);  // count : compte le nombre d'éléments dans un tableau

for ($i = 0; $i < $totalFruits; $i++) {
    echo $fruits[$i];   // Element du tableau parcouru
}
```

#### Foreach

Boucle dédiée au parcours de tableau.

##### Syntaxe générale

```php
<?php

$array = ['...', '...', '...'];

// $array : Nom du tableau que vous souhaitez parcourir
// $element: Nom de la variable représentant la valeur de l'élément parcouru à chaque tour de boucle
foreach ($array as $value) {
    echo $value;
}

foreach ($array as $key => $value) {
    echo $key . ' : ' . $value;
}
```

##### Exemples

```php
<?php

$fruits = ['Banana', 'Orange', 'Apple'];

foreach ($fruits as $fruit) {
    echo $fruit;    // Element du tableau parcouru
}
```

##### Liens utiles

* [Foreach sur le site php.net](https://www.php.net/manual/fr/control-structures.foreach.php)

## Fonctions

Les fonctions sont des blocs de code réutilisables. Pour être appelée, une fonction doit être déclarée.

### Syntaxe

Déclaration d'une fonction

```php
<?php

/**
 * Retourne le maximum entre 2 nombres
 * 
 * @param int $a
 * @param int $a
 * @return int
 */
function maximum(int $a, int $b): int
{
    if ($a > $b) {
        return $a;
    } else {
        return $b;
    }
}
```

*NB : Le type des paramètres et de la valeur de retour ne sont pas obligatoires mais recommandés.*

Appel de la fonction créée

```php
$max = maximum(5, 10);
var_dump($max);         // Affiche 10
```

### Portée des variables

Contrairement au JavaScript, une variable déclarée en-dehors de la fonction ne pourra pas être utilisée. 

```php
$name = 'Toto';

function hello()
{
    echo "Bonjour " . $name;     // Erreur : la variable $name n'est pas reconnue
}

hello();
```

Le mot-clé *global* peut être utilisé pour palier ce problème. Toutefois il est recommandé d'éviter le plus possible les variables globales.
Il vaut mieux passer par des paramètres dans ce cas-là.

```php
$name = 'Toto';

function hello(string $name): void
{
    echo "Bonjour " . $name;
}

hello($name);
```

### Arguments (paramètres) passés par valeur ou par référence

* Par valeur : on passe à la fonction une copie de la donnée originale => on ne modifie pas l'original (comportement par défaut des paramètres dans les fonctions)
* Par référence : on passe à la fonction la donnée originale => toute modification entraîne un changement sur l'original

Exemple : 
```php
// Tableau original
$days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi'
];

// Fonction dont le tableau est passé par valeur
function addDay(string $dayName, array $days): array
{
    // $days contient les informations du tableau original $days
    // Copie du tableau original
    $days[] = $dayName;
    // var_dump('Copie du tableau original', $days);
    
    // On renvoie la copie du tableau modifié
    return $days;
}

// Fonction dont le tableau est passé par référence
function addDay(string $dayName, array &$days): array
{
    // $days contient les informations du tableau original $days
    // Copie du tableau original
    $days[] = $dayName;
    // var_dump('Copie du tableau original', $days);
    
    // On renvoie la copie du tableau modifié
    return $days;
}

// Affichage du tableau original
var_dump('Tableau original', $days);

$daysUpdated = addDay('Samedi', $days);

// Affichage du tableau original
var_dump('Tableau original', $days);

// Affichage du tableau renvoyé par la fonction
var_dump('Tableau modifié', $daysUpdated);
```

Bonne pratique : éviter le plus possible de passer les paramètres par référence (en utilisant le &)