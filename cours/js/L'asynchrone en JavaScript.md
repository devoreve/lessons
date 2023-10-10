# L'asynchrone en JavaScript

## Définitions

### Qu'est-ce que l'asynchrone ?

L'asynchrone se réfère à des opérations qui ne se déroulent pas immédiatement dans l'ordre séquentiel du code. Au lieu de cela, elles sont planifiées pour s'exécuter en arrière-plan ou à un moment indéterminé, sans bloquer l'exécution du reste du code.

### Qu'est-ce qu'un traitement asynchrone ?

Un traitement asynchrone est une opération ou une tâche qui est effectuée de manière non bloquante. Cela signifie que le programme peut continuer à s'exécuter sans attendre la fin de cette opération. Les traitements asynchrones sont couramment utilisés pour gérer des opérations telles que les requêtes réseau, les délais d'attente, les interactions utilisateur et d'autres opérations qui peuvent prendre du temps.

### Et l'AJAX ?

Ajax (Asynchronous Javascript And XML) est une technique de programmation web qui permet de communiquer avec un serveur en arrière-plan, sans avoir besoin de recharger la page entière. Elle permet de récupérer ou d'envoyer des données au serveur de manière asynchrone, ce qui signifie que les mises à jour de la page peuvent se faire en temps réel sans interrompre l'expérience de l'utilisateur. Ajax est souvent utilisé pour créer des applications web interactives et réactives. Bien qu'il ait "XML" dans son nom, il peut être utilisé avec d'autres formats de données, tels que JSON.

## Quelques exemples de tâches asynchrones

* AJAX (XMLHttpRequest ou Fetch API) : l'envoi de requêtes HTTP asynchrones vers un serveur pour récupérer des données ou envoyer des données est une opération asynchrone courante
* setTimeout et setInterval : ces fonctions permettent de planifier l'exécution de code après un délai donné (setTimeout) ou à intervalles réguliers (setInterval)
* chargement de fichiers : lorsque vous chargez des fichiers (comme des images, des scripts ou des styles) dans une page web, cela se fait de manière asynchrone pour ne pas bloquer le rendu de la page
* géolocalisation : la récupération de la position géographique d'un utilisateur à l'aide de l'API de géolocalisation est une opération asynchrone, car elle peut prendre un certain temps

## Asynchrone et la séquence du code

D'un point de vue séquentiel du code, le principal problème de l'asynchronisme en JavaScript est que les opérations asynchrones peuvent perturber l'ordre d'exécution attendu du code. En d'autres termes, le code ne s'exécute pas de manière linéaire du haut vers le bas, ce qui peut rendre difficile la compréhension. 

Ainsi, on retrouve deux problèmes principaux liés à la séquence du code dans un contexte asynchrone :
* les opérations asynchrones ne bloquent pas l'exécution du reste du code. Par conséquent, le code qui suit une opération asynchrone peut s'exécuter avant que l'opération ne soit terminée, ce qui peut entraîner des résultats inattendus
* l'ordre dans lequel les opérations asynchrones sont résolues dépend du temps d'exécution de chaque opération. Cela signifie que le code asynchrone peut produire des résultats dans un ordre différent de celui dans lequel il a été écrit

```javascript
// On lance une requête vers un service qui renvoie des données
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos');
xhr.send();

// On utilise une fonction de rappel pour savoir 
// quand le service a renvoyé les résultats
xhr.addEventListener('load', () => {
    if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
        // On affiche les résultats
        console.log(xhr.responseText);
    } 
});

// On essaie d'afficher les résultats de la requête
// Mais cela n'affiche rien car le service n'a pas encore eu le temps d'envoyer la réponse
console.log(xhr.responseText);
```

Dans le code ci-dessus, le second *console.log* s'affiche avant le premier *console.log* même s'il se retrouve plus loin dans le code. Ceci est dû au fait de la nature asynchrone du traitement : la réponse du service est envoyée au bout d'un certain temps et notre code a continué de s'exécuter pendant ce laps de temps.

## Fonctions de rappel

Une fonction de rappel (callback function en anglais) est une fonction en JavaScript qui est passée en tant qu'argument à une autre fonction et qui est destinée à être exécutée à un moment ultérieur, généralement lorsque certaines opérations asynchrones ou des traitements spécifiques sont terminés.

Une fonction de rappel prend souvent la forme d'une fonction anonyme (fonction fléchée ou fonction déclarative) définie directement en ligne lors de l'appel de la fonction principale. Elle peut également être une fonction existante passée comme argument.

```javascript
function effectuerTacheAsynchrone(fonctionDeRappel) {
    setTimeout(() => {
        // La tâche asynchrone est terminée
        fonctionDeRappel(); // Appel de la fonction de rappel
  }, 1000);
}

effectuerTacheAsynchrone(() => {
    // Code à effectuer lorsque le traitement asynchrone est terminée
});
```

Grâce aux fonctions de rappels, il est possible d'effectuer une opération à la fin d'un traitement asynchrone :

```javascript
function effectueAjax(url, recupereResultats) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    
    xhr.addEventListener('load', () => {
        if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
            // Lorsque le traitement asynchrone est terminé
            // on appelle la fonction de rappel passée en paramètre 
            // avec les résultats de la requête
            recupereResultats(JSON.parse(xhr.responseText));
        }
    });
}

// On appelle la fonction effectueAjax et on lui passe une fonction de rappel en paramètre
// Cette fonction exécute le code qui doit être fait lorsque le traitement asynchrone est terminé
effectueAjax('https://jsonplaceholder.typicode.com/todos', (resultats) => {
    console.log(resultats);
});
```

Néanmoins, lorsque vous avez plusieurs opérations asynchrones imbriquées les unes dans les autres, cela peut créer une structure de code complexe difficile à lire, connue sous le nom de "callback hell" ou "pyramid of doom".

```javascript
// On veut récupérer l'auteur d'un article sur lequel a été écrit le commentaire
function recupereUtilisateur(numeroCommentaire) {
    // On récupère d'abord les informations du commentaire
    effectueAjax(`https://jsonplaceholder.typicode.com/comments/${numeroCommentaire}`, (commentaire) => {
        // Quand on a récupéré le commentaire on récupère l'article correspondant
        effectueAjax(`https://jsonplaceholder.typicode.com/posts/${commentaire.postId}`, (article) => {
            // Quand on a récupéré l'article on récupère l'utilisateur correspondant
            effectueAjax(`https://jsonplaceholder.typicode.com/users/${article.userId}`, (utilisateur) => {
                // ... Et enfin on affiche le nom de l'utilisateur
                console.log(utilisateur.name);
            });
        });
    });
}

recupereUtilisateur(2);
```

Dans cet exemple, nous avons trois opérations asynchrones et chacune d'entre elles prend une fonction de rappel qui sera appelée lorsque l'opération est terminée.

Le code principal montre comment ces opérations sont enchaînées les unes après les autres à l'intérieur des callbacks, créant ainsi une structure de code en forme de pyramide. Plus vous ajoutez d'opérations asynchrones imbriquées, plus le code devient difficile à lire et à comprendre.

Le "callback hell" rend la gestion des erreurs, le suivi de l'exécution et la maintenance du code plus compliqués.

Alors comment faire pour gérer les opérations asynchrones ?

## Les promesses à la rescousse

### Définition

Les promesses sont des objets utilisés pour gérer des opérations asynchrones et faciliter la gestion des résultats réussis ou des erreurs.

Une promesse a généralement trois états possibles :

* pending (en attente) : l'état initial d'une promesse, où elle n'a ni réussi ni échoué ; elle est en cours d'exécution
* fulfilled (tenue) : l'état de la promesse lorsque l'opération asynchrone a réussi ; la valeur résultante est disponible
* rejected (rompue) : l'état de la promesse lorsque l'opération asynchrone a échoué ou a rencontré une erreur. Une raison (un message d'erreur) est associée à la promesse pour expliquer l'échec

### Syntaxe

```javascript
const promesse = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Le traitement asynchrone est terminé
        // On indique que la promesse est résolue
        // et on lui fournit le résultat de l'opération
        const resultats = {};
        resolve(resultats);
    }, 1000);
});

promesse.then(resultats => {
    // Lorsque la promesse est terminée
    console.log(resultats);
});
```

Ainsi, notre promesse encapsule le traitement asynchrone et renvoie le résultat de ce traitement. Grâce à la fonction *then* de la promesse, on attend la résolution de cette dernière.

### Gestion des erreurs

La fonction *resolve* permet d'indiquer quand la promesse est résolue avec quelle donnée. Il existe également une fonction *catch* qui récupère une erreur déclenchée dans une promesse.

```javascript
function recuperePosition() {
    // On encapsule un traitement asynchrone (la géolocalisation)
    // avec une promesse
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            // Lorsque la position de l'utilisateur a été récupérée
            // on indique que la promesse est résolue et on renvoie la position
            resolve(position);
        }, erreur => {
            // Si une erreur est survenue on rejette la promesse
            reject(erreur.message);
        }); 
    });
}

recuperePosition().then(position => {
    // Si la promesse est résolue on récupère la position
    console.log(position);
}).catch(erreur => {
    // Si la promesse a été rejettée on gère l'erreur
    console.error(erreur);
});
```

### Chaînage des promesses

Les promesses peuvent se chaîner entre elles, ce qui nous permet d'éviter l'effet de pyramide que l'on avait avec les fonctions de rappel.

```javascript
const baseUrl = "https://jsonplaceholder.typicode.com";

function effectueAjax(url) {
    // On encapsule le code qui envoie une requête AJAX
    // par une promesse
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', () => {
            if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
                resolve(JSON.parse(xhr.responseText));
            } else if (xhr.status === 404) {
                reject("La ressource n'a pas été trouvée");
            }
        });
    });
}

// Fonction qui renvoie une promesse qui est résolue lorsque l'utilisateur a été récupéré
function recupereUtilisateur(numeroCommentaire) {
    // Toutes les promesses sont chaînées
    return effectueAjax(`${baseUrl}/comments/${numeroCommentaire}`)
        .then(commentaire => effectueAjax(`${baseUrl}/posts/${commentaire.postId}`))
        .then(article => effectueAjax(`${baseUrl}/users/${article.userId}`));
}

recupereUtilisateur(2).then(utilisateur => {
    console.log(utilisateur.name);
}).catch(erreur => {
    console.error(erreur);
});
```

Dans le code ci-dessus on se retrouve toujours avec un grand nombre de fonctions rappel mais ces dernières ne sont plus imbriquées les unes dans les autres. Le code est plus lisible et il est plus facile de gérer les erreurs.

### async/await

Les mots-clé *async* et *await* sont utilisés pour rendre le code asynchrone plus semblable à du code synchrone, ce qui facilite la compréhension et la gestion des opérations.

Le mot-clé *async* est utilisé devant la déclaration d'une fonction pour indiquer que cette fonction est asynchrone. Une fonction déclarée avec async retourne toujours une promesse, même si elle ne contient pas explicitement de promesse. Cela signifie que vous pouvez utiliser await à l'intérieur de la fonction pour attendre la résolution d'une promesse sans bloquer l'exécution du reste du code.

Le mot-clé *await* est utilisé à l'intérieur d'une fonction async pour attendre que la promesse soit résolue (ou rejetée). Lorsque vous utilisez await, le code dans la fonction async est mis en pause jusqu'à ce que la promesse soit résolue, puis la valeur résolue est renvoyée.

```javascript
// Version du code précédent qui récupère l'utilisateur
// avec async/await
async function recupereUtilisateur(numeroCommentaire) {
    const commentaire = await effectueAjax(`https://jsonplaceholder.typicode.com/comments/${numeroCommentaire}`);
    const article = await effectueAjax(`https://jsonplaceholder.typicode.com/posts/${commentaire.postId}`);
    const utilisateur = await effectueAjax(`https://jsonplaceholder.typicode.com/users/${article.userId}`)

    console.log(utilisateur.name);
}

recupereUtilisateur(2);
```

L'utilisation de *async* et *await* simplifie la gestion des opérations asynchrones en les rendant plus linéaires et plus lisibles. Cela évite la nécessité d'utiliser des fonctions de rappels ou des chaînes de promesses imbriquées, ce qui simplifie la logique du code. Cependant, il est important de noter que les fonctions contenant *await* doivent être marquées comme *async*, sinon une erreur sera générée.

### Gestion des erreurs avec async/await

Lorsqu'on utilise la syntaxe *async/await* il n'y a plus de fonction *catch* pour gérer les erreurs. Dans ce cas il faut utiliser la syntaxe *try...catch* de JavaScript pour pouvoir gérer les potentielles erreurs.

```javascript
async function recupereUtilisateur(numeroCommentaire) {
    try {
        const commentaire = await effectueAjax(`https://jsonplaceholder.typicode.com/comments/${numeroCommentaire}`);
        const article = await effectueAjax(`https://jsonplaceholder.typicode.com/posts/${commentaire.postId}`);
        const utilisateur = await effectueAjax(`https://jsonplaceholder.typicode.com/users/${article.userId}`)
    
        console.log(utilisateur.name);
    } catch (erreur) {
        console.error(erreur);
    }
}
```

## En résumé

* les traitements asynchrones sont des opérations effectuées au bout d'un certain temps
* une fonction de rappel dans les traitements asynchrones sont exécutées avec un délai
* les promesses permettent d'encapsuler les tâches asynchrones et de les gérer plus facilement
* la syntaxe *async/await* permet d'écrire le code comme s'il était synchrone (et donc s'effectuer de haut en bas)