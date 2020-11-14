import feather from 'feather-icons';
import dayjs from 'dayjs';

import './scss/main.scss';

setTimeout(() => {
  feather.replace();
});

const dates = document.getElementsByClassName('date');
for (let i = 0; i <= dates.length; i += 1) {
  const text = dates[i].innerHTML;
  dates[i].innerHTML = dayjs(text).format('DD/MM/YYYY HH:mm');
  dates[i].className = 'date';
}
