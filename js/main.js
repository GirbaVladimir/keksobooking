'use strict';

(function () {
  const addMainPinHandlers = window.addMainPinHandlers;
  const getCoordinates = window.getCoordinates;
  const disableFormElements = window.disableFormElements;

  document.querySelector(`input[name=address]`).value =
    getCoordinates(document.querySelector(`.map__pin--main`));
  disableFormElements(document.querySelector(`.ad-form`).children);
  disableFormElements(document.querySelector(`.map__filters`).children);
  addMainPinHandlers();
})();
