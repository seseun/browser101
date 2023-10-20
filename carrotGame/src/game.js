'use strict';

import Field from './field.js';
import Toast from './toast.js';
import * as Sound from './sound.js';

export default class GameBuilder {
  withDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withCarrotInfo(obj) {
    this.carrotInfo = obj;
    return this;
  }
  withBugInfo(obj) {
    this.bugInfo = obj;
    return this;
  }
  build() {
    return new Game(this.gameDuration, this.carrotInfo, this.bugInfo);
  }
}
class Game {
  constructor(duration, carrot, bug) {
    this.DURATION = duration;
    this.CARROT = carrot;
    this.BUG = bug;

    this.btnPlay = document.querySelector('#btn-play');
    this.btnPlay.addEventListener('click', () => this.startGame());

    this.timer = document.querySelector('#timer');
    this.timerInterval = {
      isPause: false,
      id: null,
    };

    this.score = document.querySelector('#score');
    this.gameField = new Field();
    this.finishGameToast = new Toast();
    this.finishGameToast.onClickBtnReplay(() => this.startGame());
  }

  startGame() {
    const isStarted = this.btnPlay.classList.contains('stop') ? true : false;
    if (isStarted) {
      this.finishGame(FinishType.stop);
      return;
    }
    this.initGame();
  }
  initGame() {
    this.handleInterface('play');
    this.gameField.addHtml(this.CARROT, this.BUG);
    this.playGame();
  }
  finishGame(type) {
    let text;
    switch (type) {
      case FinishType.stop:
        Sound.play(Sound.SoundType.alert);
        text = 'Replay?';
        break;
      case FinishType.lose:
        Sound.play(Sound.SoundType.alert);
        text = 'You Lose💩';
        break;
      case FinishType.win:
        Sound.play(Sound.SoundType.win);
        text = 'You Win👏';
        break;
      default:
        break;
    }
    this.finishGameToast.show(text);
    this.handleInterface('stop');
  }
  handleInterface(state) {
    switch (state) {
      case 'play':
        this.btnPlay.style.visibility = 'visible';
        this.btnPlay.classList.add('stop');
        this.btnPlay.innerHTML = `<span>Stop!</span><span class="material-icons">stop</span>`;
        this.finishGameToast.hide();
        this.gameField.play();
        this.timer.style.visibility = 'visible';
        this.score.style.visibility = 'visible';
        Sound.play(Sound.SoundType.bg);
        this.startTimer(this.DURATION);
        break;
      case 'stop':
        this.btnPlay.style.visibility = 'hidden';
        this.btnPlay.classList.remove('stop');
        this.btnPlay.innerHTML = `<span>Start!</span><span class="material-icons">play_arrow</span>`;
        this.gameField.stop();
        this.timer.style.visibility = 'hidden';
        this.score.style.visibility = 'hidden';
        Sound.stop(Sound.SoundType.bg);
        this.stopTimer();
        break;
      default:
        break;
    }
  }
  playGame() {
    let carrots = document.querySelectorAll('.carrot');
    const bugs = document.querySelectorAll('.bug');
    this.score.textContent = carrots.length;
    carrots.forEach((el) => {
      el.addEventListener('click', () => {
        el.remove();
        Sound.stop(Sound.SoundType.carrot);
        Sound.play(Sound.SoundType.carrot);
        carrots = document.querySelectorAll('.carrot');
        this.score.textContent = carrots.length;
        if (carrots.length === 0) {
          this.finishGame(FinishType.win);
        }
      });
    });
    bugs.forEach((el) => {
      el.addEventListener('click', () => {
        Sound.play(Sound.SoundType.bug);
        this.finishGame(FinishType.lose);
      });
    });
  }

  startTimer(time) {
    this.timerInterval.isPause = false;
    this.updateTimerText(time);
    this.timerInterval.id = setInterval(() => {
      this.updateTimerText(--time);
      if (time <= 0) {
        this.stopTimer();
        this.finishGame(FinishType.lose);
        return;
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timerInterval.id);
    this.timerInterval.isPause = true;
  }
  updateTimerText(time) {
    if (!this.timerInterval.isPause) {
      let minute = parseInt(time / 60, 10);
      let second = parseInt(time % 60, 10);
      let minuteText = minute < 10 ? `0${minute}` : minute;
      let secondText = second < 10 ? `0${second}` : second;
      timer.textContent = `${minuteText} : ${secondText}`;
    }
  }
}

const FinishType = Object.freeze({
  stop: 'stop',
  lose: 'lose',
  win: 'win',
});
