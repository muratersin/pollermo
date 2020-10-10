/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */

function selectOption(id, multi) {
  const selectedClass = 'button-primary';
  const btn = document.getElementById(id);

  if (!btn) return;

  if (String(multi) !== 'true') {
    const optionButtons = document.getElementsByClassName('option-btn');
    for (const b of optionButtons) {
      b.classList.remove(selectedClass);
    }
  }

  btn.classList.toggle(selectedClass);
}

function createForm() {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = '/poll/vote';
  form.style = 'display:none';
  return form;
}

function createInput(name, value) {
  const input = document.createElement('input');
  input.name = name;
  input.value = value;
  return input;
}

function submit(pollId) {
  const selectedOptionButtons = [...document.querySelectorAll('.option-btn.button-primary')];
  const optionIds = selectedOptionButtons.map((b) => b.id);
  const form = createForm();

  const pollInput = createInput('pollId', pollId);
  form.appendChild(pollInput);

  for (const id of optionIds) {
    const optionInput = createInput('options', id);
    form.appendChild(optionInput);
  }

  document.body.appendChild(form);
  form.submit();
}
