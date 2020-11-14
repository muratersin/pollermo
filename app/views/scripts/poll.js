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

function createForm(id) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = `/${id}`;
  form.style = 'display:none';
  return form;
}

function createInput(name, value) {
  const input = document.createElement('input');
  input.name = name;
  input.value = value;
  return input;
}

function getToken(showCaptcha, callBack) {
  if (!showCaptcha) return callBack();

  grecaptcha.ready(() => {
    grecaptcha
      .execute('6Le3ntgZAAAAAKtD4n4r5hLCodacIqfa5ZIvJ8dg', { action: 'submit' })
      .then(callBack);
  });
}

function submit(id, showCaptcha) {
  getToken(showCaptcha, (token) => {
    const selectedOption = [...document.querySelectorAll("input[name='options']")]
      .filter((i) => i.checked)
      .map((i) => i.value);

    if (selectedOption.length < 1) {
      return;
    }

    const form = createForm(id);

    const tokenInput = createInput('token', token);
    form.appendChild(tokenInput);

    for (const value of selectedOption) {
      form.appendChild(createInput('options', value));
    }

    document.body.appendChild(form);
    form.submit();
  });
}
