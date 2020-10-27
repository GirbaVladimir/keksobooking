'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const createCard = function (pin) {
    const newCard = document.querySelector(`#card`).content.cloneNode(true);
    newCard.querySelector(`.popup__title`).textContent = pin.offer.title;
    newCard.querySelector(`.popup__text--address`).textContent = pin.offer.address;
    newCard.querySelector(`.popup__text--price`).textContent = `${pin.offer.price}₽/ночь`;
    const type = newCard.querySelector(`.popup__type`);
    if (pin.offer.type === `flat`) {
      type.textContent = `Квартира`;
    } else if (pin.offer.type === `bungalow`) {
      type.textContent = `Бунгало`;
    } else if (pin.offer.type === `house`) {
      type.textContent = `Дом`;
    } else if (pin.offer.type === `palace`) {
      type.textContent = `Дворец`;
    }
    newCard.querySelector(`.popup__text--capacity`).textContent =
      `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
    newCard.querySelector(`.popup__text--time`).textContent =
      `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;
    const features = newCard.querySelector(`.popup__features`);
    const feature = newCard.querySelector(`.popup__feature`);
    features.innerHTML = ``;
    for (let i = 0; i < pin.offer.features.length; i++) {
      const node = feature.cloneNode();
      node.classList.remove();
      node.classList.add(`popup__feature`);
      node.classList.add(`popup__feature--${pin.offer.features[i]}`);
      features.appendChild(node);
    }
    if (pin.offer.description === ``) {
      newCard.querySelector(`.popup__description`).innerHTML = ``;
    } else {
      newCard.querySelector(`.popup__description`).textContent = pin.offer.description;
    }
    const photos = newCard.querySelector(`.popup__photos`);
    const photo = newCard.querySelector(`.popup__photo`);
    photos.innerHTML = ``;
    for (let i = 0; i < pin.offer.photos.length; i++) {
      let node = photo.cloneNode();
      node.src = pin.offer.photos[i];
      photos.appendChild(node);
    }
    newCard.querySelector(`.popup__avatar`).src = `${pin.author.avatar}`;

    return newCard;
  };

  const renderCard = function (pinsArray) {
    map.insertBefore(createCard(pinsArray[0]), document.querySelector(`.map__filters-container`)); // пока что так дальше задание изменится поменяю
  };

  window.renderCard = renderCard;
})();
