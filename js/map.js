'use strict';

const util = window.util;
const pinsAndCards = window.pinsAndCards;

let pinHouseType = `any`;
let pinPrice = `any`;
let pinRooms = `any`;
let pinGuests = `any`;
let pinFeatures = [];
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

const filterPinRoomsOrPinGuests = (pinsArray, isRoomsFilter = true) => {
  let sortParameter;
  if (isRoomsFilter) {
    sortParameter = pinRooms;
  } else {
    sortParameter = pinGuests;
  }
  const filteredPins = [];
  for (let i = 0; i < pinsArray.length; i++) {
    if (sortParameter === `any`) {
      filteredPins.push(pinsArray[i]);
    } else if (isRoomsFilter) {
      if (+sortParameter === pinsArray[i].offer.rooms) {
        filteredPins.push(pinsArray[i]);
      }
    } else {
      if (+sortParameter === pinsArray[i].offer.guests) {
        filteredPins.push(pinsArray[i]);
      }
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
  const filteredByPinHouseType = filterPinHouseType(pins);
  const filteredByPinPrice = filterPinPrice(filteredByPinHouseType);
  const filteredByPinRooms = filterPinRoomsOrPinGuests(filteredByPinPrice);
  const filteredByPinGuests = filterPinRoomsOrPinGuests(filteredByPinRooms, false);
  const filteredByPinFeatures = filterPinFeatures(filteredByPinGuests);
  pinsAndCards.render(filteredByPinFeatures);
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

  addFilterHandlers() {
    const houseTypeSelect = document.querySelector(`select[name=housing-type]`);
    const housePriceSelect = document.querySelector(`select[name=housing-price]`);
    const houseRoomsSelect = document.querySelector(`select[name=housing-rooms]`);
    const houseGuestsSelect = document.querySelector(`select[name=housing-guests]`);
    const houseFeaturesRadio = document.querySelectorAll(`.map__checkbox`);

    houseTypeSelect.addEventListener(`change`, util.debounce(() => {
      pinHouseType = houseTypeSelect.value;
      updatePins();
    }));

    housePriceSelect.addEventListener(`change`, util.debounce(() => {
      pinPrice = housePriceSelect.value;
      updatePins();
    }));

    houseRoomsSelect.addEventListener(`change`, util.debounce(() => {
      pinRooms = houseRoomsSelect.value;
      updatePins();
    }));

    houseGuestsSelect.addEventListener(`change`, util.debounce(() => {
      pinGuests = houseGuestsSelect.value;
      updatePins();
    }));

    for (let i = 0; i < houseFeaturesRadio.length; i++) {
      houseFeaturesRadio[i].addEventListener(`click`, util.debounce(() => {
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
    const mapFormChildrens = document.querySelector(`.map__filters`).children;
    util.enableFormElements(mapFormChildrens);
    pins = data;
    updatePins();
  },

  errorHandler(errorMessage) {
    util.showError(errorMessage);
  }
};

window.map = map;
