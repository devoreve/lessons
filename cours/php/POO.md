# La POO en PHP

## Classes

Les classes sont les "modèles" qui vont servir à créer des objets. 

```php
<?php

// Déclaration de la classe
class Character {}

// Instanciation d'un objet Character
$hero = new Character();
```

## Propriétés/attributs et méthodes
Les propriétés représentent les caractéristiques d'une classe et s'utilisent comme des variables.
On parle parfois de variables de classe (des variables qui sont spécifiques à une classe).

Les méthodes représentent les comportements d'une classe et s'utilisent comme des fonctions (spécifiques à une classe).

Les propriétés et les méthodes sont ce qu'on appelle les membres d'une classe.

```php
<?php

// Déclaration de la classe
class Character 
{
    // Propriétés
    private int $hp;
    private int $mp;
    
    // Méthodes
    public function attack(): void 
    {
        
    }
    
    public function isAlive(): bool 
    {
        // $this fait référence à la classe elle-même
        // La "->" permet d'accéder à un membre (une propriété ou une méthode) de la classe
        return $this->hp > 0;
    }
}
```

## Visibilité
Les mots-clés "private", "public" et "protected" indiquent le niveau de visibilité d'un membre d'une classe :
* private : le membre n'est accessible que depuis la classe (en dehors on ne pourra pas y accéder)
* public : le membre est accessible partout (dans et en dehors de la classe)
* protected : le membre n'est accessible que depuis la classe ainsi que chez ses enfants

```php
<?php

// Déclaration de la classe
class Character 
{
    private int $hp;
    private int $mp;
    
    public function attack(): void {}
}

$hero = new Character();
echo $hero->hp;     // Impossible car la propriété hp est privée
$hero->attack();    // Possible car la méthode est publique
```

## Getter/Setter (ou en français accesseur/mutateur)
Permettent d'accéder à des membres privés en passant par des méthodes publiques

```php
<?php

// Déclaration de la classe
class Character 
{
    private int $hp;
    
    public function getHp(): int
    {
        return $this->hp;
    }
    
    public function setHp(int $hp): void
    {
        $this->hp = $hp;
    }
}

$hero = new Character();
echo $hero->hp;         // Impossible car la propriété hp est privée

// Modification de la valeur de la propriété hp à travers le setter (mutateur)
$hero->setHp(100);      // Possible car la méthode est publique

// Récupération de la valeur de la propriété mp à travers le getter (accesseur)
echo $hero->getHp();    // Possible car la méthode est publique
```

## Le constructeur
Lors de la création d'une instance d'une classe, une méthode est appelée automatiquement : le constructeur.

```php
<?php

// Déclaration de la classe
class Character 
{
    private int $hp;
    private int $mp;
    
    public function __construct()
    {
        echo 'Nouveau personnage créé';
    }
}

$hero = new Character();    // Affiche "Nouveau personnage créé"
```

Le constructeur n'est pas obligatoire mais recommandé pour initialiser les propriétés.

```php
<?php

// Déclaration de la classe
class Character 
{
    private int $hp;
    private int $mp;
    
    public function __construct()
    {
        $this->hp = 100;
        $this->mp = 100;
    }
}

$hero = new Character();
```

Comme n'importe quelle fonction, on peut lui passer des paramètres pour le rendre plus flexible.

```php
<?php

// Déclaration de la classe
class Character 
{
    private int $hp;
    private int $mp;
    
    public function __construct(int $hp, int $mp)
    {
        $this->hp = $hp;
        $this->mp = $mp;
    }
}

$hero = new Character(100, 50);
```

## Héritage

Une classe peut hériter des attributs (propriétés) et méthodes d'une autre classe. On parle de classe mère et classe fille (ou généralisation/spécialisation).
Même si les méthodes sont héritées, il est possible de les redéfinir.

```
class Character
{
    private int $hp;
    private int $mp;
    private string $name;
}

class Mage extends Character
{
    // Propriétés spécifiques à la classe Mage
    private array $spells;
    
    // Redéfinition du constructeur
    // On écrase le constructeur parent par le nouveau constructeur
    public function __construct()
    {
        // Appel du constructeur parent
        parent::__construct();
        
        // Code spécifique au constructeur de la classe
        // Code...
    }
}
```

## Composition

On parle de composition quand une classe utilise une autre classe.

```php
class Spell
{
    
}

class Mage
{
    private array $spells;
    
    public function addSpell(Spell $spell): void
    {
        $this->spells[] = $spell;
    }
}
```

## Classe abstraite

Une classe abstraite est une classe qui ne peut pas être instanciée (on ne peut pas faire **new NomDeLaClasse()**).
Elle peut également contenir des méthodes abstraites, des méthodes qui n'ont pas de code à l'intérieur (dans de la fonction).

```php
abstract class Character
{
    // Méthode abstraite : ce sont des méthodes qui n'ont pas de corps (pas d'instructions)
    // Elles vont devoir être redéfinies dans les classes filles (dans les enfants)
    public abstract function attack(Character $enemy): void;
}

class Knight extends Character
{
    // Knight hérite de Character qui contient une méthode abstraite, cette méthode doit être redéfinie
    public function attack(Character $enemy): void
    {
        // Code
    }
}
```

Ces méthodes abstraites devront obligatoirement être redéfinies chez chacune des classes filles qui hériteront de cette classe abstraite.

## Interface

Structure qui ne contient que des méthodes abstraites. 
Chaque classe qui implémente l'interface devra redéfinir toutes les méthodes que contient l'interface.

```php
interface AreaInterface
{
    // Méthode abstraite
    public function area(): int;
}

class Rectangle implements AreaInterface
{
    protected int $width;
    protected int $height;
    
    public function area(): int
    {
        return $this->height * $this->width;
    }
}
```

NB : Une classe peut implémenter plusieurs interfaces (mais ne peut hériter que d'une seule classe abstraite).

## Trait

Une structure qui permet de partager du code entre différentes classes.

```php
trait HealTrait
{
    public function heal(Character $character): void
    {
        $character->setHp($character->getHp() + mt_rand(5, 20));
    }
}

class Mage extends Character
{
    use HealTrait;
}

class Paladin extends Knight
{
    use HealTrait;
}

$merlin = new Mage();
$arthur = new Paladin();

$arthur->heal($merlin);
$merlin->heal($arthur);
```

NB : Comme pour les interfaces, une classe peut utiliser autant de traits qu'elle le souhaite.

## Autoloader

La fonction spl_autoload_register va enregistrer une fonction qui sera appelée à chaque fois qu'une classe est instanciée.
Elle va notamment permettre de charger automatiquement les classes (on n'aura plus besoin d'utiliser les **require** pour charger chaque fichier indépendamment).

```php
spl_autoload_register(function ($className) {
    require 'classes/' . $className . '.php';
});
```