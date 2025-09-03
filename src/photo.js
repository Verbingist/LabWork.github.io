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

            pokemon.append(img);
            pokemon.append(description);
            pokemon.append(plug);
            pokemon.append(title);
        }
    });
    document.querySelector('#cardButton').hidden = true;
});