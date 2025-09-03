let hobbies = [
    "Хобби 1",
    "Хобби 2",
    "Хобби 3",
    "Хобби 4",
];

let music = [
    "музыка 1",
    "музыка 2",
    "музыка 3",
    "музыка 4"
];

let books = [
    "книга 1",
    "книга 2",
    "книга 3",
    "книга 4"
];

let films = [
    "фильм 1",
    "фильм 2",
    "фильм 3",
    "фильм 4"
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
    if (event.target.id == 'filmsButton') {
        let value = document.querySelector('#filmsInput').value;
        let parent = document.querySelector('#filmsInput').parentElement;
        createElements(films, value, parent);
    }
});