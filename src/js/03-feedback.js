import throttle from 'lodash.throttle'


const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('[name="email"]'),
    message: document.querySelector('[name="message"]'),
};

const FEEDBACK_KEY = 'feedback-form-state';
let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextInput, 500));

populateTextarea();

function saveForm(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
}


function onFormSubmit(event) {
    event.preventDefault();

    event.target.reset();

    localStorage.removeItem(FEEDBACK_KEY);
}

function populateTextarea() {
    const loadData = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
    if (loadData) {
        refs.email.value = loadData.amail;
        refs.message.value = loadData.message;
    }
}

