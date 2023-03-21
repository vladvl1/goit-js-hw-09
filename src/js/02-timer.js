// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";



const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector('[data-start]');

const data = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startButton.setAttribute("disabled", "disabled");

let timeDifference = 0;
let timerID = null;
let selectedDate = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()){
      Notiflix.Report.failure("Please choose a date in the future");
      return;
    } else {
      startButton.removeAttribute("disabled", "disabled");
    }
  },
};

flatpickr(datetimePicker, options);

const handleBtnClick = () => {
  
  timerID = setInterval(() => {
    timeDifference = selectedDate - new Date();
    data.days.textContent = convertMs(timeDifference).days;
    data.hours.textContent = convertMs(timeDifference).hours;
    data.minutes.textContent = convertMs(timeDifference).minutes;
    data.seconds.textContent = convertMs(timeDifference).seconds;
    if (timeDifference <= 1000) {
      clearInterval(timerID);
    }
  })
}
startButton.addEventListener("click", handleBtnClick);


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