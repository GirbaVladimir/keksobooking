'use strict';

(function () {
  const renderPinsAndCards = window.renderPinsAndCards;
  const showLoadError = window.showLoadError;
  const addPinHandlers = window.addPinHandlers;

  let pinHouseType = `any`;
  let pins = [];

  const resetPinsFilters = function () {
    pinHouseType = `any`;
  };

  const mapFilterAddHandlers = function () {
    const houseTypeSelect = document.querySelector(`select[name=housing-type]`);

    houseTypeSelect.addEventListener(`change`, function () {
      pinHouseType = houseTypeSelect.value;
      updatePins();
    });
  };

  const updatePins = function () {
    const filteredPins = [];
    for (let i = 0; i < pins.length; i++) {
      if (pinHouseType === `any`) {
        filteredPins.push(pins[i]);
      } else if (pinHouseType === pins[i].offer.type) {
        filteredPins.push(pins[i]);
      }
      if (filteredPins.length > 4) {
        break;
      }
    }
    renderPinsAndCards(filteredPins);
    addPinHandlers();
  };

  const successHandler = function (data) {
    pins = data;
    updatePins();
  };

  const errorHandler = function (errorMessage) {
    showLoadError(errorMessage);
  };

  window.resetPinsFilters = resetPinsFilters;
  window.successHandler = successHandler;
  window.errorHandler = errorHandler;
  window.mapFilterAddHandlers = mapFilterAddHandlers;
})();
