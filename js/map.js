'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormChildrens = document.querySelector(`.ad-form`).children;
  const mapFormChildrens = document.querySelector(`.map__filters`).children;
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const inputCoordinates = document.querySelector(`input[name=address]`);

  const getCoordinates = function (pin) {
    inputCoordinates.value = `${parseInt(pin.style.left.substr(0, 3), 10) - window.PIN_WIDTH / 2}, ${
      parseInt(pin.style.top.substr(0, 3), 10) - window.PIN_HEIGHT}`;
  };

  getCoordinates(mapPinMain);

  const mainPinActive = function () {
    window.enableFormElements(adFormChildrens);
    window.enableFormElements(mapFormChildrens);
    window.placeAds();
    getCoordinates(mapPinMain);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0 && map.classList.contains(`map--faded`)) {
      mainPinActive();
    }
  });

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
      mainPinActive();
    }
  });
})();
