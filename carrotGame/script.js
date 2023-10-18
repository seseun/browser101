const btnPlay = document.querySelector('#btn-play');
const btnReplay = document.querySelector('#btn-replay');
const timeCounter = document.querySelector('#count-time');
const carrotCounter = document.querySelector('#count-carrot');
const gameZone = document.querySelector('#game-zone');
const toastReplay = document.querySelector('#toast-replay');
const toastReplayText = document.querySelector('#toast-replay .text');
const audioBg = document.querySelector('#audio-bg');
const audioAlert = document.querySelector('#audio-alert');
const audioCarrot = document.querySelector('#audio-carrot');
const audioBug = document.querySelector('#audio-bug');
const audioWin = document.querySelector('#audio-win');

// 게임세팅
function startGame(carrot, bug) {
  if (btnPlay.classList.contains('stop')) {
    stopGame();
    return;
  }
  audioBg.play();
  addGameZoneHtml(carrot, bug);
  startTimer(10);
  btnPlay.style.display = 'flex';
  btnPlay.classList.add('stop');
  btnPlay.innerHTML = `<span>Stop!</span><span class="material-icons">stop</span>`;
  toastReplay.style.display = 'none';
  gameZone.style.pointerEvents = 'inherit';

  playGame();
}
function stopGame() {
  btnPlay.innerHTML = `<span>Start!</span><span class="material-icons">play_arrow</span>`;
  audioAlert.play();
  endGame('Replay?');
}

function addGameZoneHtml(carrotCount, bugCount) {
  let zoneHtml = '';

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const gameZoneWidth = gameZone.getBoundingClientRect().width;
  const gameZoneHeight = gameZone.getBoundingClientRect().height;

  for (let i = 0; i < carrotCount; i++) {
    const carrotX = getRandomIntInclusive(0, gameZoneWidth - 80);
    const carrotY = getRandomIntInclusive(0, gameZoneHeight - 80);
    zoneHtml =
      zoneHtml +
      `<div class="carrot" 
        style="left: ${carrotX}px; top: ${carrotY}px;"
      ></div>`;
  }

  for (let i = 0; i < bugCount; i++) {
    const bugX = getRandomIntInclusive(0, gameZoneWidth - 50);
    const bugY = getRandomIntInclusive(0, gameZoneHeight - 50);
    zoneHtml =
      zoneHtml +
      `<div class="bug" 
        style="left: ${bugX}px; top: ${bugY}px;"
      ></div>`;
  }
  gameZone.innerHTML = zoneHtml;
}

// 게임진행
function playGame() {
  let carrots = document.querySelectorAll('.carrot');
  const bugs = document.querySelectorAll('.bug');
  carrotCounter.textContent = carrots.length;
  carrots.forEach((el) => {
    el.addEventListener('click', () => {
      el.remove();
      audioCarrot.pause();
      audioCarrot.currentTime = 0;
      audioCarrot.play();
      carrots = document.querySelectorAll('.carrot');
      carrotCounter.textContent = carrots.length;
      if (carrots.length === 0) {
        endWin();
      }
    });
  });
  bugs.forEach((el) => {
    el.addEventListener('click', () => {
      audioBug.play();
      endLose();
    });
  });
}

// 타이머
let timerinterval = {
  isPause: false,
  id: null,
};
function startTimer(time) {
  timerinterval.isPause = false;
  timerCallback(time);
  timerinterval.id = setInterval(() => {
    --time;
    timerCallback(time);
    if (time <= 0) {
      stopTimer();
      endLose();
      return;
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timerinterval.id);
  timerinterval.isPause = true;
}
function timerCallback(time) {
  if (!timerinterval.isPause) {
    let minute = parseInt(time / 60, 10);
    let second = parseInt(time % 60, 10);
    let minuteText = minute < 10 ? `0${minute}` : minute;
    let secondText = second < 10 ? `0${second}` : second;
    timeCounter.textContent = `${minuteText} : ${secondText}`;
  }
}

// 게임끝내기
function endGame(text) {
  btnPlay.style.display = 'none';
  btnPlay.classList.remove('stop');
  toastReplay.style.display = 'flex';
  toastReplayText.textContent = text;
  gameZone.style.pointerEvents = 'none';
  audioBg.pause();
  audioBg.currentTime = 0;
  stopTimer();
}
function endLose() {
  audioAlert.play();
  endGame('You Lose💩');
}
function endWin() {
  audioWin.play();
  endGame('You Win👏');
}

window.addEventListener('load', () => {
  btnPlay.addEventListener('click', () => startGame(10, 7));
  btnReplay.addEventListener('click', () => startGame(10, 7));
});
