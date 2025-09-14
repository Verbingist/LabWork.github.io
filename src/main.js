function addImage(index) {
    resetImage();
    let li = document.querySelectorAll('.liPagination')[index];
    li.querySelector('a').classList.toggle('hidden');
    li.querySelector('img').classList.toggle('hidden');
}

function resetImage() {
    document.querySelectorAll('.liPagination').forEach(function (item) {
        item.querySelector('a').classList.remove('hidden');
        item.querySelector('img').classList.add('hidden');
    })
}

document.querySelector('.navigation').addEventListener('mouseover', function (event) {
    if (event.target.id == window.location.href.split('/').pop().split('.')[0]) {
        resetImage()
        return
    }
    if (event.target.id == "index") {
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

document.querySelector('.navigation').addEventListener('click', function (event) {
    if (event.target.id == "hidden1") {
        window.location.href = 'AboutMePage.html';
    }
    else if (event.target.id == "hidden2") {
        document.querySelector('.interestList').classList.toggle('hidden')
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

document.querySelector('#contextMenu').addEventListener('mouseleave', function (event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
        document.querySelector('.interestList').classList.add('hidden');
    }
});

let weekDays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

function addTimer() {
    let currentDate = new Date()
    let timer = document.querySelector('#timer')
    let day, month, year, weekday;
    if (currentDate.getDate().toString().length < 2)
        day = '0' + currentDate.getDate()
    else
        day = currentDate.getDate()
    if (currentDate.getMonth().toString().length < 2)
        month = '0' + (currentDate.getMonth() + 1)
    else
        month = currentDate.getMonth() + 1
    year = currentDate.getFullYear();
    if (!currentDate.getDay())
        weekday = weekDays[6];
    else 
        weekday = weekDays[currentDate.getDay() - 1]
    timerString = day + "." + month + '.' + year + " " + weekday
    timer.textContent = timerString
}

addTimer()
setInterval(addTimer, 1000)