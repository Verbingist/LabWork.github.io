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
    "Бульбазавр1",
    "Чармандер",
    "Бульбазавр3",
    "Пикачу",
    "Бульбазавр5",
    "Бульбазавр6",
    "Бульбазавр7",
    "Бульбазавр8",
    "Бульбазавр9",
    "Бульбазавр10",
    "Бульбазавр11",
    "Бульбазавр12",
    "Бульбазавр13",
    "Бульбазавр14",
    "Бульбазавр15",
];

let currentPhoto = 1;
let currentSrc = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png';
let title = titles[0]

let rows = $('.imgRow');

$('#cardButton').on('click', function () {
    rows.each(function (index, item) {
        for (let i = 0; i < 5; i++) {
            let pokemon = $('<div></div>').addClass('pokemon');

            let img = $('<img>');
            img.prop('src', arrayOfUrl[i + index * 5]);
            img.css('width', 250);
            img.css('height', 'auto');


            let description = $('<p></p>');
            description.addClass('details');
            description.text(titles[i + index * 5]);

            let plug = $('<p></p>');
            plug.addClass('plug');
            plug.text(" ");

            let title = $('<p></p>');
            title.text(titles[i + index * 5]);

            $(item).append(pokemon);

            img.on('click', function (event) {
                $('#absolutePhoto').fadeIn(1000)
                $('#absolutePhoto').find('img').prop('src', event.target.src);
                currentPhoto = arrayOfUrl.indexOf(event.target.src);
                currentSrc = arrayOfUrl[currentPhoto];
                title = titles[currentPhoto]
                $('#photonumber').text('Фото: ' + (currentPhoto + 1) + ' из 15')
                $('#title').text(title)
            })

            pokemon.append(img);
            pokemon.append(description);
            pokemon.append(plug);
            pokemon.append(title);
        }
    });
    $('#cardButton').prop('hidden', true);
});


$(document).on('click', function (event) {
    if (event.target.tagName == 'IMG' || event.target.tagName == 'BUTTON') return
    $('#absolutePhoto').hide(1000)
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

let isAnimating = false;

$('#firstButton').on('click', function () {
    if (currentPhoto == 0 || isAnimating) return;
    isAnimating = true
    $('#absolutePhoto').find('img').fadeOut(500, function () {
        --currentPhoto;
        $('#absolutePhoto').find('img').prop('src', arrayOfUrl[currentPhoto]);
        $('#absolutePhoto').find('img').fadeIn(500, function () {
            isAnimating = false
        })
        $('#photonumber').text('Фото: ' + (currentPhoto + 1) + ' из 15')
        currentSrc = arrayOfUrl[currentPhoto]
        title = titles[currentPhoto]
        $('#title').text(title)
    })
})

$('#secondButton').on('click', function () {
    if (currentPhoto >= 14 || isAnimating) return
    isAnimating = true
    $('#absolutePhoto').find('img').fadeOut(500, function () {
        ++currentPhoto;
        $('#absolutePhoto').find('img').prop('src', arrayOfUrl[currentPhoto]);
        $('#absolutePhoto').find('img').fadeIn(500, function () {
            isAnimating = false
        })
        $('#photonumber').text('Фото: ' + (currentPhoto + 1) + ' из 15')
        currentSrc = arrayOfUrl[currentPhoto];
        title = titles[currentPhoto]
        $('#title').text(title)
    })
})

$(document).ready(function () {
    $('#absolutePhoto').hide();
});