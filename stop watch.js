let timer;
let isRunning = false;
let elapsedTime = 0;
let lapTimes = [];
let lastLapTime = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');
const hand = document.querySelector('.hand');

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startStopBtn.textContent = 'STOP';
        startTimer();
    } else {
        startStopBtn.textContent = 'START';
        stopTimer();
    }
    isRunning = !isRunning;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    }
});

resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    timer = setInterval(() => {
        elapsedTime++;
        updateDisplay();
        rotateHand();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    lastLapTime = 0;
    lapTimes = [];
    isRunning = false;
    startStopBtn.textContent = 'START';
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    hand.style.transform = 'rotate(0deg)';
}

function updateDisplay() {
    let hours = Math.floor(elapsedTime / 3600);
    let minutes = Math.floor((elapsedTime % 3600) / 60);
    let seconds = elapsedTime % 60;
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function rotateHand() {
    const degrees = (elapsedTime % 60) * 6; // 360 degrees / 60 seconds
    hand.style.transform = `rotate(${degrees}deg)`;
}

function recordLap() {
    const currentLapTime = elapsedTime - lastLapTime;
    lastLapTime = elapsedTime;
    lapTimes.push(currentLapTime);
    displayLapTime(currentLapTime);
}

function displayLapTime(lapTime) {
    let hours = Math.floor(lapTime / 3600);
    let minutes = Math.floor((lapTime % 3600) / 60);
    let seconds = lapTime % 60;

    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    lapsList.appendChild(lapItem);
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}
