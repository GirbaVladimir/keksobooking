'use strict';

(function () {
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

    showLoadError(errorMessage) {
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

      const deleteSuccessPopup = function () {
        document.querySelector(`main`).removeChild(document.querySelector(`.success`));
        document.removeEventListener(`mousedown`, deleteSuccessPopup);
        document.removeEventListener(`keydown`, onShowSuccessSaveEscPress);
      };

      const onShowSuccessSaveEscPress = function (evt) {
        if (evt.key === `Escape`) {
          deleteSuccessPopup();
        }
      };

      document.addEventListener(`mousedown`, deleteSuccessPopup);
      document.addEventListener(`keydown`, onShowSuccessSaveEscPress);
    },

    showErrorSave() {
      const newErrorPopup = document.querySelector(`#error`).content.cloneNode(true);
      document.querySelector(`main`).appendChild(newErrorPopup);

      const deleteErrorPopup = function () {
        document.querySelector(`main`).removeChild(document.querySelector(`.error`));
        document.removeEventListener(`mousedown`, deleteErrorPopup);
        document.removeEventListener(`keydown`, onErrorSaveEscPress);
      };

      const onErrorSaveEscPress = function (evt) {
        if (evt.key === `Escape`) {
          deleteErrorPopup();
        }
      };

      document.querySelector(`.error__button`).addEventListener(`click`, deleteErrorPopup);
      document.addEventListener(`mousedown`, deleteErrorPopup);
      document.addEventListener(`keydown`, onErrorSaveEscPress);
    }
  };

  window.util = util;
})();
