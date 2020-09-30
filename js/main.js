'use strict';

(function () {
  const AD_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const AD_CHECKIN = [`12:00`, `13:00`, `14:00`];
  const AD_CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const AD_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PIN_SIZE = 8;

  const randomInteger = function (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const getOverlayWidth = function () {
    return document.querySelector(`.map__overlay`).clientWidth;
  };

  const createRandomPhotos = function () {
    let photos = [];

    for (let i = 1; i < randomInteger(1, 30); i++) {
      photos.push(`http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`);
    }

    return photos;
  };

  const createArray = function () {
    let arr = [];
    for (let i = 0; i < PIN_SIZE; i++) {
      const x = randomInteger(0, getOverlayWidth());
      const y = randomInteger(130, 630);

      arr.push(
          {
            author: {
              avatar: `img/avatars/user0${i + 1}.png`
            },
            offer: {
              title: `Random house`,
              address: `${x}, ${y}`,
              price: randomInteger(10, 2000),
              type: AD_TYPE[randomInteger(0, 2)],
              rooms: randomInteger(0, 100),
              guests: randomInteger(0, 100),
              checkin: AD_CHECKIN[randomInteger(0, 2)],
              checkout: AD_CHECKOUT[randomInteger(0, 2)],
              features: AD_FEATURES.slice(randomInteger(0, 5)),
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
    pinButton.style.cssText = `left: ${arr.location.x - 25}px; top: ${arr.location.y - 70}px;`;
    let pinPhoto = newPin.querySelector(`img`);
    pinPhoto.src = `${arr.author.avatar}`;
    pinPhoto.alt = `${arr.offer.title}`;
    return newPin;
  };

  const placeAds = function () {
    const pins = document.querySelector(`.map__pins`);
    let pinsArray = createArray();

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(createAd(pinsArray[i]));
    }
    pins.appendChild(fragment);
    // delete later
    let map = document.querySelector(`.map`);
    map.classList.remove(`map--faded`);
  };

  placeAds();
})();
