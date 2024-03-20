var field = document.getElementById('field');
var field_minx = field.getBoundingClientRect().x;
var field_maxx = field.getBoundingClientRect().right;
var field_miny = field.getBoundingClientRect().y;
var field_maxy = field.getBoundingClientRect().bottom;

var head_chest = 0;
var collar_head = 0;
var chest_croup = 0;
var ball_chest = 0;
var leash_collar = 0;
var croup_tail = 0;

function onMouseDown(event,eName) {
let elem = document.getElementById(eName.id);
let shiftX = event.clientX - elem.getBoundingClientRect().left;
let shiftY = event.clientY - elem.getBoundingClientRect().top;
elem.style.zIndex = 10;
moveAt(event.pageX, event.pageY);

function moveAt(pageX, pageY) {
    let wid = elem.getBoundingClientRect().width;
    let hei = elem.getBoundingClientRect().height;
    if (pageX - shiftX<field_minx) {elem.style.left = field_minx + 'px';}
    else if (pageX - shiftX >field_maxx - wid) {elem.style.left = (field_maxx-wid) + 'px';}
        else {elem.style.left = pageX - shiftX + 'px';}
    if (pageY - shiftY<field_miny) {elem.style.top = field_miny + 'px';}
    else if (pageY - shiftY>field_maxy - hei) {elem.style.top = (field_maxy - hei) + 'px';}
        else {elem.style.top = pageY - shiftY + 'px';}
}

function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
}


function onKeyDown(event) {
    if (event.code=='KeyA'||event.code == 'KeyD') {
    let st = window.getComputedStyle(elem, null);
    let trans = parseInt(st.getPropertyValue('rotate'));
    console.log(trans);
    let rotate=0;
    if (!isNaN(trans)) rotate=trans;
    if (event.code == 'KeyA') {rotate -=5;}
    if (event.code == 'KeyD') {rotate +=5;}
    if (rotate>360) rotate-=360;
    if (rotate<0) rotate+=360;
    elem.style.rotate = rotate+'deg';
    }
}

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('keydown', onKeyDown);

document.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('keydown', onKeyDown);
    document.onmouseup = null;
    checkPositions(elem);
    document.getElementById('count').textContent 
    = "Правильно: " + (head_chest + collar_head + chest_croup + ball_chest + leash_collar + croup_tail) + "/6";
}

elem.ondragstart = function () {
    return false;
}
}

window.addEventListener('DOMContentLoaded', onLoad);

function onLoad(){
const elements = document.querySelectorAll('#field > div');
elements.forEach(element => {
    element.style.transition = '';
    element.style.opacity = '';
});

document.getElementById('head').style.transform = '';
document.getElementById('chest').style.transform = '';
document.getElementById('collar').style.transform = '';
document.getElementById('croup').style.transform = '';
document.getElementById('tail').style.transform = '';
document.getElementById('ball').style.transform = '';
document.getElementById('leash').style.transform = '';
head_chest = 0;
collar_head = 0;
chest_croup = 0;
ball_chest = 0;
leash_collar = 0;
croup_tail = 0;
document.getElementById('count').textContent = "Правильно: 0/6";

let items = field.childElementCount;
for (var i=0; i<items; i++) {
    let tmp = field.children.item(i);
    tmp.style.rotate = Math.floor(Math.random()*72)*5 +'deg';
    tmp.style.top = Math.floor((field_maxy - field_miny - tmp.getBoundingClientRect().height)*Math.random()) + field_miny + 'px';
    tmp.style.left = Math.floor((field_maxx - field_minx - tmp.getBoundingClientRect().width)*Math.random()) + field_minx + 'px';
}



window.removeEventListener("DOMContentLoaded", onLoad);
}

function checkPositions(elem) {
switch (elem.id) {
    case 'head': {
        let dx = field.children.namedItem('head').getBoundingClientRect().left - field.children.namedItem('chest').getBoundingClientRect().left;
        let dy = field.children.namedItem('head').getBoundingClientRect().top - field.children.namedItem('chest').getBoundingClientRect().top;
        if ( dx >= -9 && dx <= 11 && dy >= -30 & dy <= -10) {head_chest = 1; setPosition('head','chest', 1, -20)}
        else if (head_chest = 1) head_chest = 0;

        dx = field.children.namedItem('head').getBoundingClientRect().left - field.children.namedItem('collar').getBoundingClientRect().left;
        dy = field.children.namedItem('head').getBoundingClientRect().top - field.children.namedItem('collar').getBoundingClientRect().top;
        if ( dx >= -16 && dx <= -6 && dy >= -24 & dy <= 14) {collar_head = 1; setPosition('head','collar', -11, -19)}
        else if (collar_head = 1) collar_head = 0;
        break;
    }
    case 'chest': {
        let dx = field.children.namedItem('chest').getBoundingClientRect().left - field.children.namedItem('head').getBoundingClientRect().left;
        let dy = field.children.namedItem('chest').getBoundingClientRect().top - field.children.namedItem('head').getBoundingClientRect().top;
        if ( dx >= -11 && dx <= 9 && dy >= 10 & dy <= 30) {head_chest = 1; setPosition('chest','head', -1, 20)}
        else if (head_chest = 1) head_chest = 0;

        dx = field.children.namedItem('chest').getBoundingClientRect().left - field.children.namedItem('croup').getBoundingClientRect().left;
        dy = field.children.namedItem('chest').getBoundingClientRect().top - field.children.namedItem('croup').getBoundingClientRect().top;
        if ( dx >= -63 && dx <= -53 && dy >= -8 & dy <= 2) {chest_croup = 1; setPosition('chest','croup', -58, -3)}
        else if (chest_croup = 1) chest_croup = 0;

        dx = field.children.namedItem('chest').getBoundingClientRect().left - field.children.namedItem('ball').getBoundingClientRect().left;
        dy = field.children.namedItem('chest').getBoundingClientRect().top - field.children.namedItem('ball').getBoundingClientRect().top;
        if ( dx >= -30 && dx <= -20 && dy >= -34 & dy <= -24) {ball_chest = 1;setPosition('chest','ball', -25, -29)}
        else if (ball_chest = 1) ball_chest = 0;
        break;
    }
    case 'collar': {
        let dx = field.children.namedItem('collar').getBoundingClientRect().left - field.children.namedItem('head').getBoundingClientRect().left;
        let dy = field.children.namedItem('collar').getBoundingClientRect().top - field.children.namedItem('head').getBoundingClientRect().top;
        if ( dx >= 6 && dx <= 16 && dy >= 14 & dy <= 24) {collar_head = 1; setPosition('collar','head', 11, 19)}
        else if (collar_head = 1) collar_head = 0;

        dx = field.children.namedItem('collar').getBoundingClientRect().left - field.children.namedItem('leash').getBoundingClientRect().left;
        dy = field.children.namedItem('collar').getBoundingClientRect().top - field.children.namedItem('leash').getBoundingClientRect().top;
        if ( dx >= -35 && dx <= -25 && dy >= 37 & dy <= 47) {leash_collar = 1; setPosition('collar','leash', -30, 42)}
        else if (leash_collar = 1) leash_collar = 0;
        break;
    }
    case 'leash': {
        let dx = field.children.namedItem('leash').getBoundingClientRect().left - field.children.namedItem('collar').getBoundingClientRect().left;
        let dy = field.children.namedItem('leash').getBoundingClientRect().top - field.children.namedItem('collar').getBoundingClientRect().top;
        if ( dx >= 25 && dx <= 35 && dy >= -47 & dy <= -37) {leash_collar = 1; setPosition('leash','collar', 30, -42)}
        else if (leash_collar = 1) leash_collar = 0;
        break;
    }
    case 'croup': {
        let dx = field.children.namedItem('croup').getBoundingClientRect().left - field.children.namedItem('chest').getBoundingClientRect().left;
        let dy = field.children.namedItem('croup').getBoundingClientRect().top - field.children.namedItem('chest').getBoundingClientRect().top;
        if ( dx >= 53 && dx <= 63 && dy >= -2 & dy <= 8) {chest_croup = 1; setPosition('croup','chest', 58, 3)}
        else if (chest_croup = 1) chest_croup = 0;

        dx = field.children.namedItem('croup').getBoundingClientRect().left - field.children.namedItem('tail').getBoundingClientRect().left;
        dy = field.children.namedItem('croup').getBoundingClientRect().top - field.children.namedItem('tail').getBoundingClientRect().top;
        if ( dx >= -43 && dx <= -33 && dy >= -8 & dy <= 2) {croup_tail = 1; setPosition('croup','tail', -38, -3)}
        else if (croup_tail = 1) croup_tail = 0;
        break;
    }
    case 'tail': {
        dx = field.children.namedItem('tail').getBoundingClientRect().left - field.children.namedItem('croup').getBoundingClientRect().left;
        dy = field.children.namedItem('tail').getBoundingClientRect().top - field.children.namedItem('croup').getBoundingClientRect().top;
        if ( dx >= 33 && dx <= 43 && dy >= -2 & dy <= 8) {croup_tail = 1; setPosition('tail','croup', 38, 3)}
        else if (croup_tail = 1) croup_tail = 0;
        break;
    }
    case 'ball': {
        let dx = field.children.namedItem('ball').getBoundingClientRect().left - field.children.namedItem('chest').getBoundingClientRect().left;
        let dy = field.children.namedItem('ball').getBoundingClientRect().top - field.children.namedItem('chest').getBoundingClientRect().top;
        if ( dx >= 20 && dx <= 30 && dy >= 24 & dy <= 34) {ball_chest = 1; setPosition('ball','chest', 25, 29)}
        else if (ball_chest = 1) ball_chest = 0;
        break;
    }
}
if (checkCheckers()) onWin();
}

function checkCheckers() {
if (head_chest + collar_head + chest_croup + ball_chest + leash_collar + croup_tail==6) return true;
return false;
}

function setPosition(el1, el2, dx, dy) {
field.children.namedItem(el1).style.left = field.children.namedItem(el2).getBoundingClientRect().left + dx + 'px';
field.children.namedItem(el1).style.top = field.children.namedItem(el2).getBoundingClientRect().top + dy + 'px';
field.children.namedItem(el1).style.rotate = 0 + 'deg';
field.children.namedItem(el2).style.rotate = 0 + 'deg';
console.log("правильно");
console.log("head_chest " + head_chest);
console.log("collar_head " + collar_head);
console.log("chest_croup "+ chest_croup);
console.log("ball_chest " + ball_chest);
console.log("leash_collar "+ leash_collar);
console.log("croup_tail " + croup_tail);
return true;
}


function onWin() {
    const elements = document.querySelectorAll('#field > div');

    elements.forEach(element => {
        element.style.transition = '5s';
        element.style.opacity = '0';
    });
document.getElementById('head').style.transform = `translate(${-200}px, ${-200}px)`;
document.getElementById('chest').style.transform = `translate(${-200}px, ${200}px)`;
document.getElementById('collar').style.transform = `translate(${-200}px, ${0}px)`;
document.getElementById('croup').style.transform = `translate(${200}px, ${200}px)`;
document.getElementById('tail').style.transform = `translate(${200}px, ${0}px)`;
document.getElementById('ball').style.transform = `translate(${0}px, ${200}px)`;
document.getElementById('leash').style.transform = `translate(${200}px, ${-200}px)`;
}