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

function createElements(arrayName, number, parent) {
    if (isNaN(number)) return;
    if (parent.lastElementChild && parent.lastElementChild.tagName && parent.lastElementChild.tagName == 'UL') parent.lastElementChild.remove();
    let ul = document.createElement('ul');
    arrayName.forEach(function (item, index) {
        if ((index + 1) > number) {
            parent.append(ul);
            return;
        }
        let li = document.createElement('li');
        li.classList.add('interestTypes');
        li.textContent = item;
        ul.append(li);
    });
    parent.append(ul);
}

document.querySelector('main').addEventListener('click', function (event) {
    if (event.target.id == 'hobbyButton') {
        let value = document.querySelector('#hobbyInput').value;
        let parent = document.querySelector('#hobbyInput').parentElement;
        createElements(hobbies, value, parent);
    }
    if (event.target.id == 'booksButton') {
        let value = document.querySelector('#booksInput').value;
        let parent = document.querySelector('#booksInput').parentElement;
        createElements(books, value, parent);
    }
    if (event.target.id == 'musicButton') {
        let value = document.querySelector('#musicInput').value;
        let parent = document.querySelector('#musicInput').parentElement;
        createElements(music, value, parent);
    }
    if (event.target.id == 'gamesButton') {
        let value = document.querySelector('#gamesInput').value;
        let parent = document.querySelector('#gamesInput').parentElement;
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
            document.querySelector('#hobby').scrollIntoView();
            break;
        }
        case 'music': {
            document.querySelector('#music').scrollIntoView();
            break;
        }
        case 'games': {
            document.querySelector('#games').scrollIntoView();
            break;
        }
        case 'books': {
            document.querySelector('#books').scrollIntoView();
            break;
        }
    }
}

anchorToInteres()