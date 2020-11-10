'use strict';

(function () {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;

  const createPin = (pin) => {
    const newPin = document.querySelector(`#pin`).content.cloneNode(true);
    const pinButton = newPin.querySelector(`.map__pin`);
    pinButton.style.cssText = `left: ${pin.location.x - PIN_WIDTH / 2}px; top: ${pin.location.y - PIN_HEIGHT}px;`;
    const pinPhoto = newPin.querySelector(`img`);
    pinPhoto.src = `${pin.author.avatar}`;
    pinPhoto.alt = `${pin.offer.title}`;

    return newPin;
  };

  window.createPin = createPin;
})();
