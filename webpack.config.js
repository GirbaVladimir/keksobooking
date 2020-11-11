const path = require("path");

module.exports = {
  entry : [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/card.js`,
    `./js/pin.js`,
    `./js/pinsAndCards.js`,
    `./js/map.js`,
    `./js/page.js`,
    `./js/form.js`,
    `./js/main-pin.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
