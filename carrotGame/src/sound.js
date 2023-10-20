'use strict';

const audioBg = new Audio('./sound/bg.mp3');
const audioAlert = new Audio('./sound/alert.wav');
const audioCarrot = new Audio('./sound/carrot_pull.mp3');
const audioBug = new Audio('./sound/bug_pull.mp3');
const audioWin = new Audio('./sound/game_win.mp3');

export const SoundType = Object.freeze({
  bg: 'bg',
  alert: 'alert',
  carrot: 'carrot',
  bug: 'bug',
  win: 'win',
});

export function play(type) {
  switch (type) {
    case SoundType.bg:
      audioBg.play();
      break;
    case SoundType.alert:
      audioAlert.play();
      break;
    case SoundType.carrot:
      audioCarrot.play();
      break;
    case SoundType.bug:
      audioBug.play();
      break;
    case SoundType.win:
      audioWin.play();
      break;

    default:
      break;
  }
}
export function stop(type) {
  switch (type) {
    case SoundType.bg:
      audioBg.pause();
      audioBg.currentTime = 0;
      break;
    case SoundType.alert:
      audioAlert.pause();
      audioAlert.currentTime = 0;
      break;
    case SoundType.carrot:
      audioCarrot.pause();
      audioCarrot.currentTime = 0;
      break;
    case SoundType.bug:
      audioBug.pause();
      audioBug.currentTime = 0;
      break;
    case SoundType.win:
      audioWin.pause();
      audioWin.currentTime = 0;
      break;

    default:
      break;
  }
}
