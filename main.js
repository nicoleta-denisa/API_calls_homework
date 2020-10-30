'use strict';

//Animals
const formAnimal = document.getElementById('formAnimal');
const choosedAnimal = document.getElementById('animal');
const animalImage = document.querySelector('[data-animal-image]');

formAnimal.addEventListener('submit', (e) => getTheAnimalPicture(e));

function getTheAnimalPicture(e) {
    e.preventDefault();

    const animals = choosedAnimal.value;

    fetch(animals)
        .then((response) => response.json())
        .then((data) => {
            if (data.url) {
                if (!data.url.includes('.mp4')) {
                    animalImage.src = data.url;
                }
            } else if (data.file) {
                animalImage.src = data.file;
            } else {
                animalImage.src = data.image;
            }
        });
}

$(function () {
    addEvents();
});

function addEvents() {
    let $cnJokes = $('#cnjokes');
    $cnJokes.on('click', getJokes);

    let $randomJokes = $('#randomjokes');
    $randomJokes.on('click', getRandomJokes);

    let $display = $('#display');
    $display.on('click', callBoth);

    let $displayGOT = $('#displayGOT');
    $displayGOT.on('click', getGOT);
}

function callBoth() {
    getCharacters();
    getEpisodes();
}

function getJokes() {
    fetch('http://api.icndb.com/jokes/', {
        method: 'GET',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResp) {
            var html = jsonResp.value
                .map(function (jokes) {
                    return `<div><p>Jokes: ${jokes.joke}</p></div>`;
                })
                .join('');
            console.log(html);
            document.querySelector('#jokeContainer').innerHTML = html;
        })
        .catch(function (error) {
            console.log('There was a network error', error);
        });
}

function getRandomJokes() {
    fetch('https://official-joke-api.appspot.com/jokes/ten/', {
        method: 'GET',
    })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (jsonRespRandom) {
            var random = jsonRespRandom
                .map(function (ten) {
                    return `<div><p>Random jokes: ${ten.setup}</p></div>`;
                })
                .join('');
            console.log(random);
            document.querySelector('#randomJokesContainer').innerHTML = random;
        })
        .catch(function (error) {
            console.log('There was a network error', error);
        });
}

function getCharacters() {
    fetch('https://rickandmortyapi.com/api/character', {
        method: 'GET',
    })
        .then(function (respChar) {
            return respChar.json();
        })
        .then(function (jsonRespChar) {
            var char = '<ol>';
            char += jsonRespChar.results
                .map(function (name) {
                    return `<li>Character name: ${name.name}</li>`;
                })
                .join('');
            // console.log(char);
            document.querySelector('#character1').innerHTML = char;
        })
        .catch(function (error) {
            console.log('There was a network error', error);
        });
}

function getEpisodes() {
    fetch('https://rickandmortyapi.com/api/episode', {
        method: 'GET',
    })
        .then(function (respEp) {
            return respEp.json();
        })
        .then(function (jsonRespEp) {
            var episode = '<ol>';
            episode += jsonRespEp.results
                .map(function (ep) {
                    return `<li>Episode: ${ep.episode}</li>`;
                })
                .join('');
            // console.log(episode);
            document.querySelector('#episodes').innerHTML = episode;
        })
        .catch(function (error) {
            console.log('There was a network error', error);
        });
}

function getGOT() {
    const f1 = fetch('https://www.anapioficeandfire.com/api/characters', {
        method: 'GET',
    })
        .then(function (respChar2) {
            return respChar2.json();
        })
        .then(function (jsonRespChar2) {
            var char2 = '<ol>Aliases:';
            char2 += jsonRespChar2
                .map(function (name2) {
                    return `
            <li> ${name2.aliases}</li>`;
                })
                .join('');
            // console.log(char2);
            document.querySelector('#character2').innerHTML = char2;
        })
        .catch(function (error) {
            console.log('There was a network error', error);
        });

    const f2 = fetch('https://www.anapioficeandfire.com/api/books', {
        method: 'GET',
    })
        .then(function (respBook) {
            return respBook.json();
        })
        .then(function (jsonRespBook) {
            var book = '<ol>Book name:';
            book += jsonRespBook
                .map(function (bookname) {
                    return `<li> ${bookname.name} by ${bookname.authors}, publisher ${bookname.publisher} </li>`;
                })
                .join('');
            // console.log(char);
            document.querySelector('#book').innerHTML = book;
        })
        .catch(function (error) {
            console.log('There was a network error', error);
        });

    Promise.all([f1, f2]);
}
