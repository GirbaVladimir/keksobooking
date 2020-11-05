'use strict';

(function () {

  const openCard = function (card, pin) {
    const cardsCheckHidden = document.querySelectorAll(`.map__card`);
    const pinCheckHidden = Array.from(document.querySelectorAll(`.map__pin`))
      .filter((el) => !el.classList.contains(`map__pin--main`));
    for (let i = 0; i < cardsCheckHidden.length; i++) {
      if (!cardsCheckHidden[i].classList.contains(`hidden`)) {
        closeCard(cardsCheckHidden[i], pinCheckHidden[i]);
      }
    }
    card.classList.remove(`hidden`);
    pin.classList.add(`map__pin--active`);
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        closeCard(card, pin);
      }
    });
  };

  const closeCard = function (card, pin) {
    card.classList.add(`hidden`);
    pin.classList.remove(`map__pin--active`);
    document.removeEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        closeCard(card, pin);
      }
    });
  };

  const addPinHandlers = function () {
    const pinsSelectors = Array.from(document.querySelectorAll(`.map__pin`))
      .filter((el) => !el.classList.contains(`map__pin--main`));
    const cardsSelectors = document.querySelectorAll(`.map__card`);

    for (let i = 0; i < pinsSelectors.length; i++) {
      pinsSelectors[i].addEventListener(`click`, function () {
        openCard(cardsSelectors[i], pinsSelectors[i]);
      });

      // pinsSelectors[i].addEventListener(`keydown`, function (evt) {
      //   if (evt.key === `Enter`) {
      //     openCard(cardsSelectors[i], pinsSelectors[i]);
      //   }
      // });

      cardsSelectors[i].querySelector(`.popup__close`).addEventListener(`click`, function () {
        closeCard(cardsSelectors[i], pinsSelectors[i]);
      });
    }
  };

  window.addPinHandlers = addPinHandlers;
})();
