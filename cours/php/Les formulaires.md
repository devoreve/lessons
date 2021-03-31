# Récupérer des données en PHP

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

var_dump($_POST);
```