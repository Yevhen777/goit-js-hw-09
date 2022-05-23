const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', getRandomHexColorStart);

function getRandomHexColorStart() {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const colorRandom = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    body.style.backgroundColor = colorRandom;
  }, 1000);
}

function getRandomHexColorStop() {
  clearInterval(timerId);

  startBtn.disabled = false;
}
stopBtn.addEventListener('click', getRandomHexColorStop);
