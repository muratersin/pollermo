import feather from 'feather-icons';
import dayjs from 'dayjs';

import './scss/main.scss';

setTimeout(() => {
  feather.replace();
});

const dates = document.getElementsByClassName('date');
for (let i = 0; i < dates.length; i += 1) {
  const date = dates[i].getAttribute('data-date');
  dates[i].innerHTML = dayjs(date).format('DD/MM/YYYY HH:mm');
}
