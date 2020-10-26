'use strict';

(function () {
  const PIN_AMOUNT = 8;
  const AD_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const AD_CHECKIN = [`12:00`, `13:00`, `14:00`];
  const AD_CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const AD_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

  const createRandomPhotos = function () {
    const photos = [];

    for (let i = 1; i < window.getRandomInteger(1, 30); i++) {
      photos.push(`http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`);
    }

    return photos;
  };

  window.createPinArray = function () {
    const arr = [];
    for (let i = 0; i < PIN_AMOUNT; i++) {
      const x = window.getRandomInteger(0, document.querySelector(`.map__overlay`).clientWidth);
      const y = window.getRandomInteger(130, 630);

      arr.push(
          {
            author: {
              avatar: `img/avatars/user0${i + 1}.png`
            },
            offer: {
              title: `Random house`,
              address: `${x}, ${y}`,
              price: window.getRandomInteger(10, 2000),
              type: AD_TYPE[window.getRandomInteger(0, 2)],
              rooms: window.getRandomInteger(0, 100),
              guests: window.getRandomInteger(0, 100),
              checkin: AD_CHECKIN[window.getRandomInteger(0, 2)],
              checkout: AD_CHECKOUT[window.getRandomInteger(0, 2)],
              features: AD_FEATURES.slice(window.getRandomInteger(0, 5)),
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
})();
