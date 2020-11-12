'use strict';

const OFFER_TYPE = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const createHiddenCard = (pin) => {
  const newCard = document.querySelector(`#card`).content.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = pin.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = pin.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${pin.offer.price}₽/ночь`;
  const type = newCard.querySelector(`.popup__type`);
  switch (pin.offer.type) {
    case `flat`:
      type.textContent = OFFER_TYPE.flat;
      break;
    case `bungalow`:
      type.textContent = OFFER_TYPE.bungalow;
      break;
    case `house`:
      type.textContent = OFFER_TYPE.house;
      break;
    case `palace`:
      type.textContent = OFFER_TYPE.palace;
      break;
    default:
      type.textContent = `Любой тип жилья`;
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

  newCard.querySelector(`.popup__description`).textContent = pin.offer.description;
  const photos = newCard.querySelector(`.popup__photos`);
  const photo = newCard.querySelector(`.popup__photo`);
  photos.innerHTML = ``;
  for (let i = 0; i < pin.offer.photos.length; i++) {
    let node = photo.cloneNode();
    node.src = pin.offer.photos[i];
    photos.appendChild(node);
  }
  newCard.querySelector(`.popup__avatar`).src = `${pin.author.avatar}`;
  newCard.querySelector(`.map__card`).classList.add(`hidden`);

  return newCard;
};

window.createHiddenCard = createHiddenCard;
