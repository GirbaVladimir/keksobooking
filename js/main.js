'use strict';

(function () {
  const mapFilterAddHandlers = window.mapFilterAddHandlers;
  const adFormAddHandlers = window.adFormAddHandlers;
  const getCoordinates = window.getCoordinates;
  const errorHandler = window.errorHandler;
  const successHandler = window.successHandler;
  const backend = window.backend;
  const enableFormElements = window.enableFormElements;
  const disableFormElements = window.disableFormElements;

  const activateMainPin = function () {
    const map = document.querySelector(`.map`);
    const mapPinMain = document.querySelector(`.map__pin--main`);
    const adFormChildrens = document.querySelector(`.ad-form`).children;
    const mapFormChildrens = document.querySelector(`.map__filters`).children;
    const adForm = document.querySelector(`.ad-form`);

    enableFormElements(adFormChildrens);
    enableFormElements(mapFormChildrens);
    backend.load(successHandler, errorHandler);
    adFormAddHandlers();
    mapFilterAddHandlers();

    inputCoordinates.value = getCoordinates(mapPinMain);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  };

  const addMainPinHandlers = function () {
    const map = document.querySelector(`.map`);
    const mapPinMain = document.querySelector(`.map__pin--main`);

    mapPinMain.addEventListener(`mousedown`, function (evt) {
      if (evt.button === 0 && map.classList.contains(`map--faded`)) {
        activateMainPin();
      }
    });

    mapPinMain.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
        activateMainPin();
      }
    });
  };

  const inputCoordinates = document.querySelector(`input[name=address]`); // пока  так, в 5 модуле буду с ней работать
  inputCoordinates.value = getCoordinates(document.querySelector(`.map__pin--main`));
  disableFormElements(document.querySelector(`.ad-form`).children);
  disableFormElements(document.querySelector(`.map__filters`).children);
  addMainPinHandlers();
})();
