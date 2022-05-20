import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonEl = document.querySelector('button');
const timerEL = document.querySelector('.timer');
const daysInput = document.querySelector('span[data-days]');
const hoursInput = document.querySelector('span[data-hours]');
const minutesInput = document.querySelector('span[data-minutes]');
const secondsInput = document.querySelector('span[data-seconds]');

buttonEl.addEventListener('click', dateClose);
buttonEl.disabled = true;
timerEL.style.fontSize = '24px';
timerEL.style.display = 'flex';

let differenceTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    function startTimer() {
      const timeSet = selectedDates[0].getTime();
      const timeNow = new Date().getTime();
      differenceTime = timeSet - timeNow;
    }
    startTimer();

    if (differenceTime <= 0) {
      alert('Please choose a date in the future');
    } else {
      setInterval(() => {
        startTimer();
      }, 1000);
      buttonEl.disabled = false;
    }
  },
};

flatpickr('input#datetime-picker', options);

function dateClose(e) {
  function refreshSpan() {
    const { days, hours, minutes, seconds } = convertMs(differenceTime);

    daysInput.textContent = days.toString().length < 2 ? `0${days}` : days;
    hoursInput.textContent = hours.toString().length < 2 ? `0${hours}` : hours;
    minutesInput.textContent = minutes.toString().length < 2 ? `0${minutes}` : minutes;
    secondsInput.textContent = seconds.toString().length < 2 ? `0${seconds}` : seconds;
  }
  refreshSpan();
  convertMs(differenceTime);
  setInterval(() => {
    refreshSpan();
    convertMs(differenceTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
