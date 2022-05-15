const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', getRandomHexColorStart);
stopBtn.addEventListener('click', getRandomHexColorStop);

function getRandomHexColorStart() {
  timerId = setInterval(() => {
    startBtn.disabled = true;
    body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const colorRandom = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    body.style.backgroundColor = colorRandom;
  }, 1000);
}

function getRandomHexColorStop() {
  clearInterval(timerId);

  startBtn.disabled = false;
}
