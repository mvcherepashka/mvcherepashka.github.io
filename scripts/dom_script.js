
const latin = ["Consuetudo est altera natura", "Nota bene", "Nulla calamitas sola", "Per aspera ad astra"];
const rus = ["Привычка - вторая натура", "Заметьте хорошо!", "Беда не приходит одна", "Через тернии к звездам"]
let arr = [];

function btnClick() {
    const num = compare();
    if (num === null) {
        alert("Фразы закончились");
        return;
    }
    let el = document.createElement('li');
    el.className = parity();
    counter.append(el);
    let el2 = document.createElement('ul');
    el.append( latin[num],el2);
    let el3 = document.createElement('li');
    el2.append(el3);
    el3.append(rus[num]);
}

function parity() {
    if (arr.length%2 == 0) {return "class1"} else return "class2";
}
function rnd() {
    return Math.floor(Math.random()*latin.length);
}
function compare() { 
    if (arr.length === latin.length) { return null}
    let rndNum;
    while (true){
        rndNum = rnd();
        if (!arr.includes(rndNum)){
            arr.push(rndNum);
            return rndNum;
        } 
    }
}

function btnClick2(){
    btnClick();
}