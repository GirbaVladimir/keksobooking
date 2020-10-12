'use strict';

(function () {
  const AD_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const AD_CHECKIN = [`12:00`, `13:00`, `14:00`];
  const AD_CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const AD_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PIN_AMOUNT = 8;
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;
  const MIN_AD_TITLE = 30;
  const MAX_AD_TITLE = 100;
  const MAX_AD_PRICE = 1000000;

  let minAddPrice = 1000;

  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormChildrens = adForm.children;
  const mapFormChildrens = document.querySelector(`.map__filters`).children;
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const inputCoordinates = document.querySelector(`input[name=address]`);

  const adTitle = document.querySelector(`input[name=title]`);
  const adPrice = document.querySelector(`input[name=price]`);
  const adType = document.querySelector(`select[name=type]`);
  const adRooms = document.querySelector(`select[name=rooms]`);
  const adCapacity = document.querySelector(`select[name=capacity]`);
  const adSubmint = document.querySelector(`.ad-form__submit`);

  adTitle.addEventListener(`input`, function () {
    const valueLength = adTitle.value.length;

    if (valueLength < MIN_AD_TITLE) {
      adTitle.setCustomValidity(`Ещё ` + (MIN_AD_TITLE - valueLength) + ` симв.`);
    } else if (valueLength > MAX_AD_TITLE) {
      adTitle.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_AD_TITLE) + ` симв.`);
    } else {
      adTitle.setCustomValidity(``);
    }
  });

  adPrice.addEventListener(`input`, function () {
    const valueAmount = parseInt(adPrice.value, 10);

    if (valueAmount > MAX_AD_PRICE) {
      adPrice.setCustomValidity(`Максимальная цена составляет: ${MAX_AD_PRICE}`);
    } else {
      adPrice.setCustomValidity(``);
    }
  });

  adType.addEventListener(`change`, function () {
    // добавлю позже валидацию инпута мин цена
    if (adType.value === `bungalow`) {
      minAddPrice = 0;
      adPrice.placeholder = minAddPrice;
    } else if (adType.value === `flat`) {
      minAddPrice = 1000;
      adPrice.placeholder = minAddPrice;
    } else if (adType.value === `house`) {
      minAddPrice = 5000;
      adPrice.placeholder = minAddPrice;
    } else if (adType.value === `palace`) {
      minAddPrice = 10000;
      adPrice.placeholder = minAddPrice;
    }
  });

  adSubmint.addEventListener(`click`, function () {

    if (parseInt(adRooms.value, 10) === 1 && parseInt(adCapacity.value, 10) !== 1) {
      adRooms.setCustomValidity(`1 комнатная квартира только для 1 гостя!`);
    } else if (parseInt(adRooms.value, 10) === 2 && parseInt(adCapacity.value, 10) > 2) {
      adRooms.setCustomValidity(`2 комнатная квартира только для 1 или 2 гостей!`);
    } else if (parseInt(adRooms.value, 10) === 3 && parseInt(adCapacity.value, 10) > 3) {
      adRooms.setCustomValidity(`3 комнатная квартира только для 1, 2 или 3 гостей!`);
    } else if (parseInt(adRooms.value, 10) === 100 && parseInt(adCapacity.value, 10) !== 0) {
      adRooms.setCustomValidity(`100 комнатные помещения не для гостей!`);
    } else {
      adRooms.setCustomValidity(``);
    }
  });

  const getCoordinates = function (pin) {
    inputCoordinates.value = `${parseInt(pin.style.left.substr(0, 3), 10) - PIN_WIDTH / 2}, ${
      parseInt(pin.style.top.substr(0, 3), 10) - PIN_HEIGHT}`;
  };

  getCoordinates(mapPinMain);

  const disableFormElements = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  const enableFormElements = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  disableFormElements(adFormChildrens);
  disableFormElements(mapFormChildrens);

  const mainPinActive = function () {
    enableFormElements(adFormChildrens);
    enableFormElements(mapFormChildrens);
    placeAds();
    getCoordinates(mapPinMain);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0 && map.classList.contains(`map--faded`)) {
      mainPinActive();
    }
  });

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
      mainPinActive();
    }
  });

  const getRandomInteger = function (min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const createRandomPhotos = function () {
    const photos = [];

    for (let i = 1; i < getRandomInteger(1, 30); i++) {
      photos.push(`http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`);
    }

    return photos;
  };

  const createAdArray = function () {
    const arr = [];
    for (let i = 0; i < PIN_AMOUNT; i++) {
      const x = getRandomInteger(0, document.querySelector(`.map__overlay`).clientWidth);
      const y = getRandomInteger(130, 630);

      arr.push(
          {
            author: {
              avatar: `img/avatars/user0${i + 1}.png`
            },
            offer: {
              title: `Random house`,
              address: `${x}, ${y}`,
              price: getRandomInteger(10, 2000),
              type: AD_TYPE[getRandomInteger(0, 2)],
              rooms: getRandomInteger(0, 100),
              guests: getRandomInteger(0, 100),
              checkin: AD_CHECKIN[getRandomInteger(0, 2)],
              checkout: AD_CHECKOUT[getRandomInteger(0, 2)],
              features: AD_FEATURES.slice(getRandomInteger(0, 5)),
              description: `Amazing house`,
              photos: createRandomPhotos()
            },
            location: {
              x,
              y
            },
          });
    }

    return arr;
  };

  const createAd = function (arr) {
    const newPin = document.querySelector(`#pin`).content.cloneNode(true);
    let pinButton = newPin.querySelector(`.map__pin`);
    pinButton.style.cssText = `left: ${arr.location.x - PIN_WIDTH / 2}px; top: ${arr.location.y - PIN_HEIGHT}px;`;
    let pinPhoto = newPin.querySelector(`img`);
    pinPhoto.src = `${arr.author.avatar}`;
    pinPhoto.alt = `${arr.offer.title}`;
    return newPin;
  };

  const placeAds = function () {
    const pins = document.querySelector(`.map__pins`);
    let pinsArray = createAdArray();

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(createAd(pinsArray[i]));
    }
    pins.appendChild(fragment);
  };
})();
