const pollWrapper = document.getElementById('poll');
const slug = pollWrapper.getAttribute('data-slug');

const events = new EventSource(`/poll/${slug}/result-stream`);

events.onmessage = (event) => {
  const data = JSON.parse(event.data);

  data.options.forEach((option) => {
    const optionElement = document.getElementById(option._id);
    const [percentElement] = optionElement.getElementsByClassName('percent');
    const [countElement] = optionElement.getElementsByClassName('count');
    const [resultBarElement] = optionElement.getElementsByClassName('result-bar');

    percentElement.innerHTML = `%${option.percent}`;
    countElement.innerHTML = `${option.voteCount} Vote${option.voteCount < 2 ? '' : 's'}`;
    resultBarElement.setAttribute('style', `width: ${option.percent}%`);
  });
};

events.error = (error) => {
  console.error('Event sounrce error:', error);
};

events.close = () => {
  console.log('Event sounrce is closed.');
};

events.onopen = () => {
  console.info('Event source is conntected.');
};
