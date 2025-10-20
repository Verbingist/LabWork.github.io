function addImage(index) {
    resetImage();
    let li = $('.liPagination').eq(index);
    li.children('a').toggleClass('hidden');
    li.find('img').toggleClass('hidden');
}

function resetImage() {
    $('.liPagination').each(function (index, item) {
        $(item).find('a').removeClass('hidden');
        $(item).find('img').addClass('hidden');
    })
}

$('.navigation').on('mouseover', function (event) {
    if (event.target.id == window.location.href.split('/').pop().split('.')[0]) {
        resetImage()
        return
    }
    if (event.target.id == "AboutMePage") {
        addImage(0);
    }
    else if (event.target.id == "MyInterests") {
        addImage(1);
    }
    else if (event.target.id == "Learning") {
        addImage(2);
    }
    else if (event.target.id == "PhotoAblom") {
        addImage(3);
    }
    else if (event.target.id == "Contact") {
        addImage(4);
    }
    else if (event.target.id == "DisciplineTest") {
        addImage(5);
    }
    else if (event.target.id == "story") {
        addImage(6);
    }
})

$('.navigation').on('click', function (event) {
    if (event.target.id == "hidden1") {
        window.location.href = 'AboutMePage.html';
    }
    else if (event.target.id == "hidden2") {
        $('.interestList').toggleClass('hidden')
    }
    else if (event.target.id == "hidden3") {
        window.location.href = 'Learning.html';
    }
    else if (event.target.id == "hidden4") {
        window.location.href = 'PhotoAblom.html';
    }
    else if (event.target.id == "hidden5") {
        window.location.href = 'Contact.html';
    }
    else if (event.target.id == "hidden6") {
        window.location.href = 'DisciplineTest.html';
    }
    else if (event.target.id == "hidden7") {
        window.location.href = 'story.html';
    }
})

$('#contextMenu').on('mouseleave', function (event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
        $('.interestList').addClass('hidden');
    }
});

let weekDays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

function addTimer() {
    let currentDate = new Date()
    let timer = $('#timer')
    let day, month, year, weekday;
    if (currentDate.getDate().toString().length < 2)
        day = '0' + currentDate.getDate()
    else
        day = currentDate.getDate()
    if (currentDate.getMonth().toString().length < 2)
        month = (currentDate.getMonth() + 1)
    else
        month = currentDate.getMonth() + 1
    year = currentDate.getFullYear();
    if (!currentDate.getDay())
        weekday = weekDays[6];
    else
        weekday = weekDays[currentDate.getDay() - 1]
    let timerString = day + "." + month + '.' + year + " " + weekday
    timer.text(timerString)
}

addTimer()
setInterval(addTimer, 1000)