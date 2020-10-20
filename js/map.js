'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormChildrens = document.querySelector(`.ad-form`).children;
  const mapFormChildrens = document.querySelector(`.map__filters`).children;
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const inputCoordinates = document.querySelector(`input[name=address]`);

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; max-width: 1200px`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const getCoordinates = function (pin) {
    return `${parseInt(pin.style.left.substr(0, 3), 10) - window.PIN_WIDTH / 2}, ${
      parseInt(pin.style.top.substr(0, 3), 10) - window.PIN_HEIGHT}`;
  };

  inputCoordinates.value = getCoordinates(mapPinMain);

  const activateMainPin = function () {
    window.enableFormElements(adFormChildrens);
    window.enableFormElements(mapFormChildrens);
    window.backend.load(window.renderPins, errorHandler);
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
