'use strict';

const addMainPinHandlers = window.addMainPinHandlers;
const addAdFormHandlers = window.addAdFormHandlers;
const map = window.map;
const page = window.page;
const util = window.util;

document.querySelector(`input[name=address]`).value =
  page.getCoordinates(document.querySelector(`.map__pin--main`));
util.disableFormElements(document.querySelector(`.ad-form`).children);
util.disableFormElements(document.querySelector(`.map__filters`).children);
addMainPinHandlers();
addAdFormHandlers();
map.addFilterHandlers();
