'use strict';

const SAVE_URL = `https://21.javascript.pages.academy/keksobooking`;
const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const TIMEOUT_IN_MS = 10000;
const backend = {
  save(data, onSave, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      switch (xhr.status) {
        case 200:
          onSave();
          break;
        case 500:
          onError();
          break;
        case 404:
          onError(`Ничего не найдено`);
          break;
        default:
          onError();
      }
    });

    xhr.addEventListener(`error`, () => {
      onError();
    });

    xhr.open(`POST`, SAVE_URL);
    xhr.send(data);
  },

  load(onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError(`Неверный запрос`);
          break;
        case 404:
          onError(`Ничего не найдено`);
          break;
        default:
          onError(`Статус ответа: : ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Ошибка соединения. Превышено время ожидания`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, LOAD_URL);
    xhr.send();
  }
};

window.backend = backend;
