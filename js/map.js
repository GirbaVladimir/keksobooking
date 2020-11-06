'use strict';

(function () {
  const util = window.util;
  const pinsAndCards = window.pinsAndCards;

  let pinHouseType = `any`;
  let pins = [];
  let activePin = null;
  let shownCard = null;

  const updatePins = function () {
    const filteredPins = [];
    for (let i = 0; i < pins.length; i++) {
      if (pinHouseType === `any`) {
        filteredPins.push(pins[i]);
      } else if (pinHouseType === pins[i].offer.type) {
        filteredPins.push(pins[i]);
      }
      if (filteredPins.length > 4) {
        break;
      }
    }
    pinsAndCards.renderPinsAndCards(filteredPins);
    addPinHandlers();
  };

  const onCardEscPress = function (evt) {
    if (evt.key === `Escape`) {
      closeCard(shownCard, activePin);
    }
  };

  const openCard = function (card, pin) {
    activePin = pin;
    shownCard = card;
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
    document.addEventListener(`keydown`, onCardEscPress);
  };

  const closeCard = function (card, pin) {
    card.classList.add(`hidden`);
    pin.classList.remove(`map__pin--active`);
    document.removeEventListener(`keydown`, onCardEscPress);
  };

  const addPinHandlers = function () {
    const pinsSelectors = Array.from(document.querySelectorAll(`.map__pin`))
      .filter((el) => !el.classList.contains(`map__pin--main`));
    const cardsSelectors = document.querySelectorAll(`.map__card`);

    for (let i = 0; i < pinsSelectors.length; i++) {
      pinsSelectors[i].addEventListener(`click`, function () {
        openCard(cardsSelectors[i], pinsSelectors[i]);
      });

      cardsSelectors[i].querySelector(`.popup__close`).addEventListener(`click`, function () {
        closeCard(cardsSelectors[i], pinsSelectors[i]);
      });
    }
  };

  const map = {

    resetPinsFilters() {
      pinHouseType = `any`;
    },

    mapFilterAddHandlers() {
      const houseTypeSelect = document.querySelector(`select[name=housing-type]`);

      houseTypeSelect.addEventListener(`change`, function () {
        pinHouseType = houseTypeSelect.value;
        updatePins();
      });
    },

    successHandler(data) {
      pins = data;
      updatePins();
    },

    errorHandler(errorMessage) {
      util.showLoadError(errorMessage);
    }
  };

  window.map = map;
})();
