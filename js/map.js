'use strict';

(function () {
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
    window.renderPins(function () {
      const arr = [];
      for (let i = 0; i < pins.length; i++) {
        if (pinHouseType === `any` && arr.length < 5) {
          arr.push(pins[i]);
        } else if (pinHouseType === pins[i].offer.type) {
          arr.push(pins[i]);
        }
      }

      return arr;
    }());
  };

  const successHandler = function (data) {
    pins = data;
    updatePins();
  };

  const errorHandler = function (errorMessage) {
    window.showError(errorMessage);
  };

  const getCoordinates = function (pin) {
    return `${parseInt(pin.style.left.substr(0, 3), 10) - window.PIN_WIDTH / 2}, ${
      parseInt(pin.style.top.substr(0, 3), 10) - window.PIN_HEIGHT}`;
  };

  inputCoordinates.value = getCoordinates(mapPinMain);


  const activateMainPin = function () {
    window.enableFormElements(adFormChildrens);
    window.enableFormElements(mapFormChildrens);
    window.backend.load(successHandler, errorHandler);
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
