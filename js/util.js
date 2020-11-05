'use strict';

(function () {
  const getRandomInteger = function (min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const disableFormElements = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  const enableFormElements = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  const showLoadError = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; max-width: 1200px`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const showSuccessSave = function () {
    const newSuccessPopup = document.querySelector(`#success`).content.cloneNode(true);
    document.querySelector(`main`).appendChild(newSuccessPopup);

    const deleteSuccessPopup = function () {
      document.querySelector(`main`).removeChild(document.querySelector(`.success`));
      document.removeEventListener(`mousedown`, deleteSuccessPopup);
      document.removeEventListener(`keydown`, showSuccessSaveEscPress);
    };

    const showSuccessSaveEscPress = function (evt) {
      if (evt.key === `Escape`) {
        deleteSuccessPopup();
      }
    };

    document.addEventListener(`mousedown`, deleteSuccessPopup);
    document.addEventListener(`keydown`, showSuccessSaveEscPress);
  };

  const showErrorSave = function () {
    const newErrorPopup = document.querySelector(`#error`).content.cloneNode(true);
    document.querySelector(`main`).appendChild(newErrorPopup);

    const deleteErrorPopup = function () {
      document.querySelector(`main`).removeChild(document.querySelector(`.error`));
      document.removeEventListener(`keydown`, showErrorSaveEscPress);
    };

    const showErrorSaveEscPress = function (evt) {
      if (evt.key === `Escape`) {
        deleteErrorPopup();
      }
    };

    document.querySelector(`.error__button`).addEventListener(`click`, deleteErrorPopup);
    document.addEventListener(`keydown`, showErrorSaveEscPress);
  };

  window.showErrorSave = showErrorSave;
  window.showSuccessSave = showSuccessSave;
  window.getRandomInteger = getRandomInteger;
  window.showLoadError = showLoadError;
  window.disableFormElements = disableFormElements;
  window.enableFormElements = enableFormElements;
})();
