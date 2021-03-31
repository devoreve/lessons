# SQL

## Liens utiles
* [Sql.sh](https://sql.sh/)

## Affichage
Requêtes SELECT

### Ordre des clauses
1. SELECT
2. FROM
3. INNER JOIN
4. WHERE
5. GROUP BY
6. HAVING
7. ORDER BY

### SELECT...FROM
La clause SELECT permet de spécifier les champs qui seront affichés dans le résultat. 
La clause FROM permet de préciser dans quelle table on veut récupérer les résultats.

```sql
SELECT customerNumber, customerName, phone, addressLine1, city, postalCode
FROM customers

SELECT buyPrice, MSRP, (buyPrice * 1.2) AS buyPriceTTC, (MSRP * 1.2) AS MSRPTTC
FROM products

SELECT quantityOrdered, priceEach, productCode, (quantityOrdered * priceEach) AS totalPrice
FROM orderdetails
```

C'est le minimum à écrire pour chaque requête SQL. Il faut au-moins un SELECT et un FROM.

### ORDER BY
Clause qui permet de trier les résultats affichés.

```sql
# Tri croissant
SELECT customerNumber, customerName, phone, addressLine1, city, postalCode
FROM customers
ORDER BY customerName

# Tri décroissant
SELECT customerNumber, customerName, phone, addressLine1, city, postalCode
FROM customers
ORDER BY customerName DESC

# Plusieurs tris
# Le 2ème tri est appliqué pour les lignes ayant le même pays
SELECT country, customerName, city
FROM customers
ORDER BY country, customerName DESC
```

### WHERE
Clause qui permet de filtrer les résultats selon différents critères.

```sql
# Filtre des résultats
SELECT country, customerName, city
FROM customers
WHERE country = 'France'
ORDER BY customerName

SELECT country, customerName, city, creditLimit
FROM customers
WHERE creditLimit > 100000
ORDER BY customerName

SELECT country, customerName, city, creditLimit
FROM customers
WHERE creditLimit > 100000 AND country = 'France'
ORDER BY customerName

SELECT country, customerName, city, creditLimit
FROM customers
WHERE creditLimit > 100000 AND country = 'France' OR country = 'USA'
ORDER BY creditLimit DESC

SELECT country, customerName, city, creditLimit
FROM customers
-- WHERE creditLimit > 100000 AND country = 'France' OR country = 'USA' OR country = 'Italy' OR country = 'Australia'
WHERE creditLimit > 100000 AND country IN ('France', 'USA', 'Italy', 'Australia')
ORDER BY creditLimit DESC

SELECT country, customerName, city, creditLimit
FROM customers
WHERE customerName LIKE '%co%'
ORDER BY creditLimit DESC
```

### Aggrégations

#### COUNT
Compte le nombre de lignes. Compte le nombre de fois qu'un champ est apparu dans la table.

```sql
# Compte le nombre de clients dans la table
SELECT COUNT(customerNumber) AS totalCustomers
FROM customers

# Compte le nombre de clients français
SELECT COUNT(customerNumber) AS totalCustomers
FROM customers
WHERE country = 'France'
```

#### MAX
Affiche le maximum d'un champ dans une table.

```sql
# Récupère la valeur maximum
SELECT MAX(creditLimit) AS maxCreditLimit
FROM customers
```

#### MIN
Affiche le minimum d'un champ dans une table

```sql
# Récupère la valeur minimum
SELECT MIN(creditLimit) AS minCreditLimit
FROM customers
```

#### AVG
Affiche la moyenne d'un champ dans une table.

```sql
# Récupère la valeur moyenne
SELECT AVG(creditLimit) AS avgCreditLimit
FROM customers
```

#### SUM
Affiche la somme d'un champ dans une table

```sql
# Récupère la somme d'un champ
SELECT SUM(creditLimit) AS totalCreditLimit
FROM customers
```

### GROUP BY
Lorsque vous avez une aggrégation dans votre requête, tous les champs qui ne sont pas aggrégés 
(qui ne sont ni dans un COUNT ni dans un MAX ni dans un MIN ni dans un AVG ni dans un SUM) 
doivent être mis dans un GROUP BY

```sql
SELECT MAX(creditLimit), MIN(creditLimit), country
FROM customers
GROUP BY country

SELECT MAX(creditLimit), MIN(creditLimit), country, city
FROM customers
WHERE country = 'USA'
GROUP BY country, city
```

### HAVING
Pareil que WHERE sauf que c'est utilisé pour les champs dans des aggrégations.

```sql
SELECT SUM(amount) AS credit, customerNumber
FROM payments
GROUP BY customerNumber
HAVING credit > 20000
```

### INNER JOIN
Permet de réaliser des liaisons entre les tables qui ont des relations entres elles.
En général une relation est faite à partir d'une clé primaire (PRIMARY KEY) et une clé étrangère (FOREIGN KEY).

```sql
SELECT lastName, firstName, jobTitle, addressLine1, city
FROM employees
INNER JOIN offices ON offices.officeCode = employees.officeCode
```

## Ajout
```sql
# Une seule ligne
INSERT INTO productlines (productLine, textDescription) VALUES ('Spaceships', 'Comme dans Star Wars...')

# Plusieurs lignes
INSERT INTO productlines (productLine, textDescription) VALUES ('Spaceships', 'Comme dans Star Wars...'), ('Bikes', '...')
```

## Modification
```sql
# Attention : modifie toutes les lignes de la table offices
# Toujours mettre un filtre
UPDATE offices SET city = 'Strasbourg', postalCode = '67000'

# Modifie toutes les lignes qui correspondent à la contrainte/au filtre
UPDATE offices SET city = 'Strasbourg', postalCode = '67000' WHERE officeCode = 4
UPDATE offices SET city = 'Strasbourg', postalCode = '67000' WHERE country = 'USA'
UPDATE orders SET status = 'shipped' WHERE orderNumber = 10124
```

## Suppression
```sql
# Attention : supprime toutes les lignes de la table offices
# Toujours mettre un filtre
DELETE FROM offices

# Supprime toutes les lignes qui correspondent à la contrainte/au filtre
DELETE FROM offices WHERE country = 'USA'
DELETE FROM offices WHERE officeCode = 4
```