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

let numReplic;
let arrayName = [];
let arrayOnPlace = [];

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

if (difficulty === "hard") {
    addReplic();
} else {addElemExmaple(getRandomMatryoshka());}

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
            winText(true);
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
            winText(true);
            addTime(10);
            update();
        }
    }
}

function checkHard(elem, assemblyContainer) {
    console.log(arrayOnPlace[0]);
    if (collision(elem, assemblyContainer)) {
        if (elem.classList.contains('big') && arrayOnPlace[0] === undefined) {
            elem.classList.remove('animCircle');
            const elemClone = elem.cloneNode(true);
            moveElementToAssembly(elemClone);
            elem.remove();
            arrayOnPlace[0] = elemClone;
        }
        if (elem.classList.contains('medium') && arrayOnPlace[0] !== undefined && arrayOnPlace[1] === undefined) {
            elem.classList.remove('animCircle');
            const elemClone = elem.cloneNode(true);
            moveElementToAssembly(elemClone);
            elem.remove();
            arrayOnPlace[1] = elemClone;
        }
        if (elem.classList.contains('small') && arrayOnPlace[1] !== undefined && arrayOnPlace[2] === undefined) {
            elem.classList.remove('animCircle');
            const elemClone = elem.cloneNode(true);
            moveElementToAssembly(elemClone);
            elem.remove();
            arrayOnPlace[2] = elemClone;
        }
        let count = 0;
        arrayOnPlace.forEach(element => {
            if(element !== undefined) count++;
        });
        if (count === 3) {
            switch (numReplic) {
                case 0:
                    if (arrayOnPlace[0].classList.contains("red")) {
                        count +=400;    
                        scope.textContent = 'Счет:' + count;
                        winText(true);
                        addTime(20);
                        updateHard();
                    } else {winText(false); updateHard();}
                break;
                case 1:
                    if (arrayOnPlace[1].classList.contains("green")) {
                        count +=400;    
                        scope.textContent = 'Счет:' + count;
                        winText(true);
                        addTime(20);
                        updateHard();
                    } else {winText(false); updateHard();}
                break;
                case 2:
                    if (arrayOnPlace[0].classList.contains("blue")) {
                        count +=400;    
                        scope.textContent = 'Счет:' + count;
                        winText(true);
                        addTime(20);
                        updateHard();
                    } else {winText(false); updateHard();};
                break;
                case 3:
                    if (arrayOnPlace[2].classList.contains("Надя")) {
                        count +=400;    
                        scope.textContent = 'Счет:' + count;
                        winText(true);
                        addTime(20);
                        updateHard();
                    } else {winText(false); updateHard();}
                break;
                case 4:
                    if (arrayOnPlace[1].classList.contains("Катя")) {
                        count +=400;    
                        scope.textContent = 'Счет:' + count;
                        winText(true);
                        addTime(20);
                        updateHard();
                    } else {winText(false); updateHard();}
                break;
            }
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
    setTimeout(() => {
        elementsToAssembly.forEach(element => {
            element.remove();
        });
    }, 1000);
    let elementsToExample = exampleContainer.querySelectorAll('.matryoshka');
    elementsToExample.forEach(element => {
        element.remove();
    });
    addElemExmaple(arrayMatryoshka);
}

function updateHard() {
    let elementsToAssembly = assemblyContainer.querySelectorAll('.matryoshka');
    setTimeout(() => {
        elementsToAssembly.forEach(element => {
            element.remove();
        });
    }, 1000);
    let elementToExample = exampleContainer.querySelector('.replic');
    elementToExample.remove();
    arrayOnPlace.splice(0, arrayOnPlace.length);
    addReplic();
}

function eventRightClick(event) {
    event.preventDefault();

    if (event.target.classList.contains(small)) {
        event.target.classList.remove(small);
        event.target.classList.add(medium);
        return;
    }

    if (event.target.classList.contains(medium)) {
        event.target.classList.remove(medium);
        event.target.classList.add(big);
        return;
    }

    if (event.target.classList.contains(big)) {
        event.target.classList.remove(big);
        event.target.classList.add(small);
        return;
    }
} 

function addElem(name) {
    color = getRandomColor();
    name = getRandomName();
    let fieldContainer = document.getElementById('field'); 

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

function addReplic() {
    let replic = document.createElement('p');
    let span = document.createElement('span');
    let textNode;
    numReplic = Math.floor(Math.random() * 5);
    switch (numReplic) {
        case 0:
            span = document.createElement('span');
            span.textContent = 'красная';
            span.style.color = 'red';
            span.style.fontWeight = 'bold'; 
            textNode = document.createTextNode('Большая матрешка - ');
            replic.appendChild(textNode);
            replic.appendChild(span);
            replic.classList.add('replic');
            exampleContainer.appendChild(replic);
            break;
        case 1:
            span = document.createElement('span');
            span.textContent = 'зеленая';
            span.style.color = 'green';
            span.style.fontWeight = 'bold'; 
            textNode = document.createTextNode('Средняя матрешка - ');
            replic.appendChild(textNode);
            replic.appendChild(span);
            replic.classList.add('replic');
            exampleContainer.appendChild(replic);
            break;
        case 2:
            span = document.createElement('span');
            span.textContent = 'синяя';
            span.style.color = 'blue';
            span.style.fontWeight = 'bold'; 
            textNode = document.createTextNode('Большая матрешка - ');
            replic.appendChild(textNode);
            replic.appendChild(span);
            replic.classList.add('replic');
            exampleContainer.appendChild(replic);
            break;
        case 3:
            span = document.createElement('span');
            span.textContent = 'Надя';
            span.style.color = 'rgb(153, 130, 0)';
            span.style.fontWeight = 'bold'; 
            textNode = document.createTextNode('Маленькая матрешка - ');
            replic.appendChild(textNode);
            replic.appendChild(span);
            replic.classList.add('replic');
            exampleContainer.appendChild(replic);
            break;
        case 4:
            span = document.createElement('span');
            span.textContent = 'Катя';
            span.style.color = 'rgb(153, 130, 0)';
            span.style.fontWeight = 'bold'; 
            textNode = document.createTextNode('Средняя матрешка - ');
            replic.appendChild(textNode);
            replic.appendChild(span);
            replic.classList.add('replic');
            exampleContainer.appendChild(replic);
            break;
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
        element.style.top = '30%';
        element.style.left = '22.5%';
        element.style.cursor = 'default';
        
        if (element.classList.contains('medium')) {
            element.style.transform = 'translate(17.5px, 26.25px)';
        } else if (element.classList.contains('small')) {
            element.style.transform = 'translate(30px, 45px)';
        }
        
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

function winText(flag) {
    const element = document.getElementById('win');

    element.style.display = 'block';
    if (flag) {
        element.textContent = 'Правильно!';
        element.style.color = 'green';
    } else {
        element.textContent = 'Неправильно!';
        element.style.color = 'red';
    }
    setTimeout(() => {
        element.style.display = 'none';
    }, 1000);
}


function updateTimer() {
    time.textContent = 'Время:' + ` ${minutes}:${seconds}`;
}

function addTime(sec) {
    seconds += sec;
    if (seconds > 60) {
        minutes += 1;
        seconds -= 60;
    }
    updateTimer();
}

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

