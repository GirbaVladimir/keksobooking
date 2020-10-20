'use strict';

(function () {
  window.PIN_HEIGHT = 70;
  window.PIN_WIDTH = 50;

  const createPin = function (arr) {
    const newPin = document.querySelector(`#pin`).content.cloneNode(true);
    const pinButton = newPin.querySelector(`.map__pin`);
    pinButton.style.cssText = `left: ${arr.location.x - window.PIN_WIDTH / 2}px; top: ${arr.location.y - window.PIN_HEIGHT}px;`;
    const pinPhoto = newPin.querySelector(`img`);
    pinPhoto.src = `${arr.author.avatar}`;
    pinPhoto.alt = `${arr.offer.title}`;
    return newPin;
  };

  window.renderPins = function (pinsArray) {
    const pinsContainer = document.querySelector(`.map__pins`);

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(createPin(pinsArray[i]));
    }
    pinsContainer.appendChild(fragment);
  };
})();
