let arrayOfUrl = [
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/092.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/197.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/212.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/448.png",
];

let titles = [
    "Бульбазавр",
    "Чармандер",
    "Бульбазавр",
    "Пикачу",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
    "Бульбазавр",
];

let rows = document.querySelectorAll('.imgRow');

document.querySelector('#cardButton').addEventListener('click', function () {
    rows.forEach(function (item, index) {
        for (let i = 0; i < 5; i++) {
            let pokemon = document.createElement('div');
            pokemon.classList.add('pokemon');

            let img = document.createElement('img');
            img.src = arrayOfUrl[i + index * 5];
            img.width = 250;
            img.style.height = 'auto';

            let description = document.createElement('p');
            description.classList.add('details');
            description.textContent = titles[i + index * 5];

            let plug = document.createElement('p');
            plug.classList.add('plug');
            plug.textContent = " ";

            let title = document.createElement('p');
            title.textContent = titles[i + index * 5];

            item.append(pokemon);

            img.addEventListener('click', function (event) {
                document.querySelector('#absolutePhoto').classList.remove('hidden')
                document.querySelector('#absolutePhoto').querySelector('img').src = event.target.src
            })

            pokemon.append(img);
            pokemon.append(description);
            pokemon.append(plug);
            pokemon.append(title);
        }
    });
    document.querySelector('#cardButton').hidden = true;
});

document.addEventListener('click', function(event) {
    if (event.target.tagName == 'IMG') return
    document.querySelector('#absolutePhoto').classList.add('hidden')
})

let total = Number(localStorage.getItem('photo'))

if (!total) total = 0
total = ++total

localStorage.setItem('photo', total)



function setCookie(name, value) {
    const expires = "; expires=Thu, 01 Jan 2077 00:00:00 GMT";
    document.cookie = name + "=" + value + expires + "; path=";
}

function getCookie(name) {
    let item = document.cookie.split('; ').find(function (item) {
        return item.startsWith(name + '=');
    });
    if (!item) return 0;
    return Number(item.split('=')[1]);
}

let storyCount = getCookie('photo')
storyCount++
setCookie('photo', storyCount)