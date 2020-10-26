'use strict';

(function () {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;
  const pinsContainer = document.querySelector(`.map__pins`);

  const createPin = function (arr) {
    const newPin = document.querySelector(`#pin`).content.cloneNode(true);
    const pinButton = newPin.querySelector(`.map__pin`);
    pinButton.style.cssText = `left: ${arr.location.x - PIN_WIDTH / 2}px; top: ${arr.location.y - PIN_HEIGHT}px;`;
    const pinPhoto = newPin.querySelector(`img`);
    pinPhoto.src = `${arr.author.avatar}`;
    pinPhoto.alt = `${arr.offer.title}`;
    return newPin;
  };

  const renderPins = function (pinsArray) {
    if (pinsContainer.children[2]) {
      while (pinsContainer.children[2]) {
        pinsContainer.removeChild(pinsContainer.lastChild); // это надо чтобы не удалялось главный пин и заголовок
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
