'use strict';

(function () {
  const createCard = window.createCard;

  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;
  const pinsContainer = document.querySelector(`.map__pins`);

  const createPin = function (pin) {
    const newPin = document.querySelector(`#pin`).content.cloneNode(true);
    const pinButton = newPin.querySelector(`.map__pin`);
    pinButton.style.cssText = `left: ${pin.location.x - PIN_WIDTH / 2}px; top: ${pin.location.y - PIN_HEIGHT}px;`;
    const pinPhoto = newPin.querySelector(`img`);
    pinPhoto.src = `${pin.author.avatar}`;
    pinPhoto.alt = `${pin.offer.title}`;
    createCard(pin);

    return newPin;
  };

  const renderPins = function (pinsArray) {
    if (pinsContainer.children[2]) {
      while (pinsContainer.children[2]) {
        document.querySelectorAll(`.map__card`).forEach((el) => el.remove());
        pinsContainer.removeChild(pinsContainer.lastChild); // это надо чтобы не удалялись главный пин и заголовок
      }
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(createPin(pinsArray[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  window.renderPins = renderPins;
  window.PIN_HEIGHT = PIN_HEIGHT;
  window.PIN_WIDTH = PIN_WIDTH;
})();
