'use strict';

(function () {
  const MAIN_PIN_HEIGHT = window.MAIN_PIN_HEIGHT;
  const MAIN_PIN_WIDTH = window.MAIN_PIN_WIDTH;

  const page = window.page;
  const backend = window.backend;
  const adFormAddHandlers = window.adFormAddHandlers;
  const util = window.util;
  const map = window.map;

  const activateMainPin = function () {
    const mapContainer = document.querySelector(`.map`);
    const mapPinMain = document.querySelector(`.map__pin--main`);
    const adFormChildrens = document.querySelector(`.ad-form`).children;
    const mapFormChildrens = document.querySelector(`.map__filters`).children;
    const adForm = document.querySelector(`.ad-form`);
    const inputCoordinates = document.querySelector(`input[name=address]`);
    util.enableFormElements(adFormChildrens);
    util.enableFormElements(mapFormChildrens);
    backend.load(map.successHandler, map.errorHandler);
    adFormAddHandlers();
    map.mapFilterAddHandlers();
    inputCoordinates.value = page.getCoordinates(mapPinMain);
    mapContainer.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  };

  const addMainPinHandlers = function () {
    const mapContainer = document.querySelector(`.map`);
    const mapPinMain = document.querySelector(`.map__pin--main`);

    mapPinMain.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      if (evt.button === 0) {
        if (mapContainer.classList.contains(`map--faded`)) {
          activateMainPin();
        }

        const inputCoordinates = document.querySelector(`input[name=address]`);

        let startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        const onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          const shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          if (((mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT) >= 130)
            && ((mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT) <= 630)
            && ((mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) >= 0)
            && ((mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) <=
              document.querySelector(`.map__overlay`).clientWidth)) {

            mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
            mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
            inputCoordinates.value = page.getCoordinates(document.querySelector(`.map__pin--main`));
          }
        };

        const onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          inputCoordinates.value = page.getCoordinates(document.querySelector(`.map__pin--main`));
          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);
        };

        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);
      }
    });

    mapPinMain.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
        activateMainPin();
      }
    });
  };

  window.addMainPinHandlers = addMainPinHandlers;
})();