let error = document.querySelector('.error');
let errorTimeoutId = null;

document.addEventListener('submit', function (event) {
    event.preventDefault();

    let firstQuestion = document.querySelector('#questOne').value;
    if (!firstQuestion) {
        document.querySelector('#questOne').focus();
        addError('ответ на первый вопрос');
        return;
    }
    if (firstQuestion.split(' ').length > 25) {
        document.querySelector('#questOne').focus();
        addError('ответ из менее чем 25 слов');
        return;
    }

    let secondQuestion;
    if (document.querySelector('#questTwo1').checked)
        secondQuestion = 1;
    else if (document.querySelector('#questTwo2').checked)
        secondQuestion = 2;
    else if (document.querySelector('#questTwo3').checked)
        secondQuestion = 3;
    else {
        addError('ответ на второй вопрос');
        return;
    }


    let fio = document.querySelector('#fio').value;
    if (!fio) {
        document.querySelector('#fio').focus();
        addError('ФИО');
        return;
    }
});

function addError(message) {
    error.classList.remove('hidden');
    document.querySelector('#errorMessage').textContent = 'Введите ' + message;

    if (errorTimeoutId !== null) {
        clearTimeout(errorTimeoutId);
    }
    errorTimeoutId = setTimeout(() => {
        error.classList.add('hidden');
        errorTimeoutId = null;
    }, 3000);
}

let total = Number(localStorage.getItem('test'))

if (!total) total = 0
total = ++total

localStorage.setItem('test', total)



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

let storyCount = getCookie('test')
storyCount++
setCookie('test', storyCount)