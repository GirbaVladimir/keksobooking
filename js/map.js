'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormChildrens = document.querySelector(`.ad-form`).children;
  const mapFormChildrens = document.querySelector(`.map__filters`).children;
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const inputCoordinates = document.querySelector(`input[name=address]`);

  const getCoordinates = function (pin) {
    return `${parseInt(pin.style.left.substr(0, 3), 10) - window.PIN_WIDTH / 2}, ${
      parseInt(pin.style.top.substr(0, 3), 10) - window.PIN_HEIGHT}`;
  };

  inputCoordinates.value = getCoordinates(mapPinMain);

  const activateMainPin = function () {
    window.enableFormElements(adFormChildrens);
    window.enableFormElements(mapFormChildrens);
    window.placePinsToContainer(window.createPinArray());
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
