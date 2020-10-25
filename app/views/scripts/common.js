/* eslint-disable no-unused-vars */

function openShare(url) {
  const shareDropdown = document.querySelector('.share-poll-dropdown');

  if (!shareDropdown) {
    return false;
  }

  shareDropdown.classList.toggle('show');
}

function showAlert(message) {
  const el = document.createElement('div');
  el.innerText = message;
  el.className = 'toast';
  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 3000);
}

function copyInputValue(el) {
  if (!navigator.clipboard) {
    return;
  }

  navigator.clipboard.writeText(el.target.value).then(
    () => {
      showAlert('Link copied!');
    },
    (err) => {
      console.error('Async: Could not copy text: ', err);
    },
  );
}

const copyInputs = document.querySelectorAll('.copy-input');

for (let i = 0; i < copyInputs.length; i += 1) {
  copyInputs[i].addEventListener('click', copyInputValue);
}
