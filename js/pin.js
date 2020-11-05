'use strict';

(function () {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;

  const createHiddenCard = window.createHiddenCard;

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
    document.querySelectorAll(`.map__pin`)
      .forEach((el) => {
        if (!el.classList.contains(`map__pin--main`)) {
          el.remove();
        }
      });
    document.querySelectorAll(`.map__card`).forEach((el) => el.remove());
  };

  const renderPinsAndCards = function (pinsArray) {
    const map = document.querySelector(`.map`);
    const pinsContainer = document.querySelector(`.map__pins`);
    cleanPinsAndCards();

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(createPin(pinsArray[i]));
      map.insertBefore(createHiddenCard(pinsArray[i]), document.querySelector(`.map__filters-container`));
    }
    pinsContainer.appendChild(fragment);
  };

  window.cleanPinsAndCards = cleanPinsAndCards;
  window.renderPinsAndCards = renderPinsAndCards;
})();
