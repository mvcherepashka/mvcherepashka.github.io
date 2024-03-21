let scoreText = document.getElementById("score");
const localStorageScore = localStorage.getItem('score');
scoreText.textContent = "Вы набрали:  " + localStorageScore;

const localStorageData = localStorage.getItem('myArray');
const localStorageName = localStorage.getItem('name');
// Проверяем, есть ли данные в localStorage
let myArray = JSON.parse(localStorage.getItem('myArray')) || [];

// Добавляем новые данные в массив
if (localStorageName !== null || localStorageScore !== null) {
    myArray.push({name:localStorageName, score: localStorageScore});
}
myArray.sort((a, b) => b.score - a.score);
myArray = myArray.slice(0, 9);
localStorage.removeItem('name');
localStorage.removeItem('score');

// Сохраняем обновленный массив обратно в localStorage
localStorage.setItem('myArray', JSON.stringify(myArray));

leaderboard();

function leaderboard(){
 
const newTable = document.createElement('table');
// Создаем заголовок таблицы
const headerRow = newTable.insertRow();
const headerName = headerRow.insertCell();
headerName.textContent = 'Имя';
headerName.style.backgroundColor = 'rgb(92, 91, 91)';
const headerScore = headerRow.insertCell();
headerScore.textContent = 'Счет';
headerScore.style.backgroundColor = 'rgb(92, 91, 91)';
// Заполняем таблицу данными

myArray.forEach(player => {
    const row = newTable.insertRow();
    const nameCell = row.insertCell();
    nameCell.textContent = player.name;
    const scoreCell = row.insertCell();
    scoreCell.textContent = player.score;
});

document.getElementById("tab").appendChild(newTable);
}