'use strict';

const audioBg = new Audio('./sound/bg.mp3');
const audioAlert = new Audio('./sound/alert.wav');
const audioCarrot = new Audio('./sound/carrot_pull.mp3');
const audioBug = new Audio('./sound/bug_pull.mp3');
const audioWin = new Audio('./sound/game_win.mp3');

export function play(type) {
  switch (type) {
    case 'bg':
      audioBg.play();
      break;
    case 'alert':
      audioAlert.play();
      break;
    case 'carrot':
      audioCarrot.play();
      break;
    case 'bug':
      audioBug.play();
      break;
    case 'win':
      audioWin.play();
      break;

    default:
      break;
  }
}
export function stop(type) {
  switch (type) {
    case 'bg':
      audioBg.pause();
      audioBg.currentTime = 0;
      break;
    case 'alert':
      audioAlert.pause();
      audioAlert.currentTime = 0;
      break;
    case 'carrot':
      audioCarrot.pause();
      audioCarrot.currentTime = 0;
      break;
    case 'bug':
      audioBug.pause();
      audioBug.currentTime = 0;
      break;
    case 'win':
      audioWin.pause();
      audioWin.currentTime = 0;
      break;

    default:
      break;
  }
}
