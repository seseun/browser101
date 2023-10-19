'use strict';

import Game from './game.js';

const DURATION = 10;
const CARROT = {
  count: 20,
  size: 80,
};
const BUG = {
  count: 20,
  size: 50,
};

const game = new Game(DURATION, CARROT, BUG);
