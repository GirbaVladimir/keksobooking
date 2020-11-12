'use strict';

const DEBOUNCE_INTERVAL = 500;

const util = {

  disableFormElements(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  },

  enableFormElements(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  },

  debounce(cb) {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  },

  showError(errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; max-width: 1200px`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  },

  showSuccessSave() {
    const newSuccessPopup = document.querySelector(`#success`).content.cloneNode(true);
    document.querySelector(`main`).appendChild(newSuccessPopup);

    const deleteSuccessPopup = () => {
      document.querySelector(`main`).removeChild(document.querySelector(`.success`));
      document.removeEventListener(`mousedown`, onShowSuccessMousedown);
      document.removeEventListener(`keydown`, onShowSuccessSaveEscPress);
    };

    const onShowSuccessSaveEscPress = (evt) => {
      if (evt.key === `Escape`) {
        deleteSuccessPopup();
      }
    };

    const onShowSuccessMousedown = () => {
      deleteSuccessPopup();
    };

    document.addEventListener(`mousedown`, onShowSuccessMousedown);
    document.addEventListener(`keydown`, onShowSuccessSaveEscPress);
  },

  showErrorSave() {
    const newErrorPopup = document.querySelector(`#error`).content.cloneNode(true);
    document.querySelector(`main`).appendChild(newErrorPopup);

    const deleteErrorPopup = () => {
      document.querySelector(`main`).removeChild(document.querySelector(`.error`));
      document.removeEventListener(`mousedown`, onErrorSaveMousedown);
      document.removeEventListener(`keydown`, onErrorSaveEscPress);
    };

    const onErrorSaveClick = () => {
      deleteErrorPopup();
    };

    const onErrorSaveMousedown = () => {
      deleteErrorPopup();
    };

    const onErrorSaveEscPress = (evt) => {
      if (evt.key === `Escape`) {
        deleteErrorPopup();
      }
    };

    document.querySelector(`.error__button`).addEventListener(`click`, onErrorSaveClick);
    document.addEventListener(`mousedown`, onErrorSaveMousedown);
    document.addEventListener(`keydown`, onErrorSaveEscPress);
  }
};

window.util = util;
