'use strict';

import GameBuilder from './game.js';

const game = new GameBuilder().withDuration(10).withCarrotInfo({ count: 20, size: 80 }).withBugInfo({ count: 20, size: 50 }).build();
