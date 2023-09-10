// Define variables
let startTime = 0;
let intervalId = null;
let isRunning = false;

// Get elements
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

// Helper function to format time as HH:MM:SS
function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

// Function to update the display
function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime : startTime;
    display.textContent = formatTime(currentTime);
}

// Event handler for the Start/Stop button
function toggleStartStop() {
    if (isRunning) {
        clearInterval(intervalId);
        startStopButton.textContent = 'Start';
    } else {
        startTime += Date.now() - startTime;
        intervalId = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

// Event handler for the Reset button
function resetStopwatch() {
    clearInterval(intervalId);
    startStopButton.textContent = 'Start';
    startTime = 0;
    isRunning = false;
    display.textContent = formatTime(0);
    lapList.innerHTML = '';
}

// Event handler for the Lap button
function recordLap() {
    const lapTime = Date.now() - startTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapList.children.length + 1}: ${formatTime(lapTime)}`;
    lapList.appendChild(lapItem);
}

// Attach event listeners
startStopButton.addEventListener('click', toggleStartStop);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
