const startButton = document.querySelector('button');
const gridItems = document.querySelectorAll('.grid > div');
const timerDisplay = document.getElementById('timer');
const historyTable = document.getElementById('min-w-full bg-white'); // Thay 'history' bằng id của bảng
const arrowButtons = document.querySelectorAll('.btnarrow');

let isStarted = false;
let time = 0;
let timerInterval;
let moves =[];

function shuffle() {
  const numbers = Array.from({length: gridItems.length - 1}, (_, i) => i + 1);
  for (let i = 0; i < 100 ; i++){  // 100 lần shuffle
    numbers.sort(() => 0.5 - Math.random());
  }
  gridItems.forEach((item, index) => {
    if (index < gridItems.length - 1) {
      item.textContent = numbers[index];
    }
  });
}

function startTimer() {
  time = 0;
  timerDisplay.textContent = '00:00';
  timerInterval = setInterval(() => {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateHistory(move) {
  const newRow = historyTable.insertRow();
  const numberCell = newRow.insertCell();
  const moveCell = newRow.insertCell();
  const timeCell = newRow.insertCell();

  numberCell.textContent = moves.length;
  moveCell.textContent = move;
  timeCell.textContent = timerDisplay.textContent;
}

function moveItem(direction) {
  const emptyIndex = Array.from(gridItems).findIndex(item => item.textContent === '');
  let targetIndex;

  switch (direction) {
    case 'up':
      targetIndex = emptyIndex - 4;
      break;
    case 'down':
      targetIndex = emptyIndex + 4;
      break;
    case 'left':
      targetIndex = emptyIndex - 1;
      break;
    case 'right':
      targetIndex = emptyIndex + 1;
      break;
  }

  if (targetIndex >= 0 && targetIndex < gridItems.length && 
      Math.abs(emptyIndex % 4 - targetIndex % 4) <= 1) {
    const temp = gridItems[emptyIndex].textContent;
    gridItems[emptyIndex].textContent = gridItems[targetIndex].textContent;
    gridItems[targetIndex].textContent = temp;
    moves.push(direction);
    updateHistory(direction);
  }
}

startButton.addEventListener('click', () => {
  if (!isStarted) {
    shuffle();
    startTimer();
    startButton.textContent = 'Kết thúc';
    isStarted = true;
  } else {
    stopTimer();
    startButton.textContent = 'Bắt đầu';
    isStarted = false;
    moves =[] // Reset lịch sử bước đi
    historyTable.innerHTML = ''; // Xóa nội dung bảng lịch sử
  }
});

arrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isStarted) {
      const direction = button.textContent === '↑' ? 'up' :
                        button.textContent === '↓' ? 'down' :
                        button.textContent === '←' ? 'left' : 'right';
      moveItem(direction);
    }
  });
});