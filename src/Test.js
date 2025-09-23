let error = $('.error');
let errorTimeoutId = null;

$(document).on('submit', function (event) {
    event.preventDefault();

    let firstQuestion = $('#questOne').val();
    if (!firstQuestion) {
        $('#questOne').focus();
        addError('ответ на первый вопрос');
        return;
    }
    if (firstQuestion.split(' ').length > 25) {
        $('#questOne').focus();
        addError('ответ из менее чем 25 слов');
        return;
    }

    let secondQuestion;
    if ($('#questTwo1').prop('checked'))
        secondQuestion = 1;
    else if ($('#questTwo2').prop('checked'))
        secondQuestion = 2;
    else if ($('#questTwo3').prop('checked'))
        secondQuestion = 3;
    else {
        addError('ответ на второй вопрос');
        return;
    }


    let fio = $('#fio').val();
    if (!fio) {
        $('#fio').focus();
        addError('ФИО');
        return;
    }
});

function addError(message) {
    error.removeClass('hidden');
    $('#errorMessage').text('Введите ' + message);

    if (errorTimeoutId !== null) {
        clearTimeout(errorTimeoutId);
    }
    errorTimeoutId = setTimeout(() => {
        error.addClass('hidden');
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