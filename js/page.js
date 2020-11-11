'use strict';

const MAIN_PIN_START_LEFT = document.querySelector(`.map__pin--main`).style.left;
const MAIN_PIN_START_TOP = document.querySelector(`.map__pin--main`).style.top;
const MAIN_PIN_HEIGHT = 83;
const MAIN_PIN_WIDTH = 66;

const pinsAndCards = window.pinsAndCards;
const util = window.util;
const map = window.map;

const page = {
  getCoordinates(pin) {
    return `${parseInt(pin.style.left, 10) + MAIN_PIN_WIDTH / 2}, ${parseInt(pin.style.top, 10) + MAIN_PIN_HEIGHT}`;
  },

  disable() {
    const mapPinMain = document.querySelector(`.map__pin--main`);
    document.querySelector(`.map`).classList.add(`map--faded`);
    document.querySelector(`.ad-form`).reset();
    document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
    document.querySelector(`.map__filters`).reset();
    pinsAndCards.clean();
    util.disableFormElements(document.querySelector(`.ad-form`).children);
    util.disableFormElements(document.querySelector(`.map__filters`).children);
    window.scroll(0, 0);
    map.resetPinsFilters();
    mapPinMain.style.left = MAIN_PIN_START_LEFT;
    mapPinMain.style.top = MAIN_PIN_START_TOP;
    document.querySelector(`input[name=address]`).value =
      page.getCoordinates(document.querySelector(`.map__pin--main`));
    document.querySelector(`.ad-form__photo`).innerHTML = ``;
    document.querySelector(`.ad-form-header__preview`)
      .querySelector(`img`).src = `img/muffin-grey.svg`;
  }
};

window.MAIN_PIN_HEIGHT = MAIN_PIN_HEIGHT;
window.MAIN_PIN_WIDTH = MAIN_PIN_WIDTH;
window.page = page;
