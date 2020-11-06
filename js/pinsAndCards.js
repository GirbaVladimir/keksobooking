'use strict';

(function () {
  const createPin = window.createPin;
  const createHiddenCard = window.createHiddenCard;

  const pinsAndCards = {
    cleanPinsAndCards() {
      document.querySelectorAll(`.map__pin`)
        .forEach((el) => {
          if (!el.classList.contains(`map__pin--main`)) {
            el.remove();
          }
        });
      document.querySelectorAll(`.map__card`).forEach((el) => el.remove());
    },
    renderPinsAndCards(pinsArray) {
      const map = document.querySelector(`.map`);
      const pinsContainer = document.querySelector(`.map__pins`);
      this.cleanPinsAndCards();

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < pinsArray.length; i++) {
        fragment.appendChild(createPin(pinsArray[i]));
        map.insertBefore(createHiddenCard(pinsArray[i]), document.querySelector(`.map__filters-container`));
      }
      pinsContainer.appendChild(fragment);
    }
  };

  window.pinsAndCards = pinsAndCards;
})();