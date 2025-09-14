let total = Number(localStorage.getItem('aboutme'))

if (!total) total = 0
total = ++total

localStorage.setItem('aboutme', total)


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

let storyCount = getCookie('aboutme')
storyCount++
setCookie('aboutme', storyCount)