let total = Number(localStorage.getItem('story'))

if (!total) total = 0
total = ++total

localStorage.setItem('story', total)



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

let storyCount = getCookie('story')
storyCount++
setCookie('story', storyCount)


let cookieNames = [
    'main',
    'aboutme',
    'interest',
    'learning',
    'photo',
    'contact',
    'test',
    'story'
];


$('.total').each(function (index) {
    let data = getCookie(cookieNames[index]);
    if (!data) data = 0;
    $(this).text(data);
})


$('.current').each(function(index) {
    let data = localStorage.getItem(cookieNames[index]);
    if (!data) data = 0;
    $(this).text(data);
})