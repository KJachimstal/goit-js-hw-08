import throttle from 'lodash.throttle';
const LOCAL_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const submit = document.querySelector('button[type=submit]');

form.addEventListener('input', throttle(saveOnChange, 500));
form.addEventListener('submit', submitForm);
let formData = {};

checkLocalStorage();

function saveOnChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function checkLocalStorage() {
  const formData = localStorage.getItem(LOCAL_KEY);

  if (formData === null) {
    return;
  }

  const parsedFormData = JSON.parse(formData);

  for (const [name, value] of Object.entries(parsedFormData)) {
    form.elements[name].value = value;
    formData[name] = value;
  }
}

function submitForm(event) {
  event.preventDefault();
  console.log(formData);
  localStorage.removeItem(LOCAL_KEY);
  form.reset();
}
