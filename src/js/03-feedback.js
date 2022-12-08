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

refs.feedbackFormEl.addEventListener("submit", onFeedbackFormReset);

function onFeedbackFormReset(e) {
  e.preventDefault();

  let parsedLocalStorageObject = JSON.parse(localStorage.getItem("feedback-form-state"));

  if (parsedLocalStorageObject) {
    console.log(parsedLocalStorageObject);
  }

  refs.feedbackFormEl.reset();
  localStorage.removeItem("feedback-form-state");
  feedbackFormObject = {};
}