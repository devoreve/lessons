function sendRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();

        xhr.addEventListener('load', () => {
            if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject("La page n'existe pas");
            }
        });
    });
}

function getCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve(position.coords);
        }, error => {
            reject(error.message);
        });
    });
}

// Version sans async/await
getCoords()
    .then(coords => sendRequest(`https://api-adresse.data.gouv.fr/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`))
    .then(response => {
        console.log(response.features[0].properties.label);
    })
    .catch(error => {
        console.error("Une erreur est survenue : " + error);
    });

// Version avec async/await
(async () => {
    try {
        const coords = await getCoords();
        const response = await sendRequest(`https://api-adresse.data.gouv.fr/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`);
        console.log(response.features[0].properties.label);
    } catch (error) {
        console.error("Une erreur est survenue : " + error);
    }
}) ();