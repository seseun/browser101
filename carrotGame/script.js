const btnPlay = document.querySelector('#btn-play');
const btnReplay = document.querySelector('#btn-replay');
const timer = document.querySelector('#timer');
const score = document.querySelector('#score');
const gameZone = document.querySelector('#game-zone');
const toastReplay = document.querySelector('#toast-replay');
const toastReplayText = document.querySelector('#toast-replay .text');

const audioBg = new Audio('./sound/bg.mp3');
const audioAlert = new Audio('./sound/alert.wav');
const audioCarrot = new Audio('./sound/carrot_pull.mp3');
const audioBug = new Audio('./sound/bug_pull.mp3');
const audioWin = new Audio('./sound/game_win.mp3');

const TIMER_SECOND = 10;
const COUNT_CARROT = 10;
const COUNT_BUG = 7;
const SIZE_CARROT = 80;
const SIZE_BUG = 50;

window.addEventListener('load', () => {
  btnPlay.addEventListener('click', () => startGame());
  btnReplay.addEventListener('click', () => startGame());
});

function startGame() {
  const isStarted = btnPlay.classList.contains('stop') ? true : false;
  if (isStarted) {
    endGame('stop');
    return;
  }
  initGame();
}
function initGame() {
  handleInterface('play');
  addGameZoneHtml();
  playGame();
}

function endGame(type) {
  let text;
  switch (type) {
    case 'stop':
      playSound(audioAlert);
      text = 'Replay?';
      break;
    case 'lose':
      playSound(audioAlert);
      text = 'You Lose💩';
      break;
    case 'win':
      playSound(audioWin);
      text = 'You Win👏';
      break;
    default:
      break;
  }
  toastReplayText.textContent = text;
  handleInterface('stop');
}

function handleInterface(state) {
  switch (state) {
    case 'play':
      btnPlay.style.visibility = 'visible';
      btnPlay.classList.add('stop');
      btnPlay.innerHTML = `<span>Stop!</span><span class="material-icons">stop</span>`;
      toastReplay.style.visibility = 'hidden';
      gameZone.style.pointerEvents = 'inherit';
      timer.style.visibility = 'visible';
      score.style.visibility = 'visible';
      playSound(audioBg);
      startTimer(TIMER_SECOND);
      break;
    case 'stop':
      btnPlay.style.visibility = 'hidden';
      btnPlay.classList.remove('stop');
      btnPlay.innerHTML = `<span>Start!</span><span class="material-icons">play_arrow</span>`;
      toastReplay.style.visibility = 'visible';
      gameZone.style.pointerEvents = 'none';
      timer.style.visibility = 'hidden';
      score.style.visibility = 'hidden';
      stopSound(audioBg);
      stopTimer();
      break;
    default:
      break;
  }
}
function addGameZoneHtml() {
  let zoneHtml = '';
  const gameZoneWidth = gameZone.getBoundingClientRect().width;
  const gameZoneHeight = gameZone.getBoundingClientRect().height;

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function iterateItems(type, count, size) {
    for (let i = 0; i < count; i++) {
      const x = getRandomIntInclusive(0, gameZoneWidth - size);
      const y = getRandomIntInclusive(0, gameZoneHeight - size);
      zoneHtml =
        zoneHtml +
        `<div class="${type}" 
          style="left: ${x}px; top: ${y}px;"
        ></div>`;
    }
  }

  iterateItems('carrot', COUNT_CARROT, SIZE_CARROT);
  iterateItems('bug', COUNT_BUG, SIZE_BUG);
  gameZone.innerHTML = zoneHtml;
}
function playGame() {
  let carrots = document.querySelectorAll('.carrot');
  const bugs = document.querySelectorAll('.bug');
  score.textContent = carrots.length;
  carrots.forEach((el) => {
    el.addEventListener('click', () => {
      el.remove();
      stopSound(audioCarrot);
      playSound(audioCarrot);
      carrots = document.querySelectorAll('.carrot');
      score.textContent = carrots.length;
      if (carrots.length === 0) {
        endGame('win');
      }
    });
  });
  bugs.forEach((el) => {
    el.addEventListener('click', () => {
      playSound(audioBug);
      endGame('lose');
    });
  });
}

// timer
let timerinterval = {
  isPause: false,
  id: null,
};
function startTimer(time) {
  timerinterval.isPause = false;
  updateTimerText(time);
  timerinterval.id = setInterval(() => {
    updateTimerText(--time);
    if (time <= 0) {
      stopTimer();
      endGame('lose');
      return;
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timerinterval.id);
  timerinterval.isPause = true;
}
function updateTimerText(time) {
  if (!timerinterval.isPause) {
    let minute = parseInt(time / 60, 10);
    let second = parseInt(time % 60, 10);
    let minuteText = minute < 10 ? `0${minute}` : minute;
    let secondText = second < 10 ? `0${second}` : second;
    timer.textContent = `${minuteText} : ${secondText}`;
  }
}

// sound
function playSound(audio) {
  audio.play();
}
function stopSound(audio) {
  audio.pause();
  audio.currentTime = 0;
}
