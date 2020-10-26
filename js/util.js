'use strict';

(function () {
  const getRandomInteger = function (min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const showError = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; max-width: 1200px`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.getRandomInteger = getRandomInteger;
  window.showError = showError;
})();
