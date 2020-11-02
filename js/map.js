'use strict';

(function () {

  const renderPinsAndCards = window.renderPinsAndCards;
  const showError = window.showError;

  let pinHouseType = `any`;
  let pins = [];

  const mapFilterAddHandlers = function () {
    const houseTypeSelect = document.querySelector(`select[name=housing-type]`);

    houseTypeSelect.addEventListener(`change`, function () {
      pinHouseType = houseTypeSelect.value;
      updatePins();
    });
  };

  const updatePins = function () {
    const filteredPins = [];
    for (let i = 0; i < pins.length; i++) {
      if (filteredPins.length < 5) {
        if (pinHouseType === `any`) {
          filteredPins.push(pins[i]);
        } else if (pinHouseType === pins[i].offer.type) {
          filteredPins.push(pins[i]);
        }
      } else {
        break;
      }
    }
    renderPinsAndCards(filteredPins);
    addPinHandlers();
  };

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
        closeCard(card);
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

      pinsSelectors[i].addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          openCard(cardsSelectors[i], pinsSelectors[i]);
        }
      });

      cardsSelectors[i].querySelector(`.popup__close`).addEventListener(`click`, function () {
        closeCard(cardsSelectors[i], pinsSelectors[i]);
      });
    }
  };

  const successHandler = function (data) {
    pins = data;
    updatePins();
  };

  const errorHandler = function (errorMessage) {
    showError(errorMessage);
  };

  const getCoordinates = function (pin) {
    return `${parseInt(pin.style.left.substr(0, 3), 10) - window.PIN_WIDTH / 2}, ${
      parseInt(pin.style.top.substr(0, 3), 10) - window.PIN_HEIGHT}`;
  };

  window.successHandler = successHandler;
  window.errorHandler = errorHandler;
  window.getCoordinates = getCoordinates;
  window.mapFilterAddHandlers = mapFilterAddHandlers;
})();
