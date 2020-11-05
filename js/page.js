'use strict';

(function () {
  const MAIN_PIN_START_LEFT = document.querySelector(`.map__pin--main`).style.left;
  const MAIN_PIN_START_TOP = document.querySelector(`.map__pin--main`).style.top;
  const MAIN_PIN_HEIGHT = 83;
  const MAIN_PIN_WIDTH = 66;

  const cleanPinsAndCards = window.cleanPinsAndCards;
  const disableFormElements = window.disableFormElements;

  const getCoordinates = function (pin) {
    return `${parseInt(pin.style.left, 10) + MAIN_PIN_WIDTH / 2}, ${parseInt(pin.style.top, 10) + MAIN_PIN_HEIGHT}`;
  };

  const resetPinsFilters = window.resetPinsFilters;

  const disablePage = function () {
    const mapPinMain = document.querySelector(`.map__pin--main`);
    document.querySelector(`.map`).classList.add(`map--faded`);
    document.querySelector(`.ad-form`).reset();
    document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
    document.querySelector(`.map__filters`).reset();
    cleanPinsAndCards();
    disableFormElements(document.querySelector(`.ad-form`).children);
    disableFormElements(document.querySelector(`.map__filters`).children);
    window.scroll(0, 0);
    resetPinsFilters();
    mapPinMain.style.left = MAIN_PIN_START_LEFT;
    mapPinMain.style.top = MAIN_PIN_START_TOP;
    document.querySelector(`input[name=address]`).value =
      getCoordinates(document.querySelector(`.map__pin--main`));
  };

  window.MAIN_PIN_HEIGHT = MAIN_PIN_HEIGHT;
  window.MAIN_PIN_WIDTH = MAIN_PIN_WIDTH;
  window.getCoordinates = getCoordinates;
  window.disablePage = disablePage;
})();
