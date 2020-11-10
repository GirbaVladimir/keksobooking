'use strict';

(function () {
  const util = window.util;
  const pinsAndCards = window.pinsAndCards;
  const debounce = window.debounce;

  let pinHouseType = `any`;
  let pinPrice = `any`;
  let pinRooms = `any`;
  let pinGuests = `any`;
  let pinFeatures = []; // `wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`
  let pins = [];
  let activePin = null;
  let shownCard = null;

  const filterPinPrice = (pinsArray) => {
    const filteredPins = [];
    for (let i = 0; i < pinsArray.length; i++) {
      if (pinPrice === `any`) {
        filteredPins.push(pinsArray[i]);
      } else if (pinPrice === `middle`) {
        if (pinsArray[i].offer.price >= 10000 && pinsArray[i].offer.price <= 50000) {
          filteredPins.push(pinsArray[i]);
        }
      } else if (pinPrice === `low`) {
        if (pinsArray[i].offer.price <= 10000) {
          filteredPins.push(pinsArray[i]);
        }
      } else if (pinPrice === `high`) {
        if (pinsArray[i].offer.price >= 50000) {
          filteredPins.push(pinsArray[i]);
        }
      }
    }

    return filteredPins;
  };

  const filterPinHouseType = (pinsArray) => {
    const filteredPins = [];
    for (let i = 0; i < pinsArray.length; i++) {
      if (pinHouseType === `any`) {
        filteredPins.push(pinsArray[i]);
      } else if (pinHouseType === pinsArray[i].offer.type) {
        filteredPins.push(pinsArray[i]);
      }
    }

    return filteredPins;
  };

  // эта и след функция похожи, как тут лучше поступить?
  const filterPinRooms = (pinsArray) => {
    const filteredPins = [];
    for (let i = 0; i < pinsArray.length; i++) {
      if (pinRooms === `any`) {
        filteredPins.push(pinsArray[i]);
      } else if (+pinRooms === pinsArray[i].offer.rooms) {
        filteredPins.push(pinsArray[i]);
      }
    }
    return filteredPins;
  };

  const filterPinGuests = (pinsArray) => {
    const filteredPins = [];
    for (let i = 0; i < pinsArray.length; i++) {
      if (pinGuests === `any`) {
        filteredPins.push(pinsArray[i]);
      } else if (+pinGuests === pinsArray[i].offer.guests) {
        filteredPins.push(pinsArray[i]);
      }
    }
    return filteredPins;
  };

  const filterPinFeatures = (pinsArray) => {
    const filteredPins = [];
    const checkFeatures = (featuresArray) => {
      for (let i = 0; i < pinFeatures.length; i++) {
        if (featuresArray.indexOf(pinFeatures[i]) === -1) {
          return false;
        }
      }
      return true;
    };

    for (let i = 0; i < pinsArray.length; i++) {
      if (pinFeatures.length === 0) {
        filteredPins.push(pinsArray[i]);
      } else if (checkFeatures(pinsArray[i].offer.features)) {
        filteredPins.push(pinsArray[i]);
      }
      if (filteredPins.length > 4) {
        break;
      }
    }
    return filteredPins;
  };

  const updatePins = () => {
    pinsAndCards.render(filterPinFeatures(filterPinGuests(filterPinRooms(filterPinPrice(filterPinHouseType(pins))))));
    // другого в голову не пришло)))))
    addPinHandlers();
  };

  const onCardEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeCard(shownCard, activePin);
    }
  };

  const openCard = (card, pin) => {
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

  const closeCard = (card, pin) => {
    card.classList.add(`hidden`);
    pin.classList.remove(`map__pin--active`);
    document.removeEventListener(`keydown`, onCardEscPress);
  };

  const addPinHandlers = () => {
    const pinsSelectors = Array.from(document.querySelectorAll(`.map__pin`))
      .filter((el) => !el.classList.contains(`map__pin--main`));
    const cardsSelectors = document.querySelectorAll(`.map__card`);

    for (let i = 0; i < pinsSelectors.length; i++) {
      pinsSelectors[i].addEventListener(`click`, () => {
        openCard(cardsSelectors[i], pinsSelectors[i]);
      });

      cardsSelectors[i].querySelector(`.popup__close`).addEventListener(`click`, () => {
        closeCard(cardsSelectors[i], pinsSelectors[i]);
      });
    }
  };

  const map = {

    resetPinsFilters() {
      pinHouseType = `any`;
      pinPrice = `any`;
      pinRooms = `any`;
      pinGuests = `any`;
      pinFeatures = [];
      pins = [];
    },

    addMapFilterHandlers() {
      const houseTypeSelect = document.querySelector(`select[name=housing-type]`);
      const housePriceSelect = document.querySelector(`select[name=housing-price]`);
      const houseRoomsSelect = document.querySelector(`select[name=housing-rooms]`);
      const houseGuestsSelect = document.querySelector(`select[name=housing-guests]`);
      const houseFeaturesRadio = document.querySelectorAll(`.map__checkbox`);

      houseTypeSelect.addEventListener(`change`, debounce(() => {
        pinHouseType = houseTypeSelect.value;
        updatePins();
      }));

      housePriceSelect.addEventListener(`change`, debounce(() => {
        pinPrice = housePriceSelect.value;
        updatePins();
      }));

      houseRoomsSelect.addEventListener(`change`, debounce(() => {
        pinRooms = houseRoomsSelect.value;
        updatePins();
      }));

      houseGuestsSelect.addEventListener(`change`, debounce(() => {
        pinGuests = houseGuestsSelect.value;
        updatePins();
      }));

      for (let i = 0; i < houseFeaturesRadio.length; i++) {
        houseFeaturesRadio[i].addEventListener(`click`, debounce(() => {
          if (houseFeaturesRadio[i].checked) {
            pinFeatures.push(houseFeaturesRadio[i].value);
          } else {
            pinFeatures.splice(pinFeatures.indexOf(houseFeaturesRadio[i].value), 1);
          }
          updatePins();
        }));
      }
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
