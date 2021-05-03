# Symfony

Symfony est un framework PHP développé par la société française Sensiolabs.

## Qu'est-ce qu'un framework ?

Un framework s'apparente à une bibliothèque de fonctions mais va en plus proposer sa propre architecture.

## Liens utiles
* [Doc de Symfony](https://symfony.com/doc/current/index.html)

## Structure d'un projet

* bin : outils à lancer en ligne de commande
* config : configuration du site
* migrations : requêtes pour créer/modifier la base de données
* public : fichiers publics
* src : code source php (contrôleurs, modèles, services...)
* templates : affichage
* tests : fichiers de tests
* translations : traductions
* var : cache/logs
* vendor : bibliothèques externes

## Installation

Lancer la commande composer trouvée sur le site
```
composer create-project symfony/website-skeleton my_project_name
```
ou bien utiliser l'outil proposé par Symfony
```
symfony new my_project_name --full
```

## Modifier le chemin du cache et des logs

Dans le fichier src/Kernel.php, ajouter ces deux méthodes : 

```php
public function getCacheDir()
{
    return '/tmp/'.$this->environment.'/cache';
}

public function getLogDir()
{
    return '/tmp/'.$this->environment.'/log';
}
```

## Créer une page

1. Créer une route (une url)
2. Créer une controller s'il n'existe pas encore
3. Créer une méthode dans le contrôleur qui va être appelée lorsque l'on va sur l'url définie dans la route
4. Créer un template s'il n'existe pas encore

### Créer une route

Dans le fichier config/routes.yaml, on va créer une nouvelle route : une url avec l'action à réaliser lorsque l'on va sur cette url.

```
# Route pour la page d'accueil
index:
    path: /
    controller: App\Controller\HomeController::index
```

Lorsque l'on va sur l'url "/" (tout ce qu'il y a derrière index.php dans l'adresse) le contrôleur et la méthode spécifiée vont être appelés. Bien sûr s'ils n'existent pas, il vous faudra les créer.

### Créer le contrôleur et sa méthode

Si le contrôleur n'existe pas encore, il faut le créer. Dans le dossier src/Controller, créer une nouvelle classe Controller (celle indiquée dans le fichier de route) avec un nom de fichier portant le même nom. Par exemple on va créer un HomeController ainsi que la méthode index (nom qui a été indiqué dans la route).

```php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class HomeController
{
    public function index()
    {
        // Les méthodes des Controller doivent renvoyer une Response de Symfony
        return new Response('Hello world');
    }
}
```

### Créer le template

Le code précédent nous a permis de faire un affichage basique mais idéalement on veut afficher du html dans notre page. On va donc créer un template qui sera appelé depuis le contrôleur. Dans le dossier templates, on va créer un fichier homepage.html.twig.

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mon template twig</title>
</head>
<body>
    <p>Hello world</p>
</body>
</html>
```

Il faut ensuite mettre à jour le contrôleur pour qu'il appelle ce template.

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    public function index()
    {
        return $this->render('homepage.html.twig');
    }
}
```

## Templating

### Définition

Il s'agit d'un outil qui va permettre de bien séparer la partie logique de la partie affichage en simplifiant la gestion de cette partie affichage.

Dans le cadre d'une application web, le moteur de template va bien souvent comprendre un *layout* qui va servir de base pour tous les templates et contiendra différentes sections (ou blocs) qui pourront être redéfinis sur chacun de ces templates.

Par exemple dans Twig un bloc est représenté comme ceci :

```
{# Bloc défini dans base.html.twig #}
{% block body %}{% endblock %}
```

Voir la partie sur les blocs dans Twig pour plus d'informations.

### Twig

Twig est un moteur de template intégré à Symfony. Il a pour objectif de simplifier toute la partie affichage du html de votre application en permettant d'utiliser des blocs pour définir des sections de code dynamique (redéfinies sur chacun des templates) et en proposant une syntaxe dans les templates qui se veut plus intuitive et plus facile à lire que le couple html/php.

#### Commentaires

Comme cela a été expliqué dans la définition ci-dessus, twig propose une syntaxe alternative à php dans les templates (derrière c'est toujours du php qui est utilisé en arrière plan).

Un commentaire dans un fichier twig s'écrit comme ceci :

```
{# Un commentaire dans un fichier twig #}
```

#### Blocs

Nos templates peuvent être découpés en blocs (parfois appelés sections dans d'autres moteurs de templates), des parties de code qui peuvent être redéfinies dans les templates. Un bloc dans Twig s'écrit de cette manière :

```
{# Bloc défini dans base.html.twig #}
{% block body %}{% endblock %}
```

Ce bloc, appelé arbitrairement "body" pourra être redéfini sur chacun des templates, de cette manière là :

```
{# homepage.html.twig #}
{% block body %}
    <h1>Page d'accueil</h1>
    
    <p>...</p>
{% endblock %}

{# blog.html.twig #}
{% block body %}
    <h1>Liste des articles</h1>
    
    <ul>
        <li>...</li>
        ...
    </ul>
{% endblock %}
```

Pour redéfinir ces blocs, les templates doivent hériter du fichier twig définissant ces blocs. En général on a un fichier layout (appelé *base.html.twig* dans Symfony par défaut) qui va définir ces différents blocs et les templates pourront hériter de ce layout pour redéfinir le contenu de ces blocs.

Fichier layout

```
{# templates/base.html.twig #}
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}Accueil{% endblock %}</title>
        {% block stylesheets %}
            <link href="{{ asset('css/main.css') }}" rel="stylesheet"/>
        {% endblock %}

        {% block javascripts %}
            <script src="{{ asset('js/main.js') }}" defer></script>
        {% endblock %}
    </head>
    <body>
        <header>Footer présent sur tous les templates qui héritent de ce layout</header>
        
        {# Bloc dont le contenu est dynamique et sera redéfini sur les différents templates #}
        {% block body %}{% endblock %}
        
        <footer>Footer présent sur tous les templates qui héritent de ce layout</footer>
    </body>
</html>
```

Ce fichier contient différents blocs dynamiques qui pourront être redéfinis ou non sur chacun des templates qui héritent de ce layout. Les parties qui ne sont pas dans des blocs sont statiques et ne pourront pas être modifiées dans le templates qui héritent du layout, elles s'afficheront donc telles quelles.

Templates qui héritent de ce layout

```
{# Fichier templates/homepage.html.twig #}
{# Hérite du layout appelé base.html.twig #}
{% extends 'base.html.twig' %}

{% block body %}
    <h1>Page d'accueil</h1>
    <p>...</p>
{% endblock %}

{% block title %}Accueil{% endblock %}
```

```
{# Fichier templates/blog.html.twig #}
{# Hérite du layout appelé base.html.twig #}
{% extends 'base.html.twig' %}

{% block body %}
    <h1>Liste des articles du blog</h1>
    <ul>
        <li>...</li>
        ...
    </ul>
{% endblock %}

{% block title %}Liste des articles du blog{% endblock %}
```

Dans ces templates les blocs *title* et *body* sont redéfinis, le contenu va donc changer d'un template à l'autre. Par contre le *header* et le *footer* définis dans le layout seront affichés tels quels puisqu'ils ne sont pas contenus dans des blocs. Les blocs *stylesheets* et *javascripts* n'étant pas redéfinis dans les templates, ce sont les blocs du layout dont les templates héritent qui seront utilisés.

#### Syntaxe dans les templates

Dans les templates twig il n'est pas possible du php de manière conventionnelle, il est nécessaire de passer par la syntaxe bien spécifique de twig.

##### Variables

Pour afficher une variable dans les templates il faut utiliser les {{ }} (comme pour vuejs).
```
{{ variable }}
```

**NB : La variable doit avoir été envoyée par le contrôleur à l'aide de la méthode render**

```php
public function index(): Response
{
    $users = [
        [
            'name' => 'John Doe',
            'age' => 42
        ],
        [
            'name' => 'Jane Doe',
            'age' => 42
        ],
        [
            'name' => 'Jay doe',
            'age' => 18
        ]
    ];
    
    // Le 2ème paramètre représente les variables que l'on passe à la vue
    // Il s'agit toujours d'un tableau (il peut y avoir plusieurs variables => tableau)
    // La clé dans ce tableau représentera le nom de la variable dans le template twig, la valeur représentera le contenu de la variable
    return $this->render('users/index.html.twig', [
        'users' => $users
    ]);
}
```

```
<p>Nombre aléatoire {{ random }}</p>
```

##### Structures de contrôle

```
<ul>
    {% for user in users %}
        {% if user.age >= 18 %}
            <li>{{ user.name }} - {{ user.age }}</li>
        {% endif %}
    {% endfor %}
</ul>
```

## Routing

Le routing est un mécanisme courant dans les frameworks et Symfony n'échappe pas à la règle. Cela va permettre de créer des url personnalisées. Ces url auront l'avantage d'être un peu plus *user-friendly* et plus intéressantes pour le référencement. On ne retrouve notamment plus l'extension ".php" à la fin de l'url.

Exemples:
* https://www.monblog.fr/posts/titre-du-post (au lieu de https://www.monblog.fr/posts.php?id=5)
* https://urldusite.fr/users/2/friends

### Paramètres d'url

Ces url personnalisées peuvent contenir des données dynamiques. Par exemple dans le cas d'une url comme *https://urldusite.fr/users/2/friends*, la valeur "2" correspond à un paramètre d'url (le numéro de l'utilisateur). Ce sont des valeurs qui, contrairement au reste de l'url, vont varier et seront récupérées dans le code.

### Le routing dans Symfony

Dans Symfony il y a plusieurs façons de gérer le routing, dans des fichiers de config (au format YAML, XML ou php) ou en utilisant des annotations.

Exemple :

Fichier routes.yaml

```
home:
    path: /
    controller: App\Controller\DefaultController::index
    
hello:
    path: /hello/{name}
    controller: App\Controller\DefaultController::hello
    defaults:
        name: Toto
```

Fichier DefaultController.php

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('homepage.html.twig');
    }

    public function hello(string $name): Response
    {
        return $this->render('hello.html.twig', [
            'name' => $name
        ]);
    }
}
```

### Twig

Comme ces url sont dynamiques, il faut utiliser des fonctions spécifiques à Symfony et à Twig pour les retrouver convenablement.

```
<a href="{{ path('nom_de_la_route') }}">Lien vers l'url personnalisée</a>
```

Exemples :

Si on reprend l'exemple ci-dessus, cela donnerait :

```
<nav>
    <ul>
        <li><a href="{{ path('home') }}">Accueil</a></li>
        {# Va générer l'url /hello/Toto #}
        <li><a href="{{ path('hello', {name: 'Toto'}) }}">Accueil</a></li>
    </ul>
</nav>
```

Plus vraisemblablement vous aurez des liens dans twig qui ressembleront à cela :

```
<h1>Liste des utilisateurs</h1>

<nav>
    <ul>
        {% for user in users %}
            <li><a href="{{ path('users.show', {id: user.id}) }}">{{ user.name }}</a></li>
        {% endfor %}
    </ul>
</nav>
```

Dans la route et le contrôleur associé, on aurait cela :

```
users.show:
    path: /users/{id}
    controller: App\Controller\UserController::show
```

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
    public function show(int $id): Response
    {
        // Récupération des informations de l'utilisateur (dans la base de données par exemple)
        // correspondant à l'id stocké dans la variable $id (le paramètre de notre url)
        
        $user = ...;
        
        return $this->render('users/show.html.twig', [
            'user' => $user
        ]);
    }
}
```

## ORM

C'est un outil qui permet de faire le lien entre vos tables dans la base de données et vos classes. Par exemple les articles de la base données seront gérés à l'aide d'une classe Post. Lorsque l'on instanciera un Post cela crééra un nouvel article en base données.

Au lieu de taper une requête de type "INSERT INTO posts(...)", dans un ORM on écrirait plutôt :
```php
$post = new Post();
$post->setTitle('Hello world');
$post->setContent('Lorem ipsum...');
$post->save();
```

### Doctrine

Doctrine est l'ORM de Symfony et va permettre de gérer toute la base de données de l'application.

#### Mise en place de la base de données

1. Configurer la base de données

Modifier la ligne DATABASE_URL dans le fichier .env (à la racine du projet) en remplaçant par les bonnes valeurs.

```
DATABASE_URL="mysql://{db_user}:{db_password}@{db_host}/{db_name}?serverVersion=5.7"
```

2. Installer la base de données

Taper la commande indiquée dans la doc pour créer la base de données.

```
php bin/console doctrine:database:create
```

#### Création d'une entité

Une entité est une classe PHP qui va faire le lien avec une table dans la base de données (exemple la classe Post ci-dessus).

Pour en créer une, taper la commande indiquée dans la doc.

```
php bin/console make:entity
```

Préciser ensuite le nom de l'entité voulue (par exemple **Post**) et les différentes propriétés (qui feront le lien avec les champs dans la base de données). Suivre le guide pour la création des différentes propriétés puis taper *entrée* pour arrêter la création.

Dans votre dossier src/Entity se trouvera la classe Post créée.

#### Création de la migration

Une migration est un fichier php qui va contenir la requête SQL qui sera executée. Cette requête SQL est basée sur les entités qui ont été créées et les annotations (les commentaires *@ORM*) au-dessus des propriétés.

Pour créer une migration, taper la commande indiquée dans la doc.

```
php bin/console make:migration
```

Une fois la commande executée avec succès, un nouveau fichier sera créé dans le dossier *migrations*.

#### Migration

Une fois la migration créée, il faut maintenant l'exécuter pour mettre à jour la base de données. Taper la commande indiquée dans la doc.

```
php bin/console doctrine:migrations:migrate
```

Appuyer sur entrée dans le terminal pour valider l'action. Lorsque la migration est effectuée, la base de données sera mise à jour. Si elle n'existe pas encore, une table pour stocker la liste des migrations et celles déjà effectuées sera créée.