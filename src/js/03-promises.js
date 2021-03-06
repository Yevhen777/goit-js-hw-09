import notiflix from 'notiflix';

const formSubmit = document.querySelector('.form');

formSubmit.addEventListener('submit', inputForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
      // Fulfill
    } else {
      reject({ position, delay });
      // Reject
    }
  });
}

function inputForm(e) {
  e.preventDefault();
  const amount = Number(e.currentTarget.elements.amount.value);
  const delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);

  function promiseCall({ position, delay }) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  setTimeout(() => {
    for (let position = 1; position <= amount; position++) {
      if (position === 1) {
        promiseCall({ position, delay });
      } else {
        setTimeout(() => {
          promiseCall({ position, delay: delay + step * (position - 1) });
        }, step * (position - 1));
      }
    }
  }, delay);
}
