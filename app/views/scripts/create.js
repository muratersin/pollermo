/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

function getOptions() {
  return document.querySelectorAll('input[name="options"]');
}

function addInput() {
  const wrapper = document.createElement('div');
  wrapper.className = 'row option';

  const child = document.createElement('div');
  child.className = 'column';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'u-full-width';
  input.placeholder = 'Option';
  input.name = 'options';
  input.addEventListener('input', onChange);

  child.append(input);
  wrapper.append(child);
  document.getElementById('form-fields').append(wrapper);
}

function removeInput(num) {
  const options = getOptions();

  if (options.length === 2) return;

  for (let i = (options.length - 1); i >= 0; i -= 1) {
    if (!options[i].value) {
      options[i].remove();
      break;
    }
  }
}

function onChange() {
  const options = getOptions();
  let empty = 0;

  for (let i = 0; i < options.length; i += 1) {
    if (!options[i].value) {
      empty += 1;
    }
  }

  if (empty === 0) {
    addInput();
  } else if (empty > 1) {
    removeInput();
  }
}
