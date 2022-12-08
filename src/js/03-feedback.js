

const throttler = require('lodash.throttle');

const refs = {
    feedbackFormEl: document.querySelector(".feedback-form"),
    inputEmailEl: document.querySelector("input[name=email]"),
    textareaEl: document.querySelector("textarea[name=message]"),
};

let feedbackFormObject = {};

refs.feedbackFormEl.addEventListener("input", throttler(onFeedbackFormInput, 500));

function onFeedbackFormInput(e) {
    feedbackFormObject[e.target.name] = e.target.value;

    let localStorageObject = JSON.stringify(feedbackFormObject);
    localStorage.setItem("feedback-form-state", localStorageObject);
}

window.addEventListener("load", onFeedbackFormReplay);

function onFeedbackFormReplay() {
    if (!localStorage.getItem("feedback-form-state")) {
    return;
    }

    let parsedLocalStorageObject = JSON.parse(localStorage.getItem("feedback-form-state"));

    if (parsedLocalStorageObject.email) {
    feedbackFormObject.email = parsedLocalStorageObject.email;
    refs.inputEmailEl.value = parsedLocalStorageObject.email;
  }

  if (parsedLocalStorageObject.message) {
    feedbackFormObject.message = parsedLocalStorageObject.message;
    refs.textareaEl.value = parsedLocalStorageObject.message;
  }
}



// refs.feedbackFormEl.addEventListener("submit", onFeedbackFormReset);

// function onFeedbackFormReset(e) {
//   e.preventDefault();

//   let parsedLocalStorageObject = JSON.parse(localStorage.getItem("feedback-form-state"));

//   if (parsedLocalStorageObject) {
//     console.log(parsedLocalStorageObject);
//   }

//   refs.feedbackFormEl.reset();
//   localStorage.removeItem("feedback-form-state");
//   feedbackFormObject = {};
// }

// 2
// import throttle from 'lodash.throttle';

// const refs = { 
//     form: document.querySelector('.feedback-form'), 
//     email: document.querySelector('.feedback-form input'), 
//     textarea: document.querySelector('.feedback-form textarea'), 
// }; 

// const LOCAL_STORAGE_KEY = 'feedback-form-state';
// let  formData = {};

// populateData(); 

// refs.form.addEventListener('submit', onFormSubmit); 
// refs.form.addEventListener('input', throttle(onInput, 500));


// function onInput(event) { 
//     formData[event.target.name] = event.target.value;
//     let localStorageObject = JSON.stringify(formData);
//     localStorage.setItem(LOCAL_STORAGE_KEY, localStorageObject);
// };


// function onFormSubmit(e) { 
//     e.preventDefault(); 
//     e.currentTarget.reset(); 
//     localStorage.removeItem(LOCAL_STORAGE_KEY);
// };  

// function populateData() {
//     const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
//     const parseData = JSON.parse(savedData);
//     if (parseData) {
//         formData = parseData;
//         refs.textarea.value = parseData.message || '';
//         refs.email.value = parseData.email || '';
//     }
//   }
  