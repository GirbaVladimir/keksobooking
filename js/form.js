'use strict';

(function () {
  const MIN_AD_TITLE = 30;
  const MAX_AD_TITLE = 100;
  const MAX_AD_PRICE = 1000000;
  let minAddPrice = 1000;

  const adFormChildrens = document.querySelector(`.ad-form`).children;
  const mapFormChildrens = document.querySelector(`.map__filters`).children;

  const adTitle = document.querySelector(`input[name=title]`);
  const adPrice = document.querySelector(`input[name=price]`);
  const adType = document.querySelector(`select[name=type]`);
  const adRooms = document.querySelector(`select[name=rooms]`);
  const adCapacity = document.querySelector(`select[name=capacity]`);
  const adSubmit = document.querySelector(`.ad-form__submit`);

  const disableFormElements = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  window.enableFormElements = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  disableFormElements(adFormChildrens);
  disableFormElements(mapFormChildrens);

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

  adSubmit.addEventListener(`click`, function () {

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
})();
