let hobbies = [
    "Коллекционные карточные игры (MTG)",
    "Астрономические наблюдения",
    "Пайка и эксперименты с микроконтроллерами",
    "Просмотр интересных аниме",
    "Ретро-игры",
    "Шахматы",
    "Прослушивание классической музыки"
];

let books = [
    "Учебник астрономии для 10–11 классов",
    "Астрономическое пособие для колледжей",
    "Основы астрофизики (не дочитал)",
    "The Game Console 2.0",
    "A Guide to Japanese Role-Playing Games"
];

let music = [
    "Никколо Паганини — Каприс №24",
    "Никколо Паганини — Кампанелла",
    "Вивальди/Бах — Концерт ре минор",
    "Вивальди — Времена года: Зима",
    "Шопен — Прелюдия op.28 №4 ми минор",
    "Кристофер Ларкин — Святилище душ"
];

let games = [
    "Hollow Knight",
    "Team Innocent: No Point to Return",
    "Castlevania: Dawn of Sorrow",
    "Bloodstained: Ritual of the Night",
    "Steins;Gate",
    "Dragon Quest"
];

function createElements(arrayName, number, $parent) {
    if (isNaN(number)) return;
    if ($parent.children('ul').length) $parent.children('ul').last().remove();
    let $ul = $('<ul></ul>');
    arrayName.forEach(function (item, index) {
        if ((index + 1) > number) {
            $parent.append($ul);
            return;
        }
        let $li = $('<li></li>').addClass('interestTypes').text(item);
        $ul.append($li);
    });
    $parent.append($ul);
}

$('main').on('click', function (event) {
    if (event.target.id == 'hobbyButton') {
        let value = $('#hobbyInput').val();
        let parent = $('#hobbyInput').parent();
        createElements(hobbies, value, parent);
    }
    if (event.target.id == 'booksButton') {
        let value = $('#booksInput').val();
        let parent = $('#booksInput').parent();
        createElements(books, value, parent);
    }
    if (event.target.id == 'musicButton') {
        let value = $('#musicInput').val();
        let parent = $('#musicInput').parent();
        createElements(music, value, parent);
    }
    if (event.target.id == 'gamesButton') {
        let value = $('#gamesInput').val();
        let parent = $('#gamesInput').parent();
        createElements(games, value, parent);
    }
});

function anchorToInteres() {
    let interest = null;

    if (window.location.href.split('?')[1]) {
        if (window.location.href.split('?')[1].split('=')[1]) {
            interest = window.location.href.split('?')[1].split('=')[1];
        }
    }
    else return;

    switch (interest) {
        case 'hobby': {
            $('#hobby')[0].scrollIntoView();
            break;
        }
        case 'music': {
            $('#music')[0].scrollIntoView();
            break;
        }
        case 'games': {
            $('#games')[0].scrollIntoView();
            break;
        }
        case 'books': {
            $('#books')[0].scrollIntoView();
            break;
        }
    }
}

anchorToInteres()

let total = Number(localStorage.getItem('interest'))

if (!total) total = 0
total = ++total

localStorage.setItem('interest', total)



function setCookie(name, value) {
    const expires = "; expires=Thu, 01 Jan 2077 00:00:00 GMT";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let item = document.cookie.split('; ').find(function (item) {
        return item.startsWith(name + '=');
    });
    if (!item) return 0;
    return Number(item.split('=')[1]);
}

let storyCount = getCookie('interest')
storyCount++
setCookie('interest', storyCount)