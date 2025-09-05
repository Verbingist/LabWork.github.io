let error = document.querySelector('.error');
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

document.querySelector('.inputBox').addEventListener('focus', function() {
    document.querySelector('#calendar').classList.remove('hidden')
    document.querySelector('.inputBox').blur()
})

document.querySelector('.day').addEventListener('click', function (event) {
    if (!event.target.classList.contains('digit')) return
    let content = document.querySelector('.inputBox')
    if (content.value.split(' ').length > 2) 
        content.value = content.value.split(' ')[1]+ " " + content.value.split(' ')[2]
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