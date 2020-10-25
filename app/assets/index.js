import feather from 'feather-icons';
import './scss/main.scss';
setTimeout(() => {
  try {
    console.log('Ok');
    
    feather.replace();
  } catch (err) {
    console.log({ err });
  }
});
