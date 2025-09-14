let error = document.querySelector('#globalError');
let errorTimeoutId = null;

document.addEventListener('submit', function (event) {
    event.preventDefault();
    let fio = document.querySelector('#fio').value;
    if (!fio) {
        document.querySelector('#fio').focus();
        addError('ФИО');
        return;
    }
    if (fio.split(' ').length != 3) {
        document.querySelector('#fio').focus();
        addError('ФИО тремя словами');
        return;
    }
    let gender;
    if (document.querySelector('#checkGender1').checked)
        gender = 'male';
    else if (document.querySelector('#checkGender2').checked)
        gender = 'female';
    else {
        addError('пол');
        return;
    }
    let email = document.querySelector('#email').value;
    if (!email) {
        document.querySelector('#email').focus();
        addError('почту');
        return;
    }
    let phone = document.querySelector('#phone').value;
    if (!phone) {
        document.querySelector('#phone').focus();
        addError('телефон');
        return;
    }
    if (phone.length < 9 || phone.length > 11) {
        document.querySelector('#phone').focus();
        addError('телефон c длинной 9-11 символов');
        return;
    }
    if (!(phone[0] == '+' && (phone[1] == '7' || phone[1] == '3'))) {
        document.querySelector('#phone').focus();
        addError('телефон, который начинается с +7 или +3');
        return;
    }
    if (!(/^\d+$/.test(phone.slice(1, phone.length)))) {
        document.querySelector('#phone').focus();
        addError('телефон без пробелов и посторонних символов');
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

document.querySelector('.inputBox').addEventListener('focus', function () {
    document.querySelector('#calendar').classList.remove('hidden')
    document.querySelector('.inputBox').blur()
})

document.querySelector('.day').addEventListener('click', function (event) {
    if (!event.target.classList.contains('digit')) return
    let content = document.querySelector('.inputBox')
    if (content.value.split(' ').length > 2)
        content.value = content.value.split(' ')[1] + " " + content.value.split(' ')[2]
    content.value = event.target.textContent + " " + content.value
})

document.querySelector('#calendar').addEventListener('input', function () {
    let month = document.querySelector('#month').value
    let monthIndex = getMonthIndex(month)
    let year = document.querySelector('#years').value
    document.querySelector('.inputBox').value = month + ' ' + year
    addDays(monthIndex, year)
})

function setUpMonth() {
    let monthSelect = document.querySelector('#month')
    monthes.forEach(function (item) {
        let option = document.createElement('option')
        option.innerHTML = item
        monthSelect.append(option)
    })
}

function setUpYears(maxYear) {
    let yearsSelect = document.querySelector('#years')
    for (let i = 2000; i <= maxYear; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
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
        let week = document.querySelectorAll('.dayRow')[i]
        for (let j = 0; j < 7; j++) {
            if (firstWeekday > j && i == 1) {
                dayCount = ' '
            }
            if (dayCount > daysInMonth || outOfMonth) {
                dayCount = ' '
                outOfMonth = true
            }
            let day = document.createElement('div');
            day.classList.add('weekDay');
            day.classList.add('digit');
            day.innerHTML = dayCount;
            dayCount++;
            week.append(day);
        }
    }
}

function deleteDays() {
    for (let i = 1; i < 7; i++) {
        document.querySelectorAll('.dayRow')[i].querySelectorAll('div').forEach(item => {
            item.remove()
        })
    }
}

setUpYears(2025)
setUpMonth()





function allowSendData() {
    let fio = document.querySelector('#fio').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let date = document.querySelector('#dateInput').value

    if (!fio || fio.split(' ').length != 3 ||
        !(document.querySelector('#checkGender1').checked || document.querySelector('#checkGender2').checked) ||
        !email || !phone || phone.length < 9 || phone.length > 11 || !(phone[0] == '+' && (phone[1] == '7' || phone[1] == '3')) ||
        !(/^\d+$/.test(phone.slice(1, phone.length))) || !date || (date.split(' ').length < 2)) {
        document.querySelector('#Submit').disabled = true
    }
    else {
        document.querySelector('#Submit').disabled = false
    }

    console.log('aaa')
}

document.querySelectorAll('input').forEach(function (item) {
    item.addEventListener('input', allowSendData)
    item.addEventListener('change', allowSendData)
    document.querySelector('#month').addEventListener('change', allowSendData);
    document.querySelector('#years').addEventListener('change', allowSendData);
    document.querySelectorAll('.digit').forEach(day => {
        day.addEventListener('click', allowSendData);
    });
})

function removeLocalError(elemId) {
    document.querySelector('#' + elemId).classList.add('hidden');
}

function addDotedError(elemId, messageErrorId, errorText) {
    let localError = document.querySelector('#' + elemId)
    localError.classList.remove('hidden');
    document.querySelector('#' + messageErrorId).textContent = 'Введите ' + errorText;

    if (errorTimeoutId !== null) {
        clearTimeout(errorTimeoutId);
    }
    errorTimeoutId = setTimeout(() => {
        error.classList.add('hidden');
        errorTimeoutId = null;
    }, 3000);
}

document.querySelector('#fio').addEventListener('blur', function (event) {
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

document.querySelector('#email').addEventListener('blur', function (event) {
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

document.querySelector('#phone').addEventListener('blur', function (event) {
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