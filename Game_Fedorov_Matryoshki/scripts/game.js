const difficulty = localStorage.getItem('difficulty') || 'easy';
const field = document.getElementById('field');
var field_minx = field.getBoundingClientRect().x;
var field_maxx = field.getBoundingClientRect().right;
var field_miny = field.getBoundingClientRect().y;
var field_maxy = field.getBoundingClientRect().bottom;
const assemblyContainer = document.getElementById('assembly');
const exampleContainer = document.getElementById('example'); 
const scope =  document.getElementById('scope');
const time =  document.getElementById('time');
const level = document.getElementById('level');

const green = 'green';
const red = 'red';
const blue = 'blue';
const small = 'small';
const medium = 'medium';
const big = 'big';
let arrayName = [/*'Таня', 'Саша', 'Катя'*/];

let minutes = 0;
let seconds = 30;
let count = 0;
let color;
let name;
let arrayMatryoshka = [];

level.textContent = 'Уровень сложности: ' + difficulty;

if (difficulty !== "easy") {
        arrayName = ['Таня', 'Надя', 'Катя'];
}

const n = 15;
    const m = [];
    for (var i=0; i<5; i++) {
        m.push(addElem(getRandomName()));
    }

addElemExmaple(getRandomMatryoshka());
generate();

function eventClick(event) {
    if (event.target.classList.contains(arrayMatryoshka[0].size) && event.target.classList.contains(arrayMatryoshka[0].color)) {
        arrayMatryoshka.shift();
        const elemClone = event.target.cloneNode(true);
        moveElementToAssembly(elemClone);
        event.target.remove();
        count +=10;    
        scope.textContent = 'Счет:' + count;
        if (arrayMatryoshka.length === 0) {
            count +=100;  
            scope.textContent = 'Счет:' + count;  
            addTime(5);
            update();
        }
    }
}


function mouseDown(e) {
    e.target.classList.remove('animCircle');
    const elem = e.target;
    const elemArea = elem.parentElement;

    const { clientX: mouseLeft, clientY: mouseTop } = e;
    const { left: elemLeft, top: elemTop } = elem.getBoundingClientRect();
    const { left: areaLeft, top: areaTop } = elemArea.getBoundingClientRect();

    const shiftX = mouseLeft - elemLeft + areaLeft;
    const shiftY = mouseTop - elemTop + areaTop;

    previusZIndex = elem.style.zIndex;
    elem.style.zIndex = 20;
    elem.style.cursor = 'grabbing';

    function moveAt(x, y) {
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        /*
        if (x < field_minx) {elem.style.left = field_minx + 'px';}
    else if (x > field_maxx) {elem.style.left = field_maxx + 'px';}
        else {elem.style.left = x + 'px';}
    if (y <field_miny) {elem.style.top = field_miny + 'px';}
    else if (y >field_maxy) {elem.style.top = (field_maxy ) + 'px';}
        else {elem.style.top = y + 'px';}
        */
    }

    function mouseMove(e) {
        moveAt(e.pageX - shiftX, e.pageY - shiftY);
    }

    function mouseUp() {
        elem.style.zIndex = previusZIndex;
        elem.style.cursor = 'grab';
        elem.removeEventListener('mouseup', mouseUp);
        document.removeEventListener('mousemove', mouseMove);
        if (difficulty === "hard") {
            elem.classList.add('animCircle'); 
            checkHard(elem, assemblyContainer)    
        } else {checkMedium(elem, assemblyContainer)}
    }
    elem.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);
}

function checkMedium(elem, assemblyContainer) {
    if (collision(elem, assemblyContainer) && elem.classList.contains(arrayMatryoshka[0].size) && (elem.classList.contains(arrayMatryoshka[0].color) || elem.classList.contains(arrayMatryoshka[0].name))){
        arrayMatryoshka.shift();
        const elemClone = elem.cloneNode(true);
        moveElementToAssembly(elemClone);
        elem.remove();
        count +=40;    
        scope.textContent = 'Счет:' + count;
        if (arrayMatryoshka.length === 0) {
            count +=220;  
            scope.textContent = 'Счет:' + count;  
            addTime(10);
            update();
        }
    }
}

function checkHard(elem, assemblyContainer) {
    if (collision(elem, assemblyContainer) && elem.classList.contains(arrayMatryoshka[0].size) && elem.classList.contains(arrayMatryoshka[0].color) && elem.classList.contains(arrayMatryoshka[0].name)){
        arrayMatryoshka.shift();
        elem.classList.remove('animCircle');
        const elemClone = elem.cloneNode(true);
        moveElementToAssembly(elemClone);
        elem.remove();
        count +=100;    
        scope.textContent = 'Счет:' + count;
        if (arrayMatryoshka.length === 0) {
            count +=400;  
            scope.textContent = 'Счет:' + count;  
            addTime(20);
            update();
        }
    }
}

function collision(elem, assemblyContainer) {
    const { left: ringLeft, top: ringTop } = elem.getBoundingClientRect();
    const { left: blockLeft, top: blockTop } = assemblyContainer.getBoundingClientRect();

    return ringLeft >= blockLeft && ringLeft <= blockLeft + assemblyContainer.offsetWidth && ringTop >= blockTop && ringTop <= blockTop + assemblyContainer.offsetHeight;
}

function update() {
    arrayMatryoshka = getRandomMatryoshka();  
    let elementsToAssembly = assemblyContainer.querySelectorAll('.matryoshka');
    elementsToAssembly.forEach(element => {
        element.remove();
    });
    let elementsToExample = exampleContainer.querySelectorAll('.matryoshka');
    elementsToExample.forEach(element => {
        element.remove();
    });
    addElemExmaple(arrayMatryoshka);
}

function eventRightClick(event) {
    event.preventDefault();

    if (event.target.classList.contains(small)) {
        event.target.classList.remove(small);
        event.target.classList.add(medium);
        //event.target.style.transform = 'translate(-12.5px, -18.75px)';
        return;
    }

    if (event.target.classList.contains(medium)) {
        event.target.classList.remove(medium);
        event.target.classList.add(big);
        //event.target.style.transform = 'translate(-30px, -45px)';
        return;
    }

    if (event.target.classList.contains(big)) {
        event.target.classList.remove(big);
        event.target.classList.add(small);
        //event.target.style.transform = 'translate(0px, 0px)';
        return;
    }
} 

function addElem(name) {
    color = getRandomColor();
    name = getRandomName();
    let fieldContainer = document.getElementById('field'); // Получаем контейнер field

    let matryoshkaDiv = document.createElement('div');
    matryoshkaDiv.classList.add('matryoshka', color, small, name);

    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add('body');

    let headDiv = document.createElement('div');
    headDiv.classList.add('head');

    let eyesDiv1 = document.createElement('div');
    eyesDiv1.classList.add('eyes');

    let eyesDiv2 = document.createElement('div');
    eyesDiv2.classList.add('eyes');
    eyesDiv2.style.left = '60%';

    let nameParagraph = document.createElement('p');
    nameParagraph.textContent = name;

    // Строим структуру элементов вложенности
    headDiv.appendChild(eyesDiv1);
    headDiv.appendChild(eyesDiv2);

    matryoshkaDiv.appendChild(bodyDiv);
    matryoshkaDiv.appendChild(headDiv);
    matryoshkaDiv.appendChild(nameParagraph);
    matryoshkaDiv.addEventListener('mouseover', function() {
        matryoshkaDiv.style.cursor = 'pointer';
    });
    if (difficulty === "hard") {matryoshkaDiv.classList.add('animCircle');}
    if (difficulty === "easy") {
        matryoshkaDiv.addEventListener('click', eventClick);
    } else {
        matryoshkaDiv.addEventListener('mousedown', mouseDown);
    }
    matryoshkaDiv.addEventListener('contextmenu', eventRightClick);
    fieldContainer.appendChild(matryoshkaDiv);
    setPosition(matryoshkaDiv);
    return matryoshkaDiv;
}

function setPosition(matryoshkaDiv){
    matryoshkaDiv.style.top = Math.floor((field_maxy - field_miny - matryoshkaDiv.getBoundingClientRect().height)*Math.random()) + 'px';
    matryoshkaDiv.style.left = Math.floor((field_maxx - field_minx - matryoshkaDiv.getBoundingClientRect().width)*Math.random()) + 'px';
}

function addElemExmaple(arrayMatryoshka) {
    for (i = 0; i < 3; i++) {
        createElemExmaple(arrayMatryoshka[i].size, arrayMatryoshka[i].color, arrayMatryoshka[i].name);
    }
}

function createElemExmaple(size, color, name) {

    let matryoshkaDiv = document.createElement('div');
    matryoshkaDiv.classList.add('matryoshka', color, size, name);

    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add('body');

    let headDiv = document.createElement('div');
    headDiv.classList.add('head');

    let eyesDiv1 = document.createElement('div');
    eyesDiv1.classList.add('eyes');

    let eyesDiv2 = document.createElement('div');
    eyesDiv2.classList.add('eyes');
    eyesDiv2.style.left = '60%';

    let nameParagraph = document.createElement('p');
    if (size === "small") {
        nameParagraph.textContent = name;
    }

    if (size === "medium") {
        matryoshkaDiv.style.transform = 'translate(0px, -18.75px)';
    } else if (size === "big") {
        matryoshkaDiv.style.transform = 'translate(0px, -45px)';
    }
    // Строим структуру элементов вложенности
    headDiv.appendChild(eyesDiv1);
    headDiv.appendChild(eyesDiv2);

    matryoshkaDiv.appendChild(bodyDiv);
    matryoshkaDiv.appendChild(headDiv);
    matryoshkaDiv.appendChild(nameParagraph);

    exampleContainer.appendChild(matryoshkaDiv);
}

function moveElementToAssembly(element) {
    let assemblyContainer = document.getElementById('assembly');
        assemblyContainer.appendChild(element);
        element.style.position = 'absolute';
        element.style.top = '35%';
        element.style.left = '22.5%';
        element.style.cursor = 'default';
}

function getRandomColor() {
    var num = Math.floor(Math.random() * 3) + 1;
    if (num === 1 ) {
        return green;
    }
    if (num === 2 ) {
        return red;
    }
    if (num === 3 ) {
        return blue;
    }
}

function getRandomMatryoshka() {
    let name = getRandomName(arrayName);
    arrayMatryoshka = [
        { size: 'big', color: getRandomColor(), name: name},
        { size: 'medium', color: getRandomColor(), name: name},
        { size: 'small', color: getRandomColor(), name: name}
    ];
    return arrayMatryoshka;
}

function getRandomName() {
    var num = Math.floor(Math.random() * arrayName.length);
    return arrayName[num];
}

function generate() {
    const i = setInterval(() => {
        const mo = addElem(getRandomColor());
        m.push(mo);
        if (m.length > n) {
            const k = m.shift();
            k.remove();
        }      
    }, 1000)
}

// Функция для обновления времени
function updateTimer() {
    // Выводим оставшееся время только в минутах и секундах
    time.textContent = 'Время:' + ` ${minutes}:${seconds}`;
}

// Функция для добавления времени при событии
function addTime(sec) {
    seconds += sec;
    if (seconds > 60) {
        minutes += 1;
        seconds -= 60;
    }
    updateTimer();
}

// Устанавливаем интервал для таймера
let timerInterval = setInterval(function() {
    if (seconds > 0) {
        seconds -= 1;
    } else {
        if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
        } else {
            clearInterval(timerInterval);
            alert ('Время истекло!');
            localStorage.setItem('score', count);;
            location.href = 'endgame.html';
        }
    }
    updateTimer();
}, 1000);