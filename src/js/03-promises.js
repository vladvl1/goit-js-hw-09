import Notiflix, { Notify } from "notiflix";


const formEl = document.querySelector('form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      
      if (shouldResolve) {
        resolve({ position, delay });
      } 
        reject({ position, delay });
    }, delay);
  });
}
const handleSubmitPromise = e => {
  e.preventDefault();
  const numberOfPromise = Number(inputAmountEl.value);
  let prevDelay = Number(inputDelayEl.value);
  const stepPromise = Number(inputStepEl.value);


  if (numberOfPromise <= 0 || prevDelay <= 0 || stepPromise < 0) {
    Notiflix.Report.failure("Please choose valid data");
    return;
  }
  for (let position = 0; position < numberOfPromise; position++) {
    createPromise(position, prevDelay)
      .then(x => 
           Notify.success(`Fulfilled promise ${Number(position + 1)} in ${x.delay}ms`))
      .catch(x =>
           Notify.failure(`Rejected promise ${Number(position + 1)} in ${x.delay}ms`));
          prevDelay += stepPromise;
}
};
formEl.addEventListener("submit", handleSubmitPromise);
