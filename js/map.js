'use strict';

(function () {
  const backend = window.backend;
  const enableFormElements = window.enableFormElements;
  const renderPins = window.renderPins;
  const showError = window.showError;

  const adForm = document.querySelector(`.ad-form`);
  const adFormChildrens = document.querySelector(`.ad-form`).children;
  const mapFormChildrens = document.querySelector(`.map__filters`).children;
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const inputCoordinates = document.querySelector(`input[name=address]`);
  let pinHouseType = `any`;
  let pins = [];
  const houseTypeSelect = document.querySelector(`select[name=housing-type]`);

  houseTypeSelect.addEventListener(`change`, function () {
    pinHouseType = houseTypeSelect.value;
    updatePins();
  });

  const updatePins = function () {
    const filteredPins = [];
    for (let i = 0; i < pins.length; i++) {
      if (pinHouseType === `any` && filteredPins.length < 5) {
        filteredPins.push(pins[i]);
      } else if (pinHouseType === pins[i].offer.type) {
        filteredPins.push(pins[i]);
      }
    }
    renderPins(filteredPins);
  };

  const successHandler = function (data) {
    pins = data;
    updatePins();
    window.renderCard(pins); // пока так
  };

  const errorHandler = function (errorMessage) {
    showError(errorMessage);
  };

  const getCoordinates = function (pin) {
    return `${parseInt(pin.style.left.substr(0, 3), 10) - window.PIN_WIDTH / 2}, ${
      parseInt(pin.style.top.substr(0, 3), 10) - window.PIN_HEIGHT}`;
  };

  inputCoordinates.value = getCoordinates(mapPinMain);


  const activateMainPin = function () {
    enableFormElements(adFormChildrens);
    enableFormElements(mapFormChildrens);
    backend.load(successHandler, errorHandler);

    inputCoordinates.value = getCoordinates(mapPinMain);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  };

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
})();
