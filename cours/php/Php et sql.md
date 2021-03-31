# PHP et SQL

On va utiliser une bibliothèque de PHP qui s'appelle PDO.

## Connexion à la base de données

```php
$pdo = new PDO('mysql:host=localhost;dbname=classicmodels;charset=UTF8', 'utilisateur', 'mot de passe', [
    // N'affiche que les index portant le nom de champs
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    // Affiche les erreurs SQL
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);
```

Le premier paramètre s'appelle le **DSN** (*Data Source Name*).
Il est lui-même décomposé en 3 parties : l'hôte (l'url du serveur mysql), le nom de la base de données et l'encodage.
Le deuxième paramètre est le nom d'utilisateur et le troisième paramètre le mot de passe.
Le quatrième paramètre est facultatif, c'est un tableau contenant les options de configuration de notre connexion à la base de données.

## Requête SELECT

3 étapes : 
1. Préparation de la requête SQL (requête SQL écrite mais pas encore exécutée au niveau du serveur)
2. Exécution de la requête
3. Récupération des résultats

```php
$query = $pdo->prepare('
    SELECT ...
    FROM
');

$query->execute();

// Récupération de tous les résultats de la requête, stockés dans une variable
$results = $query->fetchAll();

$query = $pdo->prepare('
    SELECT customerNumber, customerName
    FROM customers
    WHERE customerNumber = ?
');

$customerId = 103;

$query->execute([
    $customerId     // Remplace le premier point d'interrogation dans la requête préparée
]);

// Récupération du premier résultat trouvé
$customer = $query->fetch();
```

## Requête INSERT

```php
$query = $pdo->prepare('
    INSERT INTO productlines (productLine, textDescription) VALUES (?, ?)
');

$query->execute([
    'Spaceships',
    'Comme dans Star Wars'
]);
```

## Requête UPDATE
```php
$query = $pdo->prepare('
    UPDATE offices SET city = ? WHERE officeCode = ?
');

$query->execute([
    'Strasbourg',
    '4'
]);
```

## Requête DELETE
```php
$query = $pdo->prepare('
    DELETE FROM offices WHERE officeCode = ?
');

$query->execute([
    '4'
]);
```