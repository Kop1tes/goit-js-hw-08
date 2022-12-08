import throttle from 'lodash.throttle';

const refs = { 
    form: document.querySelector('.feedback-form'), 
    email: document.querySelector('.feedback-form input'), 
    textarea: document.querySelector('.feedback-form textarea'), 
}; 

const LOCAL_STORAGE_KEY = 'feedback-form-state';
let  formData = {};


refs.form.addEventListener('submit', throttle(onFormSubmit, 500)); 
refs.form.addEventListener('input', onInput);


function onInput(e) { 
    formData[e.target.name] = e.target.value;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));

};

populateData(); 

function onFormSubmit(e) { 
    e.preventDefault();
    // console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))); 
    e.currentTarget.reset(); 
    localStorage.removeItem(LOCAL_STORAGE_KEY);

};  

function populateData() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parseData = JSON.parse(savedData);
    if (parseData) {
        formData = parseData;
        refs.textarea.value = parseData.message || '';
        refs.email.value = parseData.email || '';
        console.log(parseData);
    }
  }
  