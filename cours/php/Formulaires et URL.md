# Transmettre des informations de page en page

PHP, à l'aide de deux superglobales, *$_GET* et *$_POST*, peut passer des informations d'une page à une autre.
GET correspond à un envoi de données via l'URL. 

Contrairement à la méthode GET, lors de l'envoi d'une méthode POST les données ne sont pas visibles dans l'URL, c'est donc cette méthode qui est privilégiée la plupart du temps dans les formulaires.

## URL

Il est possible de récupérer des informations stockées dans l'URL.

Les données peuvent être stockées dans la **chaîne de requête** (toute la partie après le "?" dans l'url) et récupérées à l'aide de la variable *$_GET* de PHP. 

Par exemple l'url https://www.monsite.fr/?page=2 permettra de récupérer le numéro de la page dans le tableau *$_GET*.

```php
var_dump($_GET['page']);        // Affichera "2"
```

Autre exemple avec l'url https://www.monsite.fr/?name=toto&age=42 : les données toto et 42 seront récupérées dans le tableau *$_GET*.

```php
var_dump($_GET['name']);        // Affichera "toto"
var_dump($_GET['age']);         // Affichera "42"
```

*NB : Chacune des données dans l'url est séparée par le caractère "&".*

Toutes les données stockées dans la chaîne de requête constituent les éléments du tableau *$_GET*. Essayer d'accéder à une donnée n'étant pas présente dans l'url donnera lieu à une erreur PHP.

```php
var_dump($_GET['date']);        // "undefined index date"
```

Vous pouvez utiliser les fonctions *isset* ou *array_key_exist* pour vérifier l'existence d'une donnée dans l'url.

```php
if (! isset($_GET['date'])) {
    // L'index "date" n'existe pas dans le tableau $_GET
    // Il n'y a pas de "date" dans la chaîne de requête de l'url
}
```

## Formulaires

Les formulaires en PHP vont nous permettre de récupérer des données saisies par l'utilisateur.
Lorsque la méthode (l'attribut *method*) n'est pas précisée dans le formulaire, par défaut la méthode GET est appelée. 
De même si l'url (l'attribut *action*) n'est pas précisée dans le formulaire, par défaut il est envoyé sur la même page.

### Principe

Lorsqu'un formulaire est soumis (quand on envoie le formulaire à l'aide du bouton), les données du dit formulaire sont envoyées sur une autre page, celle qui est précisée dans l'attribut "action" du formulaire. Si cet attribut est omis, on renvoie par défaut sur la page courante. Les données récupérées sont celles des champs contenant un attribut "name".
Les données sont récupérées dans une superglobale PHP : le tableau $_GET ou le tableau $_POST.

### Exemple avec GET

```html
<form action="form.php">
    <div class="form-group">
        <label for="firstname">Prénom</label>
        <input name="firstname" id="firstname" type="text" required minlength="3">
    </div>
    <div class="form-group">
        <label for="lastname">Nom</label>
        <input name="lastname" id="lastname" type="text" required minlength="3">
    </div>
    <button class="button button-primary">Envoyer</button>
</form>
```

```php
<?php

// Les données du formulaire sont récupérées dans le tableau $_GET
var_dump($_GET);
```

### Exemple avec POST

```html
<form action="form.php" method="post">
    <div class="form-group">
        <label for="firstname">Prénom</label>
        <input name="firstname" id="firstname" type="text" required minlength="3">
    </div>
    <div class="form-group">
        <label for="lastname">Nom</label>
        <input name="lastname" id="lastname" type="text" required minlength="3">
    </div>
    <button class="button button-primary">Envoyer</button>
</form>
```

```php
<?php

// Les données du formulaire sont récupérées dans le tableau $_POST
var_dump($_POST);
```

### Vérifier qu'un formulaire a été soumis

Il est possible de vérifier si un formulaire a été soumis à l'aide la fonction *empty* de PHP.

```php
if (empty($_POST)) {
    // Formulaire non soumis
} else {
    // Formulaire soumis
}
