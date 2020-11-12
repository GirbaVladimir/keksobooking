'use strict';

const MAIN_PIN_HEIGHT = window.MAIN_PIN_HEIGHT;
const MAIN_PIN_WIDTH = window.MAIN_PIN_WIDTH;
const MIN_Y_COORDINATE = 130;
const MAX_Y_COORDINATE = 630;
const MIN_X_COORDINATE = 0;
const MAX_X_COORDINATE = document.querySelector(`.map__overlay`).clientWidth;

const page = window.page;
const backend = window.backend;
const util = window.util;
const map = window.map;

const activateMainPin = () => {
  const mapContainer = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormChildrens = document.querySelector(`.ad-form`).children;
  const adForm = document.querySelector(`.ad-form`);
  const inputCoordinates = document.querySelector(`input[name=address]`);
  util.enableFormElements(adFormChildrens);
  backend.load(map.successHandler, map.errorHandler);
  inputCoordinates.value = page.getCoordinates(mapPinMain);
  mapContainer.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
};

const addMainPinHandlers = () => {
  const mapContainer = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  mapPinMain.addEventListener(`mousedown`, (evt) => {
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

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (((mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT) >= MIN_Y_COORDINATE)
          && ((mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT) <= MAX_Y_COORDINATE)
          && ((mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) >= MIN_X_COORDINATE)
          && ((mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2) <= MAX_X_COORDINATE)) {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
          inputCoordinates.value = page.getCoordinates(document.querySelector(`.map__pin--main`));
        }
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        inputCoordinates.value = page.getCoordinates(document.querySelector(`.map__pin--main`));
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
      activateMainPin();
    }
  });
};

window.addMainPinHandlers = addMainPinHandlers;
