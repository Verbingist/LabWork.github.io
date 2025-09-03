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
    console.log('успех');
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