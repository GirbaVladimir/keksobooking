'use strict';

(function () {
  const createCard = window.createCard;

  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;

  const createPin = function (pin) {
    const newPin = document.querySelector(`#pin`).content.cloneNode(true);
    const pinButton = newPin.querySelector(`.map__pin`);
    pinButton.style.cssText = `left: ${pin.location.x - PIN_WIDTH / 2}px; top: ${pin.location.y - PIN_HEIGHT}px;`;
    const pinPhoto = newPin.querySelector(`img`);
    pinPhoto.src = `${pin.author.avatar}`;
    pinPhoto.alt = `${pin.offer.title}`;

    return newPin;
  };

  const cleanPinsAndCards = function () {
    const pinsContainer = document.querySelectorAll(`.map__pin`);
    for (let i = 0; i < pinsContainer.length; i++) {
      if (!pinsContainer[i].classList.contains(`map__pin--main`)) {
        pinsContainer[i].remove();
      }
    }
    document.querySelectorAll(`.map__card`).forEach((el) => el.remove());
  };

  const renderPinsAndCards = function (pinsArray) {
    const pinsContainer = document.querySelector(`.map__pins`);
    cleanPinsAndCards();

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(createPin(pinsArray[i]));
      createCard(pinsArray[i]);
    }
    pinsContainer.appendChild(fragment);
  };

  window.renderPinsAndCards = renderPinsAndCards;
  window.PIN_HEIGHT = PIN_HEIGHT;
  window.PIN_WIDTH = PIN_WIDTH;
})();
