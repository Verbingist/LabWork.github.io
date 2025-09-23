let error = $('#globalError');
let errorTimeoutId = null;
$('#enterSubmit').hide()
$('#blurOverlay').hide()

$(document).on('submit', function (event) {
    event.preventDefault();
    let fio = $('#fio').val();
    if (!fio) {
        $('#fio').focus();
        addError('ФИО');
        return;
    }
    if (fio.split(' ').length != 3) {
        $('#fio').focus();
        addError('ФИО тремя словами');
        return;
    }
    let gender;
    if ($('#checkGender1').prop('checked'))
        gender = 'male';
    else if ($('#checkGender2').prop('checked'))
        gender = 'female';
    else {
        addError('пол');
        return;
    }
    let email = $('#email').val();
    if (!email) {
        $('#email').focus();
        addError('почту');
        return;
    }
    let phone = $('#phone').val();
    if (!phone) {
        $('#phone').focus();
        addError('телефон');
        return;
    }
    if (phone.length < 9 || phone.length > 11) {
        $('#phone').focus();
        addError('телефон c длинной 9-11 символов');
        return;
    }
    if (!(phone[0] == '+' && (phone[1] == '7' || phone[1] == '3'))) {
        $('#phone').focus();
        addError('телефон, который начинается с +7 или +3');
        return;
    }
    if (!(/^\d+$/.test(phone.slice(1, phone.length)))) {
        $('#phone').focus();
        addError('телефон без пробелов и посторонних символов');
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

let monthes = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь"
];

$('.inputBox').on('focus', function () {
    $('#calendar').removeClass('hidden')
    $('.inputBox').blur()
})

$('.day').on('click', function (event) {
    if (!event.target.classList.contains('digit')) return
    let content = $('.inputBox')
    if (content.val().split(' ').length > 2)
        content.val(content.val().split(' ')[1] + " " + content.val().split(' ')[2])
    content.val(event.target.textContent + " " + content.val())
})

$('#calendar').on('input', function () {
    let month = $('#month').val()
    let monthIndex = getMonthIndex(month)
    let year = $('#years').val()
    $('.inputBox').val(month + ' ' + year)
    addDays(monthIndex, year)
})

function setUpMonth() {
    let monthSelect = $('#month')
    monthes.forEach(function (item) {
        let option = $('<option></option>').html(item);
        monthSelect.append(option)
    })
}

function setUpYears(maxYear) {
    let yearsSelect = $('#years')
    for (let i = 2000; i <= maxYear; i++) {
        let option = $('<option></option>').html(i);
        yearsSelect.append(option)
    }
}

function getMonthIndex(month) {
    return (monthes.findIndex(item => item == month)) + 1
}

function addDays(month, year) {
    deleteDays()
    let daysInMonth = new Date(year, month, 0).getDate();
    let firstdDate = new Date(year, month - 1, 1);
    let firstWeekday = (firstdDate.getDay() + 6) % 7;
    let dayCount = 1
    let outOfMonth = false
    for (let i = 1; i < 7; i++) {
        let week = $('.dayRow').eq(i)
        for (let j = 0; j < 7; j++) {
            if (firstWeekday > j && i == 1) {
                dayCount = ' '
            }
            if (dayCount > daysInMonth || outOfMonth) {
                dayCount = ' '
                outOfMonth = true
            }
            let day = $('<div></div>').html(dayCount).addClass('weekDay digit');
            dayCount++;
            week.append(day);
        }
    }
}

function deleteDays() {
    for (let i = 1; i < 7; i++) {
        $('.dayRow').eq(i).find('div').remove();
    }
}

setUpYears(2025)
setUpMonth()





function allowSendData() {
    let fio = $('#fio').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let date = $('#dateInput').val();

    if (!fio || fio.split(' ').length != 3 ||
        !($('#checkGender1').prop('checked') || $('#checkGender2').prop('checked')) ||
        !email || !phone || phone.length < 9 || phone.length > 11 || !(phone[0] == '+' && (phone[1] == '7' || phone[1] == '3')) ||
        !(/^\d+$/.test(phone.slice(1, phone.length))) || !date || (date.split(' ').length < 2)) {
        $('#Submit').prop('disabled', true);
    }
    else {
        $('#Submit').prop('disabled', false);
    }
}

$('input').each(function (index, item) {
    $(item).on('input', allowSendData)
    $(item).on('change', allowSendData)
    $('#month').on('change', allowSendData);
    $('#years').on('change', allowSendData);
    $('.digit').each((index, day) => {
        $(day).on('click', allowSendData);
    });
})

function removeLocalError(elemId) {
    $('#' + elemId).addClass('hidden');
}

function addDotedError(elemId, messageErrorId, errorText) {
    let localError = $('#' + elemId)
    localError.removeClass('hidden');
    $('#' + messageErrorId).text('Введите ' + errorText);

    if (errorTimeoutId !== null) {
        clearTimeout(errorTimeoutId);
    }
    errorTimeoutId = setTimeout(() => {
        error.classList.add('hidden');
        errorTimeoutId = null;
    }, 3000);
}

$('#fio').on('blur', function (event) {
    if (!event.target.value) {
        event.target.classList.remove('green');
        event.target.classList.add('red');
        addDotedError('fioError', 'errorMessageFio', 'ФИО');
        return;
    }
    else if (event.target.value.split(' ').length != 3) {
        event.target.classList.remove('green');
        event.target.classList.add('red');
        addDotedError('fioError', 'errorMessageFio', 'ФИО тремя словами');
        return;
    }
    else {
        event.target.classList.remove('red');
        event.target.classList.add('green');
        removeLocalError('fioError')
    }
})

$('#email').on('blur', function (event) {
    if (!event.target.value) {
        event.target.classList.remove('green');
        event.target.classList.add('red');
        addDotedError('emailError', 'errorMessageError', 'почту');
        return;
    }
    else {
        event.target.classList.remove('red');
        event.target.classList.add('green');
        removeLocalError('emailError')
    }
})

$('#phone').on('blur', function (event) {
    if (!event.target.value) {
        event.target.classList.remove('green');
        event.target.classList.add('red');
        addDotedError('phoneError', 'errorMessagePhone', 'телефон');
        return;
    }
    else if (event.target.value.length < 9 || event.target.value.length > 11) {
        event.target.classList.remove('green');
        event.target.classList.add('red');
        addDotedError('phoneError', 'errorMessagePhone', 'телефон c длинной 9-11 символов');
        return;
    }
    else if (!(event.target.value[0] == '+' && (event.target.value[1] == '7' || event.target.value[1] == '3'))) {
        event.target.classList.remove('green');
        event.target.classList.add('red');
        addDotedError('phoneError', 'errorMessagePhone', 'телефон, который начинается с +7 или +3');
        return;
    }
    else if (!(/^\d+$/.test(event.target.value.slice(1, event.target.length)))) {
        event.target.classList.remove('green');
        event.target.classList.add('red');
        addDotedError('phoneError', 'errorMessagePhone', 'телефон без пробелов и посторонних символов');
        return;
    }
    else {
        event.target.classList.remove('red');
        event.target.classList.add('green');
        removeLocalError('phoneError')
    }
})

let total = Number(localStorage.getItem('contact'))

if (!total) total = 0
total = ++total

localStorage.setItem('contact', total)


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

let storyCount = getCookie('contact')
storyCount++
setCookie('contact', storyCount)





$(document).on('submit', function (event) {
    event.preventDefault();
    $('#blurOverlay').show();
    $('#enterSubmit').show(500);
})

$('#sumbitYes').on('click', function () {
    $('#enterSubmit').hide()
    $('#blurOverlay').hide(500);
})

$('#sumbitNo').on('click', function () {
    $('#enterSubmit').hide()
    $('#blurOverlay').hide(500);
})



let timerInterval = null;
let currentHelpId = null;

function hideHelfMessages(timer = 0) {
    $('.helpMessage').each((index, item) => {
        $(item).fadeOut(timer)
    })
    currentHelpId = null;
}

hideHelfMessages()

function showHelpMessage(id) {
    if (timerInterval) {
        clearTimeout(timerInterval);
        timerInterval = null;
    }
    if (currentHelpId == id) return;
    hideHelfMessages(0);
    $(id).fadeIn(500)
    currentHelpId = id
}

$('#email').on('mouseover', function () {
    showHelpMessage('#emailhelp')
})

$('#email').on('mouseout', function () {
    timerInterval = setTimeout(hideHelfMessages, 1000, 500)
})

$('#fio').on('mouseover', function () {
    showHelpMessage('#fiohelp')
})

$('#fio').on('mouseout', function () {
    timerInterval = setTimeout(hideHelfMessages, 1000, 500)
})

$('#phone').on('mouseover', function () {
    showHelpMessage('#phonehelp')
})

$('#phone').on('mouseout', function () {
    timerInterval = setTimeout(hideHelfMessages, 1000, 500)
})